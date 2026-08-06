import * as React from "react";

import { EMAIL_BRAND, EMAIL_COLORS, EMAIL_SOCIAL_LINKS, EMAIL_SUPPORT } from "@/lib/email";

export interface FooterProps {
  readonly showSocialLinks?: boolean;
  readonly showSupportLinks?: boolean;
  readonly unsubscribeUrl?: string;
  readonly currentYear?: number;
}

const SOCIALS = [
  {
    label: "Facebook",
    href: EMAIL_SOCIAL_LINKS.facebook,
  },
  {
    label: "Instagram",
    href: EMAIL_SOCIAL_LINKS.instagram,
  },
  {
    label: "X",
    href: EMAIL_SOCIAL_LINKS.x,
  },
  {
    label: "YouTube",
    href: EMAIL_SOCIAL_LINKS.youtube,
  },
] as const;

const SUPPORT_LINKS = [
  {
    label: "Help Center",
    href: EMAIL_SUPPORT.helpCenter,
  },
  {
    label: "Contact",
    href: EMAIL_SUPPORT.contact,
  },
  {
    label: "Privacy Policy",
    href: EMAIL_SUPPORT.privacy,
  },
  {
    label: "Terms of Service",
    href: EMAIL_SUPPORT.terms,
  },
] as const;

const linkStyle: React.CSSProperties = {
  color: EMAIL_COLORS.primary,
  textDecoration: "none",
  fontWeight: 500,
};

export function Footer({
  showSocialLinks = true,
  showSupportLinks = true,
  unsubscribeUrl,
  currentYear = new Date().getFullYear(),
}: FooterProps): React.JSX.Element {
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
            style={{
              paddingTop: 32,
              borderTop: `1px solid ${EMAIL_COLORS.border}`,
            }}
          >
            {showSocialLinks && (
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
                      align="center"
                      style={{
                        paddingBottom: 20,
                        fontFamily:
                          "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                        fontSize: "14px",
                        lineHeight: "22px",
                      }}
                    >
                      {SOCIALS.map((social, index) => (
                        <React.Fragment key={social.label}>
                          {index > 0 && (
                            <span
                              style={{
                                color: EMAIL_COLORS.textMuted,
                                margin: "0 8px",
                              }}
                            >
                              •
                            </span>
                          )}

                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={linkStyle}
                          >
                            {social.label}
                          </a>
                        </React.Fragment>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}

            {showSupportLinks && (
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
                      align="center"
                      style={{
                        paddingBottom: 20,
                        fontFamily:
                          "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                        fontSize: "13px",
                        lineHeight: "20px",
                      }}
                    >
                      {SUPPORT_LINKS.map((item, index) => (
                        <React.Fragment key={item.label}>
                          {index > 0 && (
                            <span
                              style={{
                                color: EMAIL_COLORS.textMuted,
                                margin: "0 8px",
                              }}
                            >
                              |
                            </span>
                          )}

                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={linkStyle}
                          >
                            {item.label}
                          </a>
                        </React.Fragment>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
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
              }}
            >
              <tbody>
                <tr>
                  <td
                    align="center"
                    style={{
                      color: EMAIL_COLORS.footer,
                      fontSize: "12px",
                      lineHeight: "20px",
                      fontFamily:
                        "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    }}
                  >
                    © {currentYear} {EMAIL_BRAND.name}. All rights reserved.
                  </td>
                </tr>

                <tr>
                  <td
                    align="center"
                    style={{
                      paddingTop: 8,
                      color: EMAIL_COLORS.footer,
                      fontSize: "12px",
                      lineHeight: "20px",
                      fontFamily:
                        "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    }}
                  >
                    {EMAIL_BRAND.tagline}
                  </td>
                </tr>

                {unsubscribeUrl && (
                  <tr>
                    <td
                      align="center"
                      style={{
                        paddingTop: 16,
                        fontFamily:
                          "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                        fontSize: "12px",
                        lineHeight: "20px",
                      }}
                    >
                      <a
                        href={unsubscribeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={linkStyle}
                      >
                        Unsubscribe
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Footer;
