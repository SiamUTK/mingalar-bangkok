import * as React from "react";

import { EMAIL_COLORS } from "@/lib/email";

export interface HeadingProps {
  readonly children: React.ReactNode;
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
  readonly color?: string;
  readonly align?: React.CSSProperties["textAlign"];
  readonly marginTop?: number;
  readonly marginBottom?: number;
}

const HEADING_STYLES: Record<
  NonNullable<HeadingProps["level"]>,
  {
    fontSize: number;
    lineHeight: number;
    fontWeight: React.CSSProperties["fontWeight"];
  }
> = {
  1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 800,
  },
  2: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: 700,
  },
  3: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 700,
  },
  4: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 700,
  },
  5: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: 600,
  },
  6: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 600,
  },
};

export function Heading({
  children,
  level = 1,
  color = EMAIL_COLORS.text,
  align = "left",
  marginTop = 0,
  marginBottom = 20,
}: HeadingProps): React.JSX.Element {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  const style = HEADING_STYLES[level];

  return React.createElement(
    Tag,
    {
      style: {
        margin: `${marginTop}px 0 ${marginBottom}px`,
        padding: 0,
        color,
        fontSize: `${style.fontSize}px`,
        lineHeight: `${style.lineHeight}px`,
        fontWeight: style.fontWeight,
        textAlign: align,
        letterSpacing: "-0.02em",
        fontFamily:
          "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        msoLineHeightRule: "exactly",
        WebkitTextSizeAdjust: "100%",
      } as React.CSSProperties,
    },
    children
  );
}

export default Heading;
