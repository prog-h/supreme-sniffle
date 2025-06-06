import styled from "styled-components";
import Typography from "../typography";

interface Props {
  title: string;
  onClick: VoidFunction;
  disabled?: boolean;
}

const Button = ({ title, onClick, disabled = false }: Props) => {
  return (
    <Wrapper onClick={onClick} disabled={disabled}>
      <Typography fontSize={15} color={"white"}>
        {title}
      </Typography>
    </Wrapper>
  );
};

const Wrapper = styled.div<Pick<Props, "disabled">>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 56px;
  border-radius: 28px;
  background: #205915;
  cursor: pointer;
  ${({ disabled }) => {
    if (disabled) {
      return { opacity: 0.75, pointerEvents: "none" };
    }
  }}
`;

export default Button;
