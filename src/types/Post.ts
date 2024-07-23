export interface Review {
  _id?: string;
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
  _id: string;
  userId: string;
  username: string;
  profileImgUrl: File;
  title: string;
  description: string;
  image: File; 
  labels: string[];
  overview: string;
  whatsIncluded: string[];
  meetingPoint: {
    address: string;
    lat: number;
    lng: number;
  };
  reviews: Review[];
}

export interface FilterBy {
  username?: string;
  title?: string;
  description?: string;
  labels?: string[];
}
