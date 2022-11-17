import React, { useState, useEffect } from "react";
import {
  DashboardLayout,
  LoadingSpinner,
  Mobile_SidebarHeader,
} from "../../components";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@supabase/auth-helpers-react";
import { getUserByEmail } from "../../config/supabaseFunctions";
import { setCurrentUser } from "../../redux/currentUser";

// Sections
import AccountSettings from "../../components/AccountPage_Sections/AccountSettings";
import ProfileSettings from "../../components/AccountPage_Sections/ProfileSettings";
import BillingSection from "../../components/AccountPage_Sections/BillingSection";

const Account = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useUser();
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector((state) => state.currentUser.currentUser);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        setLoading(true);
        const { data, error } = await getUserByEmail(user.email);
        if (error) return;

        dispatch(setCurrentUser(data[0]));
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    if (Object.keys(currentUser).length === 0 && user !== null) {
      initializeUser();
    }
  }, [user]);

  return (
    <DashboardLayout
      headerComponent={
        <Mobile_SidebarHeader
          onBackPress={() => router.back()}
          centerComponent={<h2 className="font-semibold">Account</h2>}
        />
      }
    >
      {loading && (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner width={6} height={6} color="primaryTeal" />
        </div>
      )}

      {Object.keys(currentUser).length !== 0 && (
        <div className="w-full h-full px-4 py-8">
          {/* Section 1 */}
          <AccountSettings user={currentUser} />

          {/* Profile Section */}
          <ProfileSettings user={currentUser} />

          {/* Billing Section */}
          <BillingSection user={currentUser} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Account;
