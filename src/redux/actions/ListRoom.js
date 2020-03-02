import Axios from 'axios';

export const getRoom = data => {
  return {
    type: 'GET_ROOM',
    payload: Axios.get(
      `http://18.206.61.46:1000/api/v1/listroom/search/${data.search}`,
      {
        checkIn: data.checkIn,
        checkOut: data.checkOut,
      },
    ),
  };
};
