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
export const getCustomers = async () => {
    try {
        const res = await apiClient.get('customers');
        return res.data;
    } catch (error) {
        console.error(error.response?.data.msg);
        toast.error(error.response?.data.msg);
    }
};
