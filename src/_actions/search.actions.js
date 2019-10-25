import { searchConstants } from '../_constants';
import { searchService } from '../_services';

export const searchActions = {
    search
}

function search(input) {

    return async function(dispatch) {
        dispatch(request({ response: { ...input } }));

        let response = await searchService.search(input);
        if(response.status < 200  || response.status > 205) {
            dispatch(failure({ ...response, ...input } ));
        } else {
            dispatch(success({ ...response, ...input } ));
        }
    }

    function request(input) { return { type: searchConstants.GET_SEARCH_REQUEST, input } }
    function success(response) { return { type: searchConstants.GET_SEARCH_SUCCESS, response } }
    function failure(error) { return { type: searchConstants.GET_SEARCH_FAILURE, error } }

}