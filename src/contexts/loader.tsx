// LoaderContext.tsx
import React, { createContext, useContext, useState } from "react";
import Loader from "../components/loaders/Loader";

interface LoaderContextType {
  showLoader: (typeInput:"page"|"content") => void;
  hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [type, setType] = useState<"page"|"content">("page");

  const showLoader = (typeInput:"page"|"content") => {setIsVisible(true), setType(typeInput)};
  const hideLoader = () => setIsVisible(false);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      <Loader isLoading={isVisible} type={type} />
    </LoaderContext.Provider>
  );
};

export const useLoader = (): LoaderContextType => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};
