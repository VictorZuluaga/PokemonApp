import {DB_HOST, DB_PORT} from "./config.js"

let idioma_usuario = localStorage.getItem("userLanguage");
if (idioma_usuario == null) idioma_usuario = "en";
/*
###############################################
#        Seccion: Visualizar Pokemon          #
###############################################
*/
function showPokemon() {
  const pokemonName = localStorage.getItem('pokemonName');
  const pokemonImage = localStorage.getItem('pokemonImage');
  const pokemonType1 = localStorage.getItem('pokemonType1');
  const pokemonType2 = localStorage.getItem('pokemonType2');
  const pokemonAbility1 = localStorage.getItem('pokemonAbility1');
  const pokemonAbility2 = localStorage.getItem('pokemonAbility2');
  const pokemonAbility3 = localStorage.getItem('pokemonAbility3');

  const pokemonDiv = document.getElementById('pokemon');

  const nameElement = document.createElement('h1');
  nameElement.textContent = pokemonName;
  nameElement.setAttribute('id', 'pokemon_name');
  pokemonDiv.appendChild(nameElement);

  const imageElement = document.createElement('img');
  imageElement.setAttribute('src', pokemonImage);
  imageElement.setAttribute('id', 'pokemon_image');
  pokemonDiv.appendChild(imageElement);

  const container = document.createElement('div');
  container.classList.add('pokemon_type_container');
  pokemonDiv.appendChild(container);

  const typeElement1 = document.createElement('img');
  typeElement1.setAttribute('src', pokemonType1);
  typeElement1.setAttribute('alt', pokemonType1);
  typeElement1.setAttribute('id', 'pokemon_type1');
  typeElement1.classList.add('pokemon_type_img');
  container.appendChild(typeElement1);



  if (pokemonType2 !== "undefined" && pokemonType2 !== 'null') {
    const typeElement2 = document.createElement('img');
    typeElement2.setAttribute('src', pokemonType2);
    typeElement2.setAttribute('alt', pokemonType2);
    typeElement2.setAttribute('id', 'pokemon_type2');
    typeElement2.classList.add('pokemon_type_img');
    container.appendChild(typeElement2);
  }

  console.log('pokemonAbility2:', pokemonAbility2);
  console.log('pokemonAbility3:', pokemonAbility3);

  if (pokemonAbility1) {
    const abilitiesElement = document.createElement('h2');
    let abilitiesText = pokemonAbility1;

    if (pokemonAbility2 !== "undefined" && pokemonAbility2 !== 'null') {
      abilitiesText += '<br>' + pokemonAbility2;
    }

    if (pokemonAbility3 !== "undefined" && pokemonAbility3 !== 'null') {
      abilitiesText += '<br>' + pokemonAbility3;
    }

    abilitiesElement.innerHTML = abilitiesText;
    abilitiesElement.setAttribute('id', 'pokemon_abilities');
    pokemonDiv.appendChild(abilitiesElement);
  }



}

/*
###############################################
#      Seccion: Visualizar Estadisticas       #
###############################################
*/

function showStats() {
  const pokemonHp = localStorage.getItem('pokemonHp');
  const pokemonAttack = localStorage.getItem('pokemonAttack');
  const pokemonDefense = localStorage.getItem('pokemonDefense');
  const pokemonSpatk = localStorage.getItem('pokemonSpatk');
  const pokemonSpdef = localStorage.getItem('pokemonSpdef');
  const pokemonSpeed = localStorage.getItem('pokemonSpeed');

  const statsDiv = document.getElementById('stats');

  const statNames_en = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];
  const statNames_es = ['PS', 'Ataque', 'Defensa', 'Ata. Esp', 'Def. Esp', 'Velocidad'];
  const statNames = idioma_usuario == "en" ? statNames_en : statNames_es;
  const statValues = [
    pokemonHp,
    pokemonAttack,
    pokemonDefense,
    pokemonSpatk,
    pokemonSpdef,
    pokemonSpeed
  ];

  for (let i = 0; i < statNames.length; i++) {
    const statName = statNames[i];
    const statValue = statValues[i];

    const statLabel = document.createElement('div');
    statLabel.textContent = statName;
    statLabel.classList.add('stat-label');

    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');

    const progress = document.createElement('div');
    progress.classList.add('progress');
    progress.style.width = (statValue / 255) * 100 + '%';

    progressBar.appendChild(progress);

    const statValueDiv = document.createElement('div');
    statValueDiv.textContent = statValue;
    statValueDiv.classList.add('stat-value');

    const statRow = document.createElement('div');
    statRow.classList.add('stat-row');

    statRow.appendChild(statLabel);
    statRow.appendChild(progressBar);
    statRow.appendChild(statValueDiv);

    statsDiv.appendChild(statRow);
  }
}

/*
###############################################
#       Seccion: Visualizar Movimientos       #
###############################################
*/

function showMoves() {
  const pokemonMoves = JSON.parse(localStorage.getItem('pokemonMoves'));

  const movesTableBody = document.getElementById("movesTableBody");

  pokemonMoves.forEach(move => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = move.name;
    row.appendChild(nameCell);

    const typeCell = document.createElement("td");
    const typeImg = document.createElement("img");
    typeImg.setAttribute('id', 'type_img');
    typeImg.src = move.type;
    typeCell.appendChild(typeImg);
    row.appendChild(typeCell);

    const classCell = document.createElement("td");
    const classImg = document.createElement("img");
    classImg.setAttribute('id', 'class_img');
    classImg.src = move.category;
    classCell.appendChild(classImg);
    row.appendChild(classCell);

    movesTableBody.appendChild(row);
  });

}

/*
###############################################
#      Seccion: Visualizar Debilidades        #
###############################################
*/

function showWeaknesses() {
  const pokemonWeaknesses = JSON.parse(localStorage.getItem('pokemonWeaknesses'));
  const weaknessesDiv = document.getElementById('weaknesses');


  // Crea un elemento para cada debilidad
  const createImageElement = (src) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Tipo de Pokémon';
    img.classList.add('pokemon-type-img');
    return img;
  };

  // Agrega las debilidades al div correspondiente
  const addWeaknesses = (multiplier, weaknesses) => {
    const multiplierTitles_en = {
      'x4': 'VERY WEAK AGAINST',
      'x2': 'WEAK AGAINST',
      'x1medio': 'RESISTANT TO',
      'x1cuarto': 'VERY RESISTANT TO',
      'x0': 'IMMUNE AGAINST'
    };

    const multiplierTitles_es = {
      'x4': 'MUY DÉBIL A',
      'x2': 'DÉBIL A',
      'x1medio': 'RESISTENTE A',
      'x1cuarto': 'MUY RESISTENTE A',
      'x0': 'INMUNE A'
    };


    const header = document.createElement('h3');
    const headerSpan = document.createElement('span');
    headerSpan.innerText = `${multiplierTitles_en[multiplier]}`;

    if (idioma_usuario == "es") headerSpan.innerText = `${multiplierTitles_es[multiplier]}`;


    headerSpan.id = `weakness-title-${multiplier}`;
    header.appendChild(headerSpan);
    weaknessesDiv.appendChild(header);

    if (weaknesses.length > 0) {
      for (const weakness of weaknesses) {
        weaknessesDiv.appendChild(createImageElement(weakness));
      }
    } else {
      const noWeaknesses = document.createElement('h3');
      noWeaknesses.innerText = 'Nothing';
      if (idioma_usuario == "es") noWeaknesses.innerText = 'Nada';
      weaknessesDiv.appendChild(noWeaknesses);
    }
  };

  addWeaknesses('x4', pokemonWeaknesses.x4);
  addWeaknesses('x2', pokemonWeaknesses.x2);
  addWeaknesses('x1medio', pokemonWeaknesses.x1medio);
  addWeaknesses('x1cuarto', pokemonWeaknesses.x1cuarto);
  addWeaknesses('x0', pokemonWeaknesses.x0);
}

/*
###############################################
#      Seccion: Visualizar Estrategias        #
###############################################
*/

function showStrategies() {
  const pokemonStrategies = JSON.parse(localStorage.getItem('pokemonStrategies'));
  const strategiesDiv = document.getElementById('strategies');

  pokemonStrategies.forEach((strategy, index) => {
    const strategyDiv = document.createElement('div');
    strategyDiv.classList.add('strategy');

    const strategyTitle = document.createElement('h3');
    strategyTitle.classList.add('strategy-title');
    strategyTitle.innerText = `${index + 1}. ${strategy.name}`;
    strategyDiv.appendChild(strategyTitle);

    const upperSection = document.createElement('div');
    upperSection.classList.add('upper-section');

    const movesDiv = document.createElement('div');
    movesDiv.classList.add('moves');

    for (let i = 1; i <= 4; i++) {
      const move = document.createElement('div');
      move.classList.add('move');
      move.innerHTML = `<h4>${strategy[`move${i}name`]}</h4>
                        <div class="move-details">
                          <img src="${strategy[`move${i}type`]}" alt="${strategy[`move${i}name`]} type">
                          <p>PP ${strategy[`move${i}pp`]}/${strategy[`move${i}pp`]}</p>
                        </div>`;
      movesDiv.appendChild(move);
    }

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details');
    detailsDiv.innerHTML = `<div class="item-container">
                           <h4>Item: ${strategy.itemName}</h4>
                           <img src="${strategy.itemPicture}" alt="${strategy.itemName}">
                         </div>
                         <h4 id="ability">Ability: ${strategy.ability}</h4>
                         <h4>Nature: ${strategy.nature}</h4>
                         <h4>EVs: HP ${strategy.evsHp}/ Atk ${strategy.evsAttack}/ Def ${strategy.evsDefense}/ SpA ${strategy.evsSpatk}/ SpD ${strategy.evsSpdef}/ Spe ${strategy.evsSpeed}</h4>`;

    if (idioma_usuario == "es") {
      detailsDiv.innerHTML = `<div class="item-container">
                           <h4>Objeto: ${strategy.itemName}</h4>
                           <img src="${strategy.itemPicture}" alt="${strategy.itemName}">
                         </div>
                         <h4>Habilidad: ${strategy.ability}</h4>
                         <h4>Naturaleza: ${strategy.nature}</h4>
                         <h4>EVs: PS ${strategy.evsHp}/ Ata ${strategy.evsAttack}/ Def ${strategy.evsDefense}/ AEsp ${strategy.evsSpatk}/ DEsp ${strategy.evsSpdef}/ Vel ${strategy.evsSpeed}</h4>`;
    }  

    upperSection.appendChild(movesDiv);
    upperSection.appendChild(detailsDiv);
    strategyDiv.appendChild(upperSection);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('description');
    descriptionDiv.innerHTML = `<p>${strategy.description}</p>`;

    strategyDiv.appendChild(descriptionDiv);

    strategiesDiv.appendChild(strategyDiv);
  });
}








// Ejecutar la función cuando la página se cargue
window.addEventListener('DOMContentLoaded', showStats);
window.addEventListener('DOMContentLoaded', showPokemon);
window.addEventListener('DOMContentLoaded', showMoves);
window.addEventListener('DOMContentLoaded', showWeaknesses);
window.addEventListener('DOMContentLoaded', showStrategies);
