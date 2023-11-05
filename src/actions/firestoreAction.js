// Actions
export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

// Action creators
const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

// Async action creator
export const fetchDataFromFirestore = () => {
  console.log("Fetching ...........");
  return (dispatch, getState, { getFirestore }) => {
    dispatch(fetchDataRequest());
    const firestore = getFirestore();

    firestore
      .collection("glassesInTheShopCart")
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("Fetching result :::::", data);
        dispatch(fetchDataSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchDataFailure(error.message));
      });
  };
};
