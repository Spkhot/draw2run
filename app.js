// GestureFlow Website Interactive Scripts

document.addEventListener("DOMContentLoaded", () => {
    // 1. Step-by-Step Guide Tabs
    const tabTriggers = document.querySelectorAll(".tab-trigger");
    const tabContents = document.querySelectorAll(".tab-content");

    tabTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const stepNum = trigger.getAttribute("data-step");

            // Deactivate all triggers and hide all contents
            tabTriggers.forEach(t => t.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            // Activate current trigger
            trigger.classList.add("active");
            
            // Show matching content panel
            const activePanel = document.getElementById(`step-${stepNum}`);
            if (activePanel) {
                activePanel.classList.add("active");
            }
        });
    });

    // 2. FAQ Accordion Panels
    const faqTriggers = document.querySelectorAll(".faq-trigger");

    faqTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const faqItem = trigger.parentElement;
            const faqAnswer = trigger.nextElementSibling;
            const isActive = faqItem.classList.contains("active");

            // Close all open FAQs for a clean accordion experience
            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".faq-answer").style.maxHeight = null;
            });

            // If it wasn't already open, open it
            if (!isActive) {
                faqItem.classList.add("active");
                // Animate expansion using scrollHeight
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
            }
        });
    });

    // 3. Mobile Hamburger Menu Toggle
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.querySelector(".navbar");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navbar.classList.toggle("mobile-active");
            menuToggle.classList.toggle("active");
        });

        // Close menu when clicking navigation links
        const navLinks = document.querySelectorAll(".nav-links a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("mobile-active");
                menuToggle.classList.remove("active");
            });
        });

        // Close menu when clicking outside navbar area
        document.addEventListener("click", (e) => {
            if (!navbar.contains(e.target) && navbar.classList.contains("mobile-active")) {
                navbar.classList.remove("mobile-active");
                menuToggle.classList.remove("active");
            }
        });
    }

    // 4. Navbar Scroll Glow Effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 5. Google Analytics Custom Download Click Tracker
    const downloadLinks = document.querySelectorAll('a[href*="GestureFlow.exe"]');
    downloadLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (typeof gtag === "function") {
                gtag("event", "file_download", {
                    file_name: "GestureFlow.exe",
                    file_extension: "exe",
                    link_text: link.textContent.trim(),
                    value: 1
                });
            }
        });
    });
});
