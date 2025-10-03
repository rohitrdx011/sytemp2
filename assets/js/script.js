const hamburgerButton = document.getElementById("hamburger");
const dropdownContent = document.getElementById("dropdownContent");
let menu = document.querySelectorAll(".nav-menu");

hamburgerButton.addEventListener("click", toggleDropdown);

document.body.addEventListener("click", (event) => {
  if (
    !dropdownContent.contains(event.target) &&
    !hamburgerButton.contains(event.target)
  ) {
    dropdownContent.classList.remove("active");
  }
});
menu.forEach((menu) => {
  menu.addEventListener("click", function (e) {
    e.preventDefault();
    dropdownContent.classList.remove("active");
  });
});

function toggleDropdown() {
  dropdownContent.classList.toggle("active");
}

function toggleSearchDropdown() {
  dropdownContent.classList.toggle("active");
  searchInput.focus();
}

// tabs
function openfeat(feat, features, sectionId, button = "tab_button") {
  // Declare all variables
  let i, tabcontentfea, tablinksfea;

  // Get all elements with class="tabcontent" within the specified section and hide them
  tabcontentfea = document.querySelectorAll(`#${sectionId} .features`);
  tabcontentfea.forEach((tab) => {
    tab.style.display = "none";
  });

  // Get all elements with class="tablinks" within the specified section and remove the class "active"
  tablinksfea = document.querySelectorAll(`#${sectionId} .${button}`);
  tablinksfea.forEach((tab) => {
    tab.classList.remove("active");
  });

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(features).style.display = "flex";
  feat.currentTarget.classList.add("active");
}

document.querySelector(".tab_head .tab_button:first-child").click();
document.querySelector(".tab_head .gallery_tab_button:first-child").click();

// slide
document.addEventListener("DOMContentLoaded", () => {
  // Set the first slide and radio button as active initially
  const slides = document.querySelectorAll(".slide");
  const radioButtons = document.querySelectorAll(".radio-button");

  if (slides.length > 0) {
    slides[0].classList.add("active");
  }
  if (radioButtons.length > 0) {
    radioButtons[0].classList.add("active");
  }

  let currentIndex = 0;

  function goToSlide(index) {
    currentIndex = index;
    updateSlides();
    updateRadioButtons();
  }

  function updateSlides() {
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  }

  function updateRadioButtons() {
    radioButtons.forEach((button, index) => {
      if (index === currentIndex) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  function moveToNext() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
    updateRadioButtons();
  }

  setInterval(moveToNext, 3000);
});

/* onclick Menu list scroll to respective section */
function go_to_section(getId) {
  const targetElement = document.querySelector(getId);

  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 100,
      behavior: "smooth",
    });
  }
}

let overlay = document.querySelector(".overlay");
let popup = document.querySelector(".popup_form");
let otpPopup = document.querySelector(".otp_form");

// Function to open the popup
function openPopup() {
  overlay.style.display = "block";
  popup.classList.add("open");
  isOpen = true;

  document.querySelector(".overlay").addEventListener("click", closePopup);
}

// 		function for timer
let timerInterval;
let countdownTime = 5 * 60; // 5 minutes in seconds

function startTimer() {
  const timerDisplay = document.getElementById("timer");
  let resend_otp = document.querySelector(".resend_otp");

  countdownTime = 5 * 60;

  timerInterval = setInterval(() => {
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;

    timerDisplay.textContent = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;

    if (countdownTime <= 0) {
      timerDisplay.style.display = "none";
      resend_otp.style.display = "block";
    }

    countdownTime--;
  }, 1000);
}

// function to open galley popup
let galleryPopup = document.querySelector(".amenities_gallery_popup");

function openGallery(num) {
  galleryPopup.style.top = "50%";
  overlay.style.display = "block";
  isOpen = true;

  document.querySelector(".overlay").addEventListener("click", closeGallery);
  document
    .querySelector(".tab_head .gallery_tab_button:nth-child(" + num + ")")
    .click();
}

// Function to close the popup
function closePopup() {
  popup.classList.remove("open");

  overlay.style.display = "none";

  isOpen = false;
}

function closeOtp() {
  overlay.style.display = "block";
  otpPopup.classList.remove("open");
  isOpen = true;
}

function closeGallery() {
  overlay.style.display = "none";

  galleryPopup.style.top = "-100%";
  isOpen = false;
}

function showPopupForm(e, clicked) {
  closePopup(); // Close any open forms before showing a new one

  let popupForm = document.querySelector(".popup_form");
  let popformHeading = document.querySelector(".popup_details h2");

  let overlay = document.querySelector(".overlay");
  document.getElementById("clicked_on1").value = clicked;

  if (clicked === "download brochure") {
    popformHeading.innerHTML = "Download the brochure";
    openPopup();
  } else if (clicked == "floor plan") {
    popformHeading.innerHTML = "Unlock the floor plan";
    openPopup();
  } else if (clicked == "unlock price" || clicked == "costing details") {
    popformHeading.innerHTML = "Unlock the price";
    openPopup();
  } else if (clicked == "Play video") {
    popformHeading.innerHTML = "Virtual tour video";
    openPopup();
  } else if (clicked == "whatsApp" || clicked == "call") {
    popformHeading.innerHTML = "Get the best deals";
    openPopup();
  } else {
    openPopup();
  }
}

const yearSpan = document.getElementById("discYear");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;
