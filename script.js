const container = document.querySelector('.pokemon-container')
const totalPokemon = 898
const randomPokemon = Math.floor(Math.random() * totalPokemon)
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
  steel: '#9FB7B9',
  ice: '#50C5E7',
  ghost: '#7A62A2'
}

const types = Object.keys(colors)

const getPokemon = async id => {
  try {
    const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
    showPokemon(data)
  } catch (error) {
    console.error(error)
  }
}

const showPokemon = pokemon => {
  const id = pokemon.id.toString().padStart(3, '0')
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
  const pokemon_types = pokemon.types.map(type => type.type.name)
  const type = types.find(type => pokemon_types.indexOf(type) > -1)
  const color = colors[type]
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}`

  const output = `
    <div class="img-container">
      <img src="${img}.png"" alt="${name}">
    </div>
    <div class="info">
      <span class="number">#${id}</span>
      <h3 class="name">${name}</h3>
      <small class="type">${type[0].toUpperCase() + type.slice(1)}</small>
    </div>
  `
  container.style.backgroundColor = color
  container.innerHTML += output
}

getPokemon(randomPokemon)
