import { Resend } from "resend";

import emailConfig from "./config";

declare global {
  var __resend__: Resend | undefined;
}

const createResendClient = (): Resend => {
  return new Resend(emailConfig.resend.apiKey);
};

export const resend: Resend = globalThis.__resend__ ?? createResendClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__resend__ = resend;
}

export const emailClient = resend;

export const isResendConfigured = (): boolean => {
  return emailConfig.resend.apiKey.length > 0;
};

export const assertResendConfigured = (): void => {
  if (!isResendConfigured()) {
    throw new Error("Resend has not been configured.");
  }
};

export default resend;
