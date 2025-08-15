// services/payments.js
import api from './api';

export const createCheckout = async ({ label, successUrl, cancelUrl, customerEmail }) => {
  const { data } = await api.post('/payments/create-checkout', {
    label, successUrl, cancelUrl, customerEmail,
  });
  return data; // { url: "https://checkout.stripe.com/..." }
};
