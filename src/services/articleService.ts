import axios from 'axios';

const API_URL = 'https://back-end-conectaai-production.up.railway.app';

// Interface para o modelo de artigo
export interface Article {
  id: number;
  title: string;
  content: string;
  published_at: string;
}

// Interface para o modelo de quiz
export interface Quiz {
  id: number;
  article_id: number;
  title: string;
  description: string;
  xp_reward: number;
  badge_id: number | null;
}

// Interface para o modelo de pergunta
export interface Question {
  id: number;
  quiz_id: number;
  question_text: string;
  question_type: string;
}

// Interface para o modelo de alternativa
export interface Option {
  id: number;
  question_id: number;
  option_text: string;
  is_correct: boolean;
}

// Interface para pergunta completa com alternativas
export interface QuestionWithOptions {
  id: number;
  quiz_id: number;
  question_text: string;
  question_type: string;
  options: Option[];
}

// Função para obter o token do localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Função para buscar todos os artigos
export const getArticles = async (): Promise<Article[]> => {
  try {
    const token = getAuthToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    const response = await axios.get(`${API_URL}/articles`, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    throw new Error('Falha ao buscar artigos');
  }
};

// Função para buscar um artigo específico por ID
export const getArticleById = async (id: number): Promise<Article> => {
  try {
    const token = getAuthToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    const response = await axios.get(`${API_URL}/articles/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar artigo:', error);
    throw new Error('Falha ao buscar artigo');
  }
};

// Função para buscar o quiz de um artigo específico
export const getArticleQuiz = async (articleId: number): Promise<Quiz> => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }
    
    const response = await axios.get(`${API_URL}/articles/${articleId}/quizzes`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Como sempre retorna apenas um quiz, pegamos o primeiro elemento
    const quiz = response.data[0];
    
    if (!quiz) {
      throw new Error('Quiz não encontrado para este artigo');
    }
    
    return quiz;
  } catch (error) {
    console.error('Erro ao buscar quiz do artigo:', error);
    throw new Error('Falha ao buscar quiz do artigo');
  }
};

// Função para buscar um quiz específico por ID
export const getQuizById = async (quizId: number): Promise<Quiz> => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }
    
    const response = await axios.get(`${API_URL}/quizzes/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar quiz:', error);
    throw new Error('Falha ao buscar quiz');
  }
};

// Função para buscar as perguntas de um quiz
export const getQuizQuestions = async (quizId: number): Promise<Question[]> => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }
    
    const response = await axios.get(`${API_URL}/quizzes/${quizId}/questions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perguntas do quiz:', error);
    throw new Error('Falha ao buscar perguntas do quiz');
  }
};

// Função para buscar as alternativas de uma pergunta
export const getQuestionOptions = async (questionId: number): Promise<Option[]> => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }
    
    const response = await axios.get(`${API_URL}/questions/${questionId}/options`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar alternativas da pergunta:', error);
    throw new Error('Falha ao buscar alternativas da pergunta');
  }
};

// Função para buscar todas as perguntas com suas alternativas
export const getQuizQuestionsWithOptions = async (quizId: number): Promise<QuestionWithOptions[]> => {
  try {
    const questions = await getQuizQuestions(quizId);
    
    // Buscar alternativas para cada pergunta
    const questionsWithOptions = await Promise.all(
      questions.map(async (question) => {
        const options = await getQuestionOptions(question.id);
        return {
          ...question,
          options
        };
      })
    );
    
    return questionsWithOptions;
  } catch (error) {
    console.error('Erro ao buscar perguntas com alternativas:', error);
    throw new Error('Falha ao buscar perguntas com alternativas');
  }
}; 