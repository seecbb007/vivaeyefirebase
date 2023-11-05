import * as Actions from "../actions/firestoreAction";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const firebaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Actions.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Actions.FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default firebaseReducer;
