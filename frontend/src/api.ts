import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

interface UserData {
  email: string;
  password: string;
}

export const register = (userData: UserData) => axios.post(`${API_URL}/register`, userData);
export const login = (userData: UserData) => axios.post(`${API_URL}/login`, userData);

export const fetchUsers = async (token: string) => {
  try {
    const response = await fetch('http://localhost:5000/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

export const fetchMessages = async (token: string, recipientId: string) => {
  try {
    const response = await axios.get(`${API_URL}/messages/${recipientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching messages');
  }
};