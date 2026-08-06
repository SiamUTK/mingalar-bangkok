import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email";
import { Logo } from "../shared";

export interface HeaderProps {
  readonly title?: string;
  readonly subtitle?: string;
  readonly showLogo?: boolean;
  readonly showDivider?: boolean;
  readonly logoHref?: string;
}

export function Header({
  title,
  subtitle,
  showLogo = true,
  showDivider = true,
  logoHref = EMAIL_BRAND.website,
}: HeaderProps): React.JSX.Element {
  return (
    <table
      role="presentation"
      width="100%"
      cellPadding={0}
      cellSpacing={0}
      border={0}
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <tbody>
        {showLogo && (
          <tr>
            <td
              align="center"
              style={{
                paddingBottom: title || subtitle ? 24 : 0,
              }}
            >
              <Logo href={logoHref} />
            </td>
          </tr>
        )}

        {(title || subtitle) && (
          <tr>
            <td align="center">
              {title && (
                <h1
                  style={
                    {
                      margin: 0,
                      padding: 0,
                      color: EMAIL_COLORS.text,
                      fontSize: "30px",
                      fontWeight: 800,
                      lineHeight: "38px",
                      letterSpacing: "-0.03em",
                      fontFamily:
                        "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                      WebkitTextSizeAdjust: "100%",
                      msoLineHeightRule: "exactly",
                    } as React.CSSProperties
                  }
                >
                  {title}
                </h1>
              )}

              {subtitle && (
                <p
                  style={
                    {
                      margin: title ? "12px 0 0" : 0,
                      padding: 0,
                      color: EMAIL_COLORS.textMuted,
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 400,
                      fontFamily:
                        "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                      WebkitTextSizeAdjust: "100%",
                      msoLineHeightRule: "exactly",
                    } as React.CSSProperties
                  }
                >
                  {subtitle}
                </p>
              )}
            </td>
          </tr>
        )}

        {showDivider && (
          <tr>
            <td
              style={{
                paddingTop: title || subtitle ? 28 : 24,
                paddingBottom: 8,
              }}
            >
              <table
                role="presentation"
                width="100%"
                cellPadding={0}
                cellSpacing={0}
                border={0}
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        height: "1px",
                        backgroundColor: EMAIL_COLORS.border,
                        fontSize: 0,
                        lineHeight: 0,
                      }}
                    >
                      &nbsp;
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Header;
