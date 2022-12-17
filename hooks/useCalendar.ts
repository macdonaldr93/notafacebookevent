import { CalendarOptions, GoogleCalendar, ICalendar } from 'datebook';
import { EventData } from '../types/events';

export function useCalendar(event: EventData) {
  const config: CalendarOptions = {
    title: event.name,
    location: event.locationUrl || event.location,
    description: `${event.description}\n\n${process.env.NEXT_PUBLIC_URL}/events/${event.id}`,
    start: event.startAt.toDate(),
    end: event.endAt?.toDate(),
  };

  return {
    config,
    GoogleCalendar,
    ICalendar,
  };
}
