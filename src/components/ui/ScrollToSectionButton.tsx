interface ScrollToSectionButtonProps {
  sectionId: string;
  offset?: number;
  children: React.ReactNode;
  className?: string;
  onHandle?: () => void;
}

const ScrollToSectionButton = ({ sectionId, offset = 0, children, className = '', onHandle, ...rest }:ScrollToSectionButtonProps) => {
  const handleScroll = () => {
    if(onHandle){
      onHandle();
    };
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: sectionTop - offset,
        behavior: 'smooth',
      });
    } else {
      console.warn(`Section with id "${sectionId}" not found.`);
    }
  };


  return (
    <button
      type="button"
      onClick={handleScroll}
      className={`scroll-to-section-button ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ScrollToSectionButton;
