import {useEffect, useMemo, useRef, useState} from "react";
import BirthdayScene from "./canvas/BirthdayScene";
import {Pause} from "lucide-react";
import {Play} from "lucide-react";

interface EventsProps {
  windowSize: "sm" | "md" | "lg" | "xl";
}

const Events = (props:EventsProps) => {
  // State to track the selected dot (index-based, -1 means none selected initially)
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Ref to access the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  
  const currentPlayingIndex = useRef(-1);

  // Array of events (you can adjust the number of dots here)
  const eventCount = 4;

  const audioSources = Array(eventCount).fill("/public/sounds/happy-birthday.mp3");
  // Intersection Observer setup
  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          // Map to store intersection ratios
          const intersectionRatios = new Map();
          entries.forEach((entry) => {
            intersectionRatios.set(entry.target, entry.intersectionRatio);
          });

          // Find the section with the highest intersection ratio
          let maxRatio = 0;
          let maxSection = null;
          intersectionRatios.forEach((ratio, section) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              maxSection = section;
            }
          });

          if (maxSection && maxRatio >= 0.2) {
            const sections = document.querySelectorAll(".event-section");
            const index = Array.from(sections).indexOf(maxSection);
            // Only update audio if it's a different section
            if (index !== currentPlayingIndex.current) {
              currentPlayingIndex.current = index;
              const audio = audioRef.current;
              if (audio) {
                audio.pause();
                audio.src = audioSources[index];
                audio.play().catch((error) => console.log("Audio play failed:", error));
              }
            }
          } else {
            currentPlayingIndex.current = -1;
            audioRef.current?.pause();
          }
        },
        { threshold: [0, 0.2, 0.5, 1] } // Trigger at 0%, 20%, 50%, 100% visibility
      ),
    []
  );

  // Observe event sections
  useEffect(() => {
    const sections = document.querySelectorAll(".event-section");
    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [observer]);

  // Update isPlaying state based on audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      audio.addEventListener("play", onPlay);
      audio.addEventListener("pause", onPause);
      return () => {
        audio.removeEventListener("play", onPlay);
        audio.removeEventListener("pause", onPause);
      };
    }
  }, []);

  // Toggle audio playback
  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play().catch((error) => console.log("Audio play failed:", error));
      } else {
        audio.pause();
      }
    }
  };

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
        <div className='absolute top-[20%] lg:top-[10%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 z-[120]'>
          <p className='text-primary font-heading text-4xl sm:text-6xl text-shadow-primary'>Events</p>
        </div>
        <BirthdayScene windowSize={props.windowSize} />
        <span className="!min-w-[80px] h-full bg-events-gradient-2"></span>
        <div id="event-1" className="event-section flex flex-col items-center justify-center min-w-[100vw] h-full">

        </div>
        <span className="!min-w-[80px] h-full bg-events-gradient-1"></span>
        <div id="event-2" className="event-section flex flex-col items-center justify-center min-w-[100vw] h-full">

        </div>

        <span className="!min-w-[80px] h-full bg-events-gradient-1"></span>
        <div id="event-3" className="event-section flex flex-col items-center justify-center min-w-[100vw] h-full">

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
        <button onClick={toggleAudio} className="ml-4">
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </ul>
     {/* Audio element */}
      <audio ref={audioRef} />
    </section>
  );
};

export default Events;
