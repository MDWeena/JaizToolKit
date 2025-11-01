import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { TextField } from "../ui/input";

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value = "",
  onChangeText,
  placeholder = "Search",
}) => {
  return (
    <TextField
      className='mb-4'
      ignoreFocus
      inputPrefix={
        <Feather name='search' size={25} color='#888' className='mr-3' />
      }
      InputProps={{
        placeholder: placeholder,
        value: value,
        onChangeText: onChangeText,
        className: "py-3"
      }}
    />
  );
};
