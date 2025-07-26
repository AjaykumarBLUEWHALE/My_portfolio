function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
}


// Function to toggle the visibility of the menu overlay
  const hamb = document.getElementById('hamb');
  const closeBtn = document.getElementById('closeBtn');
  const menuOverlay = document.getElementById('menuOverlay');

  hamb.addEventListener('click', () => {
    menuOverlay.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    menuOverlay.classList.add('hidden');
  });

//target cursor//
function initCustomCursor() {
  const cursor = document.getElementById("target-cursor");
  const corners = cursor.querySelectorAll(".target-cursor-corner");
  let spinTl;

  const constants = {
    borderWidth: 3,
    cornerSize: 12,
    parallaxStrength: 0.00005,
  };

  // Center cursor at start
  gsap.set(cursor, {
    xPercent: -50,
    yPercent: -50,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  // Spin animation
  function startSpin() {
    if (spinTl) spinTl.kill();
    spinTl = gsap.timeline({ repeat: -1 });
    spinTl.to(cursor, {
      rotation: "+=360",
      duration: 2,
      ease: "none",
    });
  }
  startSpin();

  // Move cursor with mouse
  window.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: "power3.out",
    });
  });

  // Handle hover on targets
  document.querySelectorAll(".cursor-target").forEach((target) => {
    target.addEventListener("mouseenter", () => {
      if (spinTl) spinTl.pause();
      gsap.set(cursor, { rotation: 0 });
      updateCorners(target);
    });

    target.addEventListener("mousemove", (e) => {
      updateCorners(target, e.clientX, e.clientY);
    });

    target.addEventListener("mouseleave", () => {
      resetCorners();
      if (spinTl) spinTl.resume();
    });
  });

  function updateCorners(target, mouseX, mouseY) {
    const rect = target.getBoundingClientRect();
    const cursorRect = cursor.getBoundingClientRect();

    const cursorCenterX = cursorRect.left + cursorRect.width / 2;
    const cursorCenterY = cursorRect.top + cursorRect.height / 2;

    const { borderWidth, cornerSize, parallaxStrength } = constants;

    const offsets = [
      { x: rect.left - cursorCenterX - borderWidth, y: rect.top - cursorCenterY - borderWidth },
      { x: rect.right - cursorCenterX + borderWidth - cornerSize, y: rect.top - cursorCenterY - borderWidth },
      { x: rect.right - cursorCenterX + borderWidth - cornerSize, y: rect.bottom - cursorCenterY + borderWidth - cornerSize },
      { x: rect.left - cursorCenterX - borderWidth, y: rect.bottom - cursorCenterY + borderWidth - cornerSize },
    ];

    if (mouseX && mouseY) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = (mouseX - centerX) * parallaxStrength;
      const offsetY = (mouseY - centerY) * parallaxStrength;

      offsets.forEach((o) => {
        o.x += offsetX;
        o.y += offsetY;
      });
    }

    corners.forEach((corner, i) => {
      gsap.to(corner, {
        x: offsets[i].x,
        y: offsets[i].y,
        duration: 0.2,
        ease: "power2.out",
      });
    });
  }

  function resetCorners() {
    const { cornerSize } = constants;
    const resetOffsets = [
      { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
      { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
      { x: cornerSize * 0.5, y: cornerSize * 0.5 },
      { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
    ];

    corners.forEach((corner, i) => {
      gsap.to(corner, {
        x: resetOffsets[i].x,
        y: resetOffsets[i].y,
        duration: 0.3,
        ease: "power3.out",
      });
    });
  }
}

// 👇 Run only if screen is desktop (≥768px)
if (window.innerWidth >= 768) {
  initCustomCursor();
} else {
  // 👇 Remove custom cursor on mobile
  const cursorEl = document.getElementById("target-cursor");
  if (cursorEl) {
    cursorEl.style.display = "none";
    document.body.style.cursor = "default"; // fallback to regular pointer
  }
}
//skills section//
