document.addEventListener("DOMContentLoaded", function () {
  // Check if the current page is index.html
  if (window.location.pathname.includes("index.html")) {
    // Typed.js incorporation code
    var typed = new Typed("#typed-text", {
      strings: [
        "tailored learning experiences...",
        "accelerated customer onboarding programs...",
        "scalable end-user enablement support...",
        "efficient workflow integration...",
        "organization-wide digital fluency...",
        "performance-driven training development...",
        "streamlined change management...",
        "user-centric adoption strategies...",
        "personalized training roadmaps...",
      ],
      stringsElement: null,
      // typing speed
      typeSpeed: 45,
      // time before typing starts
      startDelay: 5000,
      // backspacing speed
      backSpeed: 30,
      // time before backspacing
      backDelay: 600,
      // loop
      loop: true,
      // false = infinite
      loopCount: Infinity,
      // show cursor
      showCursor: false,
      // character for cursor
      cursorChar: "|",
      // attribute to type (null == text)
      attr: null,
      // either html or text
      contentType: "html",
      // call when done callback function
      callback: function () {},
      // starting callback function before each string
      preStringTyped: function () {},
      // callback for every typed string
      onStringTyped: function () {},
      // callback for reset
      resetCallback: function () {},
    });

    //SCROLLING DOWN AFTER THE HERO SECTION TO THE MINI-ABOUT SECTION
    var scrollDownButton = document.querySelector(".scroll-down-link");
    var aboutSection = document.getElementById("about");

    if (scrollDownButton && aboutSection) {
      scrollDownButton.addEventListener("click", function (e) {
        e.preventDefault();

        var aboutContent = aboutSection.querySelector(".about-content");
        var lastParagraph = aboutContent.lastElementChild;
        var lastParagraphHeight = lastParagraph.offsetHeight;

        var scrollOptions = {
          top:
            aboutSection.offsetTop +
            aboutSection.offsetHeight -
            window.innerHeight +
            lastParagraphHeight,
          behavior: "smooth",
        };

        scrollToSection(scrollOptions);
      });
    }

    // Get the height of the hero section
    //    var heroSection = document.querySelector('.hero-section');
    //    if (heroSection) {
    //      var heroSectionHeight = heroSection.offsetHeight;
    //    }

    // Define the space value to leave on top (before scrolling) equal to the height of the navbar
    //   const spaceOnTop = document.querySelector('.navbar').offsetHeight;

    // Calculate the scroll position to offset the scroll target
    //    const scrollOffset = heroSectionHeight - spaceOnTop;

    // Smooth scrolling to the anchor links
    //    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //      anchor.addEventListener('click', function(e) {
    //       e.preventDefault();
    //      const target = document.querySelector(this.getAttribute('href'));
    //      window.scrollTo({
    //        top: target.offsetTop - scrollOffset,
    //       behavior: 'smooth'
    //       });
    //     });
    //     });
  }

  // Parallax Effect
  var parallaxLayers = document.querySelectorAll(".parallax-layer");

  document.addEventListener("mousemove", function (e) {
    var mouseX = e.clientX;
    var mouseY = e.clientY;

    parallaxLayers.forEach(function (layer) {
      var speed = layer
        .querySelector(".parallax-image")
        .getAttribute("data-speed");
      var translateX = (mouseX - window.innerWidth / 2) * ((2 * speed) / 1000);
      var translateY =
        (mouseY - window.innerHeight / 2) * ((2.5 * speed) / 1000);

      layer.style.transform =
        "translate(" + translateX + "px, " + translateY + "px)";
    });
  });

  //SCROLLING UP FROM THE MINI-ABOUT SECTION BACK UP TO THE HERO SECTION
  if (window.location.pathname.includes("index.html")) {
    var scrollUpButton = document.querySelector(".scroll-up a");

    if (scrollUpButton) {
      scrollUpButton.addEventListener("click", function (e) {
        e.preventDefault();

        var scrollOptions = {
          top: 0,
          behavior: "smooth",
        };

        scrollToSection(scrollOptions);
      });
    }
  }

  function scrollToSection(scrollOptions) {
    var startY = window.pageYOffset;
    var targetY = scrollOptions.top;
    var duration = 800; // Adjust this value to control the scroll duration (in milliseconds)
    var startTime = null;

    function step(currentTime) {
      if (startTime === null) {
        startTime = currentTime;
      }

      var elapsedTime = currentTime - startTime;
      var progress = Math.min(elapsedTime / duration, 1);
      var ease = easeInOutCubic(progress);

      window.scrollTo(0, startY + (targetY - startY) * ease);

      if (elapsedTime < duration) {
        requestAnimationFrame(step);
      }
    }

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    requestAnimationFrame(step);
  }
});

//SCROLL TO TOP BUTTON
window.onscroll = function () {
  var button = document.querySelector(".scroll-to-top-button");
  if (window.pageYOffset > 100) {
    button.classList.add("active");
  } else {
    button.classList.remove("active");
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

//SCROLL TO BOTTOM BUTTON
document.addEventListener("DOMContentLoaded", function (event) {
  var scrollToBottomButton = document.querySelector(".scroll-to-bottom");

  scrollToBottomButton.addEventListener("click", function (e) {
    e.preventDefault();
    scrollToBottom();
  });

  window.addEventListener("scroll", function () {
    toggleScrollToBottomButton();
  });

  function scrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  function toggleScrollToBottomButton() {
    var scrollPosition = window.innerHeight + window.scrollY;
    var documentHeight = document.documentElement.offsetHeight;

    if (scrollPosition >= documentHeight) {
      scrollToBottomButton.classList.add("hidden");
    } else {
      scrollToBottomButton.classList.remove("hidden");
    }
  }
});

//PENCIL UNDERLINE ANIMATION ON ABOUT ME
window.addEventListener("scroll", function () {
  var aboutSection = document.getElementById("about-section");
  var aboutHeading = aboutSection.querySelector("h2");

  var rect = aboutSection.getBoundingClientRect();
  var isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

  if (isVisible) {
    aboutHeading.classList.add("underline-visible");
  } else {
    aboutHeading.classList.remove("underline-visible");
  }
});

// Start the progress bar when the page content is loaded
document.addEventListener("DOMContentLoaded", function () {
  NProgress.start();
});

// Complete the progress bar when all the resources (images, stylesheets, etc.) have finished loading
window.addEventListener("load", function () {
  NProgress.done();
});

// Track the scroll position and update the progress bar
window.addEventListener("scroll", function () {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var progress = (scrollTop / windowHeight) * 100;

  // Update the width of the progress bar
  document.getElementById("scroll-progress").style.width = progress + "%";
});

//Hero title Gradient
// Get the hero title element
const heroTitle = document.querySelector(".hero-title");

// Add event listener for mousemove on the whole viewport
window.addEventListener("mousemove", (event) => {
  // Calculate the mouse position within the element
  const xPos = event.clientX - heroTitle.offsetLeft;
  const yPos = event.clientY - heroTitle.offsetTop;

  // Update the background position based on the mouse position
  heroTitle.style.backgroundPosition = `${xPos}px ${yPos}px`;
});
