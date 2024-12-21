const chatbotMessages = [
  "Hi there! I'm Bard, your AI companion. How are you feeling today?",
  "Let's talk about what's on your mind. What can I help you with?",
  "I'm here to listen. What's troubling you?",
  "Tell me more about how you're feeling.",
  "Is there anything specific you'd like to discuss?",
  "I'm here to chat. What's on your mind?" 
];

const emotionResponses = {
  happy: {
    message: "I'm glad to hear you're feeling happy! What's bringing you joy today?",
    followUp: "Would you like to share what's making you happy?",
    deeperQuestions: ["What are you looking forward to today?", "Can you describe a happy memory you have?", "What activities bring you joy?"]
  },
  sad: {
    message: "I'm sorry to hear you're feeling sad. It's okay to not be okay. ",
    followUp: "Is there anything specific that's making you feel sad today?",
    deeperQuestions: ["Do you want to talk about what's bothering you?", "Is there anything I can do to help?", "Have you tried any relaxation techniques?"]
  },
  anxious: {
    message: "It sounds like you're feeling anxious. Take some deep breaths. ",
    followUp: "What's causing you to feel anxious right now?",
    deeperQuestions: ["What can you do to calm yourself down?", "Have you tried any relaxation techniques?", "Is there anything I can do to help you feel more relaxed?"]
  },
  angry: {
    message: "I understand you're feeling angry. It's okay to feel angry.",
    followUp: "What happened that made you feel angry?",
    deeperQuestions: ["How can you express your anger in a healthy way?", "What can you do to de-escalate the situation?", "Is there anything you can do to resolve the situation?"]
  },
  stressed: {
    message: "It sounds like you're stressed. It's important to take breaks.",
    followUp: "What's causing you stress right now?",
    deeperQuestions: ["What are some stress-relieving activities you enjoy?", "Have you tried any relaxation techniques?", "Is there anything I can do to help you feel less stressed?"]
  },
  tired: {
    message: "Feeling tired is tough. Rest is important.",
    followUp: "Have you tried getting enough sleep lately?",
    deeperQuestions: ["What time do you usually go to bed and wake up?", "Do you have any trouble falling asleep?", "Are you engaging in any activities that might be interfering with your sleep?"] 
  },
  overwhelmed: {
    message: "It seems like you're feeling overwhelmed. It's okay to ask for help.",
    followUp: "What's making you feel overwhelmed right now?",
    deeperQuestions: ["Can you break down the tasks that are overwhelming you?", "Have you considered delegating any tasks?", "What are some ways you can simplify your workload?"]
  }
};

function sendMessage() {
  const input = document.getElementById("chatInput").value.trim();
  if (input) {
    const chatbot = document.getElementById("chatbot");
    chatbot.innerHTML += `<p><strong>You:</strong> ${input}</p>`;

    const response = getBotResponse(input);
    chatbot.innerHTML += `<p><strong>Bard:</strong> ${response.message}</p>`;

    if (response.followUp) {
      chatbot.innerHTML += `<p><strong>Bard:</strong> ${response.followUp}</p>`; 
    }

    document.getElementById("chatInput").value = "";
    chatbot.scrollTop = chatbot.scrollHeight;
  } else {
    alert("Please type a message.");
  }
}

function getBotResponse(userInput) {
  const lowerCaseInput = userInput.toLowerCase();

  for (let emotion in emotionResponses) {
    if (lowerCaseInput.includes(emotion)) {
      return emotionResponses[emotion];
    }
  }

  return {
    message: chatbotMessages[Math.floor(Math.random() * chatbotMessages.length)],
  };
}


function handleUserResponse(userInput, currentEmotion) { 
  const chatbot = document.getElementById("chatbot");
  chatbot.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

  if (currentEmotion && emotionResponses[currentEmotion].deeperQuestions) {
    const randomIndex = Math.floor(Math.random() * emotionResponses[currentEmotion].deeperQuestions.length);
    const deeperQuestion = emotionResponses[currentEmotion].deeperQuestions[randomIndex];
    chatbot.innerHTML += `<p><strong>Bard:</strong> ${deeperQuestion}</p>`;
  } else {
    
    const generalResponses = [
      "I'm here to listen. Tell me more.",
      "How else are you feeling today?",
      "Is there anything else you'd like to talk about?",
      "I'm here to support you. What's on your mind?"
    ];
    const randomIndex = Math.floor(Math.random() * generalResponses.length);
    chatbot.innerHTML += `<p><strong>Bard:</strong> ${generalResponses[randomIndex]}</p>`; 
  }

  document.getElementById("chatInput").value = "";
  chatbot.scrollTop = chatbot.scrollHeight;
}

