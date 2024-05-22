import React, { useState, useEffect } from "react";
import HoverRating from "./Stars";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { EyeSlashIcon } from '@heroicons/react/24/outline';


const SurveyQuestions = () => {
  const { surveyId, token, employeeId, surveySendId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [rating, setRating] = useState("");
  const [questionIds, setQuestionIds] = useState([]);
  const [survey, setSurvey] = useState({});
  const [inputAns, setInputAns] = useState("");
  const [textAreaAns, setTextAreaAns] = useState("");

  const navigate = useNavigate()

  const handleInputAns = (e) => {
    setInputAns(e.target.value);
  };

  const handleTextAns = (e) => {
    setTextAreaAns(e.target.value);
  };

  console.log(surveySendId);

  const handleNextClick = async () => {
    await handleSaveAnswers();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setInputAns("");
      setTextAreaAns("");
    } else {
      navigate("/survey-end");
    }
  };

  useEffect(() => {
    const fetchingSurveyQuestions = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v2/questions/${surveyId}`
      );
      const sortedQuestions = data.sort((a, b) => a.Question_order - b.Question_order);
      setQuestions(sortedQuestions);
    };
    fetchingSurveyQuestions();
  }, [surveyId]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      const currentQuestionId = questions[currentQuestionIndex]._id;
      if (!questionIds.includes(currentQuestionId)) {
        setQuestionIds((prev) => [...prev, currentQuestionId]);
      }
    }
  }, [currentQuestionIndex, questions]);

  const handleAnswerChange = (answer) => {
    setRating(answer);
  };



  const handleSaveAnswers = async () => {
    try {
      const currentQuestionId = questions[currentQuestionIndex]._id;
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v2/survey/saveanswer/${surveyId}`,
        {
          questionId: currentQuestionId,
          rating,
          token,
          employeeId,
          inputAns,
          textAreaAns,
          surveySendId
        }
      );
      setRating("")
      toast.success("Answer saved successfully");
    } catch (error) {
      toast.error("Failed to save answer");
    }
  };

  useEffect(() => {
    const fetchingSurvey = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v2/surveybyid/${surveyId}`);
      if (response) {
        setSurvey(response.data);
      }
    };
    fetchingSurvey();
  }, []);


  return (
    <div className='p-6 pt-3 w-full flex flex-col justify-center items-center  h-screen  bg-slate-100'>
      <img src='/images/bsr-logo.png' alt='survey' className='w-32 absolute left-6 top-2.5 '></img>
      <div className='badge mb-3 text-center border-slate-200 text-xs p-3 bg-slate-50 text-slate-500'><EyeSlashIcon className='w-4 h-4 mr-2'></EyeSlashIcon>  Vos réponses sont anonymes</div>
      <div className='flex flex-col justify-between h-full w-full px-6 rounded-lg shadow align-top top-0 items-center justify-center    bg-white'>
        <div className="flex flex-col justify-center items-center mt-4">
          <p className='text-xs border badge p-2  border-indigo-300 text-indigo-600 w-fit justify-center align-middle items-center mb-1'>{survey?.name}</p>


        </div>

        {questions.length > 0 && (
          <>
            <div className="flex flex-col w-2/3 justify-center items-center align-middle">
              <p className="font-semibold text-2xl uppercase text-sm text-slate-400 mt-6">
                <span>{questions[currentQuestionIndex].Question_category}</span>
              </p>

              <p className="font-bold text-3xl mt-2 mb-8 justify-center text-center">
                {questions[currentQuestionIndex].Question_title}
              </p>
              {questions[currentQuestionIndex].Type === "rating" ? (
                <HoverRating
                  onChange={handleAnswerChange}
                  lowerLabel={questions[currentQuestionIndex].Lower_label}
                  upperLabel={questions[currentQuestionIndex].Upper_label}
                />
              ) : questions[currentQuestionIndex].Type === "input" ? (
                <input
                  type="text"
                  onChange={(e) => handleInputAns(e)}
                  placeholder="Enter your answer"
                  className="input input-bordered w-full max-w-xs"

                />
              ) : questions[currentQuestionIndex].Type === "textarea" ? (
                <textarea
                  onChange={(e) => handleTextAns(e)}
                  placeholder="Enter your answer"
                  type="textarea"
                  className="input input-bordered w-full max-w-xs"

                />
              ) : null}
            </div>
          </>
        )}

        <button
          className='btn btn-primary bg-indigo-700 mb-6 w-72 '
          onClick={handleNextClick}
        >
          Question suivante →
        </button>
      </div>
    </div>
  );
};

export default SurveyQuestions;