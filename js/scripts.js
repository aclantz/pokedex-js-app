let pokemonList = [
    {name: 'Bulbasaur', type: ['grass', 'poison'], height: 0.7}, 
    {name: 'Squirtle', type: 'water', height: 0.5}, 
    {name: 'Charmander', type: 'fire', height: 0.6}
]

//Loop to print pokemonList object names and heights to the DOM
for (i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height < 0.7) {
        document.write(pokemonList[i].name + " " + pokemonList[i].height + "<br>");//used a string to space between printed object keys, and to create a line break.
    }
    else {
        document.write(pokemonList[i].name + " " + pokemonList[i].height + " " + "Wow, that's big!<br>"); // highlight largest pokemon
    }
}


