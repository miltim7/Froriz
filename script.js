document.addEventListener("DOMContentLoaded", function () {
    var burger = document.querySelector(".burger");
    var mobileMenu = document.querySelector(".mobile-menu");
    var navLinks = document.querySelectorAll(".nav a, .mobile-menu__nav a");
    var typeBlocks = document.querySelectorAll(".type");

    function closeMobileMenu() {
        if (!burger || !mobileMenu) return;
        burger.classList.remove("burger--active");
        mobileMenu.classList.remove("mobile-menu--open");
    }

    if (burger && mobileMenu) {
        burger.addEventListener("click", function () {
            var active = burger.classList.toggle("burger--active");
            if (active) {
                mobileMenu.classList.add("mobile-menu--open");
            } else {
                mobileMenu.classList.remove("mobile-menu--open");
            }
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            var href = link.getAttribute("href");
            if (!href || !href.startsWith("#")) return;
            var target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            closeMobileMenu();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    typeBlocks.forEach(function (block) {
        var previewImg = block.querySelector(".type__preview img");
        var thumbs = block.querySelectorAll(".type-thumb");
        if (!previewImg || !thumbs.length) return;

        var currentIndex = 0;

        function setActive(index) {
            if (index < 0 || index >= thumbs.length) return;
            currentIndex = index;
            thumbs.forEach(function (thumb, i) {
                if (i === index) {
                    thumb.classList.add("is-active");
                } else {
                    thumb.classList.remove("is-active");
                }
            });
            var img = thumbs[index].querySelector("img");
            if (img && img.src) {
                previewImg.src = img.src;
            }
        }

        thumbs.forEach(function (thumb, index) {
            thumb.addEventListener("click", function () {
                setActive(index);
            });
        });

        setActive(0);

        setInterval(function () {
            var next = currentIndex + 1;
            if (next >= thumbs.length) next = 0;
            setActive(next);
        }, 5000);
    });

    (function () {
        var timeline = document.querySelector(".process__timeline");
        var line = document.querySelector(".process-timeline__progress-line");
        var steps = document.querySelectorAll(".process-step");
        
        if (!timeline || !line || !steps.length) return;

        var animationDuration = 12000; 

        function animateProcess(timestamp) {
            if (window.innerWidth <= 768) {
                line.style.width = "0%";
                steps.forEach(function(s) { s.classList.add("is-active"); }); 
                return;
            }

            var progress = (timestamp % animationDuration) / animationDuration;
            var currentLineWidth = timeline.offsetWidth * progress;
            
            line.style.width = (progress * 100) + "%";

            steps.forEach(function (step) {
                var stepLeft = step.offsetLeft;
                var stepWidth = step.offsetWidth;
                var triggerPoint = stepLeft + (stepWidth / 3);

                if (currentLineWidth >= triggerPoint) {
                    step.classList.add("is-active");
                } else {
                    step.classList.remove("is-active");
                }
            });

            requestAnimationFrame(animateProcess);
        }

        requestAnimationFrame(animateProcess);
    })();
});