const initialValue = {
  paymentData: {},
  isPending: true,
  isRejected: false,
  isFulfilled: false,
};

const PaymentReducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'INDOMART_PAYMENT_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
        paymentData: {},
      };
    case 'INDOMART_PAYMENT_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'INDOMART_PAYMENT_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        paymentData: action.payload.data,
      };
    case 'BCA_PAYMENT_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
        paymentData: {},
      };
    case 'BCA_PAYMENT_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'BCA_PAYMENT_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        paymentData: action.payload.data,
      };
    case 'BNI_PAYMENT_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
        paymentData: {},
      };
    case 'BNI_PAYMENT_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'BNI_PAYMENT_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        paymentData: action.payload.data,
      };
    default:
      return state;
  }
};

export default PaymentReducer;
