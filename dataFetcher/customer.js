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

export const getCustomers = async (page = 1, limit = 10) => {
    try {
        const res = await apiClient.get(`customers?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.error(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};

export const delCustomer = async (_id) => {
    try {
        const res = await apiClient.delete(`customers/${_id}`);

        console.log('🚀 ~ file: customer.js:28 ~ delCustomer ~ res:', res);
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    }
};
