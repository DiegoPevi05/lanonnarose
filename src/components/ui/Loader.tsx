import {useEffect, useState} from "react";
import Cake from "../../assets/images/cake.svg";

const LoadingComponent = ({ isLoading }:any) => {

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
        <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-secondary z-50">
	  <img 
	   src={Cake} 
	   alt="cake" 
	   className="
	     w-32 h-32
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
