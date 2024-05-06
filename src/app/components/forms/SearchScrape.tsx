"use client";
import React, { useState } from 'react';
import { InputPrimary } from '../inputs/InputPrimary';
import { JobIcon } from '../icons/JobIcon';
import  { useForm, SubmitHandler }  from "react-hook-form";
import { Spinner } from "@nextui-org/react";
import { JobCard } from '../cards/JobCard';


interface JobI {
  title: string;
  url: string;
  companyName: string;
  idJob: string;
}

export const SearchScrape = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showLoader, setShowLoader] = useState(false);
  const [currentDataInfo, setcurrentDataInfo] = useState([])

  
  const onSubmit = handleSubmit(async (data) => {
    const { position, location } = data;
    setShowLoader(true);

    const response = await fetch(`/api/jobIndeed?namePosition=${position}&location=${location}`);
    const dataResponse = await response.json();
    console.log(dataResponse);
    setShowLoader(false);
    setcurrentDataInfo(dataResponse);
  });

  return (
    <>
      <form onSubmit={onSubmit} className="w-1/2 flex flex-col gap-3">
        <InputPrimary
          icon={<JobIcon />}
          label="Posición Laboral"
          placeholder="Ejm: Call Center, Software Developer, etc"
          name="position"
          register={register}
        />
        {errors.position && (
          <span className="text-red-500 text-left text-xs font-bold">
            Este campo es requerido
          </span>
        )}

        <InputPrimary
          icon={<JobIcon />}
          label="Location USA"
          placeholder="Ejm: Miami, San francisco, etc"
          name="location"
          register={register}
        />
        <div className="flex w-full justify-start ">
          {errors.location && (
            <span className="text-red-500 text-left text-xs font-bold">
              Este campo es requerido
            </span>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-800 transition ease"
        >
          Empezar Busqueda
        </button>
        {showLoader && (
          <div className="flex justify-center mt-3">
            <Spinner size="lg" />
          </div>
        )}
      </form>
      <div className=" flex flex-col gap-2 mt-10">
        {currentDataInfo.length > 0 &&
          currentDataInfo.map((job: JobI) => (
            <JobCard
              key={job.idJob}
              title={job.title}
              url={job.url}
              companyName={job.companyName}
              idJob={job.idJob}
            />
          ))}
      </div>
      
    </>
  );
}
