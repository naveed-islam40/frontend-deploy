import React from 'react';
import Sidebar from '../components/Base/Sidebar';
import PageTitle from '../components/Base/PageTitle';
import DashboardStats from '../components/Dashboard/DashboardStats';
import Activity from '../components/Dashboard/Activity';
import LineChart from '../components/Dashboard/LineChart';
import DonutChart from '../components/Dashboard/DonutChart';
import { HomeIcon, DocumentPlusIcon, DocumentDuplicateIcon, LifebuoyIcon, UsersIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import HomeCard from '../components/Dashboard/HomeCard';
import Sidebar2 from '../components/Base/Sidebar2';
import Layout from '../components/Base/Layout';
import TwoCards from '../components/Dashboard/TwoCards';


const chartData = {
  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
  datasets: [
    {
      label: 'Daily Responses',
      data: [10, 20, 30, 20, 50, 60, 70],
      borderColor: 'black',  // Black color for the line
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      fill: false,
    }
  ]
};

const chartData2 = {
  labels: ['Red', 'Yellow'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 100],
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }
  ]
};

const Dashboard = () => {
    return (
      <Sidebar2 title="Tableau de bord" >

<div className='  mt-3 ml-1'>
            <h1 className="font-bold text-3xl mb-1 text-bsrate">Tableau de bord </h1>
                <p className=" text-md mb-4 text-black">Toutes les enquêtes envoyées à vos employés.</p>
        </div>
        <div className="">
            <div className='flex flex-col md:flex-col gap-4 w-full pt-2 px-0'>
            <HomeCard />
              <div className="text-sm font-semibold leading-6 text-bsrate -mb-2 mt-3">Vos statistiques</div>
            <DashboardStats />
            <TwoCards />
                    </div>
                {/* <div className="flex flex-col md:flex-row gap-2 w-full pt-2 px-2 mt-2">
    <div className='w-full md:flex md:w-2/3 gap-4 '>
        <div className='w-full md:w-1/2'>
            <LineChart data={chartData} />
        </div>
        <div className='w-full md:w-1/2'>
            <DonutChart
                title="Survey Distribution"
                Icon={HomeIcon}
                chartData={chartData2}
            />
        </div>
    </div>
    <div className='w-full md:w-1/3 pl-2 '>
        <Activity />
    </div>
</div> */}
            </div>
        </Sidebar2>
    );
};

export default Dashboard;
