import Header from "../../component/header";
import Card from "../../component/card";
import Button from "../../component/button";
import ContentLayout from "../../layout/contentLayout";
import Calendar from "../../component/calendar";
import { useNavigate } from "react-router-dom";
import { routes } from "../../config/routes.ts";
import { useState } from "react";
import { useGetDaysPeriod } from "../../hooks/useGetDaysPeriod.ts";
import { getStartEndOfMonth } from "../../utils/getStartEndOfMonth.ts";
import { getAvailableDates } from "../../utils/getAvailableDates.ts";
import { DayInterface } from "../../config/types.ts";
import { useGetDayDetails } from "../../hooks/useGetDayDetails.ts";
import styled from "styled-components";
import Typography from "../../component/typography";
import { getPluralLabel } from "../../utils/getPluralLabel.ts";
import { format } from "date-fns";
import LongArrow from "../../assets/icons/longArrow.tsx";

const AdminPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const { data } = useGetDaysPeriod(getStartEndOfMonth(currentDate));
  const { data: dataDetails } = useGetDayDetails({ date: currentDate });

  const availableDates = getAvailableDates({
    dates: data as DayInterface[],
  });

  const recordsCount =
    dataDetails?.slots?.filter((el) => el.available === false)?.length || 0;

  return (
    <>
      <Header title={"График записей"} />
      <ContentLayout>
        <Card>
          <Calendar
            setCurrentDate={setCurrentDate}
            availableDates={availableDates}
            selectedDate={currentDate}
            onSelect={setCurrentDate}
          />
        </Card>
        <Card>
          <RecordsWrapper>
            <RecordsInfo>
              <Typography color={"#010302"} fontSize={16} fontWeight={600}>
                {recordsCount}{" "}
                {getPluralLabel(recordsCount, ["запись", "записи", "записей"])}
              </Typography>
              <Typography color={"rgba(15, 59, 20, 0.5)"} fontSize={14}>
                {format(currentDate, "dd.MM.yyyy")} г.
              </Typography>
            </RecordsInfo>
            {recordsCount ? (
              <Circle
                onClick={() =>
                  navigate(routes.adminRecordsToday.path, {
                    state: { currentDate },
                  })
                }
              >
                <LongArrow color={"white"} rotate={180} />
              </Circle>
            ) : null}
          </RecordsWrapper>
        </Card>
      </ContentLayout>
      <Card borderRadius={"35px 35px 0 0"}>
        <Button
          title={"Редактировать"}
          onClick={() => navigate(routes.adminEdit.path)}
        />
      </Card>
    </>
  );
};

const RecordsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RecordsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: #1e4a16;
  border-radius: 50%;
  cursor: pointer;
`;

export default AdminPage;
