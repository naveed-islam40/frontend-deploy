import React from 'react'
import { Link } from 'react-router-dom'

const SendSurveyMails = () => {
  return (
    <div className='flex items-center justify-center h-screen flex-col'>
      <h1 className='font-semibold text-[20px]'>Emails Send to Employees</h1>
      <Link to='/dashboard' className='text-decoration-line: none py-3 px-[40px] bg-[#8080806e] mt-4 rounded-sm font-semibold'>Go to Dashboard</Link>
    </div>
  )
}

export default SendSurveyMails
