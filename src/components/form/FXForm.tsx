"use client";

import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface formConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface IProps extends formConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

export default function FXForm({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: IProps) {
  const formConfig: formConfig = {};
  //   If defaultValues is provided, they are added to formConfig.
  // If resolver is provided (for validation), it's also added to formConfig. This config object is passed to useForm to initialize the form with specific behaviors or values.

  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);
  //useForm returns various form methods (e.g., register, handleSubmit, setValue, etc.), which are stored in methods.
  const submitHandler = methods.handleSubmit;

  return (
    // All form fields inside this provider can access the form context (e.g., registering inputs, validation, etc.). The form renders the children (input fields, buttons, etc.).
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
