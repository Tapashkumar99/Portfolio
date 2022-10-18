var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }

  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// -------------------------- for small screen ----------------------------

var sidemen = document.getElementById("sidemenu");

function openmenu() {
  sidemen.style.right = "0";
}

function closemenu() {
  sidemen.style.right = "-200px";
}

// ------------------------ For Contact Form Details ------------------------

const scriptURL =
  "https://script.google.com/macros/s/AKfycbw6IyTAme39AV5NTj71NZwXRc7qyhYLYaPRy6zNs9BLCHUlOND1FDVf33RjozU0QWF73g/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg")

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Message sent successfully !!"
      setTimeout(()=>{
        msg.innerHTML = "" 
      },4000)
      form.reset()
    })
    .catch((error) => console.error("Error!", error.message));
});

// ------------------------Preloader-----------------------------

var loader = document.getElementById("preloader");

window.addEventListener("load", function () {
  loader.style.display = "none";
});
 