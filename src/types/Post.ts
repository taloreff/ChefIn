export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface MeetingPoint {
  address: string;
  lat: number;
  lng: number;
}

export interface Post {
  _id?: string;
  userId: string;
  username: string;
  profileImgUrl: string;
  title: string;
  description: string;
  image: string;
  labels: string[];
  overview: string;
  reviews: Review[];
  whatsIncluded: string[];
  meetingPoint: MeetingPoint;
}

export interface FilterBy {
  username?: string;
  title?: string;
  description?: string;
  labels?: string[];
}
