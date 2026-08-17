// Qlip marketing site — nav scroll state, scroll-reveal, hero phone parallax,
// and the scripted chat demo. No frameworks; kept small and dependency-free.

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- sticky nav background on scroll ----
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---- mobile nav toggle ----
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // ---- scroll reveal ----
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }

  // ---- hero phone parallax tilt ----
  const stage = document.querySelector(".hero-stage");
  const phone = document.querySelector(".phone");
  if (stage && phone && !reduceMotion && matchMedia("(hover: hover)").matches) {
    stage.addEventListener("mousemove", (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      phone.style.transform = `rotateY(${-10 + x * 14}deg) rotateX(${4 - y * 10}deg)`;
    });
    stage.addEventListener("mouseleave", () => {
      phone.style.transform = "rotateY(-10deg) rotateX(4deg)";
    });
  }

  // ---- scripted chat demo ----
  const chatBody = document.querySelector("[data-chat-body]");
  if (chatBody) {
    const script = [
      { role: "user", text: "양변에서 질량 m을 나눠도 되는 이유가 뭐예요?" },
      { role: "ai", text: "ma = mg sinθ 에서 양변에 똑같이 m이 곱해져 있어서예요. 질량이 커지면 힘도 그만큼 커지니까, 가속도는 질량과 무관하게 그대로 유지돼요." },
      { role: "user", text: "그럼 마찰이 있으면 식이 어떻게 달라져요?" },
      { role: "ai", text: "마찰력 f = μmg cosθ 만큼 반대 방향으로 빼주면 돼요. a = g(sinθ − μcosθ) 가 되고, 마찰이 클수록 가속도는 줄어들어요." },
    ];

    let i = 0;
    let cancelled = false;

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const addBubble = async (msg) => {
      if (msg.role === "ai") {
        const typing = document.createElement("div");
        typing.className = "typing-dots";
        typing.innerHTML = "<span></span><span></span><span></span>";
        chatBody.appendChild(typing);
        chatBody.scrollTop = chatBody.scrollHeight;
        await wait(1100);
        typing.remove();
      }
      const bubble = document.createElement("div");
      bubble.className = `bubble ${msg.role === "user" ? "user" : "ai"}`;
      bubble.textContent = msg.text;
      chatBody.appendChild(bubble);
      chatBody.scrollTop = chatBody.scrollHeight;
      requestAnimationFrame(() => bubble.classList.add("show"));
    };

    const runLoop = async () => {
      while (!cancelled) {
        chatBody.innerHTML = "";
        for (const msg of script) {
          if (cancelled) return;
          await addBubble(msg);
          await wait(msg.role === "user" ? 500 : 1600);
        }
        await wait(2600);
      }
    };

    const io2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runLoop();
            io2.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io2.observe(chatBody);
  }
});
