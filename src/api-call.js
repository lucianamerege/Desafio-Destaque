var form = document.getElementById("form")
var search = document.getElementById("searchTerm")
var cardHolder = document.getElementById("card-holder")

form.addEventListener('submit', function(e){

  e.preventDefault()
  var searchTerm = search.value

  //Limpar todos os cards da tela
  cleanCards();

  //Removendo espaços em branco da string
  searchTerm = searchTerm.split(' ').join('')

  getRepositoryList(searchTerm);
})

//Função de chamada da API Search
function getRepositoryList(searchTerm) {
  fetch("https://api.github.com/search/repositories?q="+searchTerm+"&sort=stars&order=desc")
  .then((result) => result.json())
  .then((data) => {
    createCards(data)
    console.log(data)
  })

}

function createCards(data){
  var template, clone;

  template = document.querySelector('#card-template');

  //Agora todos os resultados serão inclusos em um clone do template e adicionados ao "Card Holder"
  for(var i = 0; i<5; i++){
    //Deixando a data de atualizacao mais legível
    var atualizacao = data.items[i].updated_at.split("T")

    clone = template.content.cloneNode(true);
    clone.getElementById("name").textContent += data.items[i].name;
    clone.getElementById("description").textContent += data.items[i].description;
    clone.getElementById("author").textContent += data.items[i].owner.login;
    clone.getElementById("language").textContent += data.items[i].languages_url;
    clone.getElementById("forks").textContent += data.items[i].forks_count;
    clone.getElementById("stars").textContent += data.items[i].stargazers_count;
    clone.getElementById("date").textContent += atualizacao[0];

    cardHolder.appendChild(clone);
  }
  
}

//Retirar da tela os resultados da pesquisa anterior
function cleanCards(){
  while (cardHolder.lastChild) {
    cardHolder.removeChild(cardHolder.lastChild);
  }
}