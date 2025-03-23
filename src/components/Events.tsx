import {useRef, useState} from "react";
import BirthdayScene from "./canvas/BirthdayScene";

const Events = () => {
  // State to track the selected dot (index-based, -1 means none selected initially)
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Ref to access the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Array of events (you can adjust the number of dots here)
  const eventCount = 4;

  // Handler for clicking a dot
  const handleDotClick = (index: number) => {
    setSelectedIndex(index);

    // Scroll to the corresponding event section
    if (scrollContainerRef.current) {
      const scrollPosition = index * (window.innerWidth + 80); // Each section is 100vw wide
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="events" className="relative h-[100vh] w-full z-[100] scroll-snap-child">
      <div 
        ref={scrollContainerRef}
        className="flex flex-row items-start justify-start h-[100vh] w-full overflow-x-scroll no-scroll-bar">
        <BirthdayScene />
        <span className="!min-w-[80px] h-full bg-events-gradient-2"></span>
        <div id="event-1" className="flex flex-col items-center justify-center min-w-[100vw] h-full">

        </div>
        <span className="!min-w-[80px] h-full bg-events-gradient-1"></span>
        <div id="event-2" className="flex flex-col items-center justify-center min-w-[100vw] h-full">

        </div>

        <span className="!min-w-[80px] h-full bg-events-gradient-1"></span>
        <div id="event-3" className="flex flex-col items-center justify-center min-w-[100vw] h-full">

        </div>
      </div>
      <ul className="event-wrapper">
        {Array.from({ length: eventCount }).map((_, index) => (
          <li
            key={index}
            className={`event ${selectedIndex === index ? 'selected' : ''}`}
            onClick={() => handleDotClick(index)}
          ></li>
        ))}
      </ul>
    </section>
  );
};

export default Events;
