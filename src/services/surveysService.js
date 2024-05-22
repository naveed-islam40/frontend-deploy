// services/surveyService.js
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}`;

const getAllSurveys = async () => {
  return await axios.get(API_URL);
};

const getSurveyBySurveyId = async (id) => {
  console.log(id)
  return await axios.get(`${API_URL}/api/v2/surveybyid/${id}`);
};

const getSurveyById = async (id) => {
  return await axios.get(`${API_URL}/api/v2/survey/${id}`);
};

const getSurveyQuestionsById = async (id) => {
  return await axios.get(`${API_URL}/api/v2//questions/${id}`);
};


const createSurvey = async (surveyData, adminId, questions) => {
  return await axios.post(`${API_URL}/api/v2/survey/create/${adminId}`, { surveyData, questions });
};

const updateSurvey = async (id, surveyData) => {
  return await axios.put(`${API_URL}/${id}`, surveyData);
};

const deleteSurvey = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export {
  getAllSurveys,
  getSurveyById,
  createSurvey,
  updateSurvey,
  deleteSurvey,
  getSurveyQuestionsById,
  getSurveyBySurveyId
};