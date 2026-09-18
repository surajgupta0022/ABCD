const SERVER_IP = "play.ultimateplayz.fun";
const DISCORD_LINK = "https://discord.com/invite/aaAmawRzdQ";

const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

async function fetchServerStatus() {
    const countElement = document.getElementById("player-count");
    const statusText = document.getElementById("server-status-text");
    const statusDot = document.getElementById("status-dot");

    try {
        const response = await fetch(
            `https://api.mcstatus.io/v2/status/java/${encodeURIComponent(SERVER_IP)}`,
            {
                method: "GET",
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error("Server API error");
        }

        const data = await response.json();

        if (data.online) {
            const online = data.players?.online ?? 0;
            const max = data.players?.max ?? 0;

            countElement.textContent = `${online} / ${max}`;
            statusText.textContent = "Server Online";
            statusDot.classList.remove("offline");
        } else {
            countElement.textContent = "Offline";
            statusText.textContent = "Server Offline";
            statusDot.classList.add("offline");
        }
    } catch (error) {
        countElement.textContent = "Unavailable";
        statusText.textContent = "Status Unavailable";
        statusDot.classList.add("offline");
    }
}

fetchServerStatus();
setInterval(fetchServerStatus, 30000);

async function copyIP() {
    const ip = SERVER_IP;
    const toast = document.getElementById("toast");

    try {
        await navigator.clipboard.writeText(ip);
    } catch (error) {
        const textarea = document.createElement("textarea");
        textarea.value = ip;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
    }

    toast.textContent = `IP Copied: ${ip}`;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

const ipBox = document.querySelector(".server-ip-box");

if (ipBox) {
    ipBox.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            copyIP();
        }
    });
}

document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const item = button.parentElement;
        const currentlyOpen = document.querySelector(".faq-item.active");

        if (currentlyOpen && currentlyOpen !== item) {
            currentlyOpen.classList.remove("active");
        }

        item.classList.toggle("active");
    });
});

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.12
    }
);

document.querySelectorAll(".fade-in").forEach(element => {
    observer.observe(element);
});

document.addEventListener("keydown", event => {
    if (
        event.ctrlKey &&
        event.shiftKey &&
        event.key.toLowerCase() === "p"
    ) {
        window.open("https://pannel.ultimateplayz.fun", "_blank", "noopener");
    }
});

document.querySelectorAll(".rank-btn").forEach(button => {
    button.addEventListener("click", event => {
        event.stopPropagation();
    });
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        return;
    }
    fetchServerStatus();
});

/* ===== RISING BUBBLES ===== */
function createBubbles() {
    const container = document.getElementById("bubbles");
    if (!container) return;

    const bubbleCount = 32;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        const size = Math.random() * 20 + 6;
        const left = Math.random() * 100;
        const duration = Math.random() * 14 + 11;
        const delay = Math.random() * 16;

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;

        container.appendChild(bubble);
    }
}

createBubbles();