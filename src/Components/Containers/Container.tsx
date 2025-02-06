interface ContainerProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  flex?: boolean;
  fullHeight?: boolean;
  flexRow?: boolean;
  flexColumn?: boolean;
  noPadding?: boolean;
  style?: React.CSSProperties;
}

export default function Container({
  children,
  fullWidth,
  flex,
  fullHeight,
  flexColumn,
  noPadding,
  style,
}: ContainerProps) {
  const defaultStyle: React.CSSProperties = {
    width: fullWidth ? "100%" : "auto",
    height: fullHeight ? "100%" : "auto",
    display: flex ? "flex" : "block",
    flexDirection: flexColumn ? "column" : "row",
    gap: flex ? "1rem" : "unset",
    padding: noPadding ? "0" : "1rem",
    ...style,
  };
  return <div style={defaultStyle}>{children}</div>;
}
