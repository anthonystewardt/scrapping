"use client";
import React from 'react';
import { Input } from "@nextui-org/react";
import { JobIcon } from '../icons/JobIcon';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Prop {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  name: string;
  register: UseFormRegister<FieldValues>;
}

export const InputPrimary = ({icon, label, placeholder, name, register}: Prop) => {
  return (
    <>
      <Input
        type="text"
        label={label}
        placeholder={placeholder}
        labelPlacement="outside"
        fullWidth
        startContent={
          // <JobIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          icon
        }
        {...register(name, { required: true })}
      />
      
    </>
  );
}
