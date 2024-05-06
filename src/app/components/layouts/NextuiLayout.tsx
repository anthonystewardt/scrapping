"use client";
import React from 'react';
import { NextUIProvider } from "@nextui-org/react";

export const NextuiLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
      <NextUIProvider>
        {children}
    </NextUIProvider>
  );
};
