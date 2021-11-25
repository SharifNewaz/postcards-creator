// build a browser-style HTTP request data structure
const xhr = new XMLHttpRequest();
// it will be a GET request, the URL will this page's URL+"/download"
xhr.open("GET", "/display", true);

// callback function executed when the HTTP response comes back
xhr.onloadend = function(e) {
  // Get the server's response body
  let resp = JSON.parse(xhr.responseText);
  console.log(resp);
  //using the sent information to style my display
  document.getElementById("serverImage").src = resp.img;
  document.getElementById("message").textContent = resp.msg;
  document.getElementById("message").style.fontFamily = resp.fontFam;
  document.getElementById("page").style.backgroundColor = resp.col;
};
xhr.send();

//remove the border from the display when showing it
document.getElementById("img-btn").style.border = "none";
