import { CalendarOptions, GoogleCalendar, ICalendar } from 'datebook';
import { EventData } from '../types/events';

export function useCalendar(event: EventData) {
  const config: CalendarOptions = {
    title: event.name,
    location: event.locationUrl,
    description: event.description,
    start: event.startAt.toDate(),
    end: event.endAt?.toDate(),
  };

  return {
    googleCalendar: () => new GoogleCalendar(config),
    iCalendar: () => new ICalendar(config),
  };
}
