import React from 'react';
import { HomeIcon, DocumentPlusIcon, UserPlusIcon, ChartPieIcon, BuildingOfficeIcon, DocumentDuplicateIcon, LifebuoyIcon, UsersIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'

const HomeCard = () => {
    const introduction = {
        title: "Bienvenue sur BackStageRate",
        description: "Réduisez votre taux de rotation du personnel grâce à BackStageRate. Créez des enquêtes personnalisées, collectez des commentaires précieux, et améliorez la satisfaction de vos employés."
    };

    const navigationItems = [

        {
            label: "Ajouter des employés",
            href: "/employees",
            icon: UserPlusIcon // Example icon for "Avatar"
        },
                {
            label: "Créer une enquête",
            href: "/new-survey",
            icon: DocumentPlusIcon // Example icon for "Alert"
        },
        {
            label: "Voir tous les résultats",
            href: "/surveys",
            icon: ChartPieIcon // Example icon for "Badge"
        },
        // {
        //     label: "Les infos de mon entreprise",
        //     href: "/settings",
        //     icon: BuildingOfficeIcon // Example icon for "Button"
        // }
    ];

    return (
        <div className="flex  w-full items-stretch  rounded-lg overflow-hidden  gap-4">
            <div className=" w-2/3 bg-white  flex flex-row border rounded-lg border-bsrate last:border-0 ">
                <img src='images/onboarding-img.jpg' alt='Onboarding Image' className='w-1/2 h-52 object-cover' />
                <div className="flex flex-col p-6 py-5 gap-">
                    <h3 className="font-bold text-xl mb-2 text-bsrate">{introduction.title}</h3>
                    <p className="text-md text-slate-500 dark:text-gray-400">
                        {introduction.description}
                    </p>
                </div>
            </div>
           
            <div className=" w-1/3 bg-white border border-bsrate rounded-lg">
                <div className="flex flex-col p-6 gap-4">
                    <h3 className="font-bold tracking-tight">Comment commencer ?</h3>
                    <p className="text-sm leading-none text-gray-500 dark:text-gray-400 -mt-2">
                        Lancez vos enquêtes en quelques minutes.
                    </p>
                    <nav className="flex flex-col gap-3 text-sm pt-1.5 ">
                        {navigationItems.map((item, index) => (
                            <a key={index}
                                className="flex items-center gap-5 text-slate-800 hover:text-indigo-600 font-normal rounded-md transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href={item.href}>
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default HomeCard;
