import React from 'react';
import Sidebar from '../components/Base/Sidebar';
import PageTitle from '../components/Base/PageTitle';
import SettingsDashboard from '../components/Settings/SettingsList';
import SynthesisStats from '../components/Synthesis/SynthesisStats';
import Sidebar2 from '../components/Base/Sidebar2';
import LineChart from '../components/Dashboard/LineChart';
import TotalEmployeesStat from '../components/Stats/TotalEmployeesStat';

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

const Synthesis = () => {
  return (
    <Sidebar2 title="Synthèse" >
      <div className='  mt-3 ml-1'>
            <h1 className="font-bold text-3xl mb-1 text-bsrate">Synthèse</h1>
                <p className=" text-md mb-8 text-slate-600">Toutes les enquêtes envoyées à vos employés.</p>
        </div>

      <div className="">


        {/* <TotalEmployeesStat /> */}



        {/* <div className='pt-2 mb-2'><SynthesisStats /></div>
<LineChart data={chartData} /> */}

      </div>
    </Sidebar2>
  );
};

export default Synthesis;
