import { DocumentData, Timestamp } from 'firebase/firestore';

export interface EventData extends DocumentData {
  description?: string;
  name: string;
  startAt: Timestamp;
  visibility: 'public' | 'private';
}

export interface TimelineData extends DocumentData {
  author: string;
  postedAt: Timestamp;
  text: string;
  visibility: 'public' | 'private';
}
