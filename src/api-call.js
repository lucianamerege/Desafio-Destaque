var form = document.getElementById("form");
var search = document.getElementById("searchTerm");
var cardHolder = document.getElementById("card-holder");
var pagination = document.getElementById("paginacao-container");
var internalPage = 0;
var apiPage = 1;
var currentRepList
var searchTerm

var api = "https://api.github.com/"

form.addEventListener('submit', function(e){

  internalPage = 0;
  apiPage = 1;
  e.preventDefault();
  searchTerm = search.value;

  //Limpar todos os cards da tela
  cleanCards();
  cleanPagination();

  //Removendo espaços em branco da string
  searchTerm = searchTerm.split(' ').join('');

  getRepositoryList(searchTerm);
})

//Função de chamada da API Search
function getRepositoryList(searchTerm) {
  fetch(api + "search/repositories?q="+searchTerm+"&sort=stars&order=desc&per_page=100&page="+apiPage)
  .then((result) => result.json())
  .then((data) => {
    currentRepList = data;
    //Para mostrar quantos resultados teve a pesquisa e a paginação
    showPagination(currentRepList.total_count);
    createCards(currentRepList);    
  })

}

function createCards(data){
  var template, clone;

  template = document.querySelector('#card-template');

  //Agora todos os resultados serão inclusos em um clone do template e adicionados ao "Card Holder"
  for(var i = internalPage*10; i<internalPage*10+10; i++){
    if(data.items[i]){
      //Deixando a data de atualizacao mais legível
      var atualizacao = data.items[i].updated_at.split("T");

      clone = template.content.cloneNode(true);
      clone.getElementById("name").textContent += data.items[i].name;
      clone.getElementById("description").textContent += data.items[i].description;
      clone.getElementById("author").textContent += data.items[i].owner.login;
      clone.getElementById("forks").textContent += data.items[i].forks_count;
      clone.getElementById("stars").textContent += data.items[i].stargazers_count;
      clone.getElementById("date").textContent += atualizacao[0];
      //Alterando esse atributo customizado, vou acessa-lo mais tarde para descobrir qual card chamou a função que mostra as linguagens
      clone.getElementById("show-languages").setAttribute('hidden-full-name', data.items[i].full_name);
      clone.getElementById("show-languages").setAttribute('hidden-card-id', i);

      cardHolder.appendChild(clone);
    }else{
      break;
    }
  }
}

//Retirar da tela os resultados da pesquisa anterior
function cleanCards(){
  while (cardHolder.lastChild) {
    cardHolder.removeChild(cardHolder.lastChild);
  }
}
function cleanPagination(){
  pagination.setAttribute("hidden", "hidden");
  document.getElementById("quantidade").textContent = ""
}

//Quantos resultados vieram da busca + Botões da paginação aparecem
function showPagination(totalQuantity){
  var max, min;
  min = (internalPage*10)+1;
  max = (internalPage*10)+10;

  pagination.removeAttribute('hidden');
  document.getElementById("quantidade").textContent += min + " - " + max + " de " + totalQuantity;
}

//O que acontece ao clicar no botão de ir para a próxima página
function nextPage(){
  internalPage += 1;
  cleanCards();
  createCards(currentRepList);
  cleanPagination();
  showPagination(currentRepList.total_count);
}
function lastPage(){
  //para impedir que vá abaixo da primeira pagina
  if(internalPage>0){
    internalPage -= 1;
    cleanCards();
    createCards(currentRepList);
    cleanPagination();
    showPagination(currentRepList.total_count);
  }else if(apiPage>1){ //nesse caso estou na pagina interna 0 mas não é a primeira da api, entao faço uma nova chamada para a api, começando da ultima pagina interna possivel
    internalPage = 9;
    cleanCards();
    cleanPagination();
    getRepositoryList(searchTerm);

  }
}

//Essa função faz uma segunda chamada da API, para pegar apenas as linguagens do repositorio selecionado.
//Eu escolhi fazer isso separadamente para não abusar da API e aumentar as chances de me manter dentro do limite para chamadas sem autenticação,
//já que uma não era necessária para implementar esse desafio.
function showLanguages(e){
  var fullName = e.target.getAttribute("hidden-full-name");
  var cardId = e.target.getAttribute("hidden-card-id");
  //mudando o botão para mostrar que foi clicado
  e.target.textContent = "";
  e.target.textContent = "▼";

  fetch(api+"repos/"+fullName+"/languages")
  .then((result) => result.json())
  .then((data) => {
    var languagesArray = Object.keys(data);
    if(languagesArray.length == 0){
      alertNoLanguages(cardId);
    }else{
      alertLanguages(languagesArray, cardId);
    }
  })
}

function alertLanguages(languagesArray, cardId){
  var languageP = cardHolder.children[cardId].getElementsByClassName("linguagens-info")
  languageP[0].textContent = languagesArray;
  languageP[0].removeAttribute('hidden');
}
function alertNoLanguages(cardId){
  var languageP = cardHolder.children[cardId].getElementsByClassName("linguagens-info")
  languageP[0].textContent = "Linguages não especificadas";
  languageP[0].removeAttribute('hidden');
}