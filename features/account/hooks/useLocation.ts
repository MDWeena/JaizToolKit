import { getLGAs, getStates } from "@/services/account.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useLocation = () => {
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(
    null
  );
  const [cities, setCities] = useState<string[]>([]);

  // Fetch States
  const { data: states = [] } = useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const response =  await getStates();
      console.log("States response:", response);
      if (response.status === "success" && response.data) {
        return response.data.map((s) => ({
          code: s.state_code,
          name: s.state_name,
        }));
      }
      return [];
    },
    // staleTime: ,
  });

  const { data: lgas = [] } = useQuery({
    queryKey: ["lgas", selectedStateCode],
    queryFn: async () => {
      if (!selectedStateCode) return [];
      const response = await getLGAs(selectedStateCode);
      if (response.status === "success" && response.data) {
        return response.data.map((l) => l.lga_name);
      }
      return [];
    },
    enabled: !!selectedStateCode,
    // staleTime: Infinity,
  });

  const handleStateChange = (stateCode: string) => {
    if (stateCode) {
      setSelectedStateCode(stateCode);
    } else {
      setSelectedStateCode(null);
    }
    setCities([]);
  };

  // const handleLgaChange = (stateCode: StateCodes, lgaValue: string) => {
  //   if (stateCode && lgaValue) {
  //     const cities = getLgaSubAreas(stateCode, lgaValue);
  //     setCities(cities);
  //   } else {
  //     setCities([]);
  //   }
  // };

  return {
    states,
    lgas,
    cities,
    handleStateChange
  };
};
