// ===============
// NAV ACTIVE LINK + SLIDER ANIMATION
// ===============

const navLinks = document.querySelectorAll('.nav-menu a');
const slider = document.querySelector('.nav-underline');

// Detect current page
let currentPage = window.location.pathname.split('/').pop();
if (currentPage === "") currentPage = "index.html";

// Encuentra el link correspondiente
navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active-link");

        // mover slider
        moveSlider(link);
    }

    // activar slider al hacer click (si quieres que se mueva en la misma página)
    link.addEventListener("click", () => {
        moveSlider(link);
    });
});

// Función que mueve la barrita premium
function moveSlider(element) {
    const linkRect = element.getBoundingClientRect();
    const menuRect = element.parentElement.parentElement.getBoundingClientRect();

    slider.style.width = `${linkRect.width}px`;
    slider.style.left = `${linkRect.left - menuRect.left}px`;
}


// =============================
// SCROLLSPY PREMIUM PARA TOC
// =============================

// ==========================
// TOC AVANZADO – Smooth Scroll
// ==========================
const tocLinks = document.querySelectorAll(".toc-list a");

tocLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const id = link.getAttribute("href");
        const section = document.querySelector(id);

        window.scrollTo({
            top: section.offsetTop - 100,
            behavior: "smooth"
        });
    });
});

// ==========================
// TOC AVANZADO – ScrollSpy + Underline
// ==========================
const tocUnderline = document.querySelector(".toc-underline");
const sections = [...tocLinks].map(link =>
    document.querySelector(link.getAttribute("href"))
);

window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 160;

    sections.forEach((section, i) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollPos >= top && scrollPos < top + height) {
            tocLinks.forEach(l => l.classList.remove("active-toc"));
            tocLinks[i].classList.add("active-toc");

            // Mover underline premium
            const rect = tocLinks[i].getBoundingClientRect();
            const parentRect = tocLinks[i].parentElement.parentElement.getBoundingClientRect();

            tocUnderline.style.width = `${rect.width}px`;
            tocUnderline.style.left = `${rect.left - parentRect.left}px`;
        }
    });
});

// ==========================
// TOC AVANZADO – Toggle en móvil
// ==========================
const tocToggle = document.querySelector(".toc-toggle");
const tocPanel = document.querySelector(".toc-panel");

if (tocToggle) {
    tocToggle.addEventListener("click", () => {
        const expanded = tocToggle.getAttribute("aria-expanded") === "true";
        tocToggle.setAttribute("aria-expanded", !expanded);
        tocPanel.classList.toggle("open");
    });
}

