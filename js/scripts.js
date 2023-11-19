
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
     
    function getAll() {
        return pokemonList
    }
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    function addListItem(pokemon) {
        let pokeList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        button.innerText = pokemon.name;
        button.classList.add('poke-button');
        listItem.appendChild(button);
        pokeList.appendChild(listItem);    

        button.addEventListener('click', () => {
            showDetails(pokemon);
        });
    }
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        })
    }
    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal);

        let nameElement = document.createElement('h1');
        nameElement.innerText = pokemon.name;
        let imgElement = document.createElement('img');
        imgElement.src = pokemon.imageUrl;
        let heightElement = document.createElement('p');
        heightElement.innerText = 'Height: ' + pokemon.height;
        let typeElement = document.createElement('p');
        typeElement.innerText = 'Type: ' + pokemon.types;

        modal.appendChild(closeButtonElement);
        modal.appendChild(nameElement);
        modal.appendChild(imgElement);
        modal.appendChild(heightElement);
        modal.appendChild(typeElement);
        modalContainer.appendChild(modal);
            
        modalContainer.classList.add('is-visible');
            //clicking outside of modal to hideModal
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }
        //Escape key to hideModal. note that 'Escape' needs to be capitalized.
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    })
    function loadList() {
      return fetch(apiUrl).then(function (response) {  
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        })
    }
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
    }
})()

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });  
});



