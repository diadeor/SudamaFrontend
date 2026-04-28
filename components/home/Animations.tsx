"use client";
import BlurText from "../animations/BlurText";
import CircularGallery from "../animations/CircularGallery";

export const HeroText = () => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  return (
    <BlurText
      text="The Soul of"
      delay={200}
      animateBy="words"
      direction="top"
      stepDuration={0.6}
      onAnimationComplete={handleAnimationComplete}
      className=""
    />
  );
};

export const HeroSubText = () => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  return (
    <BlurText
      text="Nature."
      delay={300}
      animateBy="letters"
      direction="bottom"
      stepDuration={0.25}
      onAnimationComplete={handleAnimationComplete}
      className="italic font-body font-normal text-secondary"
    />
  );
};

export const CircGallery = () => {
  return (
    <CircularGallery
      bend={1}
      textColor="#161d1a"
      borderRadius={0.15}
      scrollEase={0.2}
      scrollSpeed={3}
    />
  );
};
