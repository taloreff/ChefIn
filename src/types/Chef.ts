// src/types/Chef.ts
export interface Chef {
    _id?: string;
    userId: string;
    username: string;
    profileImgUrl: string;
    title: string;
    description: string;
    image: string; 
    labels: string[];
  }
  
  export interface FilterBy {
    username?: string;
    title?: string;
    description?: string;
    labels?: string[];
  }
  