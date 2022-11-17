import React, { useState, useEffect } from "react";
import {
  DashboardLayout,
  LoadingSpinner,
  Mobile_SidebarHeader,
} from "../../components";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@supabase/auth-helpers-react";
import { getUserByEmail, logoutUser } from "../../config/supabaseFunctions";
import { setCurrentUser } from "../../redux/currentUser";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

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

  const handleLogout = async () => {
    const { error } = await logoutUser();
    localStorage.clear();
    if (!error) router.push("/");
  };

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

          <button
            onClick={handleLogout}
            className="sm:hidden flex w-full py-2 bg-red-200 rounded-md items-center justify-center"
          >
            <div className="flex items-center">
              <ArrowRightOnRectangleIcon className="w-6 h-6 text-red-500" />
              <p className="ml-2 text-red-500">Logout</p>
            </div>
          </button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Account;
