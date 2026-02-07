export function initSlotMachine() {
  const spinBtn = document.getElementById("spinBtn"); // *สำคัญ: ต้องใส่ id="spinBtn" ที่ปุ่มกดใน HTML*

  if (!spinBtn) return; // ถ้าหน้าไหนไม่มีปุ่มนี้ ก็ไม่ต้องทำงาน

  spinBtn.addEventListener("click", spinSlots);

  function spinSlots() {
    const slots = document.querySelectorAll(".slot");
    const symbols = ["🎰", "💎", "🎁", "75", "🏆"];

    slots.forEach((slot) => {
      let spinCount = 0;
      const interval = setInterval(() => {
        const randomSymbol =
          symbols[Math.floor(Math.random() * symbols.length)];
        slot.innerHTML = `<span style="font-size: 2rem;">${randomSymbol}</span>`;
        spinCount++;

        if (spinCount >= 20) {
          clearInterval(interval);
        }
      }, 100);
    });

    setTimeout(() => {
      alert("Good luck! Check if you won!");
    }, 2500);
  }
}
