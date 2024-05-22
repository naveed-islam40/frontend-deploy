import React from 'react';
import { HomeIcon, DocumentPlusIcon, UserPlusIcon, ChartPieIcon, BuildingOfficeIcon, DocumentDuplicateIcon, LifebuoyIcon, UsersIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'

const TwoCards = () => {
    const card1 = {
        title: "Tous nos conseils",
        description: "Retrouvez tous nos conseils pour vous aider à réaliser des enquêtes et des évaluations de performance au sein de votre entreprise."
    };
        const card2 = {
        title: "Besoin d'aide ?",
        description: "Vous avez besoin d'aide pour réaliser une enquête ou une évaluation de performance ? Contactez notre service client."
    };


  
    return (
        <div className="flex  w-full  rounded-lg overflow-hidden dark:border-gray-800 gap-4">
            <div className=" w-1/2 bg-white border-slate-200 flex flex-row border rounded-lg  ">
                <img src='images/dash-1.png' alt='Onboarding Image' className='w-1/2 h-40 object-cover' />
                <div className="flex flex-col p-4 pl-8">
                    <h3 className="font-bold text-sm mb-2 pt-2 text-slate-900">{card1.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400">
                        {card1.description}
                    </p>
                    <a href="#" className="text-sm pt-2 text-indigo-600 hover:underline">En savoir plus</a>
                </div>
            </div>
 <div className=" w-1/2 bg-white border-slate-200 flex flex-row border rounded-lg  ">
                <img src='images/dash-2.png' alt='Onboarding Image' className='w-1/2 h-40 object-cover rounded-tl rounded-bl' />
                <div className="flex flex-col p-4 pl-8">
                    <h3 className="font-bold text-sm mb-2 pt-1 text-slate-900">{card2.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400">
                        {card2.description}
                    </p>
                <a href="#" className="text-sm pt-2 text-indigo-600 hover:underline">Nous contacter →</a>
                </div>
            </div>
           
           
        </div>
    );
};

export default TwoCards;
