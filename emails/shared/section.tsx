import * as React from "react";

import { EMAIL_LAYOUT } from "@/lib/email";

export interface SectionProps {
  readonly children: React.ReactNode;
  readonly padding?: number;
  readonly paddingTop?: number;
  readonly paddingRight?: number;
  readonly paddingBottom?: number;
  readonly paddingLeft?: number;
  readonly backgroundColor?: string;
  readonly borderRadius?: number;
  readonly border?: string;
  readonly align?: "left" | "center" | "right" | "justify";
}

export function Section({
  children,
  padding = EMAIL_LAYOUT.sectionSpacing,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  backgroundColor,
  borderRadius,
  border,
  align = "left",
}: SectionProps): React.JSX.Element {
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
              paddingTop: paddingTop ?? padding,
              paddingRight: paddingRight ?? padding,
              paddingBottom: paddingBottom ?? padding,
              paddingLeft: paddingLeft ?? padding,
              backgroundColor,
              borderRadius,
              border,
              fontFamily:
                "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
          >
            {children}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Section;
