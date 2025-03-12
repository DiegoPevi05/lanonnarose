import BirthdayScene from "./canvas/BirthdayScene";

const Events = () => {
  return (
    <section id="events" className="relative h-[200vh] w-full -mt-[100vh] z-[100]">
      <span id="events_placeholder" className="h-[100vh] w-full block"> </span>
      <div className="inline-flex items-center justify-center h-[100vh] w-full sticky bottom-0">
        <BirthdayScene />
      </div>
    </section>
  );
};

export default Events;
