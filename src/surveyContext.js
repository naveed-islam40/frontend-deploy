import React, { createContext, useEffect, useState } from 'react';
import { getSurveyBySurveyId } from './services/surveysService';

const SurveyContext = createContext();

const SurveyProvider = ({ children }) => {
    const [survey, setSurvey] = useState([]);
    const [surveyId, setSurveyId] = useState("");
    const [selectedEmployeeLength, setSelectedEmployeeLength] = useState([])

    const fetchSurveyById = async (surveyId) => {
        const response = await getSurveyBySurveyId(surveyId);
        setSurvey(response.data);
    };


    useEffect(() => {
        if (surveyId) {
            fetchSurveyById(surveyId);
        }
    }, [surveyId]);

    console.log(surveyId)

    return (
        <SurveyContext.Provider value={{ survey, fetchSurveyById, setSurveyId, setSelectedEmployeeLength, selectedEmployeeLength }}>
            {children}
        </SurveyContext.Provider>
    );
};

export { SurveyContext, SurveyProvider };