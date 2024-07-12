import { httpService } from "./http.service";

export const chefService = {
  query,
  getById,
  save,
  remove,
  getDefaultFilter,
  getFilterFromParams,
};

const BASE_URL = "chef/";

export interface FilterBy {
  username?: string;
  title?: string;
  description?: string;
  labels?: string[];
}

export interface Chef {
  _id?: string;
  username: string;
  title: string;
  description: string;
  labels: string[];
}

async function query(filterBy: FilterBy): Promise<Chef[]> {
  return httpService.get(BASE_URL, filterBy);
}

async function getById(chefId: string): Promise<Chef> {
  const chef = await httpService.get(`${BASE_URL}${chefId}`);
  return chef;
}

async function remove(chefId: string): Promise<void> {
  return httpService.delete(`${BASE_URL}${chefId}`);
}

async function save(chef: Chef): Promise<Chef> {
  if (chef._id) {
    console.log("updating chef!", chef);
    return httpService.put(`${BASE_URL}${chef._id}`, chef);
  } else {
    return httpService.post(BASE_URL, chef);
  }
}

function getDefaultFilter(): FilterBy {
  return {
    username: "",
    title: "",
    description: "",
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
