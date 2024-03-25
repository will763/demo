# Microservico de Autenticacao

Esse autenticador serve para autenticar usuários por meio de provedores, como google, azure ID, GitHub. No dado momento, o único configurado é o azure ID.

### Como Rodar em Sua Máquina

observacao:* para testar localmente, use o frontend de teste que usa esse backend como autenticador e que se encontra nesse diretorio [https://github.com/Sysmap-Sustentacao](https://github.com/Sysmap-Sustentacao/frontend-microservico-autenticacao). Certifique-se que ambos estao em execucao no momento do teste.

Para rodar este projeto em sua máquina, siga estas etapas:

#### Pré-requisitos
Certifique-se de ter o Node.js na versao 20.11.0.

#### Passos para Execução
1. Clone o repositório:
```
git clone https://github.com/Sysmap-Sustentacao/backend-microservico-autenticacao.git
```
2. Navegue até o diretório do projeto:
```
cd backend-microservico-autenticacao
```
3. Instale as dependências:
```
npm install
```
4. crie um arquivo .env na raiz do projeto e add estas configuracoes
```
CLOUD_INSTANCE=https://login.microsoftonline.com/
AZURE_TENANT_ID=53054dd2-278c-4f57-98f6-d96fcef4e4fd
AZURE_CLIENT_ID=b9c33cfd-ebd2-44b9-8b37-832e2b3c2a0c
AZURE_CLIENT_SECRET=3Gu8Q~.-A2eQmSBpW9Zca~-jtnhvXf-BAu439cUI
REDIRECT_URI=http://localhost:3000/api/v1/auth/callback
LOGOUT_REDIRECT_URI=https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=http://localhost:5173

DATABASE_URL=mysql://root:123456@localhost:3306/test
FRONTEND_URL=http://localhost:5173
```
5. Inicie o servidor:
```
npm run dev
```
6. Abra seu navegador e acesse a aplicação em:
http://localhost:3000/api
