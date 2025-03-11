import {useEffect, useState} from "react";
import Cake from "../../assets/images/cake.svg";

interface globalLoaderProps {
  isLoading: boolean;
  type: "page" | "content";
}

const LoadingComponent = (props:globalLoaderProps) => {

  const {isLoading, type} = props;

  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!isLoading) return; // only run if loading

    let count = 0;
    const interval = setInterval(() => {
      count = (count + 1) % 5; // cycles 0, 1, 2, 3
      setDots(".".repeat(count));
    }, 500); // 1 second interval

    // Cleanup interval on component unmount or when isLoading changes
    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <>
      {isLoading && (
        <div className={`fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center ${type == "page" ? "bg-secondary": "bg-secondary/50"} z-50`}>
          <img 
           src={Cake} 
           alt="cake" 
           className="
             w-36 h-36
             vibrating-svg" 
            />
          <span className="text-heading mt-8 text-2xl inline-flex flex-row relative">
            <p>Cargando</p>
            <p className="absolute left-[100%]">{dots}</p>
          </span>
        </div>
      )}
    </>
  );
};

export default LoadingComponent;
