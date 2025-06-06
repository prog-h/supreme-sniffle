import styled from "styled-components";
import { PropsWithChildren } from "react";

interface Props {
  borderRadius?: string;
  withBorder?: boolean;
  padding?: string;
}

const Card = ({
  borderRadius = "15px",
  children,
  withBorder = false,
  padding = "15px",
}: PropsWithChildren<Props>) => {
  return (
    <Wrapper
      borderRadius={borderRadius}
      withBorder={withBorder}
      padding={padding}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<
  Pick<Props, "borderRadius" | "withBorder" | "padding">
>`
  border-radius: ${({ borderRadius }) => borderRadius};
  padding: ${({ padding }) => padding};
  box-shadow: 0 -1px 10px 0 #1e4a16;
  background: white;
  ${({ withBorder }) => {
    if (withBorder) {
      return { border: "1px solid #0C2A6A" };
    }
  }}
`;

export default Card;
