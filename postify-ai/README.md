# PostifyAI

PostifyAI é uma aplicação web desenvolvida em Next.js que exibe artigos do Hugging Face de forma limpa e interativa. O objetivo do projeto é proporcionar uma experiência de leitura agradável e intuitiva, permitindo que os usuários acessem e visualizem artigos de maneira eficiente.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```
postify-ai
├── src
│   ├── app
│   │   ├── layout.tsx          # Layout principal da aplicação
│   │   ├── page.tsx            # Página inicial com lista de artigos
│   │   ├── articles
│   │   │   └── [id]
│   │   │       └── page.tsx    # Detalhes de um artigo específico
│   │   └── api
│   │       └── articles
│   │           └── route.ts    # Rota da API para buscar artigos
│   ├── components
│   │   ├── ArticleCard.tsx      # Componente para exibir um card de artigo
│   │   ├── ArticleList.tsx      # Componente para renderizar a lista de artigos
│   │   ├── Header.tsx           # Componente de cabeçalho
│   │   └── Footer.tsx           # Componente de rodapé
│   ├── lib
│   │   ├── huggingface.ts       # Funções para interagir com a API do Hugging Face
│   │   └── utils.ts             # Funções utilitárias
│   ├── types
│   │   └── index.ts             # Tipos TypeScript utilizados na aplicação
│   └── styles
│       └── globals.css          # Estilos globais da aplicação
├── public
│   └── favicon.ico              # Ícone da aplicação
├── package.json                  # Configuração do npm
├── tsconfig.json                # Configuração do TypeScript
├── next.config.js               # Configurações específicas do Next.js
├── tailwind.config.js           # Configuração do Tailwind CSS
├── postcss.config.js            # Configuração do PostCSS
└── README.md                    # Documentação do projeto
```

## Instalação

Para instalar e executar o projeto, siga os passos abaixo:

1. Clone o repositório:
   ```
   git clone <URL do repositório>
   cd postify-ai
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Execute a aplicação:
   ```
   npm run dev
   ```

A aplicação estará disponível em `http://localhost:3000`.

## Uso

Ao acessar a aplicação, você será direcionado para a página inicial, onde uma lista de artigos será exibida. Clique em um artigo para visualizar seus detalhes. A navegação é facilitada por um cabeçalho e um rodapé que permanecem consistentes em todas as páginas.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias e correções.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.