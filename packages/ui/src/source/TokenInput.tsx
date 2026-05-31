/**
 * TokenInput — credential entry primitive
 * ------------------------------------------------------------------
 * Used in connector wizards and source/provider settings to capture a
 * secret (PAT, API key, webhook secret, BYO-LLM provider key, etc.).
 *
 * Security invariants:
 *   - The full token is NEVER displayed after entry. Once committed,
 *     only a short masked preview is shown (the last 4 chars).
 *   - When the input contains a draft token (uncommitted), the user can
 *     temporarily reveal it for verification, but reveal closes on blur.
 *   - Stored values do not support copy-to-clipboard. Drafts may be
 *     copied only via the OS once revealed.
 *   - Paste is supported; pasted text replaces any previous draft.
 *   - When `committed` is true, the underlying input is read-only and
 *     the only available actions are Clear or Replace.
 *
 * Accessibility:
 *   - Uses FieldShell for label/helper/error.
 *   - Toggle visibility button has aria-pressed and changes label.
 *   - Validation status is announced via aria-live polite region.
 */
import * as React from "react";
import { FieldShell } from "../components/FieldShell";
import "../styles/metraly-source.css";

export type TokenKind =
  | "github-pat"
  | "github-pat-fine-grained"
  | "api-key"
  | "webhook-secret"
  | "provider-token";

export type TokenValidationStatus =
  | "idle"
  | "validating"
  | "valid"
  | "invalid"
  | "rate_limited";

export interface TokenInputProps {
  /** Stable input id. Auto-generated if not supplied. */
  id?: string;
  label: string;
  helper?: string;
  errorText?: string;

  /** When true, the input is in "stored" mode — only mask + actions. */
  committed?: boolean;
  /** Masked preview of the stored token (e.g. "ghp_••••abcd"). */
  maskedPreview?: string;

  /** Controlled draft value (uncommitted). */
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;

  /** Tells the user what kind of secret they're entering. */
  kind?: TokenKind;
  placeholder?: string;

  /** Validation status (driven by parent). */
  validation?: TokenValidationStatus;
  /** Optional name attribute for forms. */
  name?: string;

  /** Action callbacks. */
  onClear?: () => void;
  onReplace?: () => void;
  onValidate?: (v: string) => void;

  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const KIND_HINT: Record<TokenKind, string> = {
  "github-pat": "Classic personal access token, prefixed ghp_…",
  "github-pat-fine-grained": "Fine-grained PAT, prefixed github_pat_…",
  "api-key": "API key issued by the provider",
  "webhook-secret": "Shared secret used to verify webhook signatures",
  "provider-token": "Long-lived token from your AI provider",
};

export const TokenInput: React.FC<TokenInputProps> = ({
  id,
  label,
  helper,
  errorText,
  committed = false,
  maskedPreview,
  value,
  defaultValue,
  onChange,
  kind,
  placeholder = "Paste secret",
  validation = "idle",
  name,
  onClear,
  onReplace,
  onValidate,
  disabled,
  required,
  className,
}) => {
  const reactId = React.useId();
  const inputId = id ?? reactId;
  const liveId = `${inputId}-live`;

  const [revealed, setRevealed] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const current = isControlled ? (value as string) : internal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  // Reveal auto-closes on blur to minimize exposure.
  const handleBlur = () => setRevealed(false);

  const resolvedHint = errorText ? undefined : helper ?? (kind ? KIND_HINT[kind] : undefined);

  const validationMsg = (() => {
    switch (validation) {
      case "validating": return "Checking…";
      case "valid": return "Looks valid";
      case "invalid": return "Did not validate";
      case "rate_limited": return "Rate limited";
      default: return "";
    }
  })();

  return (
    <FieldShell
      inputId={inputId}
      label={label}
      description={resolvedHint}
      error={errorText}
      className={["metraly-token", className ?? ""].filter(Boolean).join(" ")}
    >
      {({ descriptionId, helperText, hasError }) => (
        <>
          {label ? <label className="metraly-control-label" htmlFor={inputId}>{label}</label> : null}
          {helperText ? (
            <span
              id={descriptionId}
              className={hasError ? "metraly-control-description is-error" : "metraly-control-description"}
              role={hasError ? "alert" : undefined}
            >
              {helperText}
            </span>
          ) : null}
          {committed ? (
            <div className="metraly-token__stored" role="group" aria-label={`${label} — stored`}>
              <span className="metraly-token__preview" title="Stored token preview">
                {maskedPreview ?? "••••••••"}
              </span>
              <span className={`metraly-token__validation metraly-token__validation--${validation}`}>
                {validationMsg}
              </span>
              <span className="metraly-token__stored-actions">
                <button
                  type="button"
                  className="metraly-token__btn metraly-token__btn--ghost"
                  onClick={onReplace}
                  disabled={disabled}
                >
                  Replace
                </button>
                <button
                  type="button"
                  className="metraly-token__btn metraly-token__btn--ghost"
                  onClick={onClear}
                  disabled={disabled}
                >
                  Clear
                </button>
              </span>
            </div>
          ) : (
            <div className="metraly-token__row">
              <input
                id={inputId}
                name={name}
                type={revealed ? "text" : "password"}
                className="metraly-token__input"
                placeholder={placeholder}
                autoComplete="off"
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
                value={current}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
                required={required}
                aria-invalid={errorText ? true : undefined}
                aria-describedby={validationMsg ? liveId : descriptionId}
                data-1p-ignore="true"
                data-lpignore="true"
              />
              <button
                type="button"
                className="metraly-token__btn metraly-token__btn--ghost"
                onClick={() => setRevealed((r) => !r)}
                aria-pressed={revealed}
                aria-label={revealed ? "Hide token" : "Reveal token"}
                disabled={disabled || !current}
                title={revealed ? "Hide token" : "Reveal token"}
              >
                {revealed ? "Hide" : "Show"}
              </button>
              {onValidate ? (
                <button
                  type="button"
                  className="metraly-token__btn metraly-token__btn--primary"
                  onClick={() => onValidate(current)}
                  disabled={disabled || !current || validation === "validating"}
                >
                  {validation === "validating" ? "Checking…" : "Validate"}
                </button>
              ) : null}
            </div>
          )}

          <span id={liveId} aria-live="polite" className="metraly-token__sr">
            {validationMsg}
          </span>
        </>
      )}
    </FieldShell>
  );
};

TokenInput.displayName = "TokenInput";

export default TokenInput;
