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
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //creates list of pokemon buttons
  function addListItem(pokemon) {
    let pokeList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");

    listItem.classList.add();


    button.innerText = pokemon.name;
    button.classList.add("poke-button", "btn", "btn-dark"); //classes added for bootstrap configuration
    listItem.classList.add("list-group-item"); //added for bootstrap configuration
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal"); //what is the target name?

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
    let modalHeader = $(".modal-header");

    //clearing existing content in the modal
    modalTitle.empty();
    modalBody.empty();

    //Name, modal header
    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    //Image, modal body
    let imgElement = $('<img class="modal-img" style="width:50px">');
    imgElement.attr("src", pokemon.imageUrl);
    //Height, modal body
    let heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");
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
    modalBody.append(heightElement);
    modalBody.append(typeElement);
    $("#exampleModal").modal("toggle"); //added from forum example, jeheald23
  }

  return {
    getAll: getAll, //return all pokemon in list
    add: add, //add pokemon to list
    addListItem: addListItem, //return pokemon as list items
    loadList: loadList, //
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// plan to be deleted

// let modalContainer = document.querySelector('#modal-container');
// modalContainer.innerHTML = '';

// let modal = document.createElement('div');
// modal.classList.add('modal');

// let closeButtonElement = document.createElement('button');
// closeButtonElement.classList.add('modal-close');
// closeButtonElement.innerText = 'X';
// closeButtonElement.addEventListener('click', hideModal);

// let nameElement = document.createElement('h1');
// nameElement.innerText = pokemon.name;
// let imgElement = document.createElement('img');
// imgElement.src = pokemon.imageUrl;
// let heightElement = document.createElement('p');
// heightElement.innerText = 'Height: ' + pokemon.height;
// let typeElement = document.createElement('p');
// typeElement.innerText = 'Type: ' + pokemon.types;

// modal.appendChild(closeButtonElement);
// modal.appendChild(nameElement);
// modal.appendChild(imgElement);
// modal.appendChild(heightElement);
// modal.appendChild(typeElement);
// modalContainer.appendChild(modal);

// modalContainer.classList.add('is-visible');
//     //clicking outside of modal to hideModal
// modalContainer.addEventListener('click', (e) => {
//     let target = e.target;
//     if (target === modalContainer) {
//         hideModal();
//     }
// });

//   function hideModal() {
//     let modalContainer = document.querySelector("#modal-container");
//     modalContainer.classList.remove("is-visible");
//   }
//   //Escape key to hideModal. note that 'Escape' needs to be capitalized.
//   window.addEventListener("keydown", (e) => {
//     let modalContainer = document.querySelector("#modal-container");
//     if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
//       hideModal();
//     }
//   });
