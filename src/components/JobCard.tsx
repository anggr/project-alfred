import React from "react";

interface Job {
  clientID: string;
  name: string;
  description: string;
  address: string;
}

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 max-w-sm mx-auto my-4">
      <h3 className="text-lg font-semibold">{job.name}</h3>
      <p className="text-gray-800 mt-2">{job.description}</p>
      <div className="mt-4">
        <p className="text-gray-600 text-sm">Client ID: {job.clientID}</p>
        <p className="text-gray-600 text-sm">Address: {job.address}</p>
      </div>
    </div>
  );
};

export default JobCard;
