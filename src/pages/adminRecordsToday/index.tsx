import { useGetDayDetails } from "../../hooks/useGetDayDetails.ts";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../component/header";
import { addMinutes, format } from "date-fns";
import { routes } from "../../config/routes.ts";
import Card from "../../component/card";
import ContentLayout from "../../layout/contentLayout";
import Typography from "../../component/typography";
import styled from "styled-components";
import { handleDateSetTime } from "../../utils/generateTimeSlots.ts";

const AdminRecordsToday = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useGetDayDetails({ date: location?.state?.currentDate });

  if (!data || !location?.state?.currentDate) return null;
  const slots = data?.slots;
  const isWorkingDay = slots && slots?.length > 0;
  const lastSlot = slots?.[slots?.length - 1];
  const lastSlotTime = format(
    addMinutes(handleDateSetTime(lastSlot?.time || "00:00"), 15),
    "HH:mm",
  );

  const busySlots = slots.filter((slot: any) => slot.available === false);

  return (
    <>
      <Header
        title={`${format(location?.state?.currentDate, "dd.MM.yyyy")} г.`}
        onBack={() => navigate(routes.admin.path)}
      />
      <ContentLayout>
        <Card withBorder padding={"8px"} borderRadius={"18px"}>
          <Typography color={"#010302"} fontSize={16} textAlign={"center"}>
            Расписание
          </Typography>
        </Card>
        <Card>
          {!isWorkingDay ? (
            <Typography fontWeight={600} fontSize={16} color={"#010302"}>
              Нерабочий день
            </Typography>
          ) : (
            <ScheduleWrapper>
              <Typography fontWeight={600} fontSize={16} color={"#010302"}>
                Время работы:
              </Typography>
              <Typography>
                {slots[0].time} — {lastSlotTime}
              </Typography>
            </ScheduleWrapper>
          )}
        </Card>
        {busySlots.length ? (
          <>
            <Card withBorder padding={"8px"} borderRadius={"18px"}>
              <Typography color={"#010302"} fontSize={16} textAlign={"center"}>
                Записи
              </Typography>
            </Card>
            {busySlots?.map((slot: any, idx: number) => {
              const endTime = format(
                addMinutes(handleDateSetTime(slot.time), 15),
                "HH:mm",
              );
              return (
                <Card key={`slot-${slot.time}`}>
                  <SlotRow>
                    <Typography
                      color={"#010302"}
                      fontSize={16}
                      fontWeight={600}
                    >
                      {idx + 1} пользователь
                    </Typography>
                    <Typography color={"rgba(10, 40, 14, 0.5)"} fontSize={14}>
                      {slot.time} — {endTime}
                    </Typography>
                  </SlotRow>
                </Card>
              );
            })}
          </>
        ) : null}
      </ContentLayout>
    </>
  );
};

const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SlotRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default AdminRecordsToday;
