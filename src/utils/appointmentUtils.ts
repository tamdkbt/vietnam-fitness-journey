
import { APPOINTMENT_TYPES } from "../types/appointment";

export const appointmentTypeNameById = (id: string) => {
  return APPOINTMENT_TYPES.find(type => type.id === id)?.name || id;
};
