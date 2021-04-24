const sendBtn = document.querySelector('#send');
const messages = document.querySelector('#message');
const messageInput = document.querySelector('#message-input');
const nameInput = document.querySelector('#name-input');

let ws

function showMessage(message) {
    messages.innerHTML += `${message}\n\n`
    messages.scrollTop = messages.scrollHeight
    messageInput.value = ''
}

function init() {
    if (ws) {
        ws.onerror = ws.onopen = ws.onclose = null
        ws.close()
    }

    ws = new WebSocket('ws://localhost:6969')

    ws.onopen = () => console.log('!Connection opened!')

    ws.onmessage = (e) => showMessage(JSON.parse(e.data))

    ws.onclose = () => ws = null
}

sendBtn.onclick = function () {
    if (!ws) {
        showMessage("no WebSocket connection :(:");
        return;
    }

    ws.send(messageInput.value);
    showMessage(messageInput.value);
}

init();