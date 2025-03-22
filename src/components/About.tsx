import React from "react";
import { useRef, useEffect } from "react";
import AboutMain from "../assets/images/about_main.svg?react"
import AboutMainBorderSVG from "../assets/images/about_bottom_border.svg?react"

// Wrap AboutMainBorderSVG with forwardRef to pass the ref to the <svg> element
const AboutMainBorderWithRef = React.forwardRef((props:any, ref:any) => (
  <AboutMainBorderSVG {...props} ref={ref} />
));

const About = () => {

  const borderRef = useRef<null|SVGElement>(null); // Ref for the SVG element

  useEffect(() => {
    if (borderRef.current) {
      // Select all <g> elements inside #cakes_border
      const cakeElements = borderRef.current.querySelectorAll("#cakes_border > g");
      const cakeArray = Array.from(cakeElements);

      // Ensure we have 12 cakes
      if (cakeArray.length === 12) {
        // Add CSS animation styles dynamically
        cakeArray.forEach((cake:any, index:number) => {
          const cakeNum = parseInt(cake.id.split("_")[1]); // Extract number (1-12)
          // Calculate delay: pair cake_1 with cake_12, cake_2 with cake_11, etc.
          const pairDistance = Math.min(cakeNum - 1, 12 - cakeNum); // 0 for cake_1/cake_12, 5 for cake_6/cake_7
          const delay = pairDistance * 0.2; // 0.2s stagger between pairs

          // Apply initial state and animation
          cake.style.transform = "translateY(50px)"; // Start 50px below
          cake.style.opacity = "0"; // Start invisible
          cake.style.animation = `rise 0.5s ease-out ${delay}s forwards`;
        });

        // Inject the keyframes into the document if not already present
        if (!document.querySelector("#rise-keyframes")) {
          const styleSheet = document.createElement("style");
          styleSheet.id = "rise-keyframes";
          styleSheet.textContent = `
            @keyframes rise {
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
          `;
          document.head.appendChild(styleSheet);
        }
      }
    }
  }, []);

  return (
    <section 
      id="about_us"
      style={{ backgroundSize: '250px 250px' }}
      className="w-full h-[100vh] flex flex-col bg-hero bg-cover bg-center bg-repeat relative">
      <AboutMain 
        className="absolute left-0 bottom-0 w-full h-full"
        preserveAspectRatio="xMidYMax meet"
      />
      <AboutMainBorderWithRef
        ref={borderRef}
        className="absolute -bottom-20 w-full h-full"
        preserveAspectRatio="xMidYMax meet"
      />
    </section>
  );
};

export default About;
