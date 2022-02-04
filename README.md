# 📱 Servidores da Discórdia

## 📟 Aluracord - Imersão React

Agregador de projetos Aluracord realizados durante a última edição da Imersão React da Alura.

[<img src='https://discordia-gamma.vercel.app/login-screen.png'/>](https://discordia-gamma.vercel.app/)  

A principal funcionalidade é a possibilidade de enviar mensagem para servidores de outros participantes da Imersão direto [nessa página.](https://discordia-gamma.vercel.app/)  

[<img src='https://discordia-gamma.vercel.app/main-screen.png'/>](https://discordia-gamma.vercel.app/)  

## ✔️ Funcionalidades

### Telas
- [x] Login com usuário do GitHub (sem autenticação)
- [x] Servidor de mensagens (chat estilo Discord)
- [x] Servidores de mensagens de outros participantes da imersão
- [x] Cadastro de novos servidores de mensagens

### Mensagens
- [x] Envio com <kbd>enter</kbd>
- [x] Envio com Botão
- [x] Exclusão (apenas autor)
- [x] Stickers
- [x] Texto sanitizado
- [x] Markdown
- [x] Links destacados
- [x] Links abrem em nova aba do navegador

### Computação sem servidor
- [x] Hospedagem com ISG - Regeneração Estática Incremental (Next.js/Vercel)
- [x] Mensagens e lista de servidores (PostgreSQL/Supabase)

## 👁️‍🗨️ Visite aqui
[discordia-gamma.vercel.app](https://discordia-gamma.vercel.app/)  

## 🤖 Adicionando o seu servidor ao projeto
Clique no botão ➕ dentro do [sistema.](https://discordia-gamma.vercel.app/)  
Então informe o Nome, o endereço do seu servidor, uma imagem (gif fica mais legal) e marque a opção sobre identificação do usuário via useRouter.query.  

## ⌨️ Implemente o seu próprio agregador de servidores

- Clone esse repositório.  
- Crie seu projeto no [Supabase.](https://supabase.com/)  
- Preencha seu arquivo .env na raiz do projeto com os dados do projeto no [Supabase.](https://supabase.com/)  

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
sequence - int2
```

- Crie seu projeto na [Vercel](https://vercel.com/) vinculando com seu repositório no GitHub.  
- Adicione as variáveis de ambiente dentro do seu projeto na [Vercel.](https://vercel.com/)  
- Faça deploy do seu projeto na [Vercel.](https://vercel.com/)  
- Por fim, se quiser, ajude a melhorar esse projeto.  
