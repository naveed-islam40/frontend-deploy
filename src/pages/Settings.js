import React from "react";
import Sidebar from "../components/Base/Sidebar";
import PageTitle from "../components/Base/PageTitle";
import SettingsDashboard from "../components/Settings/SettingsList";
import Sidebar2 from "../components/Base/Sidebar2";

const Settings = () => {
  return (
    <Sidebar2 title="Réglages">
      <div className='  mt-3 ml-1'>
            <h1 className="font-bold text-3xl mb-1 text-bsrate">Réglages </h1>
                <p className=" text-md mb-4 text-slate-600">Toutes les enquêtes envoyées à vos employés.</p>
        </div>
      <div className="py-2 px-1">
        <SettingsDashboard />
      </div>
    </Sidebar2>
  );
};

export default Settings;
