
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
    function add() {
        pokemonList.push
    }
    function addListItem(pokemon) {
        let pokeList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
    
        button.innerText = pokemon.name;
        button.classList.add('poke-button');
        listItem.appendChild(button);
        pokeList.appendChild(listItem);    
    }
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }
})()

pokemonRepository.getAll().forEach(function(pokemon) {
    // document.write(pokemon.name + ' is a ' + pokemon.type + ' type pokemon, who is ' + pokemon.height + ' feet tall. <br>' )
    pokemonRepository.addListItem(pokemon);
})


