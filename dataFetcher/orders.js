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
