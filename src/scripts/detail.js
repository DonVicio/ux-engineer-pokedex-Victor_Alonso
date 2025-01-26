const params = new URLSearchParams(document.location.search);
const pokemonIdparam = params.get("pokemonId");

async function getPokemonDetailFromAPI(){
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIdparam}/`);
  const data = await response.json();
  renderPokemonDetails(data);
}

async function getPokemonDescriptionFromAPI(){
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonIdparam}/`);
  const data = await response.json();
  renderPokemonDescription(data);
}

function renderPokemonDetails(pokemon) {

  const pokemonNumber = pokemon.id.toString().padStart(3, '0');
  const pokemonWeight = (pokemon.weight / 10).toLocaleString(undefined, {minimumFractionDigits:1});
  const pokemonHeight = (pokemon.height / 10).toLocaleString(undefined, {minimumFractionDigits:1});

  const pokemonMetaTitle = document.querySelector('title');
  pokemonMetaTitle.innerHTML = `${pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)} Details`;

  const pokemonDetails = document.querySelector('.pokemon__container');
  pokemonDetails.classList.add('pokemon-type-' + pokemon.types[0].type.name);

  const pokemonHeader = document.querySelector('.pokemon-header__title-container');
  const pokemonTitle = document.createElement('h1');
  pokemonTitle.classList.add('pokemon-header__title');
  pokemonTitle.innerHTML = pokemon.name;
  const pokemonId = document.createElement('p');
  pokemonId.classList.add('pokemon-header__number');
  pokemonId.innerHTML = pokemonNumber;
  pokemonHeader.appendChild(pokemonTitle);
  pokemonHeader.appendChild(pokemonId);


  const pokemonImage = document.querySelector('.pokemon-header-carousel__pokemon-image');
  pokemonImage.alt = pokemon.name;
  pokemonImage.src = pokemon.sprites.other["official-artwork"].front_default;

  const pokemonPrev = document.querySelector('.pokemon-header-carousel__prev-link');
  pokemonPrev.href = `./detail.html?pokemonId=${pokemon.id - 1}`;
  if (pokemon.id === 1){
    pokemonPrev.style = `opacity: 0.2; cursor: not-allowed;`;
    pokemonPrev.href = '';
  };

  const pokemonNext = document.querySelector('.pokemon-header-carousel__next-link');
  pokemonNext.href = `./detail.html?pokemonId=${pokemon.id + 1}`;

  const pokemonTypes = document.querySelector('.pokemon-details__type-categories');
  function pokemonTypeTags() {
    for(let i = 0; i < pokemon.types.length; i++) {
      let typeTag = document.createElement('p');
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
      let move = document.createElement('p');
      move.innerHTML = pokemon.moves[i].move.name;
      move.classList.add('characteristics__data');
      pokemonMoves.appendChild(move);
    };
  }
  pokemonMainMoves();

  const pokemonStats = document.querySelector('.pokemon-details__statistics');
  function pokemonStatsList() {
    for(let stat of pokemon.stats) {
      const statsShortName = ['HP','ATK','DEF','SATK','SDEF','SPD'];
      const statsItem = document.createElement('li');
      statsItem.innerHTML = `
        <p class="statistics__label">${statsShortName[pokemon.stats.indexOf(stat)]}</p>
        <div class="statistics__divider"></div>
        <p class="statistics__value">${stat.base_stat.toString().padStart(3, '0')}</p>
        <div class="statistics__progress-bar">
          <div class="statistics__progress" style="width:${stat.base_stat}px"></div>
        </div>`;
      statsItem.classList.add('pokemon-statistics__item');
      pokemonStats.appendChild(statsItem);
    };
  }
  pokemonStatsList();

}

function renderPokemonDescription(pokemon) {
  
  const pokemonDescription = document.querySelector('.pokemon-details__description');
  function swordVersion(entry) {
    if (entry.version.name === "sword" & entry.language.name === "en"){
      return entry;
    }
  };

  function letsgopikachuVersion(entry) {
    if (entry.version.name === "lets-go-pikachu" & entry.language.name === "en"){
      return entry;
    }
  };

  function firstEnglishVersion(entry) {
    if (entry.language.name === "en"){
      return entry;
    }
  };

  const pokemonSwordDescription = pokemon.flavor_text_entries.find(swordVersion);
  const pokemonLGPDescription = pokemon.flavor_text_entries.find(letsgopikachuVersion);
  const pokemonFirstDescription = pokemon.flavor_text_entries.find(firstEnglishVersion);
  
  function pokemonAPIDescription(){
    if (pokemonSwordDescription === undefined & pokemonLGPDescription === undefined){
      return pokemonFirstDescription;
    }
    else if  (pokemonSwordDescription === undefined) {
      return pokemonLGPDescription;
    }
    else {
      return pokemonSwordDescription;
    }
  }

  pokemonDescription.innerHTML = `${pokemonAPIDescription().flavor_text}`;

}

getPokemonDetailFromAPI();
getPokemonDescriptionFromAPI();
