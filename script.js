document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".container");
    
    container.addEventListener("mouseover", function() {
        container.style.transform = "scale(1.05)";
    });

    container.addEventListener("mouseout", function() {
        container.style.transform = "scale(1)";
    });
});
