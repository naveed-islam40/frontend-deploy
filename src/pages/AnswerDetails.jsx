import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AnswerDetails = () => {
    const { surveySendId } = useParams()
    const [answerDetails, setAnswerDetails] = useState([])
    useEffect(() => {
        const fetchingSurveyDetails = async () => {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v2/survey/answerdetails/${surveySendId}`)

            if (response) {
                setAnswerDetails(response.data)
            }
        }
        fetchingSurveyDetails()
    }, [])
    return (
        <div>AnswerDetails</div>
    )
}

export default AnswerDetails