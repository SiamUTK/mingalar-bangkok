import * as React from "react";

import { EMAIL_COLORS } from "@/lib/email";

export interface ButtonProps {
  readonly href: string;
  readonly children: React.ReactNode;
  readonly variant?: "primary" | "secondary" | "outline";
  readonly width?: number | string;
  readonly align?: "left" | "center" | "right";
  readonly style?: React.CSSProperties;
}

export function Button({
  href,
  children,
  variant = "primary",
  width,
  align = "center",
  style,
}: ButtonProps): React.JSX.Element {
  const styles = {
    primary: {
      backgroundColor: EMAIL_COLORS.primary,
      color: EMAIL_COLORS.primaryForeground,
      border: `1px solid ${EMAIL_COLORS.primary}`,
    },
    secondary: {
      backgroundColor: EMAIL_COLORS.secondary,
      color: EMAIL_COLORS.secondaryForeground,
      border: `1px solid ${EMAIL_COLORS.secondary}`,
    },
    outline: {
      backgroundColor: "#FFFFFF",
      color: EMAIL_COLORS.primary,
      border: `1px solid ${EMAIL_COLORS.primary}`,
    },
  } satisfies Record<
    NonNullable<ButtonProps["variant"]>,
    {
      backgroundColor: string;
      color: string;
      border: string;
    }
  >;

  const variantStyle = styles[variant];

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
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={
                {
                  display: "inline-block",
                  width: typeof width === "number" ? `${width}px` : width,
                  boxSizing: "border-box",
                  padding: "14px 28px",
                  borderRadius: "10px",
                  backgroundColor: variantStyle.backgroundColor,
                  color: variantStyle.color,
                  border: variantStyle.border,
                  textDecoration: "none",
                  textAlign: "center",
                  fontFamily:
                    "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "20px",
                  letterSpacing: "-0.01em",
                  WebkitTextSizeAdjust: "100%",
                  msoLineHeightRule: "exactly",
                  ...style,
                } as React.CSSProperties
              }
            >
              {children}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Button;
