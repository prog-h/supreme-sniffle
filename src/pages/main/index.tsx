import Header from "../../component/header";
import ContentLayout from "../../layout/contentLayout";
import Typography from "../../component/typography";
import Card from "../../component/card";
import Calendar from "../../component/calendar";
import { DayInterface } from "../../config/types.ts";
import { getServerFormatDate } from "../../utils/getServerFormatDate.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetDaysPeriod } from "../../hooks/useGetDaysPeriod.ts";
import { getStartEndOfMonth } from "../../utils/getStartEndOfMonth.ts";
import { getAvailableDates } from "../../utils/getAvailableDates.ts";
import Button from "../../component/button";
import styled from "styled-components";
import { useDayCreateUpdate } from "../../hooks/useDayCreateUpdate.ts";
import { routes } from "../../config/routes.ts";

const MainPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [currentDate, setCurrentDate] = useState<Date>();
  const { data } = useGetDaysPeriod(getStartEndOfMonth(currentDate));
  const availableDates = getAvailableDates({
    dates: data as DayInterface[],
    checkAvailableSlots: true,
  });
  const [selectedMeta, setSelectedMeta] = useState<
    (DayInterface & { id: number }) | undefined
  >();

  const { dayCreateUpdateMutation } = useDayCreateUpdate();

  const onSave = async () => {
    try {
      await dayCreateUpdateMutation.mutateAsync({
        id: selectedMeta?.id,
        data: {
          date: (selectedMeta?.id
            ? selectedMeta.date
            : getServerFormatDate(selectedDate)) as string,
          slots: (selectedMeta?.slots || []).map((slot) => {
            if (slot.time === selectedTime) {
              return {
                ...slot,
                available: false,
              };
            }
            return slot;
          }),
        },
      });
      navigate(routes.success.path, { state: { selectedTime, selectedDate } });
    } catch (e) {
      //
    }
  };

  const availableSlots = selectedMeta?.slots?.filter((el) => el.available);

  return (
    <>
      <Header title={"Запись на прием"} />
      <ContentLayout>
        <Card>
          <Typography color={"#010302"} fontSize={16} textAlign={"center"}>
            Выберите подходящую дату
          </Typography>
        </Card>
        <Card>
          <Calendar
            selectedDate={selectedDate}
            onSelect={(e) => {
              const meta = data?.find(
                (el: DayInterface) => el.date === getServerFormatDate(e),
              );
              if (meta) {
                setSelectedDate(e);
                setSelectedMeta(meta);
                setSelectedTime(undefined);
              }
            }}
            setCurrentDate={setCurrentDate}
            availableDates={availableDates}
          />
        </Card>
        {selectedDate && availableSlots && (
          <>
            <Card>
              <Typography color={"#010302"} fontSize={16} textAlign={"center"}>
                Выберите подходящее время на выбранную дату
              </Typography>
            </Card>
            <Card>
              {availableSlots.length === 0 ? (
                <Typography textAlign={"center"} fontSize={16}>
                  Нет доступных талонов
                </Typography>
              ) : (
                <Grid>
                  {availableSlots.map((slot) => {
                    const selected = slot.time === selectedTime;
                    return (
                      <TimeElement
                        key={`time-${slot.time}`}
                        onClick={() => setSelectedTime(slot.time)}
                        selected={selected}
                      >
                        <Typography
                          color={selected ? "white" : "#010302"}
                          fontSize={16}
                        >
                          {slot.time}
                        </Typography>
                      </TimeElement>
                    );
                  })}
                </Grid>
              )}
            </Card>
          </>
        )}
      </ContentLayout>
      <Card borderRadius={"35px 35px 0 0"}>
        <Button
          title={"Готово"}
          onClick={onSave}
          disabled={!selectedDate || !selectedTime}
        />
      </Card>
    </>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const TimeElement = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 40px;
  border-radius: 20px;
  ${({ selected }) => {
    if (selected) {
      return {
        background: "#205915",
      };
    }
  }}
`;

export default MainPage;
