const container = document.querySelector('.pokemon-container')
const generate = document.querySelector('.pokemon-generate')
const totalPokemon = 898
const colors = {
  fire: '#FC7D25',
  grass: '#9ACD50',
  electric: '#FCF7DE',
  water: '#4492C5',
  ground: '#AB9943',
  rock: '#A38C21',
  fairy: '#FDB9E9',
  poison: '#B87FC8',
  bug: '#729F3F',
  dragon: '#97b3e6',
  psychic: '#F267B9',
  flying: '#BDB8B9',
  fighting: '#D46722',
  normal: '#A5ADAF',
  steel: '#9FB7B9',
  ice: '#51C3E6',
  ghost: '#7B62A3',
  dark: '#707070'
}

const pokemon_types = Object.keys(colors)

const getPokemon = async _ => {
  const randomPokemon = Math.floor(Math.random() * totalPokemon)
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${randomPokemon}`
  )
  const data = await response.json()
  showPokemon(data)
}

const showPokemon = pokemon => {
  container.innerHTML = ''
  // Preenchendo com 0
  const id = pokemon.id.toString().padStart(3, '0')
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
  // Pegando o nome/ o tipo
  const typeName = pokemon.types.map(type => type.type.name)
  // console.log(typeName)
  const type = pokemon_types.find(type => typeName.indexOf(type) > -1)
  // console.log(type)
  const color = colors[type]
  // console.log(color)
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}`

  const output = `
    <div class="pokemon-img">
      <img src="${img}.png"" alt="${name}">
    </div>
    <div class="pokemon-info">
      <span class="pokemon-number">#${id}</span>
      <h3 class="pokemon-name">${name}</h3>
      <small class="pokemon-type">${
        type[0].toUpperCase() + type.slice(1)
      }</small>
    </div>
  `
  container.style.backgroundColor = color
  generate.style.backgroundColor = color
  container.innerHTML += output
}

getPokemon()
generate.addEventListener('click', getPokemon)
