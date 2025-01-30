
// Initialize EmailJS
(function() {
  emailjs.init({
    publicKey: "BH9iXbxe6DW8tqTg6", // Replace with your actual key
  });
})();

// Typed Headings Variables
let typedHeadingEl;
let cursorEl;
const headings = [
  "Drive Your Brand's Reach",
  "Your Brand, Every Ride",
  "Turn Commutes Into Impressions",
  "Own the Passenger's Attention"
];
let headingIndex = 0;
let charIndex = 0;
const typingSpeed = 70;
const erasingSpeed = 50;
let currentHeading = headings[headingIndex];

// Typing Effect Functions
function type() {
  if (charIndex < currentHeading.length) {
    typedHeadingEl.textContent += currentHeading.charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typedHeadingEl.textContent = currentHeading.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    headingIndex = (headingIndex + 1) % headings.length;
    currentHeading = headings[headingIndex];
    setTimeout(type, 300);
  }
}

// Form Templates
const advertiserFormHTML = `
  <h2>Advertiser Form</h2>
  <form id="advertiserForm">
    <label for="advName">Name</label>
    <input type="text" id="advName" name="from_name" required>

    <label for="advEmail">Email</label>
    <input type="email" id="advEmail" name="from_email" required>

    <label for="advPhone">Phone Number</label>
    <input type="tel" id="advPhone" name="phone" required>

    <label for="brand">Brand/Company</label>
    <input type="text" id="brand" name="company" required>

    <label for="adGoals">Message or Campaign Goals</label>
    <textarea id="adGoals" name="message" rows="4" required></textarea>

    <button type="submit" class="form-btn">Submit Campaign</button>
  </form>
`;

const driverFormHTML = `
  <h2>Driver Sign-Up</h2>
  <form id="driverForm">
    <label for="drvName">Name</label>
    <input type="text" id="drvName" name="from_name" required>

    <label for="drvEmail">Email</label>
    <input type="email" id="drvEmail" name="from_email" required>

    <label for="drvPhone">Phone Number</label>
    <input type="tel" id="drvPhone" name="phone" required>

    <label for="drvCity">City</label>
    <input type="text" id="drvCity" name="city" required>

    <label for="drvRides">Average Daily Rides</label>
    <input type="number" id="drvRides" name="average_daily_rides" min="1" required>

    <label for="drvCarType">Car Type/Model</label>
    <input type="text" id="drvCarType" name="car_type" required>

    <label for="drvMore">Additional Info</label>
    <textarea id="drvMore" name="additional_info" rows="4"></textarea>

    <button type="submit" class="form-btn">Submit Driver Info</button>
  </form>
`;

// Modal Functions
function openModal(html, formType) {
  const modalContent = document.getElementById('modalContent');
  const overlay = document.getElementById('overlay');
  
  modalContent.innerHTML = html;
  overlay.classList.add('active');

  const form = modalContent.querySelector('form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const templateID = formType === 'driver' 
        ? 'template_4jqxhts'
        : 'template_gsnqwy5';

      await emailjs.sendForm(
        'service_ec0699l',
        templateID,
        form
      );

      modalContent.innerHTML = `
        <div class="success-message">
          <h2>Thank you! 🎉</h2>
          <p>We'll contact you within 24 hours.</p>
          <button type="button" class="form-btn" id="backHomeBtn">Close</button>
        </div>
      `;
    } catch (error) {
      modalContent.innerHTML = `
        <div class="success-message">
          <h2>Error! 😕</h2>
          <p>Please email us directly at Boikobo23@gmail.com</p>
          <button type="button" class="form-btn" id="backHomeBtn">Close</button>
        </div>
      `;
    } finally {
      document.getElementById('backHomeBtn')?.addEventListener('click', closeModal);
    }
  });
}

function closeModal() {
  document.getElementById('overlay').classList.remove('active');
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  // Initialize typing effect
  typedHeadingEl = document.getElementById('typedHeading');
  cursorEl = document.getElementById('cursor');
  typedHeadingEl.textContent = '';
  setTimeout(type, 200);

  // Setup modal event listeners
  document.querySelectorAll('[id^="openAdvertiser"]').forEach(btn => {
    btn.addEventListener('click', () => openModal(advertiserFormHTML, 'advertiser'));
  });

  document.querySelectorAll('[id^="openDriver"]').forEach(btn => {
    btn.addEventListener('click', () => openModal(driverFormHTML, 'driver'));
  });

  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Scroll to top button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 300);
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Update mobile menu handling in script.js
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  mobileNav.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
  }
});
