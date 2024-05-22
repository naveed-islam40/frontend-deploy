import React from 'react';
import Filter from '../Base/Filter';

 

const SurveysDefault = () => {
    const cards = [
        { image: 'images/onboarding-img.jpg', title: 'Title 1', description: 'Description 1', category: 'Category 1', progress: 25 },
        { image: 'images/onboarding-img.jpg', title: 'Title 2', description: 'Description 2', category: 'Category 2', progress: 50 },
        { image: 'images/onboarding-img.jpg', title: 'Title 3', description: 'Description 3', category: 'Category 3', progress: 75 },
        { image: 'images/onboarding-img.jpg', title: 'Title 4', description: 'Description 4', category: 'Category 4', progress: 100 }, 
    ];

    return (
        <div className="flex flex-wrap gap-0 ">

            {cards.map((card, index) => (
                <div key={index} className="w-full lg:w-full  p-2 flex-none ">
                    <div className="rounded overflow-hidden border bg-white ">
                        <div className='flex flex-row justify-between'>

                            <div className="w-1/5">
                        <img className="w-full h-32 object-cover" src={card.image} alt={card.title} />
                            </div>
                            <div className="w-4/5">
                        <div className='flex flex-row justify-between'>
                            <div className="p-4 pb-0">
                                <div className="font-bold text-lg text-slate-900 mb-0">{card.title}</div>
                                <p className="text-slate-700 text-sm">{card.description}</p>
                            </div>
                            <div className="px-4 py-4">
                                <div className="text-slate-900 font-medium text-xs bg-slate-100 py-1 px-2 rounded-full">{card.category}</div>
                            </div>
                        </div>
                       
                        <div className="px-4 py-3">
                            <button className="  hover:text-indigo-700 text-slate-900 hover:text-slate-500 transition font-medium text-sm pt-2">
                                Lancer l'enquête →
                            </button>
                                </div>
                                </div>
                            </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SurveysDefault;