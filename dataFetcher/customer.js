import apiClient from '@/utils/apiClient';
import { toast } from 'react-hot-toast';

export const postCustomer = async (values) => {
    try {
        const res = await apiClient.post('customers', values);
        return res.data;
    } catch (error) {
        console.error(error.response.data.msg);
        toast.error(error.response.data.msg);
    }
};

export const getCustomers = async (page = 1, limit = 10, search = '') => {
    try {
        const res = await apiClient.get(`customers?page=${page}&limit=${limit}&search=${search}`);
        return res.data;
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};

export const getCustomer = async (id) => {
    try {
        const res = await apiClient.get(`customers/${id}`);
        return res.data;
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};
export const updateCustomer = async (values, id) => {
    try {
        const res = await apiClient.put(`customers/${id}`, values);
        return res.data;
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};

export const delCustomer = async (_id) => {
    try {
        const res = await apiClient.delete(`customers/${_id}`);
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};
export const getCustomerByName = async (name) => {
    try {
        const res = await apiClient.get(`customers/by-name/${name}`);
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};
