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
  filterPostsByCuisine
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
  if (post._id) {
    console.log('updating post:', post);
    return httpService.put(`${BASE_URL}${post._id}`, post);
  } else {
    console.log('creating post:', post);
    return httpService.post(BASE_URL, post);
  }
}

async function addReview(postId: string, review: Review): Promise<Post> {
  return httpService.put(`${BASE_URL}${postId}/review`, review);
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
      profileImgUrl: '',
      title: '',
      description: '',
      image: '',
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
