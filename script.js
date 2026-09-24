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

function getRandomMessage(previousMessage) {
  let availableMessages = messages.filter(
    message => message !== previousMessage
  );

  if (availableMessages.length === 0) {
    availableMessages = messages;
  }

  const randomIndex = Math.floor(
    Math.random() * availableMessages.length
  );

  return availableMessages[randomIndex];
}

function getMessageForToday() {
  const today = getTodayKey();

  const savedDate = localStorage.getItem("messageDate");
  const savedMessage = localStorage.getItem("dailyMessage");
  const previousMessage = localStorage.getItem("previousMessage");

  if (savedDate === today && savedMessage) {
    return savedMessage;
  }

  if (savedMessage) {
    localStorage.setItem("previousMessage", savedMessage);
  }

  const lastMessage = savedMessage || previousMessage;

  const newMessage = getRandomMessage(lastMessage);

  localStorage.setItem("messageDate", today);
  localStorage.setItem("dailyMessage", newMessage);

  return newMessage;
}

function showMessage() {
  const message = getMessageForToday();

  dailyMessage.textContent = message;
  messageBox.classList.remove("hidden");

  messageButton.textContent = "You already opened today’s message";
  messageButton.classList.add("opened");
}

messageButton.addEventListener("click", showMessage);