import { cloneElement, useState, useEffect, useRef } from 'react';

const useInView = (options = { threshold: 0.1 }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('Intersection:', entry.isIntersecting); // Debug log
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      options
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isInView];
};

const AnimatedComponent = ({ children, animation }:any) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const animatedChild = cloneElement(children, {
    ref,
    style: {
      ...children.props.style,
      animation: isInView ? animation : 'none',
    },
  });

  return animatedChild;
};

export default AnimatedComponent;
