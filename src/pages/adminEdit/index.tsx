import Header from "../../component/header";
import ContentLayout from "../../layout/contentLayout";
import Card from "../../component/card";
import Calendar from "../../component/calendar";
import Button from "../../component/button";
import { useNavigate } from "react-router-dom";
import { routes } from "../../config/routes.ts";
import Typography from "../../component/typography";
import { useState } from "react";
import Checkbox from "../../component/checkbox";
import styled from "styled-components";
import TimeSelect from "../../component/timeSelect";
import {
  generateTimeSlots,
  handleDateSetTime,
} from "../../utils/generateTimeSlots.ts";
import { useDayCreateUpdate } from "../../hooks/useDayCreateUpdate.ts";
import { getServerFormatDate } from "../../utils/getServerFormatDate.ts";
import { useGetDaysPeriod } from "../../hooks/useGetDaysPeriod.ts";
import { getStartEndOfMonth } from "../../utils/getStartEndOfMonth.ts";
import { getAvailableDates } from "../../utils/getAvailableDates.ts";
import { DayInterface } from "../../config/types.ts";
import { addMinutes, format } from "date-fns";

const AdminEditPage = () => {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState<Date>();

  const { data } = useGetDaysPeriod(getStartEndOfMonth(currentDate));

  const availableDates = getAvailableDates({
    dates: data as DayInterface[],
  });

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formValues, setFormValues] = useState<{
    nonWorkingDay: boolean;
    timeFrom?: string;
    timeTo?: string;
  }>({
    nonWorkingDay: false,
    timeFrom: undefined,
    timeTo: undefined,
  });
  const [selectedMeta, setSelectedMeta] = useState<
    (DayInterface & { id: number }) | undefined
  >();

  const enabledButton =
    formValues.nonWorkingDay || (formValues.timeFrom && formValues.timeTo);

  const { dayCreateUpdateMutation } = useDayCreateUpdate();

  const onSave = async () => {
    try {
      if (selectedDate) {
        const slots = generateTimeSlots({
          from: formValues.timeFrom,
          to: formValues.timeTo,
        });
        await dayCreateUpdateMutation.mutateAsync({
          id: selectedMeta?.id,
          data: {
            date: (selectedMeta?.id
              ? selectedMeta.date
              : getServerFormatDate(selectedDate)) as string,
            slots: formValues.nonWorkingDay
              ? []
              : slots.map((time) => {
                  const available =
                    selectedMeta?.slots?.find((el) => el.time === time)
                      ?.available || true;
                  return {
                    time,
                    available,
                  };
                }),
          },
        });
        navigate(routes.admin.path);
      }
    } catch (e) {
      //
    }
  };

  return (
    <>
      <Header
        title={"Редактирование графика"}
        onBack={() => navigate(routes.admin.path)}
      />
      <ContentLayout>
        <Card>
          <Typography color={"#010302"} fontSize={16} textAlign={"center"}>
            Выберите день для настройки особого расписания
          </Typography>
        </Card>
        <Card>
          <Calendar
            selectedDate={selectedDate}
            onSelect={(e) => {
              setSelectedDate(e);
              const meta = data?.find(
                (el: DayInterface) => el.date === getServerFormatDate(e),
              );
              if (meta) {
                if (meta.slots.length === 0) {
                  setFormValues({
                    nonWorkingDay: true,
                    timeFrom: undefined,
                    timeTo: undefined,
                  });
                } else {
                  const firstDay = meta.slots[0];
                  const lastDay = meta.slots[meta.slots.length - 1];
                  const lastDayDate = addMinutes(
                    handleDateSetTime(lastDay.time),
                    15,
                  );
                  setFormValues({
                    nonWorkingDay: meta.slots.length === 0,
                    timeFrom: firstDay.time,
                    timeTo: format(lastDayDate, "HH:mm"),
                  });
                }
                setSelectedMeta(meta);
              } else {
                setFormValues({
                  nonWorkingDay: false,
                  timeFrom: undefined,
                  timeTo: undefined,
                });
                setSelectedMeta(undefined);
              }
            }}
            setCurrentDate={setCurrentDate}
            availableDates={availableDates}
          />
        </Card>
        {selectedDate && (
          <>
            <Checkbox
              value={formValues.nonWorkingDay}
              onChange={(nonWorkingDay) =>
                setFormValues((state) => ({ ...state, nonWorkingDay }))
              }
              label={"Нерабочий день"}
            />
            {!formValues.nonWorkingDay && (
              <>
                <Row>
                  <TimeWrapper>
                    <Typography color={"#1e4a16"} fontSize={16}>
                      с
                    </Typography>
                    <TimeSelect
                      value={formValues.timeFrom}
                      list={generateTimeSlots({ to: formValues.timeTo }).map(
                        (el) => ({
                          value: el,
                          label: el,
                        }),
                      )}
                      onChange={(timeFrom) =>
                        setFormValues((state) => ({ ...state, timeFrom }))
                      }
                    />
                  </TimeWrapper>
                  <TimeWrapper>
                    <Typography color={"#1e4a16"} fontSize={16}>
                      по
                    </Typography>
                    <TimeSelect
                      value={formValues.timeTo}
                      list={generateTimeSlots({
                        from: formValues.timeFrom,
                        isToDateList: !!formValues.timeFrom,
                      })
                        .map((el) => ({
                          value: el,
                          label: el,
                        }))
                        .slice(formValues.timeFrom ? 1 : 0)}
                      onChange={(timeTo) =>
                        setFormValues((state) => ({ ...state, timeTo }))
                      }
                    />
                  </TimeWrapper>
                </Row>
              </>
            )}
          </>
        )}
      </ContentLayout>
      <Card borderRadius={"35px 35px 0 0"}>
        <Button
          title={"Сохранить"}
          onClick={onSave}
          disabled={!enabledButton}
        />
      </Card>
    </>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default AdminEditPage;
