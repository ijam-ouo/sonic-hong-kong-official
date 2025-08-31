const startRecordingButtonQ1 = document.getElementById("startRecordingQ1");
const stopRecordingButtonQ1 = document.getElementById("stopRecordingQ1");
const startRecordingButtonQ2 = document.getElementById("startRecordingQ2");
const stopRecordingButtonQ2 = document.getElementById("stopRecordingQ2");
const audioList = document.getElementById("audioList");
const audioPlayer = document.getElementById("audioPlayer");
let mediaRecorder;
let audioChunks = [];

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
        audioLink.download = "QX_YourName.wav"; //here's the audio file name
        audioLink.textContent = "Download Audio";
        listItem.appendChild(audioLink);
        audioList.appendChild(listItem);
        audioPlayer.src = audioURL;
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
  mediaRecorder.start();
  startRecordingButtonQ1.disabled = true;
  stopRecordingButtonQ1.disabled = false;
});
stopRecordingButtonQ1.addEventListener("click", function () {
  mediaRecorder.stop();
  stopRecordingButtonQ1.disabled = true;
  startRecordingButtonQ1disabled = false;
});

stopRecordingButtonQ2.disabled = true;
startRecordingButtonQ2.addEventListener("click", function () {
  audioChunks = [];
  mediaRecorder.start();
  startRecordingButtonQ2.disabled = true;
  stopRecordingButtonQ2.disabled = false;
});
stopRecordingButtonQ2.addEventListener("click", function () {
  mediaRecorder.stop();
  stopRecordingButtonQ2.disabled = true;
  startRecordingButtonQ2.disabled = false;
});
