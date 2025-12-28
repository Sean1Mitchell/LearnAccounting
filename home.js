document.addEventListener("DOMContentLoaded" , () => {

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
                dropdown.style.maxHeight = dropdown.scrollHeight +  "px";
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


});