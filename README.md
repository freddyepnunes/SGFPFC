Projeto Final de Curso (PFC)

Título do projeto:
Sistema de Gestão Financeira (SGF)

Pontos sobre a atividade de comentários do código do Professor Alessando Horas:
Arquivo .gitignore
O arquivo .gitignore é usado para especificar quais arquivos e pastas o Git deve ignorar e não incluir no repositório. 
Isso ajuda a manter o repositório limpo e evitar o versionamento de arquivos desnecessários ou específicos do ambiente de cada desenvolvedor.

Por isso o arquivo .gitignore, não contém linhas de códigos e nem comentários.


Arquivo "index.html" em um projeto React.js e Node.js ?

No contexto de uma aplicação React, o arquivo index.html serve como o ponto de entrada essencial da aplicação. 
Ele fornece a estrutura básica do documento HTML, incluindo as seções necessárias como <head> e <body>. 
Dentro do <body>, geralmente encontramos um elemento <div> com um identificador 
específico, como root, que é onde o React injetará toda a sua interface.

Quando a aplicação é carregada no navegador, é o index.html que é inicialmente exibido. 
O JavaScript, gerado a partir do código React, se conecta a esse arquivo, permitindo que os 
componentes da aplicação sejam renderizados dentro do contêiner definido. 
Essa integração é fundamental para o funcionamento do React, pois garante que a interface do 
usuário seja construída de forma dinâmica.


Arquivos package-lock.json e o package.json:

Os arquivos 'package.json' e 'package-lock.json' são essenciais para supervisionar 
as dependências de um projeto Node.js, como aplicativos baseados em React.

"Package.json é um arquivo organizado que contém dados sobre o projeto, incluindo rótulo, versão e visão geral." 
Também enumera os requisitos do projeto, nomeadamente as bibliotecas e pacotes que a aplicação utiliza. 
Além disso, package.json especifica comandos para executar tarefas como iniciar o ambiente de desenvolvimento, 
executar testes ou compilar o software. Este arquivo é crucial para o gerenciamento de software, permitindo que 
outras pessoas ou ferramentas identifiquem os pacotes necessários para a execução da aplicação.

Package-lock.json é gerado automaticamente quando as dependências do projeto são instaladas. 
"Ele documenta toda a hierarquia de dependências de pacotes, especificando as versões precisas de cada componente instalado."
O arquivo package-lock.json ajuda a simplificar as instalações, permitindo que o npm resolva dependências rapidamente.



