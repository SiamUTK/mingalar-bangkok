import * as React from "react";

import { EMAIL_COLORS } from "@/lib/email";

export interface DividerProps {
  readonly color?: string;
  readonly thickness?: number;
  readonly spacing?: number;
  readonly width?: string | number;
  readonly style?: React.CSSProperties;
}

export function Divider({
  color = EMAIL_COLORS.border,
  thickness = 1,
  spacing = 24,
  width = "100%",
  style,
}: DividerProps): React.JSX.Element {
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
              paddingTop: spacing,
              paddingBottom: spacing,
            }}
          >
            <table
              role="presentation"
              width={typeof width === "number" ? `${width}px` : width}
              align="center"
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
                      height: `${thickness}px`,
                      backgroundColor: color,
                      fontSize: 0,
                      lineHeight: 0,
                      ...style,
                    }}
                  >
                    &nbsp;
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

export default Divider;
