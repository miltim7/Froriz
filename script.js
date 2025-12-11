// script.js
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
});
