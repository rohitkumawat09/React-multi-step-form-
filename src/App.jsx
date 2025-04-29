import { useState, useEffect,  } from "react";
import "./App.css";

const App = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(null);
  const [formWidth, setFormWidth] = useState(0);
  const [inputDivWidth, setInputDivWidth] = useState(0);
  const [stepMargin, setStepMargin] = useState(0);

  const nextStep = (e) => {
    e.preventDefault();
    setDirection("next");
    setTimeout(() => {
      if (step < 3) setStep(step + 1);
      setDirection(null);
    }, 100);
  };

  const previousStep = (e) => {
    e.preventDefault();
    setDirection("previous");

    setTimeout(() => {
      if (step > 2) {
        setStep(step - 1);
      } else {
        setStep(1);
      }
      setDirection(null);
    }, 500);
  };

  useEffect(() => {
    const firstStep = document.querySelector(".step1");
    if (firstStep) {
      const margin = parseFloat(window.getComputedStyle(firstStep).marginRight);
      setStepMargin(margin);
    }
  }, []);

  useEffect(() => {
    const formElement = document.querySelector("form");
    setFormWidth(formElement.clientWidth * 3 + stepMargin * 3);
    setInputDivWidth(formElement.clientWidth);
  }, [stepMargin]);

  let slideClass = "";
  if (direction === "next") {
    slideClass = "slide-in-right";
  } else if (direction === "previous") {
    slideClass = "slide-in-left";
  }

  return (
    <div className="form-container">
      <h1 className="form-title">Multi-Step-Form</h1>
      <h2 className="form-step-title">Step {step}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div
      
       className="step-container"
       style={{
         width: `${formWidth}px`,
         transform: `translateX(-${(step - 1) * (formWidth / 3)}px)`,
         transition: "transform 0.5s ease-in-out",
       }}
     >
     
          <div
            className="step1 step"
            style={{ width: `${inputDivWidth}px` }}
          >
            <input
              required
              type="text"
              placeholder="Enter Your Name"
              className="input-field"
            />
            <input
              required
              type="email"
              placeholder="Enter Your Email"
              className="input-field"
            />
            <input
              required
              type="text"
              placeholder="Enter Your Father Name"
              className="input-field"
            />
            <input
              required
              type="text"
              placeholder="Enter Your Mother Name"
              className="input-field"
            />
          </div>

          <div
            className="step2 step"
            style={{ width: `${inputDivWidth}px` }}
          >
            <input
              required
              type="text"
              placeholder="Address"
              className="input-field"
            />
            <input
              required
              type="text"
              placeholder="City"
              className="input-field"
            />
            <input
              required
              type="text"
              placeholder="State"
              className="input-field"
            />
            <input
              required
              type="text"
              placeholder="Country"
              className="input-field"
            />
          </div>

          <div
            className="step3 step"
            style={{ width: `${inputDivWidth}px` }}
          >
            <input
              required
              type="text"
              placeholder="Phone Number"
              className="input-field"
            />
            <input
              required
              type="text"
              placeholder="Date of Birth"
              className="input-field"
            />
          </div>
        </div>

        <div className="buttons">
          <button
            onClick={previousStep}
            className={`prev-button ${step === 1 ? "disabled" : ""}`}
            disabled={step === 1}
          >
            Previous
          </button>

          {step !== 3 ? (
            <button
              onClick={nextStep}
              className="next-button"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => alert("Form submitted!")}
              className="submit-button"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default App;
        