import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { SurveyContext } from "../../surveyContext";
import AddEmpForm from "./addEmpForm";

const AddSurveyNickName = ({ currentForm, setCurrentForm }) => {
  const [nickName, setNickName] = useState("")
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false)
  const { survey } = useContext(SurveyContext);


  const navigate = useNavigate();
  const adminId = localStorage.getItem("userId");
  const token = localStorage.getItem("surveyToken");
  const employeeEmails = localStorage.getItem("selectedEmployee");
  const totalEmployees = localStorage.getItem("totalEmployees");
  const surveyId = localStorage.getItem("surveyId")

  console.log("SurveyID", surveyId)
  const handleSendMails = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v2/survey/surveyinvitations/${adminId}/${token}`,
        { employeeEmails, nickName, surveyId }
      );
      if (response) {
        localStorage.setItem("totalMails", response.data.tottalMails)
        localStorage.removeItem("selectedEmployee");
        localStorage.removeItem("totalEmployees");
        localStorage.removeItem("surveyId")
        toast.success("Email send to Employees");
        navigate("/send-survey-mails");
      }
    } catch (error) {
      console.error("Error while sending backend", error.message)
    }
  };

  const handleBack = () => {
    setCurrentForm("empForm")
    setIsSurveyModalOpen(true)
  }

  return (
    <Fragment>
      {currentForm === "surveyNickName" ? <div className="box">
        <div className="box px-6 py-8 pb-4">
          <p className="uppercase text-sm text-slate-400 font-semibold"> Votre enquête</p>
          <p className='text-xl text-slate-900 font-bold'>{survey.name}</p>
          <div className="Nname">
            <h4 className='font-medium text-sm pb-1 pt-4'>Donnez un nom à cet envoi</h4>
            <input className="input input-bordered w-full max-w-xs " placeholder="Nom personnalisé" value={nickName} onChange={(e) => setNickName(e.target.value)} />
            <h4 className='font-normal text-md text-slate-600 pt-8'>Cette enquête sera envoyée à {totalEmployees} employé(s).</h4>
          </div>
        </div>

        <div className="grid grid-flow-col px-6 grid-col-2 gap-4 w-full ">
          <button
            className="btn w-full "
            onClick={handleBack}
          >
            Retour
          </button>
          <button
            className="btn btn-primary w-full"
            onClick={handleSendMails}
          >
            Envoyer →
            </button>
            </div>
      </div> : <AddEmpForm isSurveyModalOpen={isSurveyModalOpen} setIsSurveyModalOpen={setIsSurveyModalOpen} />}
    </Fragment>

  );
};

export default AddSurveyNickName;