const signalButton = document.getElementById('signalButton');
const statusBox = document.getElementById('status');
const checkinButton = document.getElementById('checkinButton');
const checkinTime = document.getElementById('checkinTime');
const checkinStatus = document.getElementById('checkinStatus');
const modal = document.getElementById('contactModal');
const contactName = document.getElementById('contactName');
const newContact = document.getElementById('newContact');

let signalActive = false;
let checkinDeadline = null;
let checkinInterval = null;

signalButton.addEventListener('click', () => {
  signalActive = !signalActive;
  if (signalActive) {
    statusBox.textContent = 'DEMO SIGNAL ACTIVE — In a real app, this could notify your chosen trusted person. No message has been sent.';
    statusBox.className = 'status active';
    signalButton.querySelector('.signal-label').textContent = 'CANCEL SIGNAL';
    signalButton.querySelector('.signal-sub').textContent = 'Tap again to cancel demo';
  } else {
    statusBox.textContent = "Demo signal cancelled. You're in control. Nothing was sent.";
    statusBox.className = 'status safe';
    signalButton.querySelector('.signal-label').textContent = 'I NEED HELP';
    signalButton.querySelector('.signal-sub').textContent = 'Tap to start demo signal';
  }
});

checkinButton.addEventListener('click', () => {
  if (checkinDeadline) {
    clearInterval(checkinInterval);
    checkinDeadline = null;
    checkinInterval = null;
    checkinStatus.textContent = 'Check-in cancelled.';
    checkinButton.textContent = 'Start check-in →';
    return;
  }
  const minutes = Number(checkinTime.value);
  checkinDeadline = Date.now() + minutes * 60 * 1000;
  checkinButton.textContent = 'Cancel check-in ×';
  updateCheckin();
  checkinInterval = setInterval(updateCheckin, 1000);
});

function updateCheckin() {
  const remaining = Math.max(0, checkinDeadline - Date.now());
  if (remaining <= 0) {
    clearInterval(checkinInterval);
    checkinDeadline = null;
    checkinInterval = null;
    checkinStatus.textContent = "Check-in reminder reached. Please confirm you're okay.";
    checkinButton.textContent = 'Start check-in →';
    statusBox.textContent = 'CHECK-IN REMINDER — This is only a local demo reminder, not an emergency alert.';
    statusBox.className = 'status active';
    return;
  }
  const totalSeconds = Math.ceil(remaining / 1000);
  const mins = Math.floor(totalSeconds / 60);
  const secs = String(totalSeconds % 60).padStart(2, '0');
  checkinStatus.textContent = `Reminder in ${mins}:${secs}`;
}

document.getElementById('editContact').addEventListener('click', () => {
  newContact.value = contactName.textContent === 'A trusted person' ? '' : contactName.textContent;
  modal.hidden = false;
  newContact.focus();
});
document.getElementById('closeModal').addEventListener('click', () => modal.hidden = true);
document.getElementById('saveContact').addEventListener('click', () => {
  const name = newContact.value.trim();
  contactName.textContent = name || 'A trusted person';
  modal.hidden = true;
});
modal.addEventListener('click', event => { if (event.target === modal) modal.hidden = true; });
document.addEventListener('keydown', event => { if (event.key === 'Escape') modal.hidden = true; });
