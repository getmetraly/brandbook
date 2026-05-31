import { beforeAll } from "vitest";
import { setProjectAnnotations } from "@storybook/react-vite";
import preview from "./preview";

beforeAll(() => {
  setProjectAnnotations([preview]);
});
