export interface UForm {
  creatorName: string;
  eventDate: string;
  category: number;
  eventName: string;
  eventTime: string;
  endTime: string;
  city: string;
  price: string;
  description: string;
  image: string | null;
  categoryId: number;
  categoryTitle: string;
  reviews: Review[];
}

export interface Review {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  rating: number;
  userId: number;
  eventId: number;
}
