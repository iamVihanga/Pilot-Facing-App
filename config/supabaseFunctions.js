import supabase from "./supabaseClient";
import customerClient from "./customerClient";
import { EncryptPassword } from "../utils/passwordSecure";

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
