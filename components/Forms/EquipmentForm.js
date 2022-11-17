import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { skills } from "../../utils/registerationData";
import { useRouter } from "next/router";
import { getDrones } from "../../config/supabaseFunctions";
import { Button, ErrorMessage } from "../";
import {
  completeForm,
  submitEquipmentForm,
  switchUpdateMode,
  setActiveForm,
} from "../../redux/registerSlice";

const EquipmentsForm = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.register);
  const router = useRouter();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [droneEquipments, setDroneEquipments] = useState([]);
  const [dronesLoading, setDronesLoading] = useState(true);

  const { register, handleSubmit } = useForm({
    defaultValues: {},
  });
  const [activeSkills, setActiveSkills] = useState(state.skills);
  const [activeEquipments, setActiveEquipments] = useState(state.equipments);

  // Load drones data when component mount
  useEffect(() => {
    setDronesLoading(true);
    try {
      const getDronesData = async () => {
        let { data, error } = await getDrones();

        if (!error) {
          setDroneEquipments(data);
          setDronesLoading(false);
        } else throw error;
      };

      getDronesData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  // ------------------------------------------------
  const validateForm = (skills, equipments) => {
    let validateError = false;

    if (skills.length === 0) {
      setError("Please select at least 1 skill");
      validateError = true;
    }

    if (equipments.length === 0) {
      setError("Please select at least 1 equipment");
      validateError = true;
    }

    if (!validateError) setError(null);

    return validateError;
  };

  // ------------------------------------------------
  // Handle Form Submit function below
  // ------------------------------------------------
  const onSubmit = async (data) => {
    const skillSet = [];
    activeSkills.map((skill) => {
      skillSet.push({ id: skill.id, text: skill.text });
    });

    const equipmentSet = [];
    activeEquipments.map((equip) => {
      equipmentSet.push({
        id: equip.id,
        brand: { name: equip.brand.name },
        model: equip.model,
      });
    });

    // --------------------------------
    // Update Database
    // --------------------------------
    try {
      // Validate
      const isError = validateForm(skillSet, equipmentSet);
      if (isError) return;

      setLoading(true);

      dispatch(
        submitEquipmentForm({
          skills: skillSet,
          equipments: equipmentSet,
        })
      );

      dispatch(completeForm(3));
      dispatch(switchUpdateMode(3));
      setLoading(false);

      if (
        state.form1_updateMode &&
        state.form2_updateMode &&
        state.form3_updateMode
      )
        dispatch(setActiveForm(4));

      // Go to confirm page
      dispatch(setActiveForm(4));
    } catch (err) {
      setLoading(false);
      setError("Something went wrong !, Please try again");
    }
  };
  // ------------------------------------------------

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
      {error && (
        <ErrorMessage className={"mt-6"} error={error} setError={setError} />
      )}
      <div className="mt-6">
        <p className="mb-5">Skill / Experience</p>
        <div className="max-w-fit flex flex-wrap gap-x-8 gap-y-5">
          {skills.map((item) => (
            <SkillCard
              key={item.id}
              item={item}
              setActiveSkills={setActiveSkills}
              activeSkills={activeSkills}
            />
          ))}
        </div>

        <p className="mt-9 mb-5">Drone Equipment</p>

        {/*  loading component */}
        {dronesLoading && (
          <div className="w-full py-12 flex items-center justify-center">
            <svg
              className="h-8 w-8 animate-spin text-skyBlue text-center"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}

        <div className="max-w-fit w-full bg-primaryBlueLight rounded-md p-3 py-6 flex flex-wrap gap-x-2 gap-y-3">
          {/* Drones data  */}
          {droneEquipments.length !== 0 &&
            droneEquipments.map((item) => (
              <EquipmentBadge
                key={item.id}
                item={item}
                setActiveEquipments={setActiveEquipments}
                activeEquipments={activeEquipments}
              />
            ))}
        </div>
      </div>

      <Button className={"mt-12"} isLoading={loading}>
        NEXT
      </Button>
    </form>
  );
};

const SkillCard = ({ item, setActiveSkills, activeSkills }) => {
  let active = false;

  activeSkills.filter((filter_item) => {
    if (filter_item.id == item.id) {
      active = true;
    }
  });

  return (
    <div
      key={item.id}
      onClick={() => {
        if (!active) {
          setActiveSkills((skills) => [...skills, item]);
        } else {
          setActiveSkills((skills) => {
            return skills.filter((skill) => skill.id !== item.id);
          });
        }
      }}
      className={`cursor-pointer flex-1 flex flex-row items-center gap-7  rounded-md px-11 py-6 ${
        active ? "active-skill" : "bg-primaryBlueLight text-primaryBlue"
      }`}
    >
      {item.icon}
      <p
        className={`text-xs text-primaryBlue ${
          active ? "text-[#2dd1b6]" : "text-primaryBlue"
        }`}
      >
        {item.text}
      </p>
    </div>
  );
};

const EquipmentBadge = ({ item, setActiveEquipments, activeEquipments }) => {
  let active;

  activeEquipments.filter((filter_item) => {
    if (filter_item.id == item.id) {
      active = true;
    }
  });

  return (
    <div>
      <p
        key={item.id}
        onClick={() => {
          if (!active) {
            setActiveEquipments((equips) => [...equips, item]);
          } else {
            setActiveEquipments((equips) => {
              return equips.filter((equip) => equip.id !== item.id);
            });
          }
        }}
        className={`text-sm  px-3 py-2 text-white rounded-md cursor-pointer  transition-all ease-in-out duration-100 ${
          active ? "bg-primaryTeal" : "bg-primaryBlue hover:bg-skyBlue"
        }`}
      >
        {item.brand.name}, {item.model}
      </p>
    </div>
  );
};

export default EquipmentsForm;
