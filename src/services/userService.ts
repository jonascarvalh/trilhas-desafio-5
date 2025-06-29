import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000'; // URL do servidor backend

export interface UserData {
  id: number;
  username: string;
  email: string;
  xp?: number;
  badges?: string[];
}

// Função para buscar dados do usuário
export const getUserData = async (): Promise<UserData> => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Retorna apenas os dados do usuário da resposta
    return response.data.user;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    throw new Error('Falha ao buscar dados do usuário');
  }
}; 