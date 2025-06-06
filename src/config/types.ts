export interface RouteInterface {
  path: string;
}

export interface DayInterface {
  date: string; // yyyy-mm-dd
  slots: {
    time: string; // hh:mm
    available: boolean;
  }[];
}

export interface DayInterface {
  date: string; // yyyy-mm-dd
  places: {
    [key: number]: {
      time: string; // hh:mm
      available: boolean;
    }[];
  };
}

const example = {
  date: "2025-01-24",
  places: {
    1: [{ time: "10:00", available: false }],
    2: [
      { time: "11:00", available: true },
      { time: "11:30", available: true },
    ],
  },
};
