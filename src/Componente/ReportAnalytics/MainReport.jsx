import React from 'react';
import { FaSearch } from 'react-icons/fa';
import ReportCard from './ReportCard';

const MainReport = () => {
  return (
    <>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2  className="mb-0 fw-bold mt-2">Report Analytics Dashboard</h2>
      
     </div>
       <ReportCard/>
     
       </>
  );
};

export default MainReport;