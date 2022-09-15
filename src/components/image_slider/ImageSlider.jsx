import React, { useState } from "react";
import { useEffect } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const ImageSlider = ({ slides, specificOption }) => {
  const [currSlideIndex, setCurrSlideIndex] = useState(0);

  // Anytime the user selects a specific option,
  // this effect will change the image to the correct leather color
  useEffect(() => {
    if (specificOption !== "") {
      setCurrSlideIndex(() => {
        let outIndex = 0;
        slides.forEach((slide, index) => {
          if (slide.url.includes(specificOption.toLowerCase())) {
            outIndex = index;
          }
        });
        return outIndex;
      });
    }
  }, [specificOption, slides]);

  // useEffect(() => {
  //   setImgChosen(null);
  // }, [currSlideIndex]);

  const sliderStyles = {
    height: "100%",
    width: "100%",
    position: "relative",
  };

  const imageStyles = {
    height: "100%",
    width: "100%",
    backgroundPosition: "center",
    aspectRatio: "1/1.2",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[currSlideIndex]["url"]})`,
  };

  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "0px",
    fontSize: "5rem",
    color: "rgba(255, 255, 255, 0.7)",
    zIndex: "1000",
    cursor: "pointer",
  };

  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "0px",
    fontSize: "5rem",
    color: "rgba(255, 255, 255, 0.7)",
    zIndex: "1000",
    cursor: "pointer",
  };

  const dotContainerStyles = {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -120%)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  };

  const dotStyles = {
    margin: "-14px 0.35rem",
    fontSize: "3rem",
    cursor: "pointer",
    color: "rgba(255, 255, 255, 0.5)",
  };

  const selectedDotStyles = {
    margin: "-14px 0.35rem",
    fontSize: "3rem",
    cursor: "pointer",
    color: "rgba(255, 255, 255, 0.8)",
  };

  const moveLeft = () => {
    let newIndex =
      currSlideIndex === 0 ? slides.length - 1 : currSlideIndex - 1;
    setCurrSlideIndex(newIndex);
  };

  const moveRight = () => {
    let newIndex =
      currSlideIndex === slides.length - 1 ? 0 : currSlideIndex + 1;
    setCurrSlideIndex(newIndex);
  };

  const goTo = (s) => {
    setCurrSlideIndex(s);
  };

  return (
    <div style={sliderStyles}>
      <div style={leftArrowStyles} onClick={moveLeft}>
        <MdKeyboardArrowLeft />
      </div>
      <div style={rightArrowStyles} onClick={moveRight}>
        <MdKeyboardArrowRight />
      </div>
      <div style={imageStyles}></div>
      <div style={dotContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            style={
              slideIndex === currSlideIndex ? selectedDotStyles : dotStyles
            }
            onClick={() => goTo(slideIndex)}
          >
            •
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
