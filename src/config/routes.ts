import { RouteInterface } from "./types.ts";

export const routes: { [key: string]: RouteInterface } = {
  main: {
    path: "/",
  },
  admin: {
    path: "/admin",
  },
  adminEdit: {
    path: "/adminEdit",
  },
  adminRecordsToday: {
    path: "/adminRecordsToday",
  },
  success: {
    path: "/success",
  },
};
