"use client";
import BlurText from "../animations/BlurText";

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
