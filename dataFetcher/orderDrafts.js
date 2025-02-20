import apiClient from '@/utils/apiClient';
import { toast } from 'react-hot-toast';

export const getOrderDrafts = async (page = 1, limit = 10, date = null) => {
    try {
        let url = `order-drafts?page=${page}&limit=${limit}`;
        if (date) {
            url += `&date=${date}`;
        }
        const res = await apiClient.get(url);
        return res.data;
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg || error?.message);
    }
};

export const createOrderDraft = async (values) => {
    try {
        const res = await apiClient.post('order-drafts', values);
        if (res.data._id) {
            toast.success('Successfully created the order draft');
            return res.data;
        }
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg || error?.message);
    }
};

export const getOrderDraft = async (id) => {
    try {
        const res = await apiClient.get(`order-drafts/${id}`);
        return res.data;
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};

export const updateOrderDraft = async (values, id) => {
    try {
        const res = await apiClient.put(`order-drafts/${id}`, values);
        return res.data;
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};

export const delOrderDraft = async (_id) => {
    try {
        const res = await apiClient.delete(`order-drafts/${_id}`);
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};
