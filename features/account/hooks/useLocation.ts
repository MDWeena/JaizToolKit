import { getLGAs, getLgaSubAreas, getNigeriaStates, NigeriaState, StateCodes } from "geo-ng";
import { useEffect, useState } from "react";

export const useLocation = () => {
  const [states, setStates] = useState<NigeriaState[]>([]);
  const [lgas, setLgas] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const allStates = getNigeriaStates();
    setStates(allStates as NigeriaState[]);
  }, []);

  const handleStateChange = (stateCode: StateCodes) => {
    if (stateCode) {
      const lgas = getLGAs(stateCode);
      setLgas(lgas);
    } else {
      setLgas([]);
    }
    setCities([]);
  };

  const handleLgaChange = (stateCode: StateCodes, lgaValue: string) => {
    if (stateCode && lgaValue) {
      const cities = getLgaSubAreas(stateCode, lgaValue);
      setCities(cities);
    } else {
      setCities([]);
    }
  };

  return {
    states,
    lgas,
    cities,
    handleStateChange,
    handleLgaChange,
  };
};
