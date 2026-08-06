import * as React from "react";

import { EMAIL_COLORS } from "@/lib/email";

export interface TextProps {
  readonly children: React.ReactNode;
  readonly color?: string;
  readonly fontSize?: number;
  readonly fontWeight?: React.CSSProperties["fontWeight"];
  readonly lineHeight?: number;
  readonly align?: React.CSSProperties["textAlign"];
  readonly marginTop?: number;
  readonly marginBottom?: number;
}

export function Text({
  children,
  color = EMAIL_COLORS.text,
  fontSize = 16,
  fontWeight = 400,
  lineHeight = 24,
  align = "left",
  marginTop = 0,
  marginBottom = 16,
}: TextProps): React.JSX.Element {
  return (
    <p
      style={{
        margin: `${marginTop}px 0 ${marginBottom}px`,
        padding: 0,
        color,
        fontSize: `${fontSize}px`,
        fontWeight,
        lineHeight: `${lineHeight}px`,
        textAlign: align,
        fontFamily:
          "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        wordBreak: "break-word",
        WebkitTextSizeAdjust: "100%",
        msoLineHeightRule: "exactly",
      }}
    >
      {children}
    </p>
  );
}

export function MutedText(props: Omit<TextProps, "color">): React.JSX.Element {
  return <Text {...props} color={EMAIL_COLORS.textMuted} />;
}

export function SmallText(props: Omit<TextProps, "fontSize" | "lineHeight">): React.JSX.Element {
  return <Text {...props} fontSize={14} lineHeight={22} />;
}

export default Text;

