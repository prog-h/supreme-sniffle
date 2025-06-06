import styled from "styled-components";
import { PropsWithChildren } from "react";

interface Props {
  color?: string;
  fontSize?: number;
  opacity?: number;
  textAlign?: "center" | "left" | "right";
  fontWeight?: number;
}

const Typography = ({
  children,
  color = "#1e4a16",
  fontSize = 16,
  opacity = 1,
  textAlign,
  fontWeight = 500,
}: PropsWithChildren & Props) => {
  return (
    <Wrapper
      color={color}
      fontSize={fontSize}
      opacity={opacity}
      textAlign={textAlign}
      fontWeight={fontWeight}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<
  Pick<Props, "color" | "fontSize" | "opacity" | "textAlign" | "fontWeight">
>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize}px;
  opacity: ${({ opacity }) => opacity};
  text-align: ${({ textAlign }) => textAlign};
  font-weight: ${({ fontWeight }) => fontWeight};
`;

export default Typography;
