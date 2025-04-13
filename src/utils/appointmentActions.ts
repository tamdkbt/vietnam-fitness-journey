
// This file is kept for backward compatibility
// All functions are now stored in separate files under src/utils/appointments/

import {
  fetchAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  completeAppointment,
  AppointmentDB
} from './appointments';

export {
  fetchAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  completeAppointment,
  AppointmentDB
};
