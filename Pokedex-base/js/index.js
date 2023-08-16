import "./charts.js";
import { setPokemon, setImage } from "./pokedex.js";

const $form = document.querySelector('#form')
const $next = document.querySelector("#next-pokemon")
const $prev = document.querySelector("#prev-pokemon")
const $nextImage = document.querySelector("#next-image")
const $prevImage = document.querySelector("#prev-image")
const $pokedex = document.querySelector("#pokedex")
const $valueInput = document.querySelector("#id")
const $randomPokemon = document.querySelector("#pokemonRandom")
const $description = document.querySelector("#description")

let activePokemon = null

$form.addEventListener("submit", handleSubmit)
$next.addEventListener("click", handleNextPokemon)
$prev.addEventListener("click", handlePrevPokemon)
$nextImage.addEventListener("click", handleNextImage)
$prevImage.addEventListener("click", handlePrevImage)
$randomPokemon.addEventListener("click", pokemonRandom)

async function validatePokemon(id) {
  if (id == 0 || id >= 898) {
    $valueInput.value = "NO EXISTO 'AUN' "
    $description.textContent = "no hay informacion"
  } else {
    activePokemon = await setPokemon(id)
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  $pokedex.classList.add("is-open")
  const form = new FormData($form)
  const id = form.get("id")
  console.log(id)
  validatePokemon(id)
  // activePokemon = await setPokemon(id)
}

async function handleNextPokemon() {
  const id = activePokemon === null || activePokemon.id === 898? 1 : activePokemon.id + 1
  activePokemon = await setPokemon(id)
  $valueInput.value = id
}

async function handlePrevPokemon() {const id = activePokemon === null || activePokemon.id === 1 ? 898: activePokemon.id - 1
  activePokemon = await setPokemon(id)
  $valueInput.value = id
}

let activeSprite = 0
function handleNextImage() {
  if (activePokemon === null) return false
  if (activeSprite >= activePokemon.sprites.length - 1) {
    activeSprite = 0
    return setImage(activePokemon.sprites[activeSprite])
  }
  activeSprite = activeSprite + 1
  return setImage(activePokemon.sprites[activeSprite])
}

function handlePrevImage() {
  if (activePokemon === null) return false
  if (activeSprite <= 0) {
    activeSprite = activePokemon.sprites.length - 1
    return setImage(activePokemon.sprites[activeSprite])
  }
  activeSprite = activeSprite - 1
  return setImage(activePokemon.sprites[activeSprite])
}

function getRandomId(min, max){
  return Math.floor(Math.random() * (max - min)) + min
}

async function pokemonRandom() {
  const idRandom = getRandomId(1, 893)
  // console.log(idRandom)
  activePokemon = await setPokemon(idRandom)
  $valueInput.value = idRandom
}
