import * as React from "react";

import { EMAIL_COLORS, EMAIL_LAYOUT } from "@/lib/email";

export interface ContainerProps {
  readonly children: React.ReactNode;
  readonly width?: number;
  readonly backgroundColor?: string;
  readonly borderColor?: string;
  readonly borderRadius?: number;
  readonly padding?: number;
}

export function Container({
  children,
  width = EMAIL_LAYOUT.width,
  backgroundColor = EMAIL_COLORS.surface,
  borderColor = EMAIL_COLORS.border,
  borderRadius = EMAIL_LAYOUT.borderRadius,
  padding = EMAIL_LAYOUT.contentPadding,
}: ContainerProps): React.JSX.Element {
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
          <td align="center" style={{ padding: "24px 16px" }}>
            <table
              role="presentation"
              width={width}
              cellPadding={0}
              cellSpacing={0}
              border={0}
              style={{
                width: "100%",
                maxWidth: `${width}px`,
                borderCollapse: "separate",
                borderSpacing: 0,
                backgroundColor,
                border: `1px solid ${borderColor}`,
                borderRadius,
                overflow: "hidden",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      padding,
                      fontFamily:
                        "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                      color: EMAIL_COLORS.text,
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                  >
                    {children}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Container;
