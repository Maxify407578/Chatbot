document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
      appendMessage(userInput, 'user-message');
      generateResponse(userInput);
      document.getElementById('user-input').value = '';
    }
  });
  
  document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      document.getElementById('send-button').click();
    }
  });
  
  function appendMessage(message, senderClass) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', senderClass);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  function generateResponse(userInput) {
    let response = '';
  
    // Die Eingabe wird in Kleinbuchstaben umgewandelt, um die Übereinstimmung zu erleichtern
    const userMessage = userInput.toLowerCase();
  
    // Reaktionen auf Begrüßungen
    if (userMessage.includes('hallo') || userMessage.includes('hi') || userMessage.includes('hey')) {
      response = 'Hallo! Wie kann ich Ihnen helfen?';
    } 
    // Reaktionen auf Fragen zur Zeit
    else if (userMessage.includes('zeit') || userMessage.includes('uhrzeit')) {
      const currentTime = new Date().toLocaleTimeString();
      response = `Es ist jetzt ${currentTime}.`;
    } 
    // Reaktionen auf Fragen zum Datum
    else if (userMessage.includes('datum') || userMessage.includes('heute')) {
      const currentDate = new Date().toLocaleDateString();
      response = `Heute ist der ${currentDate}.`;
    } 
    // Reaktionen auf allgemeine Hilfeanfragen
    else if (userMessage.includes('hilfe') || userMessage.includes('was kannst du')) {
      response = 'Ich bin hier, um Ihnen zu helfen. Fragen Sie einfach!';
    } 
    // Reaktionen auf spezifische Themenfragen
    else if (userMessage.includes('wetter')) {
      response = 'Das Wetter ist sonnig. Möchten Sie etwas anderes wissen?';
    } 
    // Reaktionen auf Witze
    else if (userMessage.includes('witz')) {
      response = 'Warum können Geister so schlecht lügen? Weil man durch sie hindurchsehen kann!';
    } 
    // Fallback-Antwort für unbekannte Eingaben
    else {
      response = 'Tut mir leid, das habe ich nicht verstanden. Können Sie das anders formulieren?';
    }
  
    setTimeout(() => {
      appendMessage(response, 'bot-message');
    }, 1000);
  }
  document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
      appendMessage(userInput, 'user-message');
      sendToBackend(userInput); // Nachricht an den Backend-Server senden
      document.getElementById('user-input').value = '';
    }
  });
  
  function sendToBackend(message) {
    fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then(response => response.json())
      .then(data => {
        const botResponse = data.response;
        appendMessage(botResponse, 'bot-message');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  function appendMessage(message, senderClass) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', senderClass);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  