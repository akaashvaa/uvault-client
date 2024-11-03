import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import {config } from "./config.js";

export const useAxiosInstance = () => {
  const { getToken } = useAuth();
  const api = axios.create(config);
  
  api.interceptors.request.use(async (config) => {
    try {
      const token = await getToken();
      // If token exists, add it to headers, if not, proceed as public request
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      // If there's an error getting the token, proceed as public request
      return config;
    }
  });

  return api;
};


