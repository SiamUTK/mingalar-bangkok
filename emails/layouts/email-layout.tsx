import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email";
import { Footer, Header } from "../partials";
import { Container } from "../shared";

export interface EmailLayoutProps {
  readonly children: React.ReactNode;
  readonly title?: string;
  readonly subtitle?: string;
  readonly preview?: string;
  readonly showHeader?: boolean;
  readonly showFooter?: boolean;
  readonly showLogo?: boolean;
  readonly showDivider?: boolean;
  readonly unsubscribeUrl?: string;
  readonly backgroundColor?: string;
}

export function EmailLayout({
  children,
  title,
  subtitle,
  preview,
  showHeader = true,
  showFooter = true,
  showLogo = true,
  showDivider = true,
  unsubscribeUrl,
  backgroundColor = EMAIL_COLORS.background,
}: EmailLayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ?? EMAIL_BRAND.name}</title>

        {preview && (
          <>
            <meta name="description" content={preview} />
            <meta name="preview" content={preview} />
          </>
        )}
      </head>

      <body
        style={{
          margin: 0,
          padding: 0,
          width: "100%",
          backgroundColor,
          WebkitTextSizeAdjust: "100%",
          msTextSizeAdjust: "100%",
          fontFamily:
            "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {preview && (
          <div
            style={
              {
                display: "none",
                overflow: "hidden",
                opacity: 0,
                color: "transparent",
                height: 0,
                width: 0,
                maxHeight: 0,
                maxWidth: 0,
                msoHide: "all",
                visibility: "hidden",
              } as React.CSSProperties
            }
          >
            {preview}
          </div>
        )}

        <table
          role="presentation"
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          border={0}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor,
          }}
        >
          <tbody>
            <tr>
              <td align="center">
                <Container>
                  {showHeader && (
                    <Header
                      title={title}
                      subtitle={subtitle}
                      showLogo={showLogo}
                      showDivider={showDivider}
                    />
                  )}

                  {children}

                  {showFooter && <Footer unsubscribeUrl={unsubscribeUrl} />}
                </Container>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

export default EmailLayout;
