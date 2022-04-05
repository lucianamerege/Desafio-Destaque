# Desafio-Destaque

Implementação da [API do Github (Search)](https://docs.github.com/en/rest/reference/search) para a pesquisa de repositórios públicos no GitHub.

## Testagem

A aplicação está disponível online para uso [aqui](https://desafio-destaque-main-olczx7xjga-uc.a.run.app/), hospedada pelo GCP(Cloud Run).

Caso queira rodar no seu próprio computador, basta baixar a pasta 'src' e rodar o arquivo index.html em um servidor local.

## Guia de uso

- Escrevendo um termo na barra de pesquisa e apertando a tecla Enter ou o botão de pesquisa da própria interface, uma chamada para a API será feita. Em ordem decrescente por número de estrelas, os resultados serão listados de 10 em 10.

- Para navegar pelos resultados, basta usar os botões de navegação no final da página, onde é possível ver a posição da página atual.

- Para ver as linguagens usadas em um repositório específico, é preciso clicar no botão "Mostrar linguagens" no card e outra consulta à API será realizada, retornando a informação esperada.

- Se quiser acessar algum repositório diretamente no GitHub, é possível clicar no nome sublinhado e ser redirecionado em uma nova aba para aquele link.

- Para procurar outro termo, basta usar a barra de pesquisa novamente. Se quiser fazer buscas mais específicas, é só separar os termos de busca por espaço.
