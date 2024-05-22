// components/CreateSurveyForm.js
import React, { useEffect, useState } from "react";
import { createSurvey } from "../../services/surveysService";
import axios from "axios";
import { toast } from "react-toastify";

const CreateSurveyForm = () => {
  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyCategory, setSurveyCategory] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [serveys, setServeys] = useState([])

  const [questions, setQuestions] = useState([]);

  const companyId = localStorage.getItem("companyId");
  const adminId = localStorage.getItem("userId");

  const addQuestion = () => {
    const newQuestion = {
      // Question_id: q${questions.length + 1},
      Question_order: questions.length + 1,
      Question_category: "",
      Type: "", // default type, you can change it later
      Lower_label: "",
      Upper_label: "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construct the survey object from state
    const newSurvey = {
      Company_id: "Company123", // This could be dynamic based on user/company
      Created_by: "UseXrYZ", // This should be set from the logged-in user's data
      Survey_title: surveyTitle,
      Survey_category: surveyCategory,
      Survey_description: surveyDescription,
      Questions: questions,
    };

    try {
      console.log(newSurvey);
      const response = await createSurvey(newSurvey, adminId, questions);
      console.log(response)
      if (response) {
        toast.success("Survey Created Successfully")
        localStorage.setItem("surveyToken", response.data.token)
        window.location.reload()
      }
      setSurveyTitle("");
      setSurveyCategory("");
      setSurveyDescription("");
      setQuestions([]);

    } catch (error) {
      console.error("Error creating the survey:", error);
    }
  };


  return (
    <div className="flex flex-row w-full " style={{ minHeight: "83.5vh" }}>
      <div
        className="w-full overflow-y-auto p-8 "
        style={{ maxHeight: "79vh" }}
      >
        <h2 className="font-bold text-xl mb-1">Créer une nouvelle enquête</h2>
        <p className="text-slate-600 mb-4">
          Créez une nouvelle enquête pour collecter des données auprès de vos
          employés.
        </p>

        <form onSubmit={handleSubmit} className="max-h-screen">
          <h2 className="font-bold text-lg mb-3 mt-5">
            Informations principales
          </h2>

          <input
            type="text"
            value={surveyTitle}
            className="input text-sm input-bordered w-full mb-3"
            onChange={(e) => setSurveyTitle(e.target.value)}
            placeholder="Nom de l'enquête"
            required
          />
          <input
            type="text"
            value={surveyCategory}
            className="input text-sm input-bordered w-full mb-3"
            onChange={(e) => setSurveyCategory(e.target.value)}
            placeholder="Catégorie"
            required
          />
          <textarea
            type="textarea"
            value={surveyDescription}
            className="textarea textarea-bordered w-full mb-3"
            onChange={(e) => setSurveyDescription(e.target.value)}
            placeholder="Description"
            required
          />

          <h2 className="font-bold text-lg mb-3">Les questions</h2>

          {questions.map((question, index) => (
            <div className="border-b border-slate-300 mb-4 pb-4">
              <div key={index}>
                <div key={index}>
                  <input
                    type="text"
                    value={question.Question_category}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "Question_category",
                        e.target.value
                      )
                    }
                    placeholder="Section"
                    className="input input-bordered text-sm w-full "
                    required
                  />
                  <input
                    type="text"
                    value={question.Question_title}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "Question_title",
                        e.target.value
                      )
                    }
                    placeholder="Titre de la question"
                    className="input w-full input-bordered text-sm mt-2 mb-2 "
                    required
                  />

                  <select
                    value={question.Type}
                    onChange={(e) =>
                      handleQuestionChange(index, "Type", e.target.value)
                    }
                    className="select select-bordered w-full max-w-xs"
                    required
                  >
                    <option value="default">Type de question</option>
                    <option value="input">Text input</option>
                    <option value="textarea">Text area</option>
                    <option value="rating">Rating</option>
                  </select>
                  {question.Type === "rating" && (
                    <>
                      <div className="flex flex-row gap-4 mt-2">
                        <input
                          type="text"
                          value={question.Lower_label}
                          onChange={(e) =>
                            handleQuestionChange(
                              index,
                              "Lower_label",
                              e.target.value
                            )
                          }
                          placeholder="Lower label"
                          className="input input-bordered w-full max-w-xs text-sm"
                          required
                        />

                        <input
                          type="text"
                          value={question.Upper_label}
                          onChange={(e) =>
                            handleQuestionChange(
                              index,
                              "Upper_label",
                              e.target.value
                            )
                          }
                          placeholder="Upper label"
                          className="input input-bordered w-full max-w-xs text-sm"
                          required={question.Type === "rating"}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="w-full ">
            <button type="button" onClick={addQuestion} className="btn ">
              Ajouter une question
            </button>
          </div>
          <div className="mt-4 flex gap-2">
            <button type="submit" className="btn btn-primary">
              Créer le questionnaire
            </button>
            {/* <button type="submit" className='btn '>Save draft</button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSurveyForm;