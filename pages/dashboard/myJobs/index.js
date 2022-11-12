import React from "react";
import { DashboardLayout, JobListLayout } from "../../../components";
import { getJobListing } from "../../../config/supabaseFunctions";

const MyJobs = ({ jobListing }) => {
  return (
    <DashboardLayout
      headerComponent={
        <div className="lg:hidden w-full z-10 fixed flex items-center justify-center bg-white shadow-md">
          <img
            src={"/assets/Duber logo.svg"}
            alt="logo"
            className="w-32 mt-4 mb-4"
          />
        </div>
      }
    >
      <JobListLayout data={jobListing} />
    </DashboardLayout>
  );
};

export default MyJobs;

export async function getServerSideProps() {
  const { data, error } = await getJobListing();

  return {
    props: {
      jobListing: data,
    },
  };
}
