document
  .querySelector('.questions')
  .addEventListener('click', (e) => {
    const clickArea = e.target.closest('.q-block')
    if (clickArea) {
      clickArea.classList.toggle('q-block--hide')
    }
  })
