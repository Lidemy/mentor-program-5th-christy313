const mainHTML = document.querySelector(".draw");

document.querySelector(".draw__btn").addEventListener("click", () => {
  mainHTML.innerHTML = "";
  drawResult();
});

async function getDrawAPI() {
  const res = await fetch("./api");
  const draw = await res.json();
  try {
    return draw;
  } catch (err) {
    return console.log(`Error: ${draw.error} & ${draw.message}`);
  }
}

async function drawResult() {
  const result = await getDrawAPI();
  try {
    mainHTML.innerHTML = `
      <div class="prize__result bg-image" style="background-image:url(${result.url})">
        <div class="text-center prize__result-content">
          <div class="card-body">
            <h1 class="card-text">${result.item}</h1>
            <h4 class="card-text">${result.content}</h4>
            <button class="draw__btn"><a href="/draw">Draw again!</a></button>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    return console.log(`Error: ${result.error} & ${result.message}`);
  }
}
