const messages = [
  "You’re allowed to take things slowly today.",
  "Something good can still happen today.",
  "Be a little kinder to yourself today.",
  "You don’t have to figure everything out at once.",
  "Rest is still part of moving forward.",
  "You’re closer than you think.",
  "Let today be simple.",
  "Not every day needs to be productive.",
  "You deserve a soft day too.",
  "Trust yourself a little more today."
];

const messageButton = document.getElementById("messageButton");
const messageBox = document.getElementById("messageBox");
const dailyMessage = document.getElementById("dailyMessage");

function getTodayKey() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getMessageForToday() {
  const today = getTodayKey();

  const savedDate = localStorage.getItem("messageDate");
  const savedMessage = localStorage.getItem("dailyMessage");

  if (savedDate === today && savedMessage) {
    return savedMessage;
  }

  const randomMessage =
    messages[Math.floor(Math.random() * messages.length)];

  localStorage.setItem("messageDate", today);
  localStorage.setItem("dailyMessage", randomMessage);

  return randomMessage;
}

function showMessage() {
  const message = getMessageForToday();

  dailyMessage.textContent = message;
  messageBox.classList.remove("hidden");

  messageButton.textContent = "Today’s message is already yours";
}

messageButton.addEventListener("click", showMessage);