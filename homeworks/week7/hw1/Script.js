document
  .querySelector('form')
  .addEventListener('submit', (e) => {
    e.preventDefault()

    let hasError = false
    const values = {}

    const musts = document.querySelectorAll('.must')
    for (const must of musts) {
      const radios = must.querySelectorAll('input[type=radio]')
      const input = must.querySelector('input[type=text]')

      let isValid = true
      if (input) {
        values[input.name] = input.value
        if (!input.value) {
          isValid = false
        }
      } else if (radios.length) {
        isValid = [...radios].some((radio) => radio.checked)
        if (isValid) {
          const r = must.querySelector('input[type=radio]:checked')
          values[r.name] = r.value
        }
      } else {
        continue
      }

      if (!isValid) {
        must.classList.remove('hide-error')
        hasError = true
      } else {
        must.classList.add('hide-error')
      }
    }

    if (!hasError) {
      alert(JSON.stringify(values))
    }
  })
