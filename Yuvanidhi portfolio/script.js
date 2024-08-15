document.addEventListener('DOMContentLoaded', function () {
    // Select the elements for menu toggle
    const hamburger = document.querySelector('.hamburger');
    const crossIcon = document.querySelector('.cross-icon');
    const menu = document.querySelector('.menu-list');

    // Check if elements exist before adding event listeners
    if (hamburger && crossIcon && menu) {
        // Add click event for hamburger to show menu
        hamburger.addEventListener('click', function () {
            menu.classList.add('active');
            hamburger.style.display = 'none';
            crossIcon.style.display = 'block';
        });

        // Add click event for cross icon to hide menu
        crossIcon.addEventListener('click', function () {
            menu.classList.remove('active');
            hamburger.style.display = 'block';
            crossIcon.style.display = 'none';
        });
    }

    // Smooth scrolling for anchor links with vertical centering
    document.querySelectorAll('.menu-list a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 70; // Adjust based on your header height or desired offset
                const viewportHeight = window.innerHeight;
                const targetRect = targetElement.getBoundingClientRect();
                const targetOffsetTop = targetRect.top + window.pageYOffset;
                const targetHeight = targetElement.offsetHeight;

                // Adjust the scroll position further down
                const offset = 40; // Increased value to scroll further down
                const scrollPosition = targetOffsetTop - (viewportHeight / 2 - targetHeight / 2) + headerOffset + offset;

                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Function to set the active link
    function setActiveLink() {
        const sections = document.querySelectorAll('section');
        let index = sections.length;

        while (--index >= 0) {
            const section = sections[index];
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const scrollY = window.pageYOffset;
            
            if (scrollY >= sectionTop - 70 && scrollY <= sectionTop + sectionHeight - 70) {
                document.querySelector(`.menu-list a[href="#${sectionId}"]`).classList.add('active-link');
            } else {
                document.querySelector(`.menu-list a[href="#${sectionId}"]`).classList.remove('active-link');
            }
        }
    }

    // Update active link on scroll
    window.addEventListener('scroll', setActiveLink);

    // Also update active link on initial load
    setActiveLink();
});
