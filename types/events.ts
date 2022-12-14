import { DocumentData, Timestamp } from 'firebase/firestore';

export interface EventData extends DocumentData {
  description?: string;
  name: string;
  startAt: Timestamp;
}
