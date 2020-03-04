import Axios from 'axios';
import qs from 'qs';

export const getRoom = (data, token) => {
  const bodyFormData = qs.stringify({
    dateCheckIn: data.checkIn,
    dateCheckOut: data.checkOut,
    sort: data.urutan,
  });
  return {
    type: 'GET_ROOM',
    payload: Axios.post(
      `http://18.206.61.46:1000/api/v1/listroom/search/${data.search}/${data.page}`,
      bodyFormData,
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'x-access-token': token,
        },
      },
    ),
  };
};
