import React from 'react';
import Sidebar from '../components/Base/Sidebar';
import PageTitle from '../components/Base/PageTitle';
import Sidebar2 from '../components/Base/Sidebar2';
import MyAccountDashboard from '../components/MyAccount/MyAccountDashboard';

const MyAccount = () => {
    return (
<Sidebar2 title="Mon compte" >
            <div className='  mt-3 ml-1'>
            <h1 className="font-bold text-3xl mb-1 text-bsrate">Mon compte </h1>
                <p className=" text-md mb-6 text-black">Toutes les enquêtes envoyées à vos employés.</p>
                </div>
            <div className="px-1">
                <MyAccountDashboard />
            </div>
    </Sidebar2>
    );
};

export default MyAccount;
