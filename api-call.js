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
  let resultContainer = document.getElementById("list-container")

  for(var i = 0; i<30; i++){
    let li = document.createElement("li")
    li.innerText = data.items[i].name
    resultContainer.appendChild(li)
  }
  
}