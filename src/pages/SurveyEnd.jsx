import React from 'react'
import { EyeSlashIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';


const SurveyEnd = () => {
    return (
         <div className='p-6 pt-3 w-full flex flex-col justify-center items-center  h-screen  bg-slate-100'>
            <img src='/images/bsr-logo.png' alt='survey' className='w-32 absolute left-6 top-2.5 '></img>
            <div className='badge mb-3 text-center border-slate-200 text-xs p-3 bg-slate-50 text-slate-500'><EyeSlashIcon className='w-4 h-4 mr-2'></EyeSlashIcon>  Vos réponses sont anonymes</div>
            <div className='flex flex-col h-full w-full px-6 rounded-lg shadow align-top top-0 items-center justify-center    bg-white'>
                <CheckBadgeIcon className='w-8 h-8 mb-2 -mt-8 mr-2 text-green-600'></CheckBadgeIcon>
                <h1 className='text-2xl text-slate-900 font-bold mb-2'>Merci d'avoir répondu à cette enquête ! </h1>
               <h1 className='text-md text-slate-600 font-normal text-center'>Vos réponses resteront toujours anonymes et seront utilisées par l'entreprise d'améliorer la qualité de travail. </h1>
            </div>
            </div>
    )
}

export default SurveyEnd