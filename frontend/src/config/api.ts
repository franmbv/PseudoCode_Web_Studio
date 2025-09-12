export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  login: '/api/auth/login',
  register: '/api/auth/register',
  exercises: '/api/exercises',
  submitAnswer: '/api/exercises/submit-answer',
  completeProgress: '/api/progress/complete',
};