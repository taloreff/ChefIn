import { httpService } from './http.service';
import { Post, FilterBy, Review } from '../types/Post';

export const postService = {
  query,
  getById,
  save,
  remove,
  getDefaultFilter,
  getFilterFromParams,
  addReview,
  getMyPosts,
  getDefaultPost,
  getPlaceDetails,
  filterPostsByCuisine,
  getImageUrl
};

const BASE_URL = 'post/';

async function query(filterBy: FilterBy = {}): Promise<Post[]> {
  return httpService.get(BASE_URL, filterBy);
}

async function getById(postId: string): Promise<Post> {
  return httpService.get(`${BASE_URL}${postId}`);
}

async function getMyPosts(): Promise<Post[]> {
  return httpService.get(`${BASE_URL}myposts`);
}

async function getPlaceDetails(placeId: string): Promise<any> {
  return httpService.get(`${BASE_URL}place-details`, { placeId });
}

async function remove(postId: string): Promise<void> {
  return httpService.delete(`${BASE_URL}${postId}`);
}

async function save(post: Post): Promise<Post> {
  const formData = new FormData();
  formData.append('title', post.title);
  formData.append('description', post.description);
  formData.append('overview', post.overview);
  post.meetingPoint && formData.append('meetingPoint', JSON.stringify(post.meetingPoint));
  post.labels.forEach(label => formData.append('labels[]', label));
  post.whatsIncluded && post.whatsIncluded.forEach(item => formData.append('whatsIncluded[]', item));
  post.reviews && post.reviews.forEach(review => formData.append('reviews[]', JSON.stringify(review)));
  formData.append('image', post.image);

  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  if (post._id) {
    console.log('updating post:', post);
    return httpService.put(`${BASE_URL}${post._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } else {
    console.log('creating post:', post);
    return httpService.post(BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}




async function addReview(postId: string, review: Review): Promise<Post> {
  return httpService.put(`${BASE_URL}${postId}/review`, review);
}

function getImageUrl(image: string | File | undefined) : string {
  return image ? `http://localhost:5000/uploads/${image}` : '';
}

function filterPostsByCuisine(posts: Post[], cuisine: string): Post[] {
  return posts.filter(post => post.labels.includes(cuisine));
}

function getDefaultFilter(): FilterBy {
  return {
    username: '',
    title: '',
    description: '',
    labels: [],
  };
}

function getFilterFromParams(searchParams: URLSearchParams): FilterBy {
  const defaultFilter = getDefaultFilter();
  const filterBy: FilterBy = {};

  for (const field in defaultFilter) {
    if (Array.isArray(defaultFilter[field as keyof FilterBy])) {
      filterBy[field as keyof FilterBy] = searchParams.getAll(field) as any;
    } else {
      const value = searchParams.get(field);
      if (value !== null) {
        filterBy[field as keyof FilterBy] = value as any;
      }
    }
  }
  return filterBy;
}

function getDefaultPost(){
    return {
      _id: '',
      userId: '',
      username: '',
      profileImgUrl: null as unknown as File,
      title: '',
      description: '',
      image: null as unknown as File,
      labels: [],
      overview: '',
      whatsIncluded: [],
      meetingPoint: {
        address: '',
        lat: 0,
        lng: 0,
      },
      reviews: [],
    };
}
