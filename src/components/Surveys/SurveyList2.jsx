import React, { useState, useEffect, useContext } from "react";
import { getSurveyById } from "../../services/surveysService";
import { EyeIcon } from "@heroicons/react/24/outline";
import CreateSurveyForm from "./CreateSurveyForm";
import NewSurveyModal from "../Base/NewSurveyModal";
import { getAllEmployees } from "../../services/employeeService";
import SendModal from "../Base/SendModal";
import PreviewSurveyModal from "../Base/PreviewSurveyModal";
import { useNavigate } from "react-router-dom";
import AddEmpForm from "../ui/addEmpForm";
import AddSurveyNickName from "../ui/addSurveyNickName";
import { SurveyContext } from "../../surveyContext";
import axios from "axios";

const SurveyList2 = () => {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [selectedSurveyTitle, setSelectedSurveyTitle] = useState("");
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState({});
  const [filterText, setFilterText] = useState("");
  const [surveyID, setSurveyID] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const { setSurveyId } = useContext(SurveyContext);

  const navigate = useNavigate();

  const adminId = localStorage.getItem("userId");

  if (surveyID !== null) {
    localStorage.setItem("surveyId", surveyID);
  }

  // Fetching surveys
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await getSurveyById(adminId);
        setSurveys((prevSurveys) => {
          const uniqueSurveys = response.data.filter(
            (survey) =>
              !prevSurveys.some((prevSurvey) => prevSurvey._id === survey._id)
          );
          return [...prevSurveys, ...uniqueSurveys];
        });
        setIsDataFetched(true);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };
    if (!isDataFetched) {
      fetchSurveys();
    }
  }, [adminId, isDataFetched]);

  // Fetching default surveys
  useEffect(() => {
    const fetchingDefaultSurveys = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v2/surveys/default/all`
        );
        setSurveys((prevSurveys) => {
          const uniqueSurveys = response.data.surveys.filter(
            (survey) =>
              !prevSurveys.some((prevSurvey) => prevSurvey._id === survey._id)
          );
          return [...prevSurveys, ...uniqueSurveys];
        });
        setIsDataFetched(true);
      } catch (error) {
        console.error("Error fetching default surveys:", error);
      }
    };
    if (!isDataFetched) {
      fetchingDefaultSurveys();
    }
  }, [isDataFetched]);

  const handleSurveyModalOpen = (survey) => {
    setSelectedSurvey(survey);
    setIsModalOpen(true);
  };

  const handleSurveyModalClose = () => {
    setSelectedSurvey(null);
    setIsModalOpen(false);
  };

  const handleCreateModalOpen = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleSendSurvey = (survey) => {
    setSelectedSurveyTitle(survey.Survey_title);
    setIsEmployeeModalOpen(true);
  };

  const toggleEmployeeSelection = (employeeId) => {
    setSelectedEmployeeIds((prevSelected) => ({
      ...prevSelected,
      [employeeId]: !prevSelected[employeeId],
    }));
  };

  const handleSelectAllEmployees = (selectAll) => {
    if (selectAll) {
      const allSelected = employees.reduce((selection, employee) => {
        selection[employee._id] = true;
        return selection;
      }, {});
      setSelectedEmployeeIds(allSelected);
    } else {
      setSelectedEmployeeIds({});
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    if (isEmployeeModalOpen) {
      fetchEmployees();
    }
  }, [isEmployeeModalOpen]);

  // Filter surveys based on filterText
  const filteredSurveys = surveys.filter(
    (survey) =>
      survey.name.toLowerCase().includes(filterText.toLowerCase()) ||
      survey.category.toLowerCase().includes(filterText.toLowerCase())
  );

  // Group surveys by category
  const groupedSurveys = filteredSurveys.reduce((groups, survey) => {
    const category = survey.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(survey);
    return groups;
  }, {});

  return (
    <>
      <div className="grid grid-cols-1 gap-4 mt-1 ml-2">
        <div className="flex justify-start items-center gap-2">
          <button
            onClick={handleCreateModalOpen}
            className="btn btn-sm bg-bsrate hover:bg-black text-white"
          >
            Créer une enquête
          </button>
          <input
            type="text"
            placeholder="Filter par nom ou catégorie"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="input input-sm input-bordered w-full max-w-xs"
          />
        </div>

        {Object.entries(groupedSurveys).map(([category, surveys]) => (
          <div key={category}>
            <h2 className="text-lg font-bold mb-2">{category}</h2>
            <div className="flex overflow-x-auto space-x-4 pb-2 pr-12">
              {surveys.map((survey) => (
                <div
                  key={survey._id}
                  className="card flex-none w-1/4 bg-base-100 border border-slate-100 hover:shadow rounded-2xl transition"
                >
                  <div className="card-body p-6">
                    <div className="grid grid-cols-2 w-full justify-between ">
                      <h2
                        className=" border mb-4 flex w-fit rounded-lg border-indigo-400 text-indigo-600 text-xs bg-opacity-100 px-2 py-1 font-normal "
                      >
                        {survey.category}
                      </h2>
                      <p className="font-normal text-right text-slate-400 text-sm font-semibold inline mt-0 mb-2">
                        {survey.questions.length}{" "}
                        {survey.questions.length === 1
                          ? "question"
                          : "questions"}
                      </p>
                    </div>
                    <h2 className="text-md line-clamp-2 font-semibold text-slate-900">
                      {survey.name}
                    </h2>
                    <p className="line-clamp-2 text-sm -mt-1 text-slate-600">
                      {survey.description}
                    </p>

                    <div className="flex flex-col mt-4 ">
                      <button
                        className="flex text-sm font-normal mb-1 shadow-none text-indigo-700 hover:text-slate-800 transition min-h-0 h-auto"
                        onClick={() => handleSurveyModalOpen(survey)}
                      >
                        {" "}
                        <EyeIcon className="h-4 w-4 mt-0.5 mr-1.5" /> Voir les
                        questions
                      </button>
                      <button
                        className="hover:text-indigo-600 text-left text-sm font-semibold shadow-none text-slate-800 border-none min-h-0 h-auto transition rounded-xl"
                        onClick={() => {
                          setSurveyID(survey._id);
                          setIsModalOpen(!isModalOpen);
                          setIsSurveyModalOpen(!isSurveyModalOpen);
                          setSurveyId(survey._id);
                        }}
                      >
                        <span className="mr-1">→ </span> Lancer l'enquête
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isSurveyModalOpen && (
        <AddEmpForm
          isSurveyModalOpen={isSurveyModalOpen}
          setIsSurveyModalOpen={setIsSurveyModalOpen}
        />
      )}

      {isCreateModalOpen && (
        <NewSurveyModal
          isOpen={isCreateModalOpen}
          title="Create New Survey"
          closeModal={handleCreateModalClose}
        >
          <CreateSurveyForm />
        </NewSurveyModal>
      )}
      {selectedSurvey && (
        <PreviewSurveyModal
          isOpen={isModalOpen}
          title={selectedSurvey.Survey_title}
          description={selectedSurvey.description}
          closeModal={handleSurveyModalClose}
          selectedSurvey={selectedSurvey}
        >
          {Object.entries(
            selectedSurvey.questions.reduce((categories, question) => {
              if (!categories[question.Question_category]) {
                categories[question.Question_category] = [];
              }
              categories[question.Question_category].push(question);
              return categories;
            }, {})
          ).map(([category, questions], index) => (
            <div key={index}>
              <h2 className="font-bold text-md text-slate-900 mb-5 mt-8 border-b border-1 pb-2.5">
                {category}
              </h2>
              {questions.map((question, index) => (
                <div key={index} className="mb-4">
                  <p className="font-medium mb-2">
                    {question.Question_order}. {question.Question_title}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </PreviewSurveyModal>
      )}

      {isEmployeeModalOpen && (
        <SendModal
          isOpen={isEmployeeModalOpen}
          title="" // Set the modal title to include the survey title
          closeModal={() => setIsEmployeeModalOpen(false)}
        >
          <div
            className="flex flex-row w-full "
            style={{ minHeight: "83.4vh" }}
          >
            <div
              className="w-1/3 rounded-xl rounded-r-none"
              style={{
                backgroundImage: `url(https://assets.entrepreneur.com/content/3x2/2000/20160525135247-startup-team-coworkers-teamwork-office-brainstorming-ideas-corporate-meeting.jpeg?format=pjeg&auto=webp")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="w-2/3 overflow-y-auto p-8 "
              style={{ maxHeight: "79vh" }}
            >
              <div className="overflow-y-auto h-64">
                <h2 className="font-bold text-2xl text-slate-900">
                  {selectedSurveyTitle}
                </h2>
                <div className="flex justify-start items-center p-1">
                  <input
                    type="checkbox"
                    className="checkbox w-5 h-5"
                    onChange={(e) => handleSelectAllEmployees(e.target.checked)}
                    checked={
                      Object.keys(selectedEmployeeIds).length ===
                      employees.length &&
                      employees.every(
                        (employee) => selectedEmployeeIds[employee._id]
                      )
                    }
                  />
                  <span className="ml-4">Select All</span>
                </div>
                {employees.map((employee) => (
                  <div
                    key={employee._id}
                    className="flex justify-start items-center p-1"
                  >
                    <input
                      type="checkbox"
                      className="checkbox w-5 h-5"
                      onChange={() => toggleEmployeeSelection(employee._id)}
                      checked={!!selectedEmployeeIds[employee._id]}
                    />
                    <span className="ml-4">
                      {employee.firstName} {employee.lastName}
                    </span>
                  </div>
                ))}
              </div>
              <div className="modal-action justify-start">
                <button className="btn btn-primary " onClick={handleSendSurvey}>
                  Send Survey
                </button>
              </div>
            </div>
          </div>
        </SendModal>
      )}
    </>
  );
};

export default SurveyList2;
