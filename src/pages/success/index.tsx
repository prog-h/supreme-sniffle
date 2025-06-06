import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../component/button";
import Card from "../../component/card";
import { routes } from "../../config/routes.ts";
import SuccessImage from "../../assets/icons/successImage.tsx";
import Typography from "../../component/typography";
import { ru } from "date-fns/locale";
import { format } from "date-fns";
import { useEffect, useRef } from "react";
import { toPng } from "html-to-image";

const filter = (node: HTMLElement) => {
  const exclusionClasses = ["remove-me", "secret-div"];
  return !exclusionClasses.some((classname) =>
    node.classList?.contains(classname),
  );
};

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const ref = useRef();

  const upload = async () => {
    const res = await toPng(ref.current, {
      backgroundColor: "#17470e",
      filter,
    });
    const a = document.createElement("a");
    a.href = res;
    a.download = `запись.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    upload();
  }, []);

  return (
    <Container>
      <Wrapper ref={ref}>
        <SuccessImage />
        <Typography
          color={"white"}
          fontWeight={600}
          fontSize={20}
          textAlign={"center"}
        >
          Запись на прием{" "}
          {format(location.state?.selectedDate, "dd LLLL", { locale: ru })} в{" "}
          {location.state?.selectedTime} успешно завершена!
        </Typography>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
          className={"remove-me"}
        >
          <Link target="_blank" href="https://disk.yandex.ru/i/-8ejf26phPCNjg">
            Анкета
          </Link>
          <Link target="_blank" href="https://disk.yandex.ru/i/V00d-ZUWUAHSwA">
            Информированное добровольное согласие
          </Link>
          <Link target="_blank" href="https://disk.yandex.ru/i/_iDS1YwPkd7duQ">
            Согласие
          </Link>
        </div>
        <div style={{ width: "100%" }} className={"remove-me"}>
          <Button title={"Выгрузить талон"} onClick={upload} />
        </div>
      </Wrapper>
      <ButtonWrapper>
        <Card borderRadius={"35px 35px 0 0"}>
          <Button
            title={"На главную"}
            onClick={() => navigate(routes.main.path)}
          />
        </Card>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background:rgb(15, 68, 27);
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
  padding: 0 70px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

const Link = styled.a`
  color: white;
`;

export default SuccessPage;
