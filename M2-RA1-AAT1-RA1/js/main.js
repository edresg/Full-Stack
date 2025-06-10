document.addEventListener("DOMContentLoaded", () => {
  loadPage("home");

  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-page]")) {
      e.preventDefault();
      const page = e.target.getAttribute("data-page");
      loadPage(page);
    }
  });
});

async function loadPage(page) {
  try {
    const res = await fetch(`pages/${page}.html`);
    if (!res.ok) throw new Error("Page not found");
    const content = await res.text();
    document.getElementById("main-content").innerHTML = content;
  } catch (error) {
    document.getElementById("main-content").innerHTML = "<p>Error loading the page.</p>";
    console.error(error);
  }
}
