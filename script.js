document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(entries => {
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

    const navLinks = document.querySelectorAll(".nav-link");
    const onScroll = () => {
        let current = "about"; 
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) { 
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    };

    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "index.html" || currentPage === "") {
        window.addEventListener("scroll", onScroll);
        onScroll(); 
    } else if (currentPage === "Project.html") {
        navLinks.forEach(link => {
            if (link.getAttribute("href").includes("Project.html")) {
                link.classList.add("active");
            }
        });
    } else if (currentPage === "blog.html") {
        navLinks.forEach(link => {
            if (link.getAttribute("href").includes("blog.html")) {
                link.classList.add("active");
            }
        });
    }

});