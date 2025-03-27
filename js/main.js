document.addEventListener("DOMContentLoaded", () => {
    // Sticky Header
    const header = document.querySelector("header")
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled")
        } else {
            header.classList.remove("scrolled")
        }
    })

    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const navMenu = document.querySelector(".nav-menu")

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active")
    })

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll(".nav-menu a")
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active")
        })
    })

    // Testimonial Slider
    let currentSlide = 0
    const slides = document.querySelectorAll(".testimonial-slide")
    const dots = document.querySelectorAll(".dot")
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")

    function showSlide(index) {
        // Hide all slides
        slides.forEach((slide) => {
            slide.style.display = "none"
        })

        // Remove active class from all dots
        dots.forEach((dot) => {
            dot.classList.remove("active")
        })

        // Show the current slide and activate the corresponding dot
        slides[index].style.display = "block"
        dots[index].classList.add("active")
    }

    // Initialize slider
    showSlide(currentSlide)

    // Previous button click
    prevBtn.addEventListener("click", () => {
        currentSlide--
        if (currentSlide < 0) {
            currentSlide = slides.length - 1
        }
        showSlide(currentSlide)
    })

    // Next button click
    nextBtn.addEventListener("click", () => {
        currentSlide++
        if (currentSlide >= slides.length) {
            currentSlide = 0
        }
        showSlide(currentSlide)
    })

    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index
            showSlide(currentSlide)
        })
    })

    // Auto slide (optional)
    setInterval(() => {
        currentSlide++
        if (currentSlide >= slides.length) {
            currentSlide = 0
        }
        showSlide(currentSlide)
    }, 5000)

    // FAQ Accordion
    const faqItems = document.querySelectorAll(".faq-item")

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question")

        question.addEventListener("click", () => {
            // Close all other FAQ items
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active")
                }
            })

            // Toggle the current FAQ item
            item.classList.toggle("active")

            // Change the icon
            const icon = item.querySelector(".faq-toggle i")
            if (item.classList.contains("active")) {
                icon.className = "fas fa-minus"
            } else {
                icon.className = "fas fa-plus"
            }
        })
    })

    // Animate on scroll
    const animateElements = document.querySelectorAll(".animate-on-scroll")

    function checkScroll() {
        animateElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top
            const windowHeight = window.innerHeight

            if (elementTop < windowHeight - 100) {
                element.classList.add("visible")
            }
        })
    }

    // Initial check
    checkScroll()

    // Check on scroll
    window.addEventListener("scroll", checkScroll)

    // Animate counter
    const counterElements = document.querySelectorAll(".animate-count .stat-number")

    function animateCounter() {
        counterElements.forEach((counter) => {
            const target = Number.parseInt(counter.getAttribute("data-target"))
            const count = Number.parseInt(counter.innerText)
            const increment = target / 100

            if (count < target) {
                counter.innerText = Math.ceil(count + increment)
                setTimeout(animateCounter, 30)
            } else {
                counter.innerText = target
            }
        })
    }

    // Start counter animation when the about section is in view
    const aboutSection = document.querySelector(".about")

    function checkAboutSection() {
        const aboutTop = aboutSection.getBoundingClientRect().top
        const windowHeight = window.innerHeight

        if (aboutTop < windowHeight - 200 && !counterStarted) {
            animateCounter()
            counterStarted = true
        }
    }

    let counterStarted = false

    // Initial check
    checkAboutSection()

    // Check on scroll
    window.addEventListener("scroll", checkAboutSection)

    // Newsletter Form Submission
    const newsletterForm = document.querySelector(".newsletter-form")
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault()
            const emailInput = this.querySelector('input[type="email"]')
            if (emailInput.value) {
                // Here you would typically send the data to your server
                alert("Thank you for subscribing to our newsletter!")
                emailInput.value = ""
                this.querySelector('input[type="checkbox"]').checked = false
            }
        })
    }

    // Cookie functions
    function setCookie(name, value, days) {
        let expires = ""
        if (days) {
            const date = new Date()
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
            expires = "; expires=" + date.toUTCString()
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/"
    }

    function getCookie(name) {
        const nameEQ = name + "="
        const ca = document.cookie.split(";")
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) === " ") c = c.substring(1, c.length)
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
        }
        return null
    }

    // Cookie Consent Banner
    const cookieConsent = document.getElementById("cookie-consent")
    const acceptBtn = document.getElementById("cookie-accept")
    const declineBtn = document.getElementById("cookie-decline")

    // Check if user has already made a choice
    const cookieChoice = getCookie("cookieConsent")

    // If no choice has been made, show the banner
    if (cookieChoice === null) {
        // Show the banner after a short delay
        setTimeout(() => {
            cookieConsent.classList.add("show")
        }, 1000)
    }

    // Handle accept button click
    acceptBtn.addEventListener("click", () => {
        // Save the choice in a cookie (valid for 365 days)
        setCookie("cookieConsent", "accepted", 365)
        // Hide the banner
        cookieConsent.classList.remove("show")

        // Here you would typically initialize your analytics and tracking scripts
        console.log("Cookies accepted - analytics would be initialized here")
    })

    // Handle decline button click
    declineBtn.addEventListener("click", () => {
        // Save the choice in a cookie (valid for 365 days)
        setCookie("cookieConsent", "declined", 365)
        // Hide the banner
        cookieConsent.classList.remove("show")

        console.log("Cookies declined - only essential cookies will be used")
    })
})

