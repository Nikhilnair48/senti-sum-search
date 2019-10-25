import { searchConstants } from '../_constants';

export function sentiSearch(state = {}, action) {
    switch(action.type) {
        case searchConstants.GET_SEARCH_REQUEST:
            return { 
                isFetching: true,
                ...action.response
            };
        case searchConstants.GET_SEARCH_SUCCESS:
            state = {
                isFetching: false,
                ...action.response,
            };
            return Object.assign({}, state);
        case searchConstants.GET_SEARCH_FAILURE:
            return { 
                isFetching: false,
                ...action.response
            };
        default: 
            return state;
    }
}