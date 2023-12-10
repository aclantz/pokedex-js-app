let pokemonRepository=function(){let t=[];function e(){return t}function n(e){t.push(e)}function o(t){return fetch(t.detailsUrl).then(function(t){return t.ok||console.error("network response issue"),t.json()}).then(function(e){t.imageUrl=e.sprites.front_default,t.abilities=e.abilities,t.types=e.types}).catch(function(t){console.error("error fetching or parsing details data")})}return{getAll:e,add:n,addListItem:function t(e){let n=document.querySelector(".pokemon-list"),i=document.createElement("li"),a=document.createElement("button");a.innerText=e.name,a.classList.add("poke-button","btn","btn-dark"),i.classList.add("list-group-item","col-sm-3"),a.setAttribute("data-toggle","modal"),a.setAttribute("data-target","#pokemonModal"),i.appendChild(a),n.appendChild(i),a.addEventListener("click",()=>{(function t(e){o(e).then(function(){var t;let n,o,i,a,r,l;t=e,n=$(".modal-body"),o=$(".modal-title"),$(".modal-header"),o.empty(),n.empty(),i=$("<h1>"+t.name+"</h1>"),a=$('<img class="modal-img" style="width:30%">'),a.attr("src",t.imageUrl),r=$("<p>Abilities: "+t.abilities.map(t=>t.ability.name).join(", ")+"</p>"),l=$("<p>Type: "+t.types.map(t=>t.type.name).join(", ")+"</p>"),o.append(i),n.append(a),n.append(r),n.append(l)})})(e)})},loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){n({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:o}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});