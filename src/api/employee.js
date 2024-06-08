import { axiosInstance } from '../lib/axiosInstance';

const getEmployeesAPI = async () => {
  const response = await axiosInstance.get('/api/employee/allEmployee');
  return response.data;
};

export default getEmployeesAPI;
