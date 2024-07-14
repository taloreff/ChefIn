import { postService } from "../../services/post.service";

export const SET_CHEFS = "SET_CHEFS";
export const REMOVE_CHEF = "REMOVE_CHEF";
export const UPDATE_CHEF = "UPDATE_CHEF";
export const ADD_CHEF = "ADD_CHEF";
export const SET_FILTER_BY = "SET_FILTER_BY";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const UNDO_CHANGES = "UNDO_CHANGES";

export interface ChefState {
    chefs: any[];
    lastChefs: any[];
    filterBy: any;
    isLoading: boolean;
}

const initialState: ChefState = {
    chefs: [],
    lastChefs: [],
    filterBy: postService.getDefaultFilter(),
    isLoading: true,
};

export function chefReducer(state = initialState, action: any): ChefState {
    switch (action.type) {
        case SET_CHEFS:
            return {
                ...state,
                chefs: action.chefs,
            };
        case REMOVE_CHEF:
            return {
                ...state,
                lastChefs: [...state.chefs],
                chefs: state.chefs.filter((chef) => chef.id !== action.chefId),
            };
        case ADD_CHEF:
            return {
                ...state,
                chefs: [...state.chefs, action.chef],
            };
        case UPDATE_CHEF:
            return {
                ...state,
                chefs: state.chefs.map((chef) =>
                    chef._id === action.chef._id ? action.chef : chef
                ),
            };
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.fieldsToUpdate },
            };
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        case UNDO_CHANGES:
            return {
                ...state,
                chefs: [...state.lastChefs],
            };
        default:
            return state;
    }
}
