document.addEventListener("DOMContentLoaded", () => {

    //------------------------
    // Sidebar Toggle Settings
    //------------------------

    const hamburger = document.querySelector(".hamburger");
    const sidebar = document.querySelector(".sidebar");
    const body = document.body;
    const buttons = document.querySelectorAll(".sidebar-btn");

    //---------------
    // Sidebar Toggle
    //---------------

    // Toggle Sidebar
    hamburger.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        body.classList.toggle("sidebar-open");
        if (!sidebar.classList.contains("active")) closeAllDropdowns();
    });

    // Close All Sidebar Dropdowns
    function closeAllDropdowns() {
        document.querySelectorAll(".sidebar-dropdown").forEach(dropdown => {
            dropdown.style.maxHeight = null;
        });
    }

    // Sidebar Dropdown Toggle
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const dropdown = btn.nextElementSibling;

            if (!dropdown || !dropdown.classList.contains("sidebar-dropdown")) return;
            if (dropdown.style.maxHeight) {
                dropdown.style.maxHeight = null;
            } else {
                closeAllDropdowns();
                dropdown.style.maxHeight = dropdown.scrollHeight + "px";
            }
        });
    });

    // Close Sidebar if Clicked Outside Area
    document.addEventListener("click", e => {
        if (
            sidebar.classList.contains("active") &&
            !sidebar.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            sidebar.classList.remove("active");
            body.classList.remove("sidebar-open");
            closeAllDropdowns();
        }
    });


    // --------------------------
    // TABLE OF CONTENTS (TOC)
    // --------------------------
    const tocBtn = document.querySelector(".table-of-contents-btn");
    const tocContent = document.querySelector(".table-of-contents-content");
    const tocDropdowns = document.querySelectorAll(".toc-dropdown");

    // 1️⃣ Toggle the whole TOC
    tocBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        tocContent.style.display =
            tocContent.style.display === "block" ? "none" : "block";
    });

    // 2️⃣ Toggle dropdowns, close others
    const tocButtons = document.querySelectorAll(".toc-btn");
    tocButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const dropdown = btn.nextElementSibling;

            tocDropdowns.forEach((d) => {
                if (d !== dropdown) d.classList.remove("show");
            });

            dropdown.classList.toggle("show");
        });
    });

    // 3️⃣ Close TOC when clicking outside
    document.addEventListener("click", () => {
        tocContent.style.display = "none";
        tocDropdowns.forEach((d) => d.classList.remove("show"));
    });

    // 4️⃣ Close TOC when a link inside a dropdown is clicked
    tocDropdowns.forEach((dropdown) => {
        dropdown.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                tocContent.style.display = "none";
                tocDropdowns.forEach((d) => d.classList.remove("show"));
            });
        });
    });

    const scrollProgress = document.getElementById("progress");

    const calcScrollValue = () => {
        const pos = document.documentElement.scrollTop || document.body.scrollTop;
        const calcHeight =
            (document.documentElement.scrollHeight || document.body.scrollHeight) -
            document.documentElement.clientHeight;


        const scrollValue = calcHeight > 0
            ? Math.round((pos * 100) / calcHeight)
            : 0;

        scrollProgress.style.display = pos > 100 ? "grid" : "none";

        scrollProgress.style.background = `
        conic-gradient(#b8673d ${scrollValue}%, #d7d7d7 ${scrollValue}%)
    `;
    };

    scrollProgress.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", calcScrollValue);
    window.addEventListener("load", calcScrollValue);


});