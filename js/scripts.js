
let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Bulbasaur', 
        type: ['grass', 'poison'], 
        height: 2.4
        }, 
        {name: 'Squirtle', 
        type: 'water', 
        height: 1.8
        }, 
        {name: 'Charmander', 
        type: 'fire', 
        height: 2
        }
    ]
    function getAll() {
        return pokemonList
    }
        //Bonus work for task 1.5
    function add(newItem) {
        let pokeObject = {
            name: "",
            type: "",
            height: 1
        }
        if (_.isEqual(newItem, pokeObject)) {
            pokemonList.push(newItem)
        }
    }
    function addListItem(pokemon) {
        let pokeList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        button.innerText = pokemon.name;
        button.classList.add('poke-button');
        listItem.appendChild(button);
        pokeList.appendChild(listItem);    
            //used arrow function to add param to showDetails. Task 1.6
        button.addEventListener('click', () => {
            showDetails(pokemon);
        });
    }
    function showDetails(pokemon) {
        console.log(pokemon.name)
    }
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }
})()

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
})


