import React, { useState, useEffect } from "react";
import { updateForgotPassword } from "../../config/supabaseFunctions";

const ForgotPassword = () => {
  const [password, setPassword] = useState(null);

  const [hash, setHash] = useState(null);

  useEffect(() => {
    setHash(window.location.hash);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!hash) {
        console.log("No Hash");
        return;
      } else if (hash) {
        const hashArr = hash
          .substring(1)
          .split("&")
          .map((param) => param.split("="));

        let type;
        let accessToken;
        for (const [key, value] of hashArr) {
          if (key === "type") {
            type = value;
          } else if (key === "access_token") {
            accessToken = value;
          }
        }

        if (
          type !== "recovery" ||
          !accessToken ||
          typeof accessToken === "object"
        ) {
          console.log("Invalid access token or type", {
            id: notification,
          });
          return;
        }

        const { error } = await updateForgotPassword(password, accessToken);

        if (error) {
          console.log(error.message);
        } else if (!error) {
          console.log("Password Changed", {
            id: notification,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="password"
          required
          value={password}
          placeholder="Please enter your Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
