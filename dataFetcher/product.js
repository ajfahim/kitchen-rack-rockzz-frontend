import apiClient from '@/utils/apiClient';
import { toast } from 'react-hot-toast';

export const postProduct = async (values) => {
    try {
        const res = await apiClient.post('products', values);
        return res.data;
    } catch (error) {
        console.error(error.response.data.msg);
        toast.error(error.response.data.msg);
    }
};

export const getProducts = async (page = 1, limit = 10) => {
    try {
        const res = await apiClient.get(`products?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};

export const getProduct = async (id) => {
    try {
        const res = await apiClient.get(`products/${id}`);
        return res.data;
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};
export const updateProduct = async (values, id) => {
    try {
        const res = await apiClient.put(`products/${id}`, values);
        return res.data;
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};

export const delProduct = async (_id) => {
    try {
        const res = await apiClient.delete(`products/${_id}`);
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};

export const getProductByName = async (name) => {
    try {
        const res = await apiClient.get(`products/by-name/${name}`);
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};
