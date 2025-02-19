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
DATABASE_URL=mysql://root:123456@localhost:3306/test
FRONTEND_URL=http://localhost:5173
```
5. Inicie o servidor:
```
npm run dev
```
6. Abra seu navegador e acesse a aplicação em:
http://localhost:3000/api

### Como usar com React
Embora o exemplo utilize ReactJS, o Autenticador pode ser integrado com outros frameworks seguindo a mesma lógica descrita abaixo.

1. Defina uma button para disparar a função que chama o Autenticador.
```jsx
<button onClick={() => handleClick()}>Entrar</button>
```
2. Definindo a função handleClick.
```js
  const handleClick = () => {
    const redirect_url = window.location.href;
    window.location.href = `http://localhost:3000/api/v1/auth/microsoft?redirect_url=${redirect_url}`
  }
```
3. Obter os dados do Usuário.
Após o login ser realizado com sucesso, os dados são retornados para a página. A função a seguir é responsável por capturar esses dados.
```js
  function signIn(url:string) {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);

    const name = params.get('name');
    const email = params.get('email');

    if(name && email){
      setUserLogged({
        displayName: name,
        email
      })
    }

    urlObj.search = '';

    const cleanUrl = `${urlObj.origin}${urlObj.pathname}`;
    window.history.pushState({}, document.title, cleanUrl);
  }
```
Você pode salvar os dados em um estado global, sessionStorage, localStorage ou outro meio de persistência.
Execute essa função no momento da inicialização do componente para pegar os dados retornados após o login.
```js
  useEffect(() => {
    signIn(window.location.href)
  }, [])
```
Lembre-se, o código acima deve estar na página de retorno do Autententicador ou ficar escutando o processo de login.
