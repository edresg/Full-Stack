async function loadComponent(id, url) {
  const response = await fetch(url);
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}
loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");