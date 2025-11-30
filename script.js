document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll(".nav-link");
    const header = document.querySelector(".header");
    const hamburger = document.querySelector(".hamburger");
    const navLinksContainer = document.querySelector(".nav-links");
    const currentPage = window.location.pathname.split("/").pop();

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navLinksContainer.classList.toggle("nav-active");
        });
    }

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



    const onScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

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
    onScroll(); 

    if (currentPage === "Project.html") {
        navLinks.forEach(link => link.classList.remove("active"));
        const projectLink = document.querySelector('a[href*="Project.html"]');
        if (projectLink) projectLink.classList.add("active");
    } else if (currentPage === "blog.html") {
        navLinks.forEach(link => link.classList.remove("active"));
        const blogLink = document.querySelector('a[href*="blog.html"]');
        if (blogLink) blogLink.classList.add("active");
    }

    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            if (navLinksContainer.classList.contains("nav-active")) {
                navLinksContainer.classList.remove("nav-active");
            }

            const href = link.getAttribute("href");
            if (href && href.startsWith("index.html#")) {
                e.preventDefault();
                if (currentPage !== "index.html" && currentPage !== "") {
                    window.location.href = href;
                } else {
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

    const socialLinks = document.querySelectorAll(".social-links a");
    socialLinks.forEach(link => {
        link.addEventListener("click", e => {
            const url = link.getAttribute("href");
            if (url && !url.startsWith("#")) { 
                e.preventDefault();
                window.open(url, "_blank");
            }
        });
    });

    const logo = document.querySelector(".logo a");
    if (logo) {
        logo.addEventListener("click", e => {
            e.preventDefault();
            window.location.href = "index.html";
        });
    }
});
