# LuxFacta API

## Instalação
Para buildar o projeto, é necessário instalar o .Net Core SDK,.Net Framework e SqlServer Express(LocalDB) disponíveis nos links:
````
https://dotnet.microsoft.com/download
https://dotnet.microsoft.com/download/dotnet-framework/thank-you/net48-web-installer
https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver15
````

Tópico explicativo de como instalar o Sql Server Express LocalDB:
```
https://www.mssqltips.com/sqlservertip/5612/getting-started-with-sql-server-2017-express-localdb/
```

*Abra o cmd e navegue até a pasta 'src/LuxFactaAPI' para os passos a seguir.*

Será necessário a instalação do DotNet EF com a linha e comando:
```
dotnet tool install --global dotnet-ef
````

O projeto foi criado utilizando o conceito de Code First para o Banco de Dados.
Para que seja possível utilizar os métodos da API será necessário executar a migration inicial no console de pacotes com o comando: 
````
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
````

## Utilização
Para uma melhor interação com a API, foi utilizado o Swagger para documentá-la.

Caso queira utilizar o Swagger, abra o navegador e acesse a interface a partir do link: https://localhost:5001/index.html

Faça uma requisição clicando em um dos métodos, em seguida pressione o botão "Try it out", informe os parâmetros e em seguida clica em "Execute"

## O Desafio
O objetivo do projeto é criar uma API RESTful para fazer manutenção em um sistema de enquetes.

A API deve atender aos seguintes endpoints:

Get /poll/:id
Post /poll
Post /poll/:id/vote
Get /poll/:id/stats

