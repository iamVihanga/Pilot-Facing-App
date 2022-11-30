import React from "react";
import { AdminProvider, DashboardLayout } from "../../../../components";

const Index = () => {
  return (
    <AdminProvider>
      <DashboardLayout>
        <div>Applications Page</div>
      </DashboardLayout>
    </AdminProvider>
  );
};

export default Index;
