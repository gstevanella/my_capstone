const tl = gsap.timeline();

tl.to(".steps", {
  delay: 5,
  y: "-500px",
  duration: 20,
  repeat: -1,
  ease: "none"
});
