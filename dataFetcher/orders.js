import apiClient from '@/utils/apiClient';
import { toast } from 'react-hot-toast';

export const createOrder = async (values) => {
    try {
        const res = await apiClient.post('orders', values);
        return res.data;
    } catch (error) {
        console.error(error.response.data.msg);
        toast.error(error.response.data.msg);
    }
};

export const getOrders = async (page = 1, limit = 10) => {
    try {
        const res = await apiClient.get(`orders?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg || error?.message);
    }
};

export const getOrderedProductsByDate = async (page = 1, limit = 10) => {
    try {
        const res = await apiClient.get(
            `orders/products/orderedProductsToday?page=${page}&limit=${limit}`
        );
        return res.data;
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg || error?.message);
    }
};
