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

export const getOrder = async (id) => {
    try {
        const res = await apiClient.get(`orders/${id}`);
        return res.data;
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};

export const getOrderedProductsByDate = async (date, page = 1, limit = 10) => {
    try {
        const res = await apiClient.get(
            `orders/products/orderedProductsToday?date=${date}&page=${page}&limit=${limit}`
        );
        return res.data;
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg || error?.message);
    }
};
export const getDailySales = async (page = 1, limit = 10) => {
    try {
        const res = await apiClient.get(`orders/products/daily-sales?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg || error?.message);
    }
};
export const getMonthlySales = async (page = 1, limit = 10) => {
    try {
        const res = await apiClient.get(
            `orders/products/monthly-sales?page=${page}&limit=${limit}`
        );
        return res.data;
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg || error?.message);
    }
};

export const updateOrder = async (values, id) => {
    try {
        const res = await apiClient.put(`orders/${id}`, values);
        return res.data;
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};

export const delOrder = async (_id) => {
    try {
        const res = await apiClient.delete(`orders/${_id}`);
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};
