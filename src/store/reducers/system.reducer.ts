export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'

export interface SystemState {
    isLoading: boolean;
}

const initialState: SystemState = {
    isLoading: false
};

export function systemReducer(state = initialState, action: any): SystemState {
    switch (action.type) {
        case LOADING_START:
            return { ...state, isLoading: true }
        case LOADING_DONE:
            return { ...state, isLoading: false }
        default: return state
    }
}
