import { render } from "@react-email/render";
import type { ReactElement } from "react";

import type { EmailRenderResult } from "../types";

export interface RenderEmailOptions {
  readonly pretty?: boolean;
  readonly plainText?: boolean;
  readonly subject: string;
}

const normalize = (value: string): string => value.replace(/\r\n/g, "\n").trim();

export async function renderEmail(
  template: ReactElement,
  options: RenderEmailOptions
): Promise<EmailRenderResult> {
  const html = await render(template, {
    pretty: options.pretty ?? true,
  });

  const text = options.plainText
    ? await render(template, {
        plainText: true,
      })
    : undefined;

  return Object.freeze({
    subject: normalize(options.subject),
    html: normalize(html),
    text: text ? normalize(text) : undefined,
  });
}

export default renderEmail;
