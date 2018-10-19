document.addEventListener("DOMContentLoaded", function(){
  console.log("Document is Ready Yo")

//listeners
document.getElementById("fetchMaster").addEventListener("click", fetchMaster);
document.getElementById("localPokemon").addEventListener("click", localPokemon);
document.getElementById("apiPokemon").addEventListener("click", apiPokemon);
document.getElementById("user-posts").addEventListener("submit", userPost);

//Check out these cool functions:

function userPost(event) {
  event.preventDefault();
  console.log("Going into UserPost Function");

  //getting user inputs for post request:
  let urlPost = "https://jsonplaceholder.typicode.com/posts"

  //capturing user input values from DOM
  let postTitle = document.getElementById("post-title").value;
  let postBody = document.getElementById("post-body").value;

  fetch(urlPost, {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        postTitle: postTitle,
        postBody: postBody
      })
    }) //end of fetch
    .then((res) => res.json())
    .then((res1) => console.log(res1))
}; //end of function userPost

function apiPokemon() {
  console.log("Going into apiPokemon function");
  let urlApiPokemon = "https://jsonplaceholder.typicode.com/posts"

  fetch((urlApiPokemon))
    .then((res) => res.json())
    .then((res1) => {
      console.log("Results", res1);
      let allPosts = `<h3> All Posts: </h3>`
      res1.forEach(function (postData) {
        allPosts +=
          `
        <div>
          <strong><h4> ${postData.title} </h4></strong>
          <p> ${postData.body}</p>
        </div>
        `
      });
      document.getElementById("display-api-pokemon").innerHTML = allPosts;
    })
}; //end of apiPokemonApiPokemon 


function localPokemon() {
  let urlLocalPokemon = "./pokemon.json"

  fetch((urlLocalPokemon))
    .then((res) => res.json())
    .then((res1) => {
      let pokemonHeader = `<h3> Local Pokemon </h3>`;
      res1.forEach(function (pokemonData) {
        pokemonHeader +=
          `
        <div id = pokemon-header>
        <ul>
          <li> Pokemon: ${pokemonData.Pokemon}</li>
          <li> Attack: ${pokemonData.attack} </li>
          <li> Defense: ${pokemonData.defense} </li>
          <li> Type: ${pokemonData.type} </li>
        </ul>
        </div>
        `
      });
      document.getElementById("display-local-pokemon").innerHTML = pokemonHeader;
    })
};

function fetchMaster() {
  let urlMaster = "./master.txt"

  //w/o arrow function:
  // fetch(urlMaster)
  // .then(function(res){
  //   return res.text();
  // })
  // .then(function(res1){
  // document.getElementById("display-master").innerHTML = res1;
  // })

  //using arrow functions:
  fetch((urlMaster))
    .then((res) => res.text())
    .then((res1) => {
      document.getElementById("display-master").innerHTML = res1;
    })
    .catch((err) => console.log(err))
};

})//end of document ready