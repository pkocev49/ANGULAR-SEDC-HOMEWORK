import { Timestamp } from 'firebase/firestore';

export interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  likes: number;
  timestamp: Timestamp;
}
