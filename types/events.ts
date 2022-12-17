import { DocumentData, Timestamp } from 'firebase/firestore';

type Visibility = 'public' | 'private' | 'archived';

export interface EventData extends DocumentData {
  id: string;
  description?: string;
  endAt?: Timestamp;
  locationUrl?: string;
  name: string;
  startAt: Timestamp;
  visibility: Visibility;
}

export interface PostData extends DocumentData {
  id: string;
  author: string;
  createdAt: Timestamp;
  text: string;
  visibility: Visibility;
}

export interface GuestData extends DocumentData {
  id: string;
  name: string;
  createdAt: Timestamp;
}
