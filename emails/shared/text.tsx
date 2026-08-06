import * as React from "react";

export interface TextProps {
  readonly children: React.ReactNode;
  readonly align?: "left" | "center" | "right";
  readonly color?: string;
  readonly fontSize?: number;
  readonly fontWeight?: React.CSSProperties["fontWeight"];
  readonly lineHeight?: string | number;
  readonly marginTop?: number;
  readonly marginBottom?: number;
  readonly style?: React.CSSProperties;
}

export function Text({
  children,
  align = "left",
  color = "#374151",
  fontSize = 16,
  fontWeight = 400,
  lineHeight = "26px",
  marginTop = 0,
  marginBottom = 16,
  style,
}: TextProps): React.JSX.Element {
  return (
    <p
      style={{
        margin: 0,
        marginTop,
        marginBottom,
        color,
        fontSize,
        fontWeight,
        lineHeight,
        textAlign: align,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        msoLineHeightRule: "exactly",
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export interface MutedTextProps extends Omit<TextProps, "color"> {}

export function MutedText(props: MutedTextProps): React.JSX.Element {
  return <Text {...props} color="#6B7280" />;
}

export interface SmallTextProps extends Omit<TextProps, "fontSize" | "lineHeight"> {}

export function SmallText(props: SmallTextProps): React.JSX.Element {
  return <Text {...props} fontSize={13} lineHeight="20px" />;
}

export default Text;
