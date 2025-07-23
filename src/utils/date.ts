import moment from "moment";

export const getCurrentFormattedDate = (): string =>
  moment().format("YYYY-MM-DD HH:mm");
