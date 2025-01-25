async function getPokemonDetailFromAPI(id){
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await response.json();
  renderPokemon(data);
}

async function getPokemons(number) {
  for (let i=1; i<=number; i++) {
    await getPokemonDetailFromAPI(i);
  }
}

function renderPokemon(pokemon) {
  const pokemonNumber = pokemon.id.toString().padStart(3, '0');

  const pokemonList = document.querySelector('.pokemon__grid');

  const listItem = document.createElement('li');
  listItem.classList.add('pokemon__item');


  const pokemonCard = document.createElement('a');
  pokemonCard.classList.add('pokemon__item-link');
  pokemonCard.href = `./detail.html?pokemonId=${pokemon.id}`;
  pokemonCard.innerHTML = `
    <p class="pokemon__number">#${pokemonNumber}</p>
        <img class="pokemon__image" alt="${pokemon.name}" src="${pokemon.sprites.other["official-artwork"].front_default}">
      <p class="pokemon__name">${pokemon.name}</p>
  `;

  pokemonList.appendChild(listItem);
  listItem.appendChild(pokemonCard);
}

getPokemons(150);

function searchPokemon() {

  let input = document.querySelector('.search__input');
  let filter = input.value.toUpperCase();
  let ul = document.querySelector('.pokemon__grid');
  let li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    let pokemonName = li[i].querySelector('.pokemon__name');
    let pokemonNumber = li[i].querySelector('.pokemon__number');
    let txtValue = pokemonName.textContent || pokemonName.innerText;
    let numValue = pokemonNumber.textContent || pokemonNumber.innerText;
    if ((txtValue.toUpperCase().indexOf(filter) > -1) || (numValue.toUpperCase().indexOf(filter) > -1))  {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
  
}
