import React, { useState, useRef, ReactNode } from "react";
import "@/styles/Accordian.css";
import { FaChevronDown } from "react-icons/fa";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <button
        className={`accordion-button ${isOpen ? "active" : ""}`}
        onClick={toggleAccordion}
      >
        <span className="accordion-title">{title}</span>
        <FaChevronDown className="accordion-arrow" />
        {/* Right-pointing arrow */}
      </button>
      <div
        className="accordion-content"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
