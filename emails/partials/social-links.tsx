import * as React from "react";

import { EMAIL_COLORS, EMAIL_SOCIAL_LINKS } from "@/lib/email";

export interface SocialLinksProps {
  readonly align?: "left" | "center" | "right";
  readonly iconSize?: number;
  readonly spacing?: number;
  readonly showLabels?: boolean;
}

interface SocialItem {
  readonly name: string;
  readonly href: string;
  readonly short: string;
}

const SOCIALS: readonly SocialItem[] = [
  {
    name: "Facebook",
    href: EMAIL_SOCIAL_LINKS.facebook,
    short: "f",
  },
  {
    name: "Instagram",
    href: EMAIL_SOCIAL_LINKS.instagram,
    short: "◎",
  },
  {
    name: "X",
    href: EMAIL_SOCIAL_LINKS.x,
    short: "𝕏",
  },
  {
    name: "YouTube",
    href: EMAIL_SOCIAL_LINKS.youtube,
    short: "▶",
  },
];

export function SocialLinks({
  align = "center",
  iconSize = 36,
  spacing = 10,
  showLabels = false,
}: SocialLinksProps): React.JSX.Element {
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
        <tr>
          <td
            align={align}
            style={{
              padding: "8px 0",
            }}
          >
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
                  {SOCIALS.map((social, index) => (
                    <td
                      key={social.name}
                      style={{
                        paddingRight: index === SOCIALS.length - 1 ? 0 : spacing,
                      }}
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        title={social.name}
                        style={{
                          display: "inline-block",
                          textDecoration: "none",
                        }}
                      >
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
                                align="center"
                                valign="middle"
                                style={{
                                  width: `${iconSize}px`,
                                  height: `${iconSize}px`,
                                  borderRadius: "999px",
                                  backgroundColor: EMAIL_COLORS.primary,
                                  color: EMAIL_COLORS.primaryForeground,
                                  fontSize: `${Math.round(iconSize * 0.45)}px`,
                                  fontWeight: 700,
                                  fontFamily:
                                    "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                                  lineHeight: `${iconSize}px`,
                                  textAlign: "center",
                                }}
                              >
                                {social.short}
                              </td>
                            </tr>

                            {showLabels && (
                              <tr>
                                <td
                                  align="center"
                                  style={{
                                    paddingTop: 6,
                                    color: EMAIL_COLORS.textMuted,
                                    fontSize: "11px",
                                    fontFamily:
                                      "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {social.name}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default SocialLinks;
