import AboutMain from "../assets/images/about_main.svg?react"
import AboutMainBorderSVG from "../assets/images/about_bottom_border.svg?react"


const About = () => {

  return (
    <section 
      id="about_us"
      style={{ backgroundSize: '250px 250px' }}
      className="w-full h-[100vh] flex flex-col bg-hero bg-cover bg-center bg-repeat relative overflow-hidden scroll-snap-child">
      <AboutMain 
        className="absolute left-0 !bottom-[10%] lg:bottom-0 w-full h-full scale-[1.1] lg:scale-1"
        preserveAspectRatio="xMidYMax meet"
      />
      <AboutMainBorderSVG 
        className="absolute left-0 bottom-0 w-full h-full"
        preserveAspectRatio="xMidYMax meet"
      />

      <p className="
        animation-element
        about-letters
        text-shadow-primary
        text-xl  sm:text-3xl  lg:text-2xl
        text-primary
        font-heading 
        text-wrap
        left-1/2 -translate-x-1/2
        bottom-[40%]
        sm:bottom-[50%]
        lg:bottom-[25%]
        w-[60%]
        absolute
        opacity-0
        z-[120]
      "
      >
        We are a new offer that delivers cakes and desserts to your home. We are a family business that has been baking for generations. We are proud of our recipes and we are happy to share them with you. We are La Nona Rose.
      </p>
    </section>
  );
};

export default About;
