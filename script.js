const navBarElement = document.getElementById("topnav");
const navBarLinks = navBarElement.getElementsByTagName("a");
const contentElement = document.getElementById("content");
const homeElement = document.getElementById("home");
const aboutFile = "pages/sobre.html";
const portfolioFile = "pages/portfolio.html";
const formationFile = "pages/formacao.html";
const contactFile = "pages/contato.html";

const fileMap = {
  "#about": aboutFile,
  "#portfolio": portfolioFile,
  "#education": formationFile,
  "#contact": contactFile,
};

navBarElement.addEventListener("click", handleClickEvent);
homeElement.addEventListener("click", handleClickEvent);

function loadContent(file) {
  fetch(file)
    .then((response) => response.text())
    .then((text) => new DOMParser().parseFromString(text, "text/html"))
    .then((html) => {
      contentElement.innerHTML = html.body.innerHTML;
    })
    .catch((error) => {
      console.error("Error loading content:", error);
    });
}

function handleClickEvent(event) {
  const anchor = event.target.closest("a");
  if (!anchor) return;

  const targetHash = anchor.hash;
  const href = anchor.href;
  const currentElement = document.querySelector(
    'a.nav-item[href="' + targetHash + '"]',
  );

  for (let i = 0; i < navBarLinks.length; i++) {
    if (navBarLinks[i].classList.contains("active")) {
      navBarLinks[i].classList.remove("active");
    }
  }

  if (href.includes(targetHash)) {
    event.preventDefault();
    currentElement.classList.add("active");
  }
  loadContent(fileMap[targetHash]);
}

function sendForm(event) {
  event.preventDefault();
  const formElement = document.getElementById("contact-form");
  const formData = new FormData(formElement);
  const data = Object.fromEntries(formData.entries());

  if (data.fullname === "" || data.email === "" || data.subject === "") {
    alert("Por favor, preencha todos os campos antes de enviar o formulário.");
    return;
  }

  alert(
    "Formulário enviado com sucesso! Obrigado por entrar em contato, " +
      data.fullname +
      "!",
  );
}
