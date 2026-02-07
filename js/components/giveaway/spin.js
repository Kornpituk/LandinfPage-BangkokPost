export const initSpinerSlotMachine = () => {
  const reels = document.querySelectorAll(".slot-reel");
  if (!reels.length || !window.SlotMachine) return;

  const machines = [...reels].map(
    (reel) =>
      new SlotMachine(reel, {
        delay: 150,
        direction: "down",
      }),
  );

  const spinBtn = document.getElementById("spinBtn");
  const stopBtn = document.getElementById("stopBtn");

  let userEmail = null;
  let remainingSpins = 3;
  let isRegistered = false;

  const emailModal = new bootstrap.Modal(document.getElementById("emailModal"));

  // ------------------------
  // SPIN
  // ------------------------
  spinBtn.addEventListener("click", () => {
    if (!isRegistered) {
      emailModal.show();
      return;
    }

    if (remainingSpins <= 0) {
      alert("You have used all 3 spins");
      return;
    }

    remainingSpins--;

    machines.forEach((m) => m.shuffle(Infinity));

    spinBtn.disabled = true;
    spinBtn.innerText = `SPINNING (${remainingSpins} left)`;
  });

  // ------------------------
  // STOP
  // ------------------------
  stopBtn.addEventListener("click", async () => {
    await machines[0].stop(5);
    await machines[1].stop(6);
    await machines[2].stop(7);

    spinBtn.disabled = false;
    spinBtn.innerText = `SPIN (${remainingSpins} left)`;

    const results = machines.map((m) => m.active);

    if (results[0] === results[1] && results[1] === results[2]) {
      alert("🎉 Congratulations! You win!");
    }

    if (remainingSpins === 0) {
      spinBtn.disabled = true;
      spinBtn.innerText = "NO SPINS LEFT";
    }
  });

  // ------------------------
  // CONFIRM EMAIL
  // ------------------------
  document.getElementById("confirmEmailBtn").addEventListener("click", () => {
    const emailInput = document.getElementById("emailInput");
    const error = document.getElementById("emailError");

    if (!isValidEmail(emailInput.value)) {
      error.classList.remove("d-none");
      return;
    }

    error.classList.add("d-none");

    userEmail = emailInput.value;
    isRegistered = true;
    remainingSpins = 3;

    emailModal.hide();
  });
};

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
