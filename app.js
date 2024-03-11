const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-US";

recognition.onresult = function (event) {
  const result = event.results[event.results.length - 1][0].transcript;
  document.getElementById("response").textContent = "You said: " + result;
  processCommand(result);
};

recognition.onerror = function (event) {
  console.error("Speech recognition error:", event.error);
};

function processCommand(command) {
  // Implement your logic to handle different commands
  if (command.toLowerCase().includes("hello")) {
    speak("Hello! How can I assist you today?");
  } else if (command.toLowerCase().includes("time")) {
    const currentTime = new Date().toLocaleTimeString();
    speak("The current time is " + currentTime);
  } else if (command.toLowerCase().includes("turn off")) {
    recognition.continuous = false;
    speak("Happy to help you");
  } else {
    speak("I did not understand the command.");
  }
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

function startListening() {
  recognition.start();
  document.getElementById("response").textContent = "Listening...";
  console.log(recognition.start());
}

function stopListening() {
  recognition.stop();
  document.getElementById("response").textContent = "Stopped listening.";
}
