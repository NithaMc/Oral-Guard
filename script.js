function goToPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));

  document.getElementById(pageId).classList.add('active');
}

function previewImage() {
  const input = document.getElementById('imageInput');
  const preview = document.getElementById('previewImg');

  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function(e) {
      preview.src = e.target.result;
      goToPage('preview');
    }

    reader.readAsDataURL(input.files[0]);
  } else {
    alert("Please upload an image first.");
  }
}
function showResult() {
  goToPage('result');

  // Reset states
  document.getElementById("healthForm").style.display = "none";
  document.getElementById("finalAdvice").style.display = "none";
  document.getElementById("resultText").style.display = "none";
  document.getElementById("loadingState").style.display = "block";

  // Simulate processing delay (3 seconds)
  setTimeout(() => {

    document.getElementById("loadingState").style.display = "none";
    document.getElementById("resultText").style.display = "block";

    const riskLevels = ["low", "medium", "high"];
    const randomRisk = riskLevels[Math.floor(Math.random() * 3)];

    if (randomRisk === "low") {
      document.getElementById("resultText").innerText =
        "Low Risk Detected (12%). No critical abnormalities identified.";
    }

    if (randomRisk === "medium") {
      document.getElementById("resultText").innerText =
        "Needs Monitoring (45%). Some irregular patterns detected.";

      document.getElementById("healthForm").style.display = "block";
    }

    if (randomRisk === "high") {
      document.getElementById("resultText").innerText =
        "Suspicious Patterns Detected (78%). Further evaluation recommended.";

      document.getElementById("healthForm").style.display = "block";
    }

  }, 3000); // 3 seconds loading
}


function submitHealthForm() {
  const checkboxes = document.querySelectorAll('#healthForm input[type="checkbox"]:checked');
  const riskFactors = checkboxes.length;

  let adviceMessage = "";

  if (riskFactors === 0) {
    adviceMessage =
      "Based on your responses, immediate risk appears moderate. Regular monitoring is advised.";
  }

  if (riskFactors >= 1 && riskFactors <= 2) {
    adviceMessage =
      "Multiple risk factors identified. Please schedule a dental examination within 2-4 weeks.";
  }

  if (riskFactors >= 3) {
    adviceMessage =
      "High combined risk detected. Immediate consultation with an oral specialist is strongly recommended.";
  }

  setTimeout(() => {
    scheduleAppointment();
  }, 2000);

  document.getElementById("adviceText").innerText = adviceMessage;
  document.getElementById("finalAdvice").style.display = "block";
 
}


function openModal() {
  document.getElementById("disclaimerModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("disclaimerModal").style.display = "none";
}

function acceptAndProceed() {
  const isChecked = document.getElementById("agreeCheck").checked;

  if (!isChecked) {
    alert("You must agree to continue.");
    return;
  }

  closeModal();
  goToPage('upload');
}
function scheduleAppointment() {
  const today = new Date();
  const appointment = new Date(today);
  appointment.setDate(today.getDate() + 3); // 3 days later

  const formattedDate = appointment.toDateString();

  document.getElementById("appointmentDate").innerText = formattedDate;

  goToPage('appointment');
}
function enableConfirm() {
  const date = document.getElementById("datePicker").value;
  const confirmBtn = document.getElementById("confirmBtn");

  if (date) {
    confirmBtn.disabled = false;
    document.getElementById("appointmentDate").innerText = date;
  } else {
    confirmBtn.disabled = true;
  }
}

function confirmAppointment() { 
  const message = document.getElementById("successMessage");

  message.innerText = "✅ Your appointment has been scheduled successfully!";
  message.style.display = "block";

  // Optional: disable button after confirmation
  document.getElementById("confirmBtn").disabled = true;

  // Optional auto redirect after 3 seconds
  // setTimeout(() => {
  //   goToPage('dashboard');
  // }, 3000);
}

