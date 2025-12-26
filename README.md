# X4Pay Assessoria --- Website

Website institucional da **X4Pay Assessoria**, desenvolvido para
apresentar a empresa, seus serviços e permitir o contato direto com
potenciais clientes por meio de um formulário.

O projeto é **full stack**, composto por:

-   **Front-end:** React (Create React App)\
-   **Back-end:** FastAPI (Python)\
-   **Envio de e-mails:** SMTP via Zoho Mail\
-   **Deploy:**
    -   Front-end → Vercel\
    -   Back-end → Railway

------------------------------------------------------------------------

## 📌 Visão geral

O site apresenta:

-   Informações institucionais da empresa\
-   Serviços oferecidos\
-   Parceiros e clientes\
-   Formulário de contato funcional\
-   Integração entre front-end e API\
-   Envio automático de e-mails

O projeto foi estruturado de forma modular, permitindo manutenção e
evolução simples no futuro.

------------------------------------------------------------------------

## ✨ Funcionalidades

### 📄 Páginas institucionais

-   Apresentação da empresa\
-   Missão, visão e valores\
-   Serviços prestados\
-   Parceiros e clientes

### 📬 Formulário de contato

Existem dois formatos:

-   **Formulário completo (`/contact`)**
    -   Nome
    -   E-mail
    -   Telefone
    -   Assunto
    -   Mensagem
-   **Formulário simplificado (rodapé)**
    -   Apenas e-mail

### ✉️ Envio de e-mails

-   Os dados do formulário são enviados para a API\
-   A API valida os dados\
-   O envio ocorre via **SMTP do Zoho Mail**\
-   O e-mail é entregue no endereço configurado\
-   O campo **Reply-To** aponta para o e-mail informado pelo visitante

### 🚀 Deploy

-   Front-end hospedado na **Vercel**
-   Back-end hospedado na **Railway**
-   Comunicação via HTTPS
-   CORS configurado corretamente

------------------------------------------------------------------------

## 📁 Estrutura do projeto

``` text
x4pay_website/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── __init__.py
│   │   └── ...
│   ├── requirements.txt
│   └── Procfile
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.js / App.jsx
    │   ├── components/
    │   ├── pages/
    │   └── assets/
    ├── package.json
    └── README.md
```

------------------------------------------------------------------------

## 🚀 Execução local

### Requisitos

-   Node.js 16+\
-   Python 3.8+\
-   npm\
-   pip

------------------------------------------------------------------------

## 🔧 Backend (FastAPI)

### 1️⃣ Acessar a pasta

``` bash
cd backend
```

### 2️⃣ Criar ambiente virtual

``` bash
python -m venv venv
```

Ativar:

**Linux / macOS**

``` bash
source venv/bin/activate
```

**Windows (PowerShell)**

``` powershell
.\venv\Scripts\activate
```

------------------------------------------------------------------------

### 3️⃣ Instalar dependências

``` bash
pip install --upgrade pip
pip install -r requirements.txt
```

------------------------------------------------------------------------

### 4️⃣ Criar arquivo `.env`

``` env
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_USER=x4payassessoria.com@zohomail.com
SMTP_PASSWORD=SUA_APP_PASSWORD
```

> ⚠️ A senha deve ser uma **App Password gerada no Zoho**, não a senha
> principal.

------------------------------------------------------------------------

### 5️⃣ Executar o servidor

``` bash
uvicorn app.main:app --reload --port 8000
```

A API ficará disponível em:

    http://localhost:8000

Endpoints principais:

-   `GET /` → status da API\
-   `POST /contact` → envio do formulário

------------------------------------------------------------------------

## 🌐 Frontend (React)

### 1️⃣ Acessar a pasta

``` bash
cd frontend
```

### 2️⃣ Instalar dependências

``` bash
npm install
```

### 3️⃣ Rodar em modo desenvolvimento

``` bash
npm start
```

Aplicação disponível em:

    http://localhost:3000

------------------------------------------------------------------------

### Variável de ambiente do front-end

No arquivo `.env`:

``` env
REACT_APP_API_BASE_URL=http://localhost:8000
```

Em produção:

``` env
REACT_APP_API_BASE_URL=https://x4payassessoria.com
```

------------------------------------------------------------------------

## 🌍 Deploy

### Backend --- Railway

1.  Criar projeto no Railway\
2.  Conectar o repositório GitHub\
3.  Definir **Root Directory** como `backend`\
4.  Criar variáveis de ambiente (`SMTP_*`)\
5.  Usar como comando de start:

``` bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

------------------------------------------------------------------------

### Frontend --- Vercel

1.  Criar projeto na Vercel\
2.  Conectar o repositório\
3.  Configurar:
    -   Framework: Create React App\
    -   Root Directory: `frontend`\
    -   Build command: `npm run build`\
    -   Output directory: `build`
4.  Definir variável:

``` env
REACT_APP_API_BASE_URL=https://x4payassessoria.com
```

------------------------------------------------------------------------

## 🔐 CORS

O backend permite chamadas apenas dos domínios configurados, incluindo:

-   https://x4payassessoria.com\
-   https://www.x4payassessoria.com\
-   URLs da Vercel

Isso evita bloqueios de requisições no navegador.

------------------------------------------------------------------------

## 🧰 Dependências principais

### Backend

-   fastapi\
-   uvicorn\
-   pydantic\
-   python-dotenv\
-   smtplib / ssl

### Frontend

-   react\
-   react-router-dom\
-   react-input-mask

------------------------------------------------------------------------

## 📝 Observações

-   Sempre reinicie o servidor após alterar o `.env`
-   Nunca versione arquivos `.env`
-   Para novos assets no React, reinicie o servidor
-   O envio de e-mails é feito via SMTP autenticado (Zoho)
-   O projeto não utiliza banco de dados

------------------------------------------------------------------------

## 📄 Licença

Projeto desenvolvido para uso institucional da **X4Pay Assessoria**.\
Para reutilização ou redistribuição, consulte os responsáveis pelo
projeto.

------------------------------------------------------------------------

## 🤝 Contribuição

Sugestões, melhorias e correções são bem-vindas via *issues* ou *pull
requests*.
