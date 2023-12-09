//IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //returns pokemonList array
  function getAll() {
    return pokemonList;
  }
  //adds pokemon to pokemonList array
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  //load the list from the API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  //load the details from the API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
            console.error('network response issue'); //suggested error catch from AI
        }
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.abilities = details.abilities; //changed from height to abilities
        item.types = details.types;
      })
      .catch(function (e) {
        console.error('error fetching or parsing details data');
      });
  }

  //creates list of pokemon buttons
  function addListItem(pokemon) {
    let pokeList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");

    button.innerText = pokemon.name;
    button.classList.add("poke-button", "btn", "btn-dark"); //classes added for bootstrap configuration
    listItem.classList.add("list-group-item", "col-sm-3",); //added for bootstrap configuration *** col layout
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");

    listItem.appendChild(button);
    pokeList.appendChild(listItem);

    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  //apply loaded details to modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }
  //bootstrap modal
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");//not used but directed to include in assignment 

    //clearing existing content in the modal
    modalTitle.empty();
    modalBody.empty();

    //Name, modal header
    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    //Image, modal body
    let imgElement = $('<img class="modal-img" style="width:30%">');
    imgElement.attr("src", pokemon.imageUrl);
    //Abilities, modal body
    let abilitiesElement = $(
      "<p>" +
        "Abilities: " +
        pokemon.abilities.map((ability) => ability.ability.name).join(", ") +
        "</p>"
    );
    //Type, modal body
    let typeElement = $(
      "<p>" +
        "Type: " +
        pokemon.types.map((type) => type.type.name).join(", ") +
        "</p>"
    );

    //Adding elements to the modal
    modalTitle.append(nameElement);
    modalBody.append(imgElement);
    modalBody.append(abilitiesElement);
    modalBody.append(typeElement);
  }

  return {
    getAll: getAll, //return all pokemon in list
    add: add, //add pokemon to list
    addListItem: addListItem, //return pokemon as list items
    loadList: loadList, //load array from API
    loadDetails: loadDetails, //load details from API
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

