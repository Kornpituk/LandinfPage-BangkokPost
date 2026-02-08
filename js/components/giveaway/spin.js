// Helper สำหรับตรวจสอบ Email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const initSpinerSlotMachine = () => {
  if (typeof SlotMachine === "undefined") {
    console.error("SlotMachine library is not loaded yet!");
    return;
  }

  const reelElements = document.querySelectorAll(".reel-col");
  if (!reelElements.length) return;

  // 1. ตั้งค่า Machine ให้สมูทขึ้น
  const machines = Array.from(reelElements).map((reel) => {
    return new SlotMachine(reel, {
      active: 0,
      delay: 400, // ความเร็วตอนเริ่มหมุน (จะถูกเปลี่ยนตอน shuffle)
      direction: "down",
      transition: "ease-in-out", // ใช้ easing เพื่อความนุ่มนวล
    });
  });

  const spinBtn = document.getElementById("spinBtn");
  const stopBtn = document.getElementById("stopBtn");
  const leverBall = document.getElementById("leverBall");
  const modalEl = document.getElementById("emailModal");

  let remainingSpins = 3;
  let isRegistered = false;
  let emailModal =
    modalEl && window.bootstrap ? new bootstrap.Modal(modalEl) : null;

  // --- ACTION: START SPIN ---
  const startSpinAction = () => {
    if (remainingSpins <= 0) {
      alert("You have used all 3 spins");
      return;
    }

    if (!isRegistered) {
      if (emailModal) emailModal.show();
      else alert("Please register first");
      return;
    }

    if (spinBtn.disabled) return;

    // เริ่มต้นการหมุน
    remainingSpins--;
    spinBtn.disabled = true;
    stopBtn.disabled = false;
    spinBtn.innerText = `SPINNING...`;

    // 2. สั่งหมุนค้างไว้ (Infinite)
    // ใช้ตัวเลขมหาศาลเพื่อให้มันไม่หยุดเอง
    machines.forEach((m) => {
      m.shuffle(999999);
    });

    // Animation คันโยก
    const lever = document.querySelector(".machine-lever");
    if (lever) {
      lever.classList.add("pulled");
      setTimeout(() => lever.classList.remove("pulled"), 500);
    }
  };

  // --- ACTION: STOP SPIN ---
  const stopSpinAction = async () => {
    if (stopBtn.disabled) return;
    stopBtn.disabled = true;

    // 3. หัวใจสำคัญ: การสั่ง Stop แบบ Step-by-Step
    // เราจะใช้การวนลูปหยุดทีละเครื่อง พร้อมเว้นจังหวะ (Delay)
    // เพื่อให้เหมือนกลไกตู้สล็อตจริงๆ

    for (let i = 0; i < machines.length; i++) {
      // สั่งหยุดเครื่องที่ i
      // ตัว Library จะคำนวณตำแหน่งหยุดที่เหมาะสมให้เอง
      await machines[i].stop();

      // เว้นจังหวะ 600ms ก่อนจะหยุดช่องถัดไป (ปรับได้ตามความชอบ)
      if (i < machines.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
    }

    // เมื่อทุกช่องหยุดสนิท
    finalizeResult();
  };

  const finalizeResult = () => {
    spinBtn.disabled = false;
    spinBtn.innerText = `SPIN (${remainingSpins} left)`;
    stopBtn.disabled = true;

    const results = machines.map((m) => m.active);

    // เช็ครางวัล
    if (results[0] === results[1] && results[1] === results[2]) {
      setTimeout(() => alert("🎉 JACKPOT! You Win! 🎉"), 300);
    }

    if (remainingSpins === 0) {
      spinBtn.disabled = true;
      spinBtn.innerText = "NO SPINS LEFT";
    }
  };

  // Bind Events
  spinBtn.addEventListener("click", startSpinAction);
  stopBtn.addEventListener("click", stopSpinAction);
  if (leverBall) leverBall.addEventListener("click", startSpinAction);

  // Register Logic (เหมือนเดิม)
  const confirmBtn = document.getElementById("confirmEmailBtn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      isRegistered = true;
      if (emailModal) emailModal.hide();
      alert("Registration Complete!");
    });
  }
};
