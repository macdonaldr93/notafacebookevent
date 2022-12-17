import { Timestamp } from 'firebase/firestore';
import { EventFormValues } from '../containers';

export function eventFormToEventData({
  adminPassword,
  name,
  description,
  location,
  locationUrl,
  startAt,
  endAt,
}: EventFormValues) {
  return {
    admin: {
      managePassword: adminPassword,
    },
    name: name.trim(),
    description,
    location: location ? location.trim() : null,
    locationUrl: locationUrl ? locationUrl.trim() : null,
    startAt: Timestamp.fromDate(startAt || new Date()),
    endAt: endAt ? Timestamp.fromDate(endAt) : null,
  };
}
