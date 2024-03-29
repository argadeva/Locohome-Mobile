const initialValue = {
  historyData: [],
  isPending: true,
  isRejected: false,
  isFulfilled: false,
};

const HistoryReducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'GET_HISTORY_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_HISTORY_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'GET_HISTORY_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        historyData: action.payload.data,
      };
    default:
      return state;
  }
};

export default HistoryReducer;
