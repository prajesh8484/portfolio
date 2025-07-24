document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll(".nav-link");
    const header = document.querySelector(".header");
    const currentPage = window.location.pathname.split("/").pop();

    // --- Animation Logic ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });


    // --- All other page logic ---

    const onScroll = () => {
        // Header scroll effect
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Nav link highlighting for the main page
        if (currentPage === "index.html" || currentPage === "") {
            let currentSectionId = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - header.offsetHeight) {
                    currentSectionId = section.getAttribute("id");
                }
            });

            navLinks.forEach(link => {
                link.classList.remove("active");
                const href = link.getAttribute("href");
                if (href && href.includes(`#${currentSectionId}`)) {
                    link.classList.add("active");
                }
            });
        }
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // Run on load to set initial state

    // Set active link for other pages
    if (currentPage === "Project.html") {
        navLinks.forEach(link => link.classList.remove("active"));
        const projectLink = document.querySelector('a[href*="Project.html"]');
        if (projectLink) projectLink.classList.add("active");
    } else if (currentPage === "blog.html") {
        navLinks.forEach(link => link.classList.remove("active"));
        const blogLink = document.querySelector('a[href*="blog.html"]');
        if (blogLink) blogLink.classList.add("active");
    }

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("index.html#")) {
                e.preventDefault();
                // If we are not on the index page, go there first
                if (currentPage !== "index.html" && currentPage !== "") {
                    window.location.href = href;
                } else {
                    // Otherwise, smooth scroll
                    const targetId = href.substring(href.indexOf("#"));
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const offset = 100;
                        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - offset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                    }
                }
            }
        });
    });

    // Handle external social links
    const socialLinks = document.querySelectorAll(".social-links a");
    socialLinks.forEach(link => {
        link.addEventListener("click", e => {
            const url = link.getAttribute("href");
            if (url && !url.startsWith("#")) { // Ensure it's an external link
                e.preventDefault();
                window.open(url, "_blank");
            }
        });
    });

    // Logo link
    const logo = document.querySelector(".logo a");
    if (logo) {
        logo.addEventListener("click", e => {
            e.preventDefault();
            window.location.href = "index.html";
        });
    }
});
