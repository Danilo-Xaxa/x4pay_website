const HEADER_HEIGHT = 80;

export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - HEADER_HEIGHT;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

export const handleAnchorClick = (e, sectionId) => {
  e.preventDefault();
  scrollToSection(sectionId);
};
