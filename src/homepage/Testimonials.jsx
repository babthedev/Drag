import React, { useEffect, useState, useRef } from 'react'
import TestimonialCard from "./TestimonialCard";
import data from "../data";
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../features/homeSlice';
import backDark from "../assets/back-dark.png"
import backLight from "../assets/back-light.png"
import forwardDark from "../assets/forward-dark.png"
import forwardLight from "../assets/forward-light.png"

const Testimonials = ()=> {
  const isDarkMode = useSelector(selectDarkMode);
    const [showScrollButtons, setShowScrollButtons] = useState(false);
    const carouselRef = useRef(null);
  const { testimonials } = data;
  useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      // Check if the container has a horizontal scrollbar
      setShowScrollButtons(container.scrollWidth > container.clientWidth);
    }
  }, [testimonials]);

  const scrollCarousel = (direction) => {
    const scrollAmount = 100; // Adjust the scroll amount based on your design
    const container = carouselRef.current;

    if (container) {
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };
  const renderedTestimonials = testimonials.map((testimonial) => (
    <TestimonialCard
      name={testimonial.name}
      paragraph={testimonial.paragraph}
      key={testimonial.id}
    />
  ));

  return (
    <div className="mt-16 px-9 md:px-16 lg:px-36" id="testimonials">
      <h1 className="text-5xl lg:px-60 text-center">Testimonials - What our happy users say</h1>
      {/* <section className='mt-14'>
        {renderedTestimonials}
      </section> */}
      <section className='mt-14 flex gap-4 relative'>
            <div
            ref={carouselRef}
            className='flex overflow-x-auto space-x-4 scrollbar-hide'
          >
            {renderedTestimonials}
          </div>

          {showScrollButtons && (<div className='flex justify-between absolute w-full'>
          <button onClick={() => scrollCarousel('left')} className='left-0 absolute top-32 '><img src={isDarkMode ? backDark : backLight} width="50px" alt="" /></button>
          <button onClick={() => scrollCarousel('right')} className='right-0 absolute top-32' ><img src={isDarkMode ? forwardDark : forwardLight} width="50px" alt="" /></button>
        </div>)}
        </section>
    </div>
  );
};

export default Testimonials;
