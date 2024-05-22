import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import AddSurveyNickName from "./addSurveyNickName";
import axios from "axios";

const AddEmpForm = ({ isSurveyModalOpen, setIsSurveyModalOpen }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState("empForm");
  const [employees, setEmployees] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [filterEmployee, setFilterEmployee] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Update modalOpen state only if isModalOpen prop changes
  if (isSurveyModalOpen !== modalOpen) {
    setModalOpen(isSurveyModalOpen);
  }

  const handleNext = () => {
    setCurrentForm("surveyNickName");
    localStorage.setItem("selectedEmployee", selectedEmployees);
    localStorage.setItem("totalEmployees", selectedEmployees.length);
  };

  const handleClose = () => {
    setIsSurveyModalOpen(false);
  };

  const companyId = localStorage.getItem("companyId");

  // Fetching all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v2/employees/${companyId}`
        );
        setEmployees(response.data.employees);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedEmployees(
      selectAll ? [] : employees.map((employee) => employee.email)
    );
  };

  const handleEmployeeSelect = (email) => {
    if (selectedEmployees.includes(email)) {
      setSelectedEmployees(selectedEmployees.filter((emp) => emp !== email));
    } else {
      setSelectedEmployees([...selectedEmployees, email]);
    }
  };

  const filteredByDepartment = (searchKeyword) => {
    const filteredEmployees = employees.filter((employee) => {
      const department = employee.department.toLowerCase();
      return department.startsWith(searchKeyword.toLowerCase());
    });
    setFilteredEmployees(filteredEmployees);
  };

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  return (
    <div className="Box rounded-xl mx-7">
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleClose}
        style={{
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            padding: "0 0px",
          },
          content: {
            width: "50%",
            height: "auto",
            borderRadius: "10px",
            overflow: "auto",
            margin: "auto",
            padding: "0 0px",
          },
        }}
      >
        <div className="box p-0">
          <div className="flex flex-row justify-between">
            <div>
            <h1 className="font-bold mt-6 mx-6 text-2xl">Envoyer l'enquête</h1>
            <p className="text-md mx-6 text-slate-600">Sélectionner les employés à qui envoyer cette enquête.</p>
            </div>
          <div className="flex mt-2 mr-2 justify-end mb-4">
            <button
              className="bg-slate-100 text-slate-500 rounded-full  h-8 w-8 text-xs hover:bg-slate-200  "
              onClick={handleClose}
            >
              X
            </button>
            </div>
            </div>
          {currentForm === "empForm" && (
            <div>
              <div className="EmployeeFilter mt-4 mx-6">
                <input
                  type="text"
                  placeholder="Rechercher par département"
                  value={filterEmployee}
                  onChange={(e) => {
                    setFilterEmployee(e.target.value);
                    filteredByDepartment(e.target.value);
                  }}
                  className="input input-sm input-bordered w-full max-w-xs"
                />
              </div>
              <div className="overflow-x-auto mt-6 ">
                <table className="table table-sm w-full">
                  <thead>
                    <tr>
                      <th>
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />
                        </label>
                      </th>
                      <th>Email</th>
                      <th>Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee, index) => (
                      <tr key={index}>
                        <th>
                          <label>
                            <input
                              type="checkbox"
                              className="checkbox"
                              checked={selectedEmployees.includes(employee.email)}
                              onChange={() => handleEmployeeSelect(employee.email)}
                            />
                          </label>
                        </th>
                        <td>{employee.email}</td>
                        <td>{employee.department}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-full flex px-8 pt-6 items-center justify-center"> 
              <button
                className="btn btn-primary w-full mb-4 items-center justify-center"
                onClick={handleNext}
              >
                Suivant →
                
                </button>
                </div>
            </div>
          )}
          {currentForm === "surveyNickName" && (
            <AddSurveyNickName
              currentForm={currentForm}
              setCurrentForm={setCurrentForm}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AddEmpForm;
