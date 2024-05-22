import React, { useState } from 'react';
import { ChevronDownIcon, FilterIcon, DocumentDuplicateIcon, LifebuoyIcon, UsersIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'


const Filter = ({ filters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterValues, setFilterValues] = useState(filters.reduce((acc, filter) => ({
    ...acc,
    [filter.id]: filter.value
  }), {}));

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleChange = (id, value) => {
    setFilterValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div>
      <button onClick={toggleDropdown} className="inline-flex text-sm font-medium items-center px-2 py-1.5 pr-3 bg-white hover:bg-slate-50 transition  border rounded-md">
        <UsersIcon className="mr-2 w-4 h-4" /> {/* Icon */}
        Catégories
      </button>
      {isOpen && (
        <div className="absolute mt-1 p-2 bg-white border rounded shadow-lg">
          {filters.map((filter) => (
            <div key={filter.id} className="flex flex-col">
              <label htmlFor={filter.id}>{filter.label}:</label>
              <input
                type="text"
                id={filter.id}
                placeholder={filter.placeholder}
                value={filterValues[filter.id]}
                onChange={(e) => handleChange(filter.id, e.target.value)}
                className="mb-2 p-1 border rounded"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;