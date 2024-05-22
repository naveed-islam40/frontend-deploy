import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import ConfirmDeleteModal from "../ui/modal";
import {
  getAllEmployees,
  addEmployee,
  addEmployeesCSV,
} from "../../services/employeeService";
import AddEmployeeModal from "./AddEmployeeModal";
import ImportEmployeesModal from "./ImportCsvModal";
import EditEmployeeModal from "./EditEmployeeModal";
import {
  PencilSquareIcon,
  TrashIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

Modal.setAppElement("#root"); // This should be set to your root app element id

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [importModalIsOpen, setImportModalIsOpen] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: '',
    department: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [employeeId, setEmployeeId] = useState("")

  const adminId = localStorage.getItem("userId")
  const companyId = localStorage.getItem("companyId")

  // fetching all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v2/employees/${companyId}`
        );
        console.log("response employees", response.data);
        const activeEmployees = response.data.employees.filter(employee => !employee.isDeleted);
        setEmployees(activeEmployees);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, [triggerRefresh]);

  // fetching Single Employee
  const fetchSingleEmployee = async (EmployeeId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v2/get-employee/${EmployeeId}`
    );
  };

  // handle Add Employee
  const handleAddEmployee = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v2/employee/register/${companyId}`,
        newEmployee // Pass newEmployee object as data payload
      );

      window.location.reload()
      localStorage.setItem("EmployeId", response.data.employee._id)
      setEmployees([...employees, response.data]);
      setAddModalIsOpen(false);
      setNewEmployee({ firstName: "", lastName: "", email: "", position: "", department: "" }); // Clear newEmployee state
      setTriggerRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleCSVUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      console.error("No file selected!");
      return;
    }
    try {
      const formData = new FormData()
      formData.append("file", selectedFile)
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v2/companies/${companyId}/employees/upload`, formData);

      window.location.reload()
      setEmployees((prevEmployee) => [...prevEmployee, ...response.data])
      // Assuming the response contains an array of employees
      setImportModalIsOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading CSV:", error);
    }
  };

  // handleUpdate Employe

  const handleUpdateEmployee = async (event, employee) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v2/update-employee/${employee._id}`,
        { employee }
      );
      if (response.ok) {
        const updatedEmployee = await response.json();
        setEmployees((prev) =>
          prev.map((emp) =>
            emp._id === updatedEmployee._id ? updatedEmployee : emp
          )
        );
        setEditingEmployee(null); // Close modal
      }
      setTriggerRefresh((prev) => !prev); // Add this line
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const getEmployeeId = (employee) => {
    setEmployeeId(employee);
    setDeleteModalIsOpen(true);
  };


  return (
    <div className="mt-0">
      <div className="flex flex-row gap-2 mb-4">
        <button
          type="button"
          onClick={() => setAddModalIsOpen(true)}
          className="btn btn-sm bg-white border border-bsrate  text-black hover:text-white hover:bg-black"
        >
          Ajouter un employé
        </button>

        <button
          type="button"
          onClick={() => setImportModalIsOpen(true)}
          className="btn btn-sm bg-bsrate hover:bg-black text-white"
        >
          Importer des employés
        </button>

        
        <input
  type="text"
  placeholder="Filtrer par département"
        value={filterTerm}
        className="input input-sm border-0  input-bordered w-full max-w-xs"
  onChange={(e) => setFilterTerm(e.target.value)}
/>
      </div>

      

      <div className="mt-3 flow-root rounded-lg bg-white ">
        <div className="inline-block border rounded-lg min-w-full py-0 align-middle sm:px-2 lg:px-0">
          <table className="table  min-w-full divide-y rounded-lg  divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-2/12  text-left  font-semibold text-bsrate sm:pl-3"
                >
                  Nom
                </th>
                <th
                  scope="col"
                  className="w-2/12  text-left font-semibold text-bsrate"
                >
                  Prénom
                </th>
                <th
                  scope="col"
                  className="w-2/12  text-left  font-semibold text-bsrate"
                >
                  Département
                </th>
                <th
                  scope="col"
                  className="w-2/12  text-left font-semibold text-bsrate"
                >
                  Poste
                </th>
                <th
                  scope="col"
                  className="w-3/12  text-left font-semibold text-bsrate"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="w-3/12  text-left font-semibold text-bsrate"
                >
                  DOB
                </th>
                <th
                  scope="col"
                  className="w-3/12  text-left font-semibold text-bsrate"
                >
                  Sexe
                </th>
                <th
                  scope="col"
                  className="w-1/12  text-left font-semibold text-bsrate"
                ></th>
              </tr>
            </thead>
            <tbody>
                {employees && employees
    .filter((employee) => 
        !filterTerm || 
        (employee.department && employee.department.toLowerCase().includes(filterTerm.toLowerCase()))
    )
    .sort((a, b) => a.lastName.localeCompare(b.lastName))
    .map((employee) => (
                <tr key={employee._id || employee.email}>
                  <td className="whitespace-nowrap w-2/12  py-0 font-medium text-slate-800">
                    {employee.lastName}
                  </td>
                  <td className="whitespace-nowrap w-2/12  py-0 font-medium text-slate-800">
                    {employee.firstName}
                  </td>
                  <td className="whitespace-nowrap w-2/12  py-0 text-slate-800">
                    {employee.department}
                  </td>
                  <td className="whitespace-nowrap w-2/12  py-0 text-slate-800">
                  {employee.position}
                  </td>
                  <td className="whitespace-nowrap w-2/12  py-0 text-slate-800">
                    {employee.email}
                  </td>
                  <td className="whitespace-nowrap w-2/12  py-0 text-slate-800">
                    {employee.dob ? new Date(employee.dob).toLocaleDateString('fr-FR') : ''}
                  </td>
                  <td className="whitespace-nowrap w-2/12  py-0 text-slate-800">
                    {employee.gender}
                  </td>
                  <td className="relative whitespace-nowrap py-0 text-right text-sm font-medium">
                    <td className="items-center align-middle">
                      <button
                        className=""
                        onClick={() => setEditingEmployee(employee)}
                      >
                        <PencilSquareIcon className="h-5 w-5 hover:text-indigo-600 text-bsrate transition"></PencilSquareIcon>
                      </button>
                      <button
                        className=""
                        onClick={() => getEmployeeId(employee._id)}
                        style={{ marginLeft: "10px" }}
                      >
                        <TrashIcon className="h-5 w-5 hover:text-red-600 transition"></TrashIcon>
                      </button>
                    </td>
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
          <ConfirmDeleteModal
            isOpen={deleteModalIsOpen}
            onClose={() => setDeleteModalIsOpen(false)}
            onConfirm={employeeId}
          />
        </div>
      </div>

      <AddEmployeeModal
        modalIsOpen={addModalIsOpen}
        closeModal={() => setAddModalIsOpen(false)}
        newEmployee={newEmployee}
        setNewEmployee={setNewEmployee}
        handleSubmit={handleAddEmployee}
      />

      <ImportEmployeesModal
        modalIsOpen={importModalIsOpen}
        closeModal={() => setImportModalIsOpen(false)}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        handleSubmit={handleCSVUpload}
        companyId={companyId}
      />

      {editingEmployee && (
        <EditEmployeeModal
          modalIsOpen={!!editingEmployee}
          closeModal={() => setEditingEmployee(null)}
          employee={editingEmployee}
          setEmployee={setEditingEmployee}
          handleSubmit={handleUpdateEmployee}
          EmployeeId={employeeId}
        />
      )}
    </div>
  );
};

export default EmployeesList;