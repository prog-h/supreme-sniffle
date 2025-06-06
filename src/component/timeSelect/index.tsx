import styled from "styled-components";

interface Props {
  value?: string;
  list: { value: string; label: string }[];
  onChange: (value: string) => void;
}

const TimeSelect = ({ list, value, onChange }: Props) => {
  return (
    <Wrapper>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {value === undefined && (
          <option selected value={undefined} hidden={true} />
        )}
        {list.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: "";

    height: 40px;
    width: 133px;
    border: none;
    border-radius: 20px;

    text-align: center;
    font-size: 16px;
    color:rgb(17, 71, 24);
    text-align-last: center;
  }

  select {
    text-align: -weblit-center;
  }
`;

export default TimeSelect;
