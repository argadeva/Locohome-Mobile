import Axios from 'axios';

export const indomartPayment = (data, id) => {
  return {
    type: 'INDOMART_PAYMENT',
    payload: Axios.post(
      `https://api.sandbox.midtrans.com/v2/charge`,
      {
        payment_type: 'cstore',
        transaction_details: {
          gross_amount: data.total,
          order_id: `BO${id}`,
        },
        customer_details: {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phoneNumber,
        },
        item_details: [
          {
            id: data.id,
            price: data.priceNight,
            quantity: data.days,
            name: data.homeName,
          },
        ],
        cstore: {
          store: 'Indomaret',
          message: 'Message to display',
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization:
            'Basic U0ItTWlkLXNlcnZlci11WTBVN09rR2JjajBVaXp5bkpycjB3eEY6',
        },
      },
    ),
  };
};

export const bcaPayment = (data, id) => {
  return {
    type: 'BCA_PAYMENT',
    payload: Axios.post(
      `https://api.sandbox.midtrans.com/v2/charge`,
      {
        payment_type: 'bank_transfer',
        transaction_details: {
          gross_amount: data.total,
          order_id: `BO${id}`,
        },
        customer_details: {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phoneNumber,
        },
        item_details: [
          {
            id: data.id,
            price: data.priceNight,
            quantity: data.days,
            name: data.homeName,
          },
        ],
        bank_transfer: {
          bank: 'bca',
          va_number: '12345678901',
          free_text: {
            inquiry: [
              {
                id: 'Your Custom Text in ID language',
                en: 'Your Custom Text in EN language',
              },
            ],
            payment: [
              {
                id: 'Your Custom Text in ID language',
                en: 'Your Custom Text in EN language',
              },
            ],
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization:
            'Basic U0ItTWlkLXNlcnZlci11WTBVN09rR2JjajBVaXp5bkpycjB3eEY6',
        },
      },
    ),
  };
};

export const bniPayment = (data, id) => {
  return {
    type: 'BNI_PAYMENT',
    payload: Axios.post(
      `https://api.sandbox.midtrans.com/v2/charge`,
      {
        payment_type: 'bank_transfer',
        transaction_details: {
          gross_amount: data.total,
          order_id: `BO${id}`,
        },
        customer_details: {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phoneNumber,
        },
        item_details: [
          {
            id: data.id,
            price: data.priceNight,
            quantity: data.days,
            name: data.homeName,
          },
        ],
        bank_transfer: {
          bank: 'bni',
          va_number: '12345678',
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization:
            'Basic U0ItTWlkLXNlcnZlci11WTBVN09rR2JjajBVaXp5bkpycjB3eEY6',
        },
      },
    ),
  };
};
