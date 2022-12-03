import supabase from "./supabaseClient";
import customerClient from "./customerClient";
import { EncryptPassword } from "../utils/passwordSecure";
import axios from "axios";

export const insertToUsers = async (formData) => {
  let { data, error } = await supabase.from("Employees").insert(formData);

  return { data, error };
};

export const updateUser = async (formData, email) => {
  let { error } = await supabase
    .from("Employees")
    .update(formData)
    .eq("email", email);

  return { error };
};

export const uploadProofFile = async (file, username) => {
  let { data, error } = await supabase.storage
    .from("proof-files")
    .upload(`${username}/${file.name}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  return { data, error };
};

export const getUserByEmail = async (email) => {
  let { data, error } = await supabase
    .from("Employees")
    .select()
    .eq("email", email);

  return { data, error };
};

export const logoutUser = async () => {
  let { error } = await supabase.auth.signOut();

  return { error };
};

export const getDrones = async () => {
  let { data, error } = await supabase.from("DroneEquipment").select(`
            id,
            model,
            brand (
                name
            )
        `);

  return { data, error };
};

export const signupUser = async (credentials) => {
  const { data, error } = await supabase.auth.signUp(credentials);

  return { data, error };
};

export const signinUser = async (credentials) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  return { data, error };
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  return { data, error };
};

export const updateAuthEmail = async (emailToUpdate) => {
  const { data, error } = await supabase.auth.updateUser({
    email: emailToUpdate,
  });

  // if (!error) {
  //   const res = await supabase
  //     .from("Employees")
  //     .update({ email: emailToUpdate })
  //     .eq("email", data.user.email);

  //   console.log(res);
  // }

  return { data, error };
};

export const getUserDetails = async (email) => {
  const { data, error } = await supabase
    .from("Employees")
    .select("*")
    .eq("email", email);

  return { data, error };
};

export const getJobListing = async () => {
  const res = await supabase.from("Jobs").select();

  return res;
};

export const getSingleJob = async (jobID) => {
  const res = await customerClient
    .from("Orders")
    .select(
      `
            pilotExpertize,
            id,
            address,
            date,
            customerID (
                firstName,
                lastName,
                email,
                phoneNumber,
                companyName
            ),
            mapData,
            area,
            customerNote,
            status,
            arrivalTime
        `
    )
    .eq("id", jobID);

  return res;
};

export const completeJob = async (files, jobID) => {
  // Upload files one by one
  const result = await Promise.all(
    files.map(async (file) => {
      const res = await customerClient.storage
        .from("order-assets")
        .upload(`Order-${jobID}/${file.name}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (res.error) throw new Error(`File ${file.name} Upload failed !`);

      if (res.data) return file.name;
    })
  );

  return result;
};

export const updateProfilePicture = async (file, userId) => {
  const random_int = Math.floor(Math.random() * 100000);

  const res = await supabase.storage
    .from("profile-pics")
    .upload(`pilot-${userId}/${random_int}-${file.name}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (!res.error) {
    await supabase
      .from("Employees")
      .update({ profilePic: res.data.path })
      .eq("id", userId);
  }

  return res;
};

export const updateUserPassword = async (newPassword, email) => {
  const res = await supabase.auth.updateUser({ password: newPassword });

  if (!res.error) {
    await supabase
      .from("Employees")
      .update({ password: EncryptPassword(newPassword) })
      .eq("email", email);
  }

  return res;
};

export const handlePasswordReset = async (email, redirectUrl) => {
  const res = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  });

  return res;
};

export const updateForgotPassword = async (password) => {
  const { user, error } = await supabase.auth.updateUser({
    password: password,
  });

  return { user, error };
};

// =====================================================
// ------------------ ADMIN FUNCTIONS ------------------
// =====================================================
export const getAllEmployees = async () => {
  const res = await supabase.from("Employees").select();

  return res;
};

export const declinePilot = async (id) => {
  const res = await supabase
    .from("Employees")
    .update({
      approved: false,
      declined: true,
    })
    .eq("id", id);

  return res;
};

export const acceptPilot = async (email) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/admin/signup-pilot`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    }
  );

  const data = await res.json();
  console.log(data);

  return data;
};

export const allDronePilots = async () => {
  try {
    let dataSet = [];

    // Get Pilot details
    const { data: pilotDetails, error: pilotDetailsError } = await supabase
      .from("Employees")
      .select()
      .eq("approved", true);
    if (pilotDetailsError) throw new Error("Get all pilots fetching failed");

    // Get each pilot billing details and order details
    await Promise.all(
      pilotDetails.map(async (pilot) => {
        // Fetching billing address
        const { data: billingData, error: billingDataError } = await supabase
          .from("EmployeeBilling")
          .select()
          .eq("userId", pilot.id);

        if (billingDataError) throw new Error("Get billing data error");

        // Fetching Orders
        const { data: jobsData, error: jobsError } = await supabase
          .from("Jobs")
          .select()
          .eq("pilotID", pilot.id);

        if (jobsError) throw new Error("Get jobs data error");

        dataSet.push({ pilot, billing: billingData[0], jobs: jobsData });
      })
    );

    return {
      data: dataSet,
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
};

export const getEachPilotLocation = async (pilotLost) => {
  let coordinateList = [];

  await Promise.all(
    pilotLost.map(async (pilot) => {
      if (pilot.billing !== undefined) {
        if (pilot.billing.street !== null) {
          let address_text = `${pilot.billing.street}, ${pilot.billing.city}, ${pilot.billing.country}`;

          const location_res = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${address_text}.json?access_token=${process.env.NEXT_MAPBOX_TOKEN}&country=gb`
          );
          const location_data = await location_res.json();

          coordinateList.push({
            pilot: `${pilot.pilot.firstName} ${pilot.pilot.lastName}`,
            location: location_data?.features[0],
          });
        }
      }
    })
  );

  return coordinateList;
};
