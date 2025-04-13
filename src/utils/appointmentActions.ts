
// This file is kept for backward compatibility
// All functions are now stored in separate files under src/utils/appointments/

import {
  fetchAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  completeAppointment,
} from './appointments';

import type { AppointmentDB } from './appointments/types';

export {
  fetchAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  completeAppointment,
};

export type { AppointmentDB };
