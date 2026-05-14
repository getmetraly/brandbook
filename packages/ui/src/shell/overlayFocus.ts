const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

let bodyLockCount = 0;
let previousBodyOverflow: string | null = null;

function isHTMLElement(node: Element): node is HTMLElement {
  return node instanceof HTMLElement;
}

function isVisible(element: HTMLElement) {
  return Boolean(
    element.offsetWidth ||
    element.offsetHeight ||
    element.getClientRects().length,
  );
}

export function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR))
    .filter(isHTMLElement)
    .filter((element) => !element.hasAttribute('disabled'))
    .filter((element) => element.getAttribute('aria-hidden') !== 'true')
    .filter(isVisible);
}

export function focusFirstElement(container: HTMLElement) {
  const [firstFocusable] = getFocusableElements(container);
  window.requestAnimationFrame(() => {
    (firstFocusable ?? container).focus({ preventScroll: true });
  });
}

export function restoreFocus(element: Element | null) {
  if (element instanceof HTMLElement && document.contains(element)) {
    window.requestAnimationFrame(() => {
      element.focus({ preventScroll: true });
    });
  }
}

export function lockBodyScroll() {
  if (typeof document === 'undefined') {
    return () => undefined;
  }

  if (bodyLockCount === 0) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  bodyLockCount += 1;
  let released = false;

  return () => {
    if (released) return;
    released = true;
    bodyLockCount = Math.max(0, bodyLockCount - 1);

    if (bodyLockCount === 0) {
      document.body.style.overflow = previousBodyOverflow ?? '';
      previousBodyOverflow = null;
    }
  };
}

export function wrapFocus(event: KeyboardEvent, container: HTMLElement) {
  if (event.key !== 'Tab') return;

  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) {
    event.preventDefault();
    container.focus({ preventScroll: true });
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  const activeElement = document.activeElement;

  if (event.shiftKey && activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus({ preventScroll: true });
  } else if (!event.shiftKey && activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus({ preventScroll: true });
  }
}
