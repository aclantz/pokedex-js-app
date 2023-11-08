
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
            //adding a console.log check when the button is clicked.
        button.addEventListener('click', showDetails);
    }
        //something is not working, I think its the parameter isn't connecting to the pokemonList.name. 
    function showDetails(pokemon) {
        console.log(pokemonList.name)
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


