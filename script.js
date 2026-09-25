/* Neo-brutalist portfolio interactions */
(function () {
  "use strict";

  // CUSTOM CURSOR
  const cursorFx = document.querySelector(".cursor-fx");
  if (cursorFx) {
    let x = 0, y = 0, cx = 0, cy = 0;
    window.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
      cursorFx.style.transform = `translate(${x - 7}px, ${y - 7}px)`;
    });
    const grow = () => cursorFx.classList.add("grow");
    const shrink = () => cursorFx.classList.remove("grow");
    document.querySelectorAll("a, .btn, .flip, .logo-box, input").forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
  }

  // TYPED GREETING (data-matrix)
  const greet = document.querySelector("[data-matrix]");
  if (greet) {
    const text = greet.textContent;
    greet.textContent = "";
    let i = 0;
    const timer = setInterval(() => {
      greet.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 45);
  }

  // HIGHLIGHT DRAW (data-highlight)
  function drawHighlight(el) {
    el.classList.add("drawn");
  }
  const langs = ["js", "css"];
  // Notifications are not used; kept minimal.

  // SCROLL REVEAL
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // KEYBOARD FOCUS SUPPORT FOR FLIP CARDS
  document.querySelectorAll(".flip-inner").forEach((card) => {
    const links = card.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("focus", () => card.parentElement.classList.add("focus-flip"));
      link.addEventListener("blur", () => card.parentElement.classList.remove("focus-flip"));
    });
  });

  // ACTIVE NAV ON SCROLL
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  if (sections.length && navLinks.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle(
                "active-link",
                link.getAttribute("href") === `#${entry.target.id}`
              );
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }
})();