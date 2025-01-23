// Missing API call

function renderPokemonDetails() {
  const pokemonNumber = pokemon.id.toString().padStart(3, '0');
  const pokemonWeight = (pokemon.weight / 10).toLocaleString(undefined, {minimumFractionDigits:1});
  const pokemonHeight = (pokemon.height / 10).toLocaleString(undefined, {minimumFractionDigits:1});

  const pokemonDetails = document.querySelector('.pokemon__container');
  pokemonDetails.classList.add('pokemon-type-' + pokemon.types[0].type.name);

  const pokemonTitle = document.querySelector('.pokemon-header__title');
  pokemonTitle.innerHTML = pokemon.name;

  const pokemonId = document.querySelector('.pokemon-header__number');
  pokemonId.innerHTML = pokemonNumber;

  const pokemonImage = document.querySelector('.pokemon-header-carousel__pokemon-image');
  pokemonImage.setAttribute("alt", pokemon.name);
  pokemonImage.setAttribute("src", pokemon.sprites.other["official-artwork"].front_default);

// Missing links between Pokemon

  const pokemonTypes = document.querySelector('.pokemon-details__type-categories');
  function pokemonTypeTags() {
    for(let i = 0; i < pokemon.types.length; i++) {
      var typeTag = document.createElement('p');
      typeTag.innerHTML = pokemon.types[i].type.name;
      typeTag.classList.add('pokemon-details__type');
      typeTag.classList.add('pokemon-details__type-'+pokemon.types[i].type.name);
      pokemonTypes.appendChild(typeTag);
    };
  }
  pokemonTypeTags();

  const pokemonDataWeight = document.querySelector('.characteristics__data-weight .characteristics__data');
  pokemonDataWeight.innerHTML = `${pokemonWeight} kg`;

  const pokemonDataHeight = document.querySelector('.characteristics__data-height .characteristics__data');
  pokemonDataHeight.innerHTML = `${pokemonHeight} m`;

  const pokemonMoves = document.querySelector('.characteristics__data-moves');
  const mainMoves = pokemon.moves.slice(0,2); // This will prevent crahses on 1 element arrays
  function pokemonMainMoves() {
    for(let i = 0; i < mainMoves.length; i++) {
      var move = document.createElement('p');
      move.innerHTML = pokemon.moves[i].move.name;
      move.classList.add('characteristics__data');
      pokemonMoves.appendChild(move);
    };
  }
  pokemonMainMoves();

  // Missing description (not in data model)
  
  const pokemonDescription = document.querySelector('.pokemon-details__description');
  pokemonDescription.innerHTML = `Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.`;

  const pokemonStats = document.querySelector('.pokemon-details__statistics');
  function pokemonStatsList() {
    for(let i = 0; i < pokemon.stats.length; i++) {
      var statsShortName = ['HP','ATK','DEF','SATK','SDEF','SPD'];
      var statsItem = document.createElement('li');
      statsItem.innerHTML = `
        <p class="statistics__label">${statsShortName[i]}</p>
        <div class="statistics__divider"></div>
        <p class="statistics__value">${pokemon.stats[i].base_stat.toString().padStart(3, '0')}</p>
        <div class="statistics__progress-bar">
          <div class="statistics__progress" style="width:${pokemon.stats[i].base_stat}px"></div>
        </div>`;
      statsItem.classList.add('pokemon-statistics__item');
      pokemonStats.appendChild(statsItem);
    };
  }
  pokemonStatsList();

}

renderPokemonDetails(pokemon);