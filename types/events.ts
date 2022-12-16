import { DocumentData, Timestamp } from 'firebase/firestore';

export interface EventData extends DocumentData {
  id: string;
  description?: string;
  endAt?: Timestamp;
  locationUrl?: string;
  name: string;
  startAt: Timestamp;
  visibility: 'public' | 'private';
}

export interface TimelineData extends DocumentData {
  author: string;
  createdAt: Timestamp;
  text: string;
  visibility: 'public' | 'private';
}

export interface GuestData extends DocumentData {
  name: string;
  createdAt: Timestamp;
}
