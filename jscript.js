document.addEventListener("DOMContentLoaded", function(){
  console.log("Document is Ready Yo")

//listeners
document.getElementById("fetch-local-text").addEventListener("click", fetchLocalText);
document.getElementById("fetch-local-json").addEventListener("click", fetchLocalJson);
document.getElementById("fetch-api").addEventListener("click", fetchApi);
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

function fetchApi() {
  console.log("Going into fetch-api function");
  let url = "https://jsonplaceholder.typicode.com/posts"

  fetch((url))
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
      document.getElementById("display-api").innerHTML = allPosts;
    })
}; //end of fetch-apifetch-api 


function fetchLocalJson() {
  let url = "./pokemon.json"

  fetch((url))
    .then((res) => res.json())
    .then((res1) => {
      let pokemonHeader = `<h3> Local Pokemon </h3>`;
      res1.forEach(function (pokemonData) {
        pokemonHeader +=
          `
        <div id = pokemon-header>
        <ul>
          <li> Pokemon: ${pokemonData.pokemon}</li>
          <li> Attack: ${pokemonData.attack} </li>
          <li> Defense: ${pokemonData.defense} </li>
          <li> Type: ${pokemonData.type} </li>
        </ul>
        </div>
        `
      });
      document.getElementById("display-local-json").innerHTML = pokemonHeader;
    })
};

function fetchLocalText() {
  let url = "./master.txt"

  fetch((url))
  .then((res) => res.text())
  .then((res1) => {
    document.getElementById("display-local-text").innerHTML = res1;
  })
  .catch((err) => console.log(err))
  //w/o arrow function:
  // fetch(urlMaster)
  // .then(function(res){
  //   return res.text();
  // })
  // .then(function(res1){
  // document.getElementById("display-master").innerHTML = res1;
  // })

  //using arrow functions:

};//end of fetchLocalText

})//end of document ready