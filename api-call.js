var form = document.getElementById("form")
var search = document.getElementById("searchTerm")

form.addEventListener('submit', function(e){

  e.preventDefault()
  var searchTerm = search.value

  //Removendo espaços em branco da string
  searchTerm = searchTerm.split(' ').join('')

  getRepositoryList(searchTerm);
})

function getRepositoryList(searchTerm) {
  fetch("https://api.github.com/search/repositories?q="+searchTerm+"&sort=stars&order=desc")
  .then((result) => result.json())
  .then((data) => {
    loopingThroughData(data)
    console.log(data)
  })

}

function loopingThroughData(data){
  var template, clone;

  template = document.querySelector('#card-template');

  for(var i = 0; i<10; i++){

    clone = template.content.cloneNode(true);
    clone.getElementById("name").textContent = data.items[i].name;
    clone.getElementById("description").textContent = data.items[i].description;
    clone.getElementById("author").textContent = data.items[i].owner.login;
    clone.getElementById("language").textContent = data.items[i].languages_url;
    clone.getElementById("forks").textContent = data.items[i].forks_count;
    clone.getElementById("stars").textContent = data.items[i].stargazers_count;
    clone.getElementById("date").textContent = data.items[i].updated_at;

    document.body.appendChild(clone);
  }
  
}