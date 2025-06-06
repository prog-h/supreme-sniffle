import styled from "styled-components";
import LongArrow from "../../assets/icons/longArrow.tsx";
import Typography from "../typography";

interface Props {
  title: string;
  onBack?: VoidFunction;
}

const Header = ({ title, onBack }: Props) => {
  return (
    <Wrapper>
      {!!onBack && (
        <ArrowWrapper onClick={onBack}>
          <LongArrow />
        </ArrowWrapper>
      )}
      <Typography fontSize={17} color={"white"}>
        {title}
      </Typography>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 44px;
  background: #1e4a16;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
`;

const ArrowWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: white;
  position: absolute;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default Header;
