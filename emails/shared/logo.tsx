import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS } from "@/lib/email";

export interface LogoProps {
  readonly width?: number;
  readonly height?: number;
  readonly showText?: boolean;
  readonly href?: string;
}

const LOGO_SIZE = 48;

export function Logo({
  width = LOGO_SIZE,
  height = LOGO_SIZE,
  showText = true,
  href = EMAIL_BRAND.website,
}: LogoProps): React.JSX.Element {
  const logo = (
    <table
      role="presentation"
      cellPadding={0}
      cellSpacing={0}
      border={0}
      style={{
        borderCollapse: "collapse",
      }}
    >
      <tbody>
        <tr>
          <td
            style={{
              verticalAlign: "middle",
            }}
          >
            <div
              style={{
                width,
                height,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${EMAIL_COLORS.primary} 0%, ${EMAIL_COLORS.secondary} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: width * 0.42,
                fontWeight: 800,
                color: "#FFFFFF",
                fontFamily:
                  "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                userSelect: "none",
              }}
            >
              M
            </div>
          </td>

          {showText && (
            <td
              style={{
                paddingLeft: 14,
                verticalAlign: "middle",
              }}
            >
              <div
                style={{
                  fontFamily:
                    "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: EMAIL_COLORS.text,
                  lineHeight: "26px",
                }}
              >
                {EMAIL_BRAND.name}
              </div>

              <div
                style={{
                  fontFamily:
                    "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  fontSize: 12,
                  color: EMAIL_COLORS.textMuted,
                  lineHeight: "18px",
                }}
              >
                {EMAIL_BRAND.tagline}
              </div>
            </td>
          )}
        </tr>
      </tbody>
    </table>
  );

  if (!href) {
    return logo;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: "none",
        display: "inline-block",
      }}
    >
      {logo}
    </a>
  );
}

export default Logo;
