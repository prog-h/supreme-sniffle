import styled from "styled-components";
import CheckboxCheck from "../../assets/icons/checkboxCheck.tsx";
import Typography from "../typography";

interface Props {
  value: boolean;
  onChange?: (value: boolean) => void;
  label?: string;
}

const Checkbox = ({ value, label, onChange }: Props) => {
  return (
    <Wrapper onClick={() => onChange && onChange(!value)}>
      <Circle selected={value}>{value && <CheckboxCheck />}</Circle>
      {label && (
        <Typography color={"#1e4a16"} fontSize={16}>
          {label}
        </Typography>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
`;

const Circle = styled.div<{ selected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #1e4a16;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ selected }) => {
    if (selected) {
      return {
        background: "#1e4a16",
      };
    }
  }}
`;

export default Checkbox;
