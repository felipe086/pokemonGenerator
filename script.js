const container = document.querySelector('.pokemon-container')
const generate = document.querySelector('.pokemon-generate')
const totalPokemon = 898
const colorsByType = {
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

const pokemonTypesColor = Object.keys(colorsByType)
console.log(pokemonTypesColor)
const loading = () => {
  let loader = `<div class="loading"></div>`
  container.innerHTML = loader
}

const getPokemon = async _ => {
  loading()
  const randomPokemon = Math.floor(Math.random() * totalPokemon)
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${randomPokemon}`
  )
  const { id, name, types } = await response.json()
  showPokemon(id, name, types)
}

const showPokemon = (id, name, types) => {
  container.innerHTML = ''
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}`

  const type = types.map(type => type.type.name)
  const primaryType = pokemonTypesColor.find(value => type.indexOf(value) > -1)
  const color = colorsByType[primaryType]

  const output = `
    <div class="pokemon-img">
    <img src="${img}.png"" alt="${name}">
    </div>
    <div class="pokemon-info">
    <span class="pokemon-number">#${id.toString().padStart(3, '0')}</span>
    <h3 class="pokemon-name">${name[0].toUpperCase() + name.slice(1)}</h3>
    <small class="pokemon-type">${
      primaryType[0].toUpperCase() + primaryType.slice(1)
    }</small>
    </div>
    `
  container.style.backgroundColor = color
  generate.style.backgroundColor = color
  container.innerHTML += output
}

loading()
getPokemon()
generate.addEventListener('click', getPokemon)
