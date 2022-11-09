import React from 'react'
import { DashboardLayout, Mobile_SidebarHeader } from '../../components'
import { useRouter } from "next/router";

// Sections
import AccountSettings from '../../components/AccountPage_Sections/AccountSettings'
import ProfileSettings from '../../components/AccountPage_Sections/ProfileSettings'
import BillingSection from '../../components/AccountPage_Sections/BillingSection'

const Account = () => {
    const router = useRouter()

    return (
        <DashboardLayout
            headerComponent={
                <Mobile_SidebarHeader onBackPress={() => router.back()} centerComponent={<h2 className="font-semibold">Account</h2>} />
            }
        >
            <div className="w-full h-full px-4 py-8">
                {/* Section 1 */}
                <AccountSettings />

                {/* Profile Section */}
                <ProfileSettings />

                {/* Billing Section */}
                <BillingSection />
            </div>
        </DashboardLayout>
    )
}

export default Account