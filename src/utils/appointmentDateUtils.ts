
import { navigateNext, navigatePrevious } from "./dateUtils";

export const handlePrevious = (currentDate: Date, view: "week" | "month") => {
  return navigatePrevious(currentDate, view);
};

export const handleNext = (currentDate: Date, view: "week" | "month") => {
  return navigateNext(currentDate, view);
};
