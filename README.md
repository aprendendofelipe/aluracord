# Discórdia - A Aluracord do Felipe

Agregador de projetos realizados durante a última edição da Imersão React da Alura.

[<img src='https://discordia-gamma.vercel.app/login-screen.png'/>](http://discordia-gamma.vercel.app)

A principal funcionalidade é a possibilidade de enviar mensagem para servidores de outros participantes da Imersão direto <a href="https://discordia-gamma.vercel.app/" target="_blank">nessa página.</a>  

[<img src='https://discordia-gamma.vercel.app/main-screen.png'/>](http://discordia-gamma.vercel.app)

## Visite aqui
[<a href="https://discordia-gamma.vercel.app/" target="_blank">discordia-gamma.vercel.app</a>](https://discordia-gamma.vercel.app/)    

## Adicionando o seu servidor ao projeto
Por enquanto basta enviar uma mensagem diretamente no primeiro servidor do [<a href="https://discordia-gamma.vercel.app/" target="_blank">sistema.</a>](https://discordia-gamma.vercel.app/)  
Então informe o endereço do seu servidor na Vercel e do seu GitHub.
Em breve disponibilizarei uma tela de cadastro.

## Implemente o seu próprio agregador de servidores

- Clone esse repositório.
- Crie seu projeto no [<a href="https://supabase.com/" target="_blank">Supabase.</a>](https://supabase.com/)  
- Preencha seu arquivo .env na raiz do projeto com os dados do projeto no [<a href="https://supabase.com/" target="_blank">Supabase.</a>](https://supabase.com/)  

```
NEXT_PUBLIC_APP_NAME = App_Name
NEXT_PUBLIC_SUPABASE_URL = https://example.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = exemple-Y3MiwiZXhwIjoxOTU4OTgwNjc
```

- Crie duas tabelas no banco de dados do Supabase com os seguintes campos:

```
Nome da tabela 1: messages
Campos - Tipos:
id - int8
created_at - timestamptz
de - text
texto - text
```

```
Nome da tabela 2: servers
Campos - Tipos -
id - int8
created_at - timestamptz
name - text
url - text
imgSrc - text
autoUser - bool
```

- Crie seu projeto na [<a href="https://vercel.com/" target="_blank">Vercel</a>](https://vercel.com/) vinculando com seu repositório no GitHub.
- Adicione as variáveis de ambiente dentro do seu projeto na [<a href="https://vercel.com/" target="_blank">Vercel.</a>](https://vercel.com/)  
- Faça deploy do seu projeto na [<a href="https://vercel.com/" target="_blank">Vercel.</a>](https://vercel.com/)  
- Por fim, se quiser, ajude a melhorar esse projeto.
