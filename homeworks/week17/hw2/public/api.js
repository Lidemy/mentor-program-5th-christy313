const mainHTML = document.querySelector(".wrapper");

document.querySelector(".draw-btn").addEventListener("click", () => {
  mainHTML.innerHTML = "";
  drawResult();
});

async function getDrawAPI() {
  try {
    const res = await fetch("/api");
    return (draw = await res.json());
  } catch (err) {
    return console.log(`Error: ${draw.error} & ${draw.message}`);
  }
}

async function drawResult() {
  try {
    const result = await getDrawAPI();
    mainHTML.innerHTML = `
      <div class="wrapper">
        <div class="text-center">
          <h3 class="mt-3">${result.item}</h3>
          <p>${result.content}</p>
        </div>
        <img class="w-50 rounded mx-auto d-block img-fluid" src="${result.url}">
      </div>
    `;
  } catch (err) {
    return console.log(`Error: ${result.error} & ${result.message}`);
  }
}
