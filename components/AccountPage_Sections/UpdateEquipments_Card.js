import React, { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

const UpdateEquipments_Card = ({ drones, setDrones }) => {
  const { supabaseClient } = useSessionContext();

  const [showBrandMenu, setBrandMenu] = useState(false);
  const [showModalMenu, setModalMenu] = useState(false);

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  const [brandsLoading, setBrandsLoading] = useState(false);
  const [modelsLoading, setModelsLoding] = useState(false);

  // ------------ Fetch drone brands ----------
  useEffect(() => {
    const getBrands = async () => {
      try {
        setBrandsLoading(true);
        const { data, error } = await supabaseClient
          .from("DroneBrands")
          .select();

        if (error) throw error;
        if (data) {
          setBrands(data);
        }
        setBrandsLoading(false);
      } catch (err) {
        console.log(err);
        setBrandsLoading(false);
      }
    };

    getBrands();
  }, []);

  // ------------ Fetch drone brands ----------
  useEffect(() => {
    const getModels = async () => {
      setModelsLoding(true);
      if (!selectedBrand) {
        return;
      }

      try {
        const { data, error } = await supabaseClient
          .from("DroneEquipment")
          .select()
          .eq("brand", selectedBrand.id);

        if (error) throw error;

        if (data) setModels(data);

        setModelsLoding(false);
      } catch (err) {
        setModelsLoding(false);
        console.log(err);
      }
    };

    getModels();
  }, [selectedBrand]);
  // -----------------------------------------------

  // Filtering drone badge array
  var filteredModels = models.filter(function (o1) {
    return !drones.some(function (o2) {
      return o1.model === o2.model; // return the ones with equal id
    });
  });

  // Add Drone to list
  const addToDrones = () => {
    if (selectedBrand?.name && selectedModel)
      setDrones([
        ...drones,
        {
          id: selectedModel.id,
          brand: { name: selectedBrand.name },
          model: selectedModel.model,
        },
      ]);
    setSelectedBrand(null);
    setSelectedModel(null);
  };

  return (
    <div className="mt-2 w-full min-h-32 p-2 pb-4 rounded bg-primaryBlueLight relative">
      {/* input container */}
      <div className="flex items-center">
        <div
          onClick={() => {
            setBrandMenu(!showBrandMenu);
            setModalMenu(false);
          }}
          className="flex-1 cursor-pointer flex items-center justify-between border border-primaryBlue p-2 rounded-l-md"
        >
          <p className="text-xs text-primaryBlue">
            {selectedBrand ? selectedBrand.name : "Select Brand"}
          </p>
          <svg
            className="w-4 h-4 mt-[-6px] text-gray-400"
            fill="#2263DF"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
          </svg>
        </div>
        <div
          onClick={() => {
            if (!selectedBrand) {
              alert("Please select a drone brand first.");
            } else {
              setModalMenu(!showModalMenu);
              setBrandMenu(false);
            }
          }}
          className="flex-1 cursor-pointer flex items-center justify-between border border-primaryBlue p-2 rounded-r-md"
        >
          <p className="text-xs text-primaryBlue">
            {selectedModel ? selectedModel.model : "Select Modal"}
          </p>
          <svg
            className="w-4 h-4 mt-[-6px] text-gray-400"
            fill="#2263DF"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
          </svg>
        </div>

        <button
          onClick={addToDrones}
          className="ml-2 bg-primaryBlue text-white text-sm px-5 h-full py-2 rounded-md"
        >
          Add
        </button>
      </div>

      {/* Menu */}
      {!showModalMenu && showBrandMenu && (
        <div className="absolute z-[100] w-[43%] rounded-md shadow-xl mt-[.5] px-3 py-2 bg-white">
          {brands.length > 0 &&
            brands.map((brand) => (
              <p
                key={brand.id}
                onClick={() => {
                  setSelectedBrand({ id: brand.id, name: brand.name });
                  setBrandMenu(false);
                }}
                className="dropdown-menu-item"
              >
                {brand.name}
              </p>
            ))}
        </div>
      )}
      {!showBrandMenu && showModalMenu && (
        <div className="absolute z-[100] w-[83%] rounded-md shadow-xl mt-[.5] px-3 py-2 bg-white">
          {modelsLoading ? (
            <>
              <svg
                className="h-5 w-5 animate-spin text-teal-400 text-center"
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
            </>
          ) : (
            <>
              {filteredModels.length > 0 &&
                filteredModels.map((model, i) => (
                  <p
                    key={i}
                    onClick={() => {
                      setSelectedModel({ id: model.id, model: model.model });
                      setModalMenu(false);
                    }}
                    className="dropdown-menu-item"
                  >
                    {model.model}
                  </p>
                ))}
            </>
          )}
        </div>
      )}

      {/* Items container */}
      <div className="mt-3 flex gap-2 flex-wrap items-start">
        {drones.map((drone) => (
          <p className="badge" key={drone.id}>
            {drone.brand.name}, {drone.model}
          </p>
        ))}
      </div>
    </div>
  );
};

export default UpdateEquipments_Card;
