const form = document.getElementById('form')
const userChoice = document.getElementById('selection')
const results = document.getElementById('search_results')

const displayItems = (items) => {
  items.forEach(item => {
    const card = document.createElement('div')
    card.className = 'card'
    const title = document.createElement('h3')
    title.innerHTML = item.title

    const image = document.createElement('img')
    image.src = item.image

    const code = document.createElement('a')
    code.href = item.open_giveaway_url
    code.innerHTML = 'Click To See'

    results.append(card)
    card.append(title)
    card.append(image)
    card.append(code)
  })
}

const getData = async (string) => {
  try {
    const res = await axios.get('https://gamerpower.p.rapidapi.com/api/giveaways', {
      params: {platform: string},
      headers: {
        'X-RapidAPI-Key': '61d745a6b7mshab68a0704d6c8aap1437d2jsnd566753ee85c',
        'X-RapidAPI-Host': 'gamerpower.p.rapidapi.com'
        }
    })

    const items = res.data.slice(0 , 9)
    console.log(res.data)
    displayItems(items)
    
  } catch(e) {console.log('ERROR!', e)}
}

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}


form.addEventListener('submit', (e) => {
  e.preventDefault()
  removeAllChildNodes(results)
  getData(userChoice.value)
})