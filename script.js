// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Smooth scroll function
    function smoothScroll(target, duration) {
        gsap.to(window, {
            duration: duration,
            scrollTo: target,
            ease: "power2.inOut"
        });
    }

    // Add click event listeners to all anchor tags
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScroll(target, 1); // 1 second duration, adjust as needed
            }
        });
    });

    // Create a container for smooth scrolling
    const smoothWrapper = document.createElement('div');
    smoothWrapper.className = 'smooth-wrapper';
    const smoothContent = document.createElement('div');
    smoothContent.className = 'smooth-content';

    // Move all content inside the smooth-content div
    while (document.body.firstChild) {
        smoothContent.appendChild(document.body.firstChild);
    }
    smoothWrapper.appendChild(smoothContent);
    document.body.appendChild(smoothWrapper);

    // Smooth scrolling for the entire page
    const smoother = ScrollSmoother.create({
        wrapper: '.smooth-wrapper',
        content: '.smooth-content',
        smooth: 1.5, // Adjust this value to change the smoothness
        effects: true
    });

    // Create scroll triggers for each section
    gsap.utils.toArray('.content > *').forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleClass: 'active',
            onEnter: () => console.log('Entered:', section),
            onLeave: () => console.log('Left:', section)
        });
    });

    // Add scroll animations that match the theme

    // Fade in and slide up effect for all sections with a more dramatic effect
    gsap.utils.toArray('.content > *').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 100,
            duration: 1.5,
            ease: 'elastic.out(1, 0.75)',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Enhanced parallax effect for images
    gsap.utils.toArray('.content img').forEach(img => {
        gsap.to(img, {
            y: -100,
            rotation: 5,
            ease: 'none',
            scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });

    // Scale and rotate effect for headings
    gsap.utils.toArray('.content h1, .content h2, .content h3').forEach(heading => {
        gsap.from(heading, {
            scale: 0.5,
            opacity: 0,
            rotation: -10,
            duration: 1.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: heading,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Stagger animation for list items with a bounce effect
    gsap.utils.toArray('.content ul, .content ol').forEach(list => {
        gsap.from(list.children, {
            opacity: 0,
            x: -50,
            stagger: 0.2,
            duration: 0.8,
            ease: 'bounce.out',
            scrollTrigger: {
                trigger: list,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Reveal animation for buttons with a pop effect
    gsap.utils.toArray('.content button').forEach(button => {
        gsap.from(button, {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.3)',
            scrollTrigger: {
                trigger: button,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Enhanced intro animation
    gsap.from('.nav', {
        y: -100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
    });

    gsap.from('.hero', {
        scale: 0.8,
        opacity: 0,
        duration: 2,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.5
    });

    // Add a cool cursor effect with trail
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        gsap.to(cursorTrail, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5
        });
    });

    gsap.utils.toArray('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {scale: 2, duration: 0.3});
            gsap.to(cursorTrail, {scale: 1.5, duration: 0.3});
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {scale: 1, duration: 0.3});
            gsap.to(cursorTrail, {scale: 1, duration: 0.3});
        });
    });

    // Add the cursor style in your CSS
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor, .cursor-trail {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
        }
        .custom-cursor {
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.6);
        }
        .cursor-trail {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(2px);
            transition: all 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});
