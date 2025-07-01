import axios from 'axios';

const API_URL = 'https://back-end-conectaai-production.up.railway.app'; // URL do servidor backend

// Função de login
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      // Armazenar o token JWT no localStorage
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw new Error('Falha ao fazer login');
  }
};

// Função de registro público
export const register = async (email: string, password: string, username: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password, username });
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw new Error('Falha ao registrar usuário');
  }
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Função para fazer logout
export const logout = () => {
  localStorage.removeItem('token');
};
