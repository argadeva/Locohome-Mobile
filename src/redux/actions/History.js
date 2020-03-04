import Axios from 'axios';

export const getHistory = (email, token) => {
  return {
    type: 'GET_HISTORY',
    payload: Axios.get(
      `http://18.206.61.46:1000/api/v1/orders/email/${email}`,
      {
        headers: {
          'x-access-token': token,
        },
      },
    ),
  };
};
