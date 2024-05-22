import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EyeSlashIcon } from '@heroicons/react/24/outline';


const SurveyQuestionPage = () => {
    const navigate = useNavigate()
    const [survey, setSurvey] = useState({})

    const { surveyId, surveySendId, token, employeeId } = useParams()

    useEffect(() => {
        const fetchingSurvey = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v2/surveybyid/${surveyId}`)
            console.log(response)
            if (response) {
                setSurvey(response.data)
            }
        }
        fetchingSurvey()
    }, [])

    console.log(surveySendId)

    const handleMoveToQuestionPage = () => {
        navigate(`/surveys/${surveyId}/${surveySendId}/${employeeId}/${token}`)
    }

    return (
        <div className='p-6 pt-3 w-full flex flex-col justify-center items-center  h-screen  bg-slate-100'>
            <img src='/images/bsr-logo.png' alt='survey' className='w-32 absolute left-6 top-2.5 '></img>
            <div className='badge mb-3 text-center border-slate-200 text-xs p-3 bg-slate-50 text-slate-500'><EyeSlashIcon className='w-4 h-4 mr-2'></EyeSlashIcon>  Vos réponses sont anonymes</div>
            <div className='flex flex-col h-full w-full px-6 rounded-lg shadow align-top top-0 items-center justify-center    bg-white'>
                <div className=''>
                    {survey && <div className='flex flex-col text-center items-center justify-center align-middle'>
                        <p className='text-md border badge p-3 -mt-4 border-indigo-300 text-indigo-600 w-fit justify-center align-middle items-center mb-4'>{survey.category}</p>
                        <p className='text-slate-900 text-4xl font-bold'>{survey.name}</p>
                        <p className='text-lg text-slate-600 my-3'>{survey.description}</p>
                        <div className='flex flex-col w-full justify-center align-middle items-center'>
                            <button className='btn btn-primary bg-indigo-700 absolute bottom-12 w-72' onClick={handleMoveToQuestionPage}>Répondre à l'enquête →</button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default SurveyQuestionPage