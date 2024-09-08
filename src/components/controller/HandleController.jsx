import { Input } from "@nextui-org/react";
import React from "react";
import { Controller } from "react-hook-form";

const HandleController = ({ name, control, label, type }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Input
            {...field}
            label={label}
            type={type}
            size="sm"
            isInvalid={Boolean(fieldState.error)}
            errorMessage={fieldState.error?.message}
          />
        );
      }}
    />
  );
};

export default HandleController;
