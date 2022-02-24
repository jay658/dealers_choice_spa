const ul = document.querySelector('ul')

ul.addEventListener('click', async(ev)=>{
    if(ev.target.tagName === 'LI'){
        const id = ev.target.getAttribute('data-id')
        await axios.delete(`/api/foods/${id}`)
        init()
    }
})

const form = document.querySelector('form')

form.addEventListener('submit', async(ev)=>{
    ev.preventDefault()
    const newFood = document.getElementById('input_item').value
    await axios.post('/api/foods', {name:newFood})
    init()
})

const init = async()=>{
    const response = await axios.get('/api/foods')
    const foods = response.data
    const html = foods.map(food=>{
        return `
            <li data-id='${food.id}'>${food.name}</li>
        `
    }).join('')

    ul.innerHTML = html
}

init()