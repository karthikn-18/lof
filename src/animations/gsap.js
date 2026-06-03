import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (target, delay = 0) => {
  gsap.from(target, {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
    delay,
    scrollTrigger: {
      trigger: target,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
};

export const staggerItems = (targets) => {
  gsap.from(targets, {
    opacity: 0,
    y: 30,
    duration: 0.9,
    ease: 'power2.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: targets[0],
      start: 'top 90%',
    },
  });
};
