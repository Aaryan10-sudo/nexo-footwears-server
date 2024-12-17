import axios from "axios";
import { config } from "dotenv";

export const verifyKhaltiController = async (pidx) => {
  config();

  const headerLists = {
    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({ pidx });

  const reqOptions = {
    url: `${process.env.KHALTI_GATEWAY_URL}/epayment/lookup/`,
    method: "POST",
    headers: headerLists,
    body: bodyContent,
  };

  try {
    const response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    console.error("Error verifying Khalti payment:", error);
    throw error;
    message: error.message;
  }
};

export const initializeKhaltiPayment = async (details) => {
  const headerList = {
    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify(details);

  const reqOptions = {
    url: `${process.env.KHALTI_GATEWAY_URL}/epayment/initiate/`,
    method: "POST",
    headers: headerList,
    body: bodyContent,
  };

  try {
    const response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    console.error("Error initializing Khalti payment:", error);
    console.error(error.response.data);
    throw error;
  }
};
