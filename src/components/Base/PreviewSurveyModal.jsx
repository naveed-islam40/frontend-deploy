import React, { useEffect, useState } from "react";
import axios from "axios";

const PreviewSurveyModal = ({
  isOpen,
  title,
  description,
  closeModal,
  selectedSurvey,
}) => {
  const [question, setQuestion] = useState([]);
  const [surveyName, setSurveyName] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");

  useEffect(() => {
    if (isOpen && selectedSurvey) {
      const fetchingSurveyDetails = async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v2/survey/answerdetails/${selectedSurvey._id}`
          );
          if (response) {
            setSurveyName(response.data[1].surveyName);
            setSurveyDescription(response.data[2].surveyDescription);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchingSurveyDetails();
    }
  }, [isOpen, selectedSurvey]);

  useEffect(() => {
    if (isOpen && selectedSurvey) {
      const fetchingSurveyQuestions = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/v2/questions/${selectedSurvey._id}`
          );
          if (response) {
            const sortedQuestions = response.data.sort(
              (a, b) => a.Question_order - b.Question_order
            );
            setQuestion(sortedQuestions);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchingSurveyQuestions();
    }
  }, [isOpen, selectedSurvey]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 min-h-44"
        onClick={closeModal}
      ></div>
      <dialog className="modal smooth-open min-h-44" open={isOpen}>
        <div
          className="bg-white relative z-50 min-h-96 w-3/6 h-screen mt-5 mb-5 w-2/3 overflow-auto rounded-2xl shadow-lg"
          style={{ height: "95%" }}
        >
          <div className="p-8">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <h1 className="font-bold text-2xl text-slate-900">{surveyName}</h1>
            <p className="text-lg text-gray-700 mt-1 mb-4">{description}</p>
            {question.map((ques) => (
              <div className="p-0" key={ques._id}>
                <h3 className="font-medium text-md">
                  {ques.Question_order}. {ques.Question_title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default PreviewSurveyModal;
