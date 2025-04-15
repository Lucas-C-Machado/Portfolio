document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear()
  
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn")
    const mobileMenu = document.getElementById("mobile-menu")
  
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
      const icon = mobileMenuBtn.querySelector("i")
      if (mobileMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        const icon = mobileMenuBtn.querySelector("i")
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      })
    })
  
    // Tema claro/escuro
    const themeToggleBtn = document.getElementById("theme-toggle-btn")
    if (!themeToggleBtn) return
  
    function applyTheme(theme) {
      document.body.setAttribute("data-theme", theme)
      const sunIcon = themeToggleBtn.querySelector(".fa-sun")
      const moonIcon = themeToggleBtn.querySelector(".fa-moon")
      if (sunIcon && moonIcon) {
        if (theme === "light") {
          sunIcon.style.display = "none"
          moonIcon.style.display = "block"
        } else {
          sunIcon.style.display = "block"
          moonIcon.style.display = "none"
        }
      }
    }
  
    const savedTheme = localStorage.getItem("theme") || "dark"
    applyTheme(savedTheme)
  
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.body.getAttribute("data-theme") || "dark"
      const newTheme = currentTheme === "light" ? "dark" : "light"
      applyTheme(newTheme)
      localStorage.setItem("theme", newTheme)
    })
  
    // Skills tabs
    const skillsTabs = document.querySelectorAll(".skills-tab")
    const skillsTabPanes = document.querySelectorAll(".skills-tab-pane")
    skillsTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        skillsTabs.forEach((t) => t.classList.remove("active"))
        skillsTabPanes.forEach((p) => p.classList.remove("active"))
        this.classList.add("active")
        const tabId = this.getAttribute("data-tab")
        document.getElementById(`${tabId}-skills`).classList.add("active")
      })
    })
  
    // Verificar se o formulário foi enviado com sucesso
    // Usando localStorage para detectar o envio do formulário
    const contactForm = document.getElementById("contact-form")
    const toast = document.getElementById("toast")
  
    if (contactForm) {
      contactForm.addEventListener("submit", () => {
        // Salvar no localStorage que o formulário foi enviado
        localStorage.setItem("formSubmitted", "true")
      })
    }
  
    // Verificar se o formulário foi enviado anteriormente
    if (localStorage.getItem("formSubmitted") === "true" && toast) {
      // Limpar o flag
      localStorage.removeItem("formSubmitted")
  
      // Mostrar o toast
      toast.style.display = "flex"
      toast.classList.add("show")
  
      // Esconder o toast após 5 segundos
      setTimeout(() => {
        toast.classList.remove("show")
        setTimeout(() => {
          toast.style.display = "none"
        }, 300)
      }, 5000)
    }
  
    // Fechar o toast ao clicar no botão de fechar
    const toastClose = document.querySelector(".toast-close")
    if (toastClose) {
      toastClose.addEventListener("click", () => {
        toast.classList.remove("show")
        setTimeout(() => {
          toast.style.display = "none"
        }, 300)
      })
    }
  
    // Smooth scrolling (corrigido para não afetar links externos como o de e-mail)
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          e.preventDefault()
          const headerHeight = document.querySelector(".header").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
          window.scrollTo({ top: targetPosition, behavior: "smooth" })
        }
      })
    })
  
    // Header scroll effect
    const header = document.querySelector(".header")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  })
  