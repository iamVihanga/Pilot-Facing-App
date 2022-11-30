import React, { useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const AdminProvider = ({ children }) => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (!user.user_metadata?.isAdmin) router.back();
    }
  }, [user]);

  return <div>{children}</div>;
};

export default AdminProvider;
