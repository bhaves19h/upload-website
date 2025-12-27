function uploadVideos() {
  const files = document.getElementById("videoFile").files;
  const status = document.getElementById("status");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");

  if (files.length === 0) {
    alert("Select videos");
    return;
  }

  const formData = new FormData();
  formData.append("title", "My Uploaded Video");
  formData.append("category", "Movies");

  for (let file of files) {
    formData.append("videos", file);
  }

  status.innerText = "Uploading...";
  progressBar.style.width = "0%";
  progressText.innerText = "0%";

  const xhr = new XMLHttpRequest();

  // ✅ USE PC IP (NOT localhost)
  xhr.open("POST", "https://video-ott-backend-1.onrender.com/api/videos/upload");

  // 🔄 REAL PROGRESS
  xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      const percent = (e.loaded / e.total) * 100;
      progressBar.style.width = percent + "%";
      progressText.innerText = Math.floor(percent) + "%";
    }
  };

  // ✅ COMPLETE
  xhr.onload = function () {
    if (xhr.status === 200) {
      status.innerText = "Upload Successful ✅";
      progressBar.style.width = "100%";
      progressText.innerText = "100%";
    } else {
      status.innerText = "Upload Failed ❌";
    }
  };

  // ❌ ERROR
  xhr.onerror = function () {
    status.innerText = "Upload Failed ❌";
  };

  xhr.send(formData);
}
