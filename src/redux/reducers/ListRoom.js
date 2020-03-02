const initialValue = {
  searchData: [],
  isPending: true,
  isRejected: false,
  isFulfilled: false,
};

const ListRoomReducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'GET_ROOM_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_ROOM_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'GET_ROOM_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        searchData: action.payload.data,
      };
    default:
      return state;
  }
};

export default ListRoomReducer;
