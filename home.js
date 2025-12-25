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

    hamburger.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        body.classList.toggle("sidebar-open");
    });

    document.addEventListener("click", e => {
        if (
            sidebar.classList.contains("active") &&
            !sidebar.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            sidebar.classList.remove("active");
            body.classList.remove("sidebar-open");
        }
    });
});