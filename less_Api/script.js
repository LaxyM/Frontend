const box = document.querySelector('#box')
const button = document.querySelector('#button') 

async function getFacts() {
    button.innerText = 'Loading...'
    const res = await fetch('https://catfact.ninja/fact')
    const data = await res.json()
    box.textContent = data.fact
    button.innerText = 'Another facts'
}

button.addEventListener('click', getFacts)