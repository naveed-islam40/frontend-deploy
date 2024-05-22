import React, { useState } from 'react';
import Sidebar from '../components/Base/Sidebar';
import PageTitle from '../components/Base/PageTitle';
import SurveysDefault from '../components/NewSurveys/SurveysDefault';
import AddSurvey from '../components/NewSurveys/AddSurvey';
import Filter from '../components/Base/Filter';
import Sidebar2 from '../components/Base/Sidebar2';
import SurveyList2 from '../components/Surveys/SurveyList2';
import CreateSurveyForm from '../components/Surveys/CreateSurveyForm';
import Modal from 'react-modal';
import AddEmpForm from '../components/ui/addEmpForm';
import AddSurveyNickName from '../components/ui/addSurveyNickName';

Modal.setAppElement("#root");

const NewSurvey = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentForm, setCurrentForm] = useState("empForm"); // This now controls which form to show

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <Sidebar2 openModal={openModal} title="Toutes les enquêtes" >
            <div className='  mt-3 ml-1'>
            <h1 className="font-bold text-3xl mb-1 text-bsrate">Toutes les enquêtes </h1>
                <p className=" text-md mb-4 text-slate-600">Toutes les enquêtes envoyées à vos employés.</p>
                </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                    content: {
                        width: "60%",
                        height: "auto",
                        borderRadius: "10px",
                        overflow: "auto",
                        margin: "auto",
                    },
                }}
            >
                {currentForm === "empForm" && (
                    <AddEmpForm
                        changeForm={() => setCurrentForm("surveyNickName")}
                        closeModal={closeModal}
                    />
                )}
                {currentForm === "surveyNickName" && (
                    <AddSurveyNickName
                        changeForm={() => setCurrentForm("empForm")}
                        closeModal={closeModal}
                    />
                )}
            </Modal>
            <div className="">

                <div className="flex flex-wrap -mx-2">

                    <div className="w-full px-2 pr-1">
                        <SurveyList2 />
                    </div>
                    {/* <div className="w-1/4 px-2 mt-2">
                        <AddSurvey />

                    </div> */}
                </div>
            </div>
        </Sidebar2>

    );
};

export default NewSurvey;