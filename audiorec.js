const startRecordingButtonQ1 = document.getElementById("startRecordingQ1");
const stopRecordingButtonQ1 = document.getElementById("stopRecordingQ1");
const startRecordingButtonQ2 = document.getElementById("startRecordingQ2");
const stopRecordingButtonQ2 = document.getElementById("stopRecordingQ2");
const startRecordingButtonQ3 = document.getElementById("startRecordingQ3");
const stopRecordingButtonQ3 = document.getElementById("stopRecordingQ3");
const audioListQ1 = document.getElementById("audioListQ1");
const audioListQ2 = document.getElementById("audioListQ2");
const audioListQ3 = document.getElementById("audioListQ3");
const audioPlayerQ1 = document.getElementById("audioPlayerQ1");
const audioPlayerQ2 = document.getElementById("audioPlayerQ2");
const audioPlayerQ3 = document.getElementById("audioPlayerQ3");
let mediaRecorder;
let audioChunks = [];
let currentQuestion = "";

// Check for browser support
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (stream) {
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = function (event) {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = function () {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioURL = URL.createObjectURL(audioBlob);
        const listItem = document.createElement("li");
        const audioLink = document.createElement("a");
        audioLink.href = audioURL;
        audioLink.download = `${currentQuestion}_YourName.wav`; //here's the audio file name
        audioLink.textContent = "Download Audio";
        listItem.appendChild(audioLink);

        if (currentQuestion === "Q1") {
          audioListQ1.appendChild(listItem);
          audioPlayerQ1.src = audioURL;
        } else if (currentQuestion === "Q2") {
          audioListQ2.appendChild(listItem);
          audioPlayerQ2.src = audioURL;
        } else if (currentQuestion === "Q3") {
          audioListQ3.appendChild(listItem);
          audioPlayerQ3.src = audioURL;
        }

        // audioList.appendChild(listItem);
        // audioPlayer.src = audioURL;
        audioChunks = [];
      };
    })
    .catch(function (error) {
      console.error("Error accessing the microphone: " + error);
    });
} else {
  console.error("Brower doesn't support audio recording.");
}
stopRecordingButtonQ1.disabled = true;
startRecordingButtonQ1.addEventListener("click", function () {
  audioChunks = [];
  currentQuestion = "Q1";
  mediaRecorder.start();
  startRecordingButtonQ1.disabled = true;
  stopRecordingButtonQ1.disabled = false;
});
stopRecordingButtonQ1.addEventListener("click", function () {
  mediaRecorder.stop();
  stopRecordingButtonQ1.disabled = true;
  startRecordingButtonQ1.disabled = false;
});

stopRecordingButtonQ2.disabled = true;
startRecordingButtonQ2.addEventListener("click", function () {
  audioChunks = [];
  currentQuestion = "Q2";
  mediaRecorder.start();
  startRecordingButtonQ2.disabled = true;
  stopRecordingButtonQ2.disabled = false;
});
stopRecordingButtonQ2.addEventListener("click", function () {
  mediaRecorder.stop();
  stopRecordingButtonQ2.disabled = true;
  startRecordingButtonQ2.disabled = false;
});

stopRecordingButtonQ3.disabled = true;
startRecordingButtonQ3.addEventListener("click", function () {
  audioChunks = [];
  currentQuestion = "Q3";
  mediaRecorder.start();
  startRecordingButtonQ3.disabled = true;
  stopRecordingButtonQ3.disabled = false;
});
stopRecordingButtonQ3.addEventListener("click", function () {
  mediaRecorder.stop();
  stopRecordingButtonQ3.disabled = true;
  startRecordingButtonQ3.disabled = false;
});
