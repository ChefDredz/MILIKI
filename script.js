const sliderContents = [
  "Miliki.Digital ",
  "Stand-out",
  "Modern",
  "Classy",
  "Impressive",
  "Beyond-Real",
  "TechWave",
  "Quality",
  "Innovate",
  "Authentic",
];
let currentImageIndex = 2;
let currentContentIndex = 1;
const totalImages = 10;
// let isAnimating = false;

function splitTextIntoSpans(selector) {
  let elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    let text = element.innerText;
    let splitText = text
      .split("")
      .map(function (char) {
        return `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`;
      })
      .join("");
    element.innerHTML = splitText;
  });
}

gsap.to(".slide-next-img", {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  duration: 1.5,
  ease: "power3.out",
  delay: 1,
});

document.addEventListener("click", function () {
  if (isAnimating) return;
  isAnimating = true;

  splitTextIntoSpans(".slider-content-active h1");

  gsap.to(".slide-active img", {
    scale: 2,
    duration: 2,
    ease: "power3.out",
  });

  gsap.to(".slider-content-active h1 span", {
    top: "-175px",
    stagger: 0.05,
    ease: "power3.out",
    duration: 0.5,
    onComplete: () => {
      gsap.to(".slider-content-active", {
        top: "-175px",
        duration: 0.25,
        ease: "power3.out",
      });
    },
  });

  splitTextIntoSpans(".slider-content-next h1");
  gsap.set(".slider-content-next h1 span", { top: "200px" });

  gsap.to(".slider-content-next", {
    top: "0",
    duration: 2.125,
    ease: "power3.out",
    onComplete: function () {
      document.querySelector(".slider-content-active").remove();
      gsap.to(".slider-content-next h1 span", {
        top: 0,
        stagger: 0.05,
        ease: "power3.out",
        duration: 0.5,
      });

      const nextContent = document.querySelector(".slider-content-next");
      nextContent.classList.remove("slider-content-next");
      nextContent.classList.add("slider-content-active");
      nextContent.style.top = "0";

      currentContentIndex = (currentContentIndex + 1) % totalImages;
      const nextContentText = sliderContents[currentContentIndex];
      const newContentHTML = `<div class="slider-content-next" style="top: 200px;"><h1>${nextContentText}</h1></div>`;
      document
        .querySelector(".slider-content")
        .insertAdjacentHTML("beforeend", newContentHTML);
    },
  });

  currentImageIndex = (currentImageIndex % totalImages) + 1;

  const newSlideHTML = `
     <div class="slide-next">
       <div class="slide-next-img">
         <img src="./assets/${currentImageIndex}.jpg" alt="" />
       </div>
     </div>
   `;
  document
    .querySelector(".slider")
    .insertAdjacentHTML("beforeend", newSlideHTML);

  gsap.to(".slider .slide-next:last-child .slide-next-img", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1.5,
    ease: "power3.out",
    delay: 0.5,
  });

  const slideNextImg = document.querySelector(".slide-next-img");
  gsap.to(slideNextImg, {
    width: "100vw",
    height: "100vh",
    duration: 2,
    ease: "power3.out",
    onComplete: function () {
      const currentActiveSlide = document.querySelector(".slide-active");
      if (currentActiveSlide) {
        currentActiveSlide.parentNode.removeChild(currentActiveSlide);
      }

      const nextSlide = document.querySelector(".slide-next");
      if (nextSlide) {
        nextSlide.classList.remove("slide-next");
        nextSlide.classList.add("slide-active");

        const nextSlideImg = nextSlide.querySelector(".slide-next-img");
        if (nextSlide) {
          nextSlideImg.classList.remove("slide-next-img");
        }
      }

      setTimeout(() => {
        isAnimating = false;
      }, 500);
    },
  });
});

const openButton = document.querySelectorAll(".open");
const closeButton = document.querySelectorAll(".close");
const modal = document.querySelector(".modal");

function setModalContent(service) {
  const modalContainer = modal.querySelector(".modal-container");
  switch (service) {
    case "ui":
      modalContainer.innerHTML = `
      <h2>Hotel Solutions</h2>
    <div class="modal-container">
      <div class="intro1">
      <div>
        <img class="modal-img" src="./assets/img3jpg" alt="Hotel Solutions" />
      </div>
      <div class="modal-text">
        <p>
          Miliki.Digital empowers hotels and luxury lounges to stand out online with modern, classy, and impressive digital experiences.<br>
          We solve the problem of generic web presence by delivering authentic, innovative design and technology—helping your brand attract high-value guests and create memorable first impressions.
        </p>
      </div> 
      </div> 
        <h2>Hotel Solutions</h2>
        <ul>
          <li>Custom booking systems</li>
          <li>Luxury branding</li>
          <li>Mobile-friendly design</li>
        </ul>
      
    </div>
    `;
      break;
    case "ecommerce":
      modalContainer.innerHTML =
        "<h2>E-Commerce</h2><p>Grow your online store with us...</p>";
      break;
    case "hotel":
      modalContainer.innerHTML = `<h2>Hotel Solutions</h2>
    <div class="modal-content">
      <div>
        <img class="modal-img" src="./assets/hotel.jpg" alt="Hotel Solutions" />
      </div>
      <div class="modal-text">
        <p>
          Miliki.Digital empowers hotels and luxury lounges to stand out online with modern, classy, and impressive digital experiences.<br>
          We solve the problem of generic web presence by delivering authentic, innovative design and technology—helping your brand attract high-value guests and create memorable first impressions.
        </p>
        <ul>
          <li>Custom booking systems</li>
          <li>Luxury branding</li>
          <li>Mobile-friendly design</li>
        </ul>
      </div>
    </div>`;
      break;
    case "booking":
      modalContainer.innerHTML =
        "<h2>Booking Systems</h2><p>Seamless booking for your guests...</p>";
      break;
    case "life":
      modalContainer.innerHTML =
        "<h2>Life & Lifestyle</h2><p>Enhance your brand's lifestyle appeal...</p>";
      break;
    default:
      modalContainer.innerHTML =
        "<h2>Service</h2><p>Details coming soon...</p>";
  }
}

openButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    const service = btn.getAttribute("data-service");
    setModalContent(service);
    modal.classList.add("active");
    modal.classList.remove("inactive");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});

closeButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.remove("active");
    modal.classList.add("inactive");
    modal.style.display = "none";
    document.body.style.overflow = "";
  });
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("active");
    modal.classList.add("inactive");
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
});
// let isAnimating = false;
