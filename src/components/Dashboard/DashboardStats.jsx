import React from 'react';
import StatsCard from '../Base/StatsCard';
import { HomeIcon, DocumentPlusIcon, DocumentDuplicateIcon, LifebuoyIcon, UsersIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import TotalEmployeesStat from '../Stats/TotalEmployeesStat';

const statsData = [
    {
        title: 'Enquêtes lancées',
        Icon: HomeIcon,
        mainText: '3',
        subText: 'dont 1 les 30 derniers jours'
    },
    {
        title: 'Total réponses',
        Icon: HomeIcon,
        mainText: '43',
        subText: '65% en moyenne par enquête'
    },
    {
        title: 'Satisfaction moyenne',
        Icon: HomeIcon,
        mainText: '74%',
        subText: 'sur 3 enquêtes lancées'
    },
    
];

const DashboardStats = () => {
    return (
        <div className=" w-full gap-4 grid grid-cols-3">
            <TotalEmployeesStat />
                        <TotalEmployeesStat />

                        <TotalEmployeesStat />

            {/* {statsData.map((stat, index) => (
                <div key={index} className="w-full md:w-1/3 ">
                    <StatsCard
                        title={stat.title}
                        Icon={stat.Icon}
                        mainText={stat.mainText}
                        subText={stat.subText}
                    />
                </div>
            ))} */}
        </div>
    );
};

export default DashboardStats;
