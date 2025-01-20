function renderPokemon() {
  const pokemonNumber = pokemon.id.toString().padStart(3, '0');

  const pokemonList = document.querySelector('.pokemon__grid');

  const listItem = document.createElement('li');
  listItem.classList.add('pokemon__item');


  const pokemonCard = document.createElement('a');
  pokemonCard.classList.add('pokemon__item-link');
  pokemonCard.href = "./detail.html";
  pokemonCard.innerHTML = `
    <p class="pokemon__number">#${pokemonNumber}</p>
        <img class="pokemon__image" alt="${pokemon.name}" src="${pokemon.sprites.other["official-artwork"].front_default}">
      <p class="pokemon__name">${pokemon.name}</p>
  `;

  pokemonList.appendChild(listItem);
  listItem.appendChild(pokemonCard);
}

renderPokemon(pokemon);

number.toString().padStart(2, '0')