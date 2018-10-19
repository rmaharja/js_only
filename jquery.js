$(document).ready(function(){
  console.log("Document is Ready Yo");

//listeners
$("#fetch-local-text").on("click", fetchLocalText);
$("#fetch-local-json").on("click", fetchLocalJson);
$("#fetch-api").on("click", fetchApi);
// $("user-posts").submit(userPost);
document.getElementById("user-posts").addEventListener("submit", userPost);

//Check out these cool functions:

function userPost(event) {
  event.preventDefault();
  console.log("Going into UserPost Function");

  //getting user inputs for post request:
  let urlPost = "https://jsonplaceholder.typicode.com/posts"

  //capturing user input values from DOM
  let postTitle = $("#post-title").val();
  let postBody = $("#post-body").val();

  $.ajax({
    url: urlPost,
    type: "POST",
    data: JSON.stringify({
      postTitle: postTitle,
      postBody: postBody
    }),
    contentType: "application/json",
    dataType: "json"
  })
  .then((res) => {
    console.log(res)
  })
 

}; //end of function userPost

function fetchApi() {
  console.log("Going into fetch-api function");
  let urlApi = "https://jsonplaceholder.typicode.com/posts"

 $.ajax({
   url: urlApi,
  //  method: "GET" //If no method reference, assumes a GET
 })
 .then((res) => {
   console.log("API results", res)
   let allPosts = `<h3> All Posts: </h3>`
   res.forEach(function (postData) {
     allPosts +=
       `
     <div>
       <strong><h4> ${postData.title} </h4></strong>
       <p> ${postData.body}</p>
     </div>
     `
   });
   $("#display-api").empty().append(allPosts);

});

}; //end of fetch-apifetch-api 


function fetchLocalJson() {
  let urlJson = "./pokemon.json"
  $.ajax((urlJson))
  .then((res) => {
    console.log("Local JSON results", res);
    let pokemonHeader = `<h3> Local Pokemon </h3>`;
    res.forEach(function (pokemonData) {
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
    })

    $("#display-local-json").empty().append(pokemonHeader);

  });
  
};//end of fetchLocalJson

function fetchLocalText() {
  let urlText = "./master.txt"

$.ajax((urlText))
.then((res) => {
  console.log("Display local text", res);
  $("#display-local-text").empty().append(res);
})
.catch((err) => console.log(err));
  //w/o arrow function:
  // fetch(urlMaster)
  // .then(function(res){
  //   return res.text();
  // })
  // .then(function(res1){
  // document.getElementById("display-master").innerHTML = res1;
  // })


};//end of fetchLocalText

});//end of document ready