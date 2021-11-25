// Always include at top of Javascript file
"use strict";

var boxs = document.getElementsByClassName("box");
var first_color_box = document.getElementById("a");
var act = document.getElementsByClassName("b1");

// UPLOAD IMAGE using a post request
// Called by the event listener that is waiting for a file to be chosen
function uploadFile() {
  // get the file chosen by the file dialog control
  const selectedFile = document.getElementById("fileChooser").files[0];
  // store it in a FormData object
  const formData = new FormData();
  // name of field, the file itself, and its name
  formData.append("newImage", selectedFile, selectedFile.name);

  // build a browser-style HTTP request data structure
  const xhr = new XMLHttpRequest();
  // it will be a POST request, the URL will this page's URL+"/upload"
  xhr.open("POST", "/upload", true);

  // callback function executed when the HTTP response comes back
  xhr.onloadend = function(e) {
    // Get the server's response body
    console.log(xhr.responseText);
    // now that the image is on the server, we can display it!
    let newImage = document.getElementById("serverImage");
    newImage.src = "../images/" + selectedFile.name;

    //for the chose image button to disappear when the images uploads
    document.getElementsByClassName("centered")[0].style.textIndent =
      "-999999px";

    //remove border when picture uploads
    document.getElementById("img-btn").style.border = "none";
  };

  // actually send the request
  xhr.send(formData);
}

// Add event listener to the file input element
document.getElementById("fileChooser").addEventListener("change", uploadFile);

//border for choosing the color
first_color_box.classList.add("active-border");
function changecolor(id) {
  let color = document.getElementById(id).textContent;
  document.getElementById(
    "page"
  ).style.backgroundColor = document.getElementById(id).textContent;
  document.getElementById(
    "img-btn"
  ).style.backgroundColor = document.getElementById(id).textContent;

  for (let i = 0; i < boxs.length; i++) {
    boxs[i].className = boxs[i].className.replace(" active-border", " ");
  }
  document.getElementById(id).classList.add("active-border");
}

// initial diamond for the font-family
act[0].classList.add("black-diamond");
act[1].classList.add("white-diamond");
act[2].classList.add("white-diamond");
act[3].classList.add("white-diamond");

//using chnagefont funtion to hardcode the fontFamily and the diamonds
function changefont(font) {
  document.getElementById("message").style.fontFamily = font;
  removeStylingSpan();
  if (font === "Indie Flower") {
    act[0].classList.add("black-diamond");
    act[1].classList.add("white-diamond");
    act[2].classList.add("white-diamond");
    act[3].classList.add("white-diamond");

    act[1].classList.remove("black-diamond");
    act[2].classList.remove("black-diamond");
    act[3].classList.remove("black-diamond");
  }
  if (font === "Dancing Script") {
    act[1].classList.add("black-diamond");
    act[0].classList.add("white-diamond");
    act[2].classList.add("white-diamond");
    act[3].classList.add("white-diamond");

    act[0].classList.remove("black-diamond");
    act[2].classList.remove("black-diamond");
    act[3].classList.remove("black-diamond");
  }
  if (font === "Long Cang") {
    act[2].classList.add("black-diamond");
    act[0].classList.add("white-diamond");
    act[1].classList.add("white-diamond");
    act[3].classList.add("white-diamond");

    act[0].classList.remove("black-diamond");
    act[1].classList.remove("black-diamond");
    act[3].classList.remove("black-diamond");
  }

  if (font === "Homemade Apple") {
    act[3].classList.add("black-diamond");
    act[0].classList.add("white-diamond");
    act[1].classList.add("white-diamond");
    act[2].classList.add("white-diamond");

    act[0].classList.remove("black-diamond");
    act[1].classList.remove("black-diamond");
    act[2].classList.remove("black-diamond");
  }
}

//this removes the basic styles from the span text from the messages when copying and pasting
function removeStylingSpan() {
  let spans = document.getElementsByTagName("span");
  for (let i = 0; i < spans.length; i++) {
    spans[i].style = "";
  }
}

//using fetch funtion to send post request to the server
document
  .getElementsByClassName("share")[0]
  .addEventListener("click", async function() {
    let fontFam = document.getElementsByClassName("black-diamond")[0]
      .textContent;
    let col = document.getElementsByClassName("active-border")[0].textContent;
    let msg = document.getElementById("message").textContent;
    let img = document.getElementById("serverImage").src;

    const data = { img, msg, col, fontFam };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  
    if (img !== "") {
      const response = await fetch("/api", options);
      const json = await response.json();
      window.location.href = "display.html";
    }
  });