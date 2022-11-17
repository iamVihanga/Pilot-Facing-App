import React, { useState } from "react";
import {
  RegisterFormNav,
  AuthLayout,
  ContactForm,
  CertificatesForm,
  EquipmentsForm,
  ConfirmRegister,
} from "../../../components";
import { useSelector } from "react-redux";

const Register = () => {
  const state = useSelector((state) => state.register);

  return (
    <div className="relative">
      <AuthLayout>
        <div className="">
          {state.active_form !== 4 && <RegisterFormNav />}

          <ActiveStep />
        </div>
      </AuthLayout>
    </div>
  );
};

export default Register;

const ActiveStep = () => {
  const state = useSelector((state) => state.register);

  // File states
  // => used to pass state component to component without uploading
  const [proofDoc, setProofDoc] = useState(null);
  const [insuranceDoc, setInsuranceDoc] = useState(null);

  switch (state.active_form) {
    case 1:
      return <ContactForm />;
    case 2:
      return (
        <CertificatesForm
          proofDoc={proofDoc}
          setProofDoc={setProofDoc}
          insuranceDoc={insuranceDoc}
          setInsuranceDoc={setInsuranceDoc}
        />
      );
    case 3:
      return <EquipmentsForm />;
    case 4:
      return (
        <ConfirmRegister proofDoc={proofDoc} insuranceDoc={insuranceDoc} />
      );

    default:
      "";
  }
};
