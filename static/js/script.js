/**
 * Main Application Script
 *
 * @author NetThemes
 */

const html = document.documentElement; // <html> element
const head = document.head; // <head> element
const body = document.body; // <body> element

document.addEventListener("DOMContentLoaded", function () {
    setJSClass(); // Replace <html class="no-js"> with <html class="js">
    /**
     * Main entry point of the script.
     * Initialization and primary setup are handled here.
     */
    init();
});

/**
 * Main initialization function that sets up all interactive components
 * Called after the DOM is fully loaded
 */
function init() {
    initCountdown(); // #CountDown
    initCounter(); // #Counter
    initHighlighter(); // #Highlighter
    initMegaMenu(); // #MegaMenu
    initSwiper(); // #Swiper
    initTextarea(); // #Textarea
    initThemeSwitcher(); // #ThemeSwitcher
    initTooltips(); // #Tooltip
}

/* -------------------------------------------------------------------------- */
/*                              Utility Functions                             */
/* -------------------------------------------------------------------------- */

/**
 * Sets the correct JS class on <html>.
 */
function setJSClass() {
    if (html.classList.contains("no-js")) {
        html.classList.replace("no-js", "js");
    } else {
        html.classList.add("js");
    }
}

/**
 * Converts Numbers
 */
function convertPersianToEnglishNumber(persianNumber) {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    return persianNumber.replace(/[۰-۹]/g, (char) => {
        return englishDigits[persianDigits.indexOf(char)];
    });
}

function convertEnglishToPersianNumber(englishNumber) {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    return englishNumber.toString().replace(/[0-9]/g, (char) => {
        return persianDigits[parseInt(char)];
    });
}

/* -------------------------------------------------------------------------- */
/*                               Feature Modules                              */
/* -------------------------------------------------------------------------- */

/**
 * #CountDown
 */
function initCountdown() {
    const countdownElm = document.getElementById("countdown");
    if (!countdownElm) return;

    function formatWithLeadingZeros(num, length) {
        return num.toString().padStart(length, "0");
    }

    // Choose one approach:
    /* ------------------------------------ 1 ----------------------------------- */
    // Convert Jalali date to Gregorian
    // function jalaliToGregorian(jalaliDate) {
    //     const { jy, jm, jd } = jalaliDate;
    //     const gregorian = jalaali.toGregorian(jy, jm, jd);
    //     return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);
    // }
    // const endDateJalali = { jy: 1403, jm: 6, jd: 2 };
    // const endDateGregorian = jalaliToGregorian(endDateJalali);
    /* ------------------------------------ 2 ----------------------------------- */
    // OR use fixed duration =>
    const endDate = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12 hours from now

    function updateCountdown() {
        const now = new Date();
        const difference = endDate - now;

        if (difference <= 0) {
            countdownElm.textContent = "پیشنهاد منقضی شده است!";
            return;
        }

        const duration = dateFns.intervalToDuration({ start: now, end: endDate });

        const daysElm = document.getElementById("days");
        const hoursElm = document.getElementById("hours");
        const minutesElm = document.getElementById("minutes");
        const secondsElm = document.getElementById("seconds");

        if (daysElm) {
            daysElm.textContent = convertEnglishToPersianNumber(
                formatWithLeadingZeros(duration.days || 0, 2)
            );
        }
        if (hoursElm) {
            hoursElm.textContent = convertEnglishToPersianNumber(
                formatWithLeadingZeros(duration.hours || 0, 2)
            );
        }
        if (minutesElm) {
            minutesElm.textContent = convertEnglishToPersianNumber(
                formatWithLeadingZeros(duration.minutes || 0, 2)
            );
        }
        if (secondsElm) {
            secondsElm.textContent = convertEnglishToPersianNumber(
                formatWithLeadingZeros(duration.seconds || 0, 2)
            );
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/**
 * #Counter
 */
function initCounter() {
    const cartCounters = document.querySelectorAll(".cart-counter");
    if (cartCounters.length === 0) return;

    cartCounters.forEach((counter) => {
        const plusButton = counter.querySelector(".cart-counter-plus");
        const minusButton = counter.querySelector(".cart-counter-minus");
        const counterDisplay = counter.querySelector(".cart-counter-int");

        // Increment counter
        plusButton.addEventListener("click", () => {
            let currentCount = parseInt(convertPersianToEnglishNumber(counterDisplay.textContent.trim()), 10);
            if (!isNaN(currentCount)) {
                currentCount += 1; // Increment by 1
                counterDisplay.textContent = convertEnglishToPersianNumber(currentCount); // Convert back to Persian
            }
        });

        // Decrement counter
        minusButton.addEventListener("click", () => {
            let currentCount = parseInt(convertPersianToEnglishNumber(counterDisplay.textContent.trim()), 10);
            if (!isNaN(currentCount) && currentCount > 0) {
                currentCount -= 1; // Decrement by 1
                counterDisplay.textContent = convertEnglishToPersianNumber(currentCount); // Convert back to Persian
            }
        });
    });
}

/**
 * #Highlighter
 */
function initHighlighter() {
    const selectColorElm = document.getElementById("product-selectColor");
    if (!selectColorElm) return;

    const checkedRadio = document.querySelector(".product-selectColor input[type='radio']:checked");

    if (checkedRadio) {
        const radioWrapper = checkedRadio.parentElement.parentElement;

        // Calculate scroll position to show half of the radio button
        const scrollPosition = checkedRadio.offsetLeft - radioWrapper.offsetWidth / 4;

        radioWrapper.scroll({ left: scrollPosition, behavior: "smooth" });
    }
}

/**
 * #MegaMenu
 */
function initMegaMenu() {
    const headerMegaMenu = document.querySelector(".header-megamenu");
    if (!headerMegaMenu) return;

    const megaMenuItems = document.querySelectorAll(".header-megamenu-subitem");
    megaMenuItems.forEach((item) => {
        item.addEventListener("mouseover", function () {
            // Clear active state from all menu items to ensure only one is highlighted
            [...megaMenuItems].forEach((e) => {
                e.classList.remove("active");
            });
            // Activate the currently hovered menu item
            item.classList.add("active");
        });
    });
}

/**
 * #Swiper
 * Initializes all Swiper sliders with default or custom options.
 */
function initSwiper() {
    const swipersElm = document.querySelectorAll(".swiper");
    if (swipersElm.length === 0) return;

    // Loop through each Swiper element/instance
    swipersElm.forEach((swiperEl) => {
        const defaultOptions = {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
            },
            // Additional options can be added here ...
        };
        let dataOptions = {};
        try {
            dataOptions = swiperEl.dataset.swiperOptions ? JSON.parse(swiperEl.dataset.swiperOptions) : {};
        } catch (err) {
            console.warn("Invalid Swiper options JSON in data attribute:", err);
        }

        const options = { ...defaultOptions, ...dataOptions };
        new Swiper(swiperEl, options);
        console.log(swiperEl);
    });
}

/**
 * #Textarea
 */
function initTextarea() {
    const productTextarea = document.getElementById("productModalTextarea");
    if (!productTextarea) return;

    const productTextareaInt = document.getElementById("productModalTextareaInt");
    if (!productTextareaInt) return;

    const textareaMaxChars = 100;

    function updateCounter() {
        let currentChars = productTextarea.value.length;
        if (currentChars > textareaMaxChars) {
            productTextarea.value = productTextarea.value.substring(0, textareaMaxChars);
            currentChars = textareaMaxChars;
        }
        productTextareaInt.textContent = `${currentChars}/${textareaMaxChars}`;
    }
    productTextarea.addEventListener("input", updateCounter);
}

/**
 * #ThemeSwitcher
 * Handles dark/light mode toggle based on localStorage and user interaction.
 */
function initThemeSwitcher() {
    const toggleBtn = document.querySelector(".btn-toggle");
    if (!toggleBtn) return;

    const THEME_CONFIG = {
        LABELS: {
            DARK_MODE: "حالت تاریک",
            LIGHT_MODE: "حالت روشن",
        },
        ICONS: {
            DARK_MODE: "ti-moon",
            LIGHT_MODE: "ti-brightness-up",
        },
    };
    const textEl = toggleBtn.querySelector(".fw-bold");
    const iconEl = toggleBtn.querySelector(".ti");
    const localTheme = localStorage.getItem("bsTheme");

    // Apply saved theme
    if (localTheme === "dark") {
        html.setAttribute("data-bs-theme", "dark");
        if (textEl) textEl.textContent = THEME_CONFIG.LABELS.LIGHT_MODE;
        if (iconEl) iconEl.classList.replace(THEME_CONFIG.ICONS.DARK_MODE, THEME_CONFIG.ICONS.LIGHT_MODE);
    }

    // Handle toggle click
    toggleBtn.addEventListener("click", () => {
        const currentTheme = html.getAttribute("data-bs-theme");
        if (currentTheme === "dark") {
            // Switch to light mode
            html.setAttribute("data-bs-theme", "light");
            localStorage.setItem("bsTheme", "light");
            if (textEl) textEl.textContent = THEME_CONFIG.LABELS.DARK_MODE;
            if (iconEl) iconEl.classList.replace(THEME_CONFIG.ICONS.LIGHT_MODE, THEME_CONFIG.ICONS.DARK_MODE);
        } else {
            // Switch to dark mode
            html.setAttribute("data-bs-theme", "dark");
            localStorage.setItem("bsTheme", "dark");
            if (textEl) textEl.textContent = THEME_CONFIG.LABELS.LIGHT_MODE;
            if (iconEl) iconEl.classList.replace(THEME_CONFIG.ICONS.DARK_MODE, THEME_CONFIG.ICONS.LIGHT_MODE);
        }
    });
}

/**
 * #Tooltip
 * Initializes Bootstrap tooltips on elements with the data attribute.
 */
function initTooltips() {
    const selectors = document.querySelectorAll("[data-bs-toggle='tooltip']");
    if (selectors.length === 0) return;

    // Create a new Bootstrap tooltip instance for each element with the data-bs-toggle="tooltip" attribute
    selectors.forEach((el) => {
        new bootstrap.Tooltip(el);
    });
}
