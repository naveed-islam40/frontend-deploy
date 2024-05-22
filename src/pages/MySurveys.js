import React, { useEffect, useState } from "react";
import Sidebar2 from "../components/Base/Sidebar2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SurveyResultsModal from "../components/Surveys/SurveyResultsModal";

const MySurveys = () => {
    const navigate = useNavigate();
    const [surveysSend, setSurveysSend] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const adminId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchingSendedSurvey = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/v2/survey/sended/${adminId}`
                );
                setSurveysSend(response.data.surveys);
                console.log(response.data.surveys);
            } catch (error) {
                console.error("Error", error.message);
            }
        };
        fetchingSendedSurvey();
    }, [adminId]);


    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };
    const openModal = (survey) => {
        setSelectedSurvey(survey);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSurvey(null);
    };

    return (
        <Sidebar2 title="Mes enquêtes">
            <div className='mt-3 ml-1'>
                <h1 className="font-bold text-3xl mb-1 text-bsrate">Enquêtes réalisées</h1>
                <p className="text-md mb-5 text-black">Toutes les enquêtes envoyées à vos employés.</p>
                <div className="px-1">
                    <input
                        type="text"
                        className="input input-sm input-bordered w-full max-w-xs mb-4"
                        placeholder="Recherchez une enquête..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="grid grid-cols-3 gap-y-4">
                    {surveysSend &&
                        surveysSend.map((survey, index) => (
                            <div className="card w-96 bg-base-100 border border-slate-100 hover:shadow transition" key={index} style={{ margin: "0 0px" }}>
                                <div className="p-6">
                                    <h2 className="text-md font-bold">{survey?.surveyNickname}</h2>
                                    <p className="text-sm font-normal mt-3 mb-0.5 text-slate-600"> Date d'envoi: {new Date(survey.sendDate).toISOString().substring(0, 10)}</p>
                                    <p className="text-sm font-normal mb-1 text-slate-600">
                                        Réponses : {survey.usedTokens?.length > 0 ? survey.usedTokens.length : "0"}  / {survey.sent_to}
                                    </p>
                                    <progress
                                        className="progress progress-primary w-full mb-0 mt-6"
                                        value={(survey.usedTokens?.length / survey.sent_to) * 100}
                                        max="100"
                                    ></progress>
                                    <div className="card-actions justify-start mt-2">
                                        <button className="text-slate-600 text-sm text-bold hover:text-indigo-600 transition" onClick={() => openModal(survey)}>
                                            Voir les résultats →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {selectedSurvey && (
                    <SurveyResultsModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        survey={selectedSurvey}
                    />
                )}
            </div>
        </Sidebar2>
    );
};

export default MySurveys;