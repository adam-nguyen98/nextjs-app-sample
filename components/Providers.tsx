// components/Providers.tsx
"use client";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../app/apollo-client"; // Import the client instance

export const Providers = ({ children }: { children: any }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};