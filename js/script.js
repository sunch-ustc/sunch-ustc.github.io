const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatLog = document.getElementById("chat-log");

chatForm.addEventListener("submit", event => {
  event.preventDefault();

  const userMessage = userInput.value;
  userInput.value = "";

  fetch(`https://api.openai.com/v1/engines/davinci-codex/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+"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"
    },
    body: JSON.stringify({
      prompt: userMessage,
      max_tokens: 150,
      n: 1,
      stop: "\n",
    })
  })
  .then(response => response.json())
  .then(data => {
    const aiMessage = data.choices[0].text;
    const aiMessageElement = document.createElement("div");
    aiMessageElement.className = "ai-message";
    aiMessageElement.textContent = aiMessage;
    chatLog.appendChild(aiMessageElement);
  })
  .catch(error => console.error(error));
});
