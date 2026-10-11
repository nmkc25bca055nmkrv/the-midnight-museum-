// THE MIDNIGHT MUSEUM — beginner-friendly interactions

// 1. Mobile navigation: open and close the menu on small screens.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

// Close the mobile menu after a visitor chooses a navigation link.
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// 2. Exhibit information shown in the pop-up dialog.
const exhibits = {
  clock: {
    category: "TIMEKEEPING / RECORD 001",
    title: "The Thirteenth Hour",
    description: "Recovered from the abandoned west wing, this brass clock has thirteen marks instead of twelve. The curator's log says it chimes only when someone is close to discovering a forgotten truth.",
    clue: "Listen between the ticks. The missing hour is not a time—it is a place."
  },
  mirror: {
    category: "REFLECTIONS / RECORD 002",
    title: "The Whispering Mirror",
    description: "The silver backing is older than the museum itself. Visitors have reported seeing a candlelit hallway in the glass, even when standing in a bright room.",
    clue: "A reflection shows what is in front of it. A memory may show what has been lost."
  },
  key: {
    category: "LOCKED OBJECTS / RECORD 003",
    title: "The Unclaimed Key",
    description: "This long, golden key has no matching lock in the museum's official inventory. Its teeth resemble the outline of the old building's floor plan.",
    clue: "Not every door opens with a key. Some open when the right question is asked."
  },
  letter: {
    category: "LOST RECORDS / RECORD 004",
    title: "The Last Curator's Letter",
    description: "Found beneath a loose floorboard, this letter is addressed to 'the next keeper'. The ink fades whenever the room lights are turned on.",
    clue: "The final line reads: 'When the clock tells you what, ask the mirror where.'"
  }
};

const artifactDialog = document.getElementById("artifactDialog");
const dialogCategory = document.getElementById("dialogCategory");
const dialogTitle = document.getElementById("dialogTitle");
const dialogDescription = document.getElementById("dialogDescription");
const dialogClue = document.getElementById("dialogClue");

document.querySelectorAll(".details-button").forEach(function (button) {
  button.addEventListener("click", function () {
    const item = exhibits[button.dataset.id];
    if (!item) return;
    dialogCategory.textContent = item.category;
    dialogTitle.textContent = item.title;
    dialogDescription.textContent = item.description;
    dialogClue.textContent = item.clue;
    artifactDialog.showModal();
  });
});

document.getElementById("dialogClose").addEventListener("click", function () {
  artifactDialog.close();
});
document.getElementById("dialogOk").addEventListener("click", function () {
  artifactDialog.close();
});

// 3. Mystery quiz: only the correct answer unlocks the secret room.
const answerButtons = document.querySelectorAll(".answer-option");
const gameFeedback = document.getElementById("gameFeedback");
const progressFill = document.getElementById("progressFill");
const caseStatus = document.querySelector(".case-status");
const secretRoom = document.getElementById("secretRoom");
let mysterySolved = false;

answerButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (mysterySolved) return;

    if (button.dataset.answer === "clock") {
      mysterySolved = true;
      button.classList.add("correct");
      gameFeedback.textContent = "Correct! A clock has hands and a face, and it tells the time. Room 13 is now unlocked below.";
      gameFeedback.className = "game-feedback success";
      caseStatus.innerHTML = "<i></i> SOLVED";
      caseStatus.style.color = "#bde6b0";
      progressFill.style.width = "100%";
      answerButtons.forEach(function (option) {
        option.disabled = true;
      });
      secretRoom.hidden = false;
      secretRoom.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      button.classList.add("incorrect");
      button.disabled = true;
      gameFeedback.textContent = "Not quite. Look closely at the clue: it has hands and a face, and it tells you when. Try another answer.";
      gameFeedback.className = "game-feedback error";
      progressFill.style.width = (100 * document.querySelectorAll(".answer-option:disabled").length / answerButtons.length) + "%";
    }
  });
});

// Reset the quiz so the visitor can try it again.
document.getElementById("resetMystery").addEventListener("click", function () {
  mysterySolved = false;
  answerButtons.forEach(function (button) {
    button.disabled = false;
    button.classList.remove("correct", "incorrect");
  });
  gameFeedback.textContent = "Your first guess is free. Choose wisely.";
  gameFeedback.className = "game-feedback";
  caseStatus.innerHTML = "<i></i> UNSOLVED";
  caseStatus.style.color = "";
  progressFill.style.width = "0%";
  secretRoom.hidden = true;
});

// 4. Visitor pass form: creates a personalised on-screen pass.
// This is a front-end demo; it does not send information to a server.
const visitorForm = document.getElementById("visitorForm");
const formResult = document.getElementById("formResult");
const passNumber = document.getElementById("passNumber");
let nextPassNumber = 1;

visitorForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const visitorName = document.getElementById("visitorName").value.trim();
  const visitorExhibit = document.getElementById("visitorExhibit").value;
  const visitorReason = document.getElementById("visitorReason").value.trim();

  if (!visitorName || !visitorExhibit) {
    formResult.textContent = "Please enter your name and choose an exhibit.";
    return;
  }

  const formattedNumber = String(nextPassNumber).padStart(3, "0");
  passNumber.textContent = formattedNumber;
  formResult.textContent = "Welcome, " + visitorName + "! Visitor pass № " + formattedNumber +
    " is ready. Your first stop: " + visitorExhibit + "." +
    (visitorReason ? " Your note has been added to this demo pass." : "");
  nextPassNumber += 1;
});
