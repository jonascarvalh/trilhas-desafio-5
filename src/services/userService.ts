import axios from 'axios';

const API_URL = import.meta.env.API_URL || 'http://localhost:3000'; // URL do servidor backend

export interface UserData {
  id: number;
  username: string;
  email: string;
  xp?: number;
  badges?: string[];
}

export interface UserProgress {
  user_id: number;
  xp: number;
  level: number;
}

export interface UserBadge {
  id: number;
  badge_name: string;
  description: string;
  image_url: string;
  threshold_xp: number;
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
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    throw new Error('Falha ao buscar dados do usuário');
  }
};

// Função para atualizar o XP do usuário
export const updateUserXP = async (xp: number): Promise<void> => {
  try {
    const token = localStorage.getItem('token');

    await axios.post(`${API_URL}/user/xp`, 
      { xp },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Erro ao atualizar XP do usuário:', error);
    throw new Error('Falha ao atualizar XP do usuário');
  }
};

// Função para buscar o progresso do usuário
export const getUserProgress = async (): Promise<UserProgress> => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_URL}/user/progress`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar progresso do usuário:', error);
    throw new Error('Falha ao buscar progresso do usuário');
  }
};

// Função para buscar as badges do usuário
export const getUserBadges = async (): Promise<UserBadge[]> => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_URL}/user/badges`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar badges do usuário:', error);
    throw new Error('Falha ao buscar badges do usuário');
  }
};

// Função para atribuir uma badge ao usuário
export const assignUserBadge = async (badgeId: number): Promise<void> => {
  try {
    const token = localStorage.getItem('token');

    await axios.post(`${API_URL}/user/badges`, 
      { badgeId },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Erro ao atribuir badge ao usuário:', error);
    throw new Error('Falha ao atribuir badge ao usuário');
  }
}; 