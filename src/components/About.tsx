import AboutMain from "../assets/images/about_main.svg?react"
import AboutMainBorderSVG from "../assets/images/about_bottom_border.svg?react"
import ScrollToSectionButton from "./ui/ScrollToSectionButton";
import {ChevronDown} from "lucide-react";


const About = () => {

  return (
    <section 
      id="about_us"
      style={{ backgroundSize: '250px 250px' }}
      className="w-full h-[100vh] flex flex-col bg-hero bg-cover bg-center bg-repeat relative">
      <AboutMain 
        className="absolute left-0 bottom-0 w-full h-full"
        preserveAspectRatio="xMidYMax meet"
      />
      <AboutMainBorderSVG 
        className="absolute left-0 -bottom-6 w-full h-full scale-[1.2]"
        preserveAspectRatio="xMidYMax meet"
      />
      <h1 className="
        animation-element
        about-letters
        text-shadow-primary
        text-6xl sm:text-8xl 
        text-primary
        font-heading 
        left-1/2 -translate-x-1/2
        rotate-[2deg]
        text-wrap
        bottom-[20%]
        absolute
        opacity-0
        z-[120]
      "
      >
        La Nona Rose
      </h1>
      <ScrollToSectionButton
        sectionId="events"
        className="
        h-auto
        w-auto
        absolute
        bottom-[5%]
        bg-secondary
        text-primary
        duration-300
        hover:bg-primary
        hover:text-secondary
        hover:border-secondary
        border-2 border-primary
        p-1
        inline-flex
        justify-center
        items-center
        rounded-full
        left-1/2 -translate-x-1/2 -translate-y-1/2
        z-[120]
        cursor-pointer
        animation-element
        bounce
        ">
        <ChevronDown className='h-10 w-10'/>
      </ScrollToSectionButton>
    </section>
  );
};

export default About;
