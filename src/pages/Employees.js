import React from 'react';
import Sidebar from '../components/Base/Sidebar';
import PageTitle from '../components/Base/PageTitle';
import EmployeesList from '../components/Employees/employees-list';
import Sidebar2 from '../components/Base/Sidebar2';
import TotalEmployeesStat from '../components/Stats/TotalEmployeesStat';

const Employees = () => {
    return (
<Sidebar2 title="Employés" >
            <div className="">
                            <div className='  mt-3 ml-1 '>
            <h1 className="font-bold text-3xl mb-1 text-bsrate">Collaborateurs </h1>
                <p className=" text-md mb-3 text-slate-600">Toutes les enquêtes envoyées à vos employés.</p>
                </div>
                <div className='w-full pt-2 w-full'>
                    <div className='w-4/4 px-2'>
                        <EmployeesList />
                        </div>
                   
                    
                </div>
                </div>
        </Sidebar2>
    );
};

export default Employees;
