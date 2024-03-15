import axios from 'axios';
import { Product } from '../app/types';
import { PRODUCT_API } from '@/utils/apiPath';

const productService = {

  // Get Products Data From FAKE API
  async getProducts(): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(PRODUCT_API);
      return response?.data;
    } catch (error) {
      throw new Error('Failed to fetch products.....');
    }
  },
};

export default productService;