import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";

interface Job {
  clientID: string;
  name: string;
  description: string;
  address: string;
  id: string;
}

const DashboardPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://alfred-server.up.railway.app/job/all"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
      setIsLoading(false);
    };

    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>
      {isLoading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
