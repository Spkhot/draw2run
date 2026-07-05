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
                    value: 1,
                    transport_type: "beacon"
                });
            }
        });
    });

    // 6. Dynamic Cursor Gesture Trail Animation
    function initCursorTrail() {
        const canvas = document.getElementById("cursor-canvas");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let points = [];
        const maxPoints = 25; // Length of the trail

        // Set canvas boundaries
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        // Track cursor coordinates
        window.addEventListener("mousemove", (e) => {
            points.push({
                x: e.clientX,
                y: e.clientY,
                age: 0
            });

            // Limit trail buffer size
            if (points.length > maxPoints) {
                points.shift();
            }
        });

        // Animation rendering loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (points.length > 1) {
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);

                for (let i = 1; i < points.length; i++) {
                    const xc = (points[i].x + points[i - 1].x) / 2;
                    const yc = (points[i].y + points[i - 1].y) / 2;
                    ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
                }

                // Neon trail stylings (matching app's gold/steel-blue design)
                ctx.strokeStyle = "rgba(217, 160, 54, 0.85)"; // Warm Gold
                ctx.lineWidth = 3.5;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                
                // Add soft outer glow
                ctx.shadowBlur = 12;
                ctx.shadowColor = "rgba(217, 160, 54, 0.4)";
                ctx.stroke();

                // Draw secondary inner core line for premium light glow
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                for (let i = 1; i < points.length; i++) {
                    const xc = (points[i].x + points[i - 1].x) / 2;
                    const yc = (points[i].y + points[i - 1].y) / 2;
                    ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
                }
                ctx.strokeStyle = "#ffffff"; // Ice White core
                ctx.lineWidth = 1.2;
                ctx.shadowBlur = 0; // Disable glow on core
                ctx.stroke();
            }

            // Age and decay trail points so they fade out when mouse stops moving
            for (let i = 0; i < points.length; i++) {
                points[i].age += 1;
            }
            // Remove points that are too old or when static
            points = points.filter(p => p.age < maxPoints);

            requestAnimationFrame(animate);
        }
        animate();
    }
    initCursorTrail();
});
