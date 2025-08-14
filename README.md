X4Pay Assessoria Website

Website institucional da X4Pay Assessoria. O projecto foi concebido para apresentar a empresa, os serviços prestados e fornecer um formulário de contacto para potenciais clientes. A aplicação é full‑stack: a camada de front‑end foi construída com React (Create React App) e a API back‑end foi construída com FastAPI. O front‑end é publicado na Vercel e o back‑end é publicado na Railway.

Nota: Este repositório contém duas pastas na raiz – frontend/ e backend/. O código do front‑end (React) vive em frontend, e o código do back‑end (FastAPI) vive em backend/app/ (o ficheiro de entrada chama‑se main.py). Não existe um servidor de base de dados; o back‑end usa o serviço de e‑mail (SendGrid) para enviar as mensagens recebidas através do formulário de contacto.

✨ Funcionalidades

Páginas institucionais – apresenta a história da empresa, visão e missão, serviços oferecidos, portfólio de clientes e parceiros.

Formulário de contacto – duas versões:

Um formulário completo (/contact) que permite ao visitante informar nome, e‑mail, telefone, assunto e mensagem.

Um formulário simplificado no rodapé da página inicial que solicita apenas o e‑mail.

Envio de e‑mail – os dados do formulário são enviados ao back‑end, que valida os campos e reencaminha por e‑mail usando SendGrid.

Deploy – o front‑end é publicado na Vercel, com domínio customizado https://x4payassessoria.com, e o back‑end é publicado na Railway. O domínio customizado mapeia para a API de produção (https://x4payassessoria.com/contact).

Estrutura modular – separação clara entre front‑end (React) e back‑end (FastAPI), permitindo escalar ou trocar tecnologias sem grandes impactos.

📁 Estrutura de pastas
x4pay_website/
├── backend/
│   ├── app/
│   │   ├── main.py        # ponto de entrada do FastAPI
│   │   ├── _init_.py    # indica que "app" é um pacote Python
│   │   ├── ...            # outros módulos (rotas, models etc.)
│   ├── requirements.txt   # dependências Python
│   └── Procfile (opcional)  # comando de arranque para Railway
└── frontend/
    ├── public/            # assets estáticos (imagens, favicon etc.)
    ├── src/
    │   ├── App.js / App.jsx   # componente principal React
    │   ├── components/        # componentes reutilizáveis
    │   ├── pages/             # páginas (home, sobre, serviços etc.)
    │   └── ...
    ├── package.json        # dependências e scripts npm
    └── README.md (opcional)

🚀 Execução local
Requisitos

Node.js 16+ e npm (para o front‑end).

Python 3.8+ e pip (para o back‑end).

1. Clonar o repositório
git clone https://github.com/Danilo-Xaxa/x4pay_website.git
cd x4pay_website

2. Backend (FastAPI)

Entre na pasta backend e crie um ambiente virtual:

cd backend
python -m venv venv
source venv/bin/activate    # Linux/Mac
# .\venv\Scripts\activate  # Windows PowerShell


Instale as dependências:

pip install --upgrade pip
pip install -r requirements.txt


Crie um ficheiro .env na pasta backend com as configurações de e‑mail (exemplo):

SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=SEU_SENDGRID_API_KEY
# opcional: destinatários padrão
EMAIL_TO=contato@x4payassessoria.com


Rode o servidor de desenvolvimento com Uvicorn:

uvicorn app.main:app --reload --port 8000


O serviço estará disponível em http://localhost:8000. O endpoint raiz (/) retorna uma mensagem JSON, e o endpoint /contact aceita requisições POST com o corpo JSON contendo name, email, phone, subject e message.

3. Frontend (React)

Abra um novo terminal e navegue até a pasta frontend:

cd frontend


Instale as dependências do projeto React:

npm install


Para rodar em modo de desenvolvimento:

npm start


A aplicação abrirá em http://localhost:3000 (ou outra porta livre). A API será chamada via http://localhost:8000/contact (certifique‑se de que o back‑end está rodando). Caso adicione imagens novas à pasta public/ durante o desenvolvimento, reinicie o servidor (Ctrl+C e npm start) ou gere uma nova build (npm run build) para que os assets sejam incorporados.

Para gerar a versão de produção:

npm run build


Esse comando cria a pasta build com os arquivos otimizados. Essa build é utilizada no deploy para a Vercel.

🌐 Deploy
Backend na Railway

Crie uma conta em Railway e conecte seu repositório GitHub.

Ao importar o projeto, defina o Root Directory como backend. A Railway procurará o requirements.txt e criará um ambiente Python.

Defina as variáveis de ambiente no painel Environment com base no seu .env (SMTP, email receptor, etc.).

Informe o comando de start em Deploy Settings ou crie um Procfile em backend com o conteúdo:

web: uvicorn app.main:app --host 0.0.0.0 --port $PORT


A Railway atribuirá uma URL do tipo https://<projeto>.railway.app. Se desejar usar o domínio personalizado https://x4payassessoria.com para a API, configure um registro CNAME apontando para a URL da Railway e atualize o allow_origins no CORS para incluir o domínio.

Frontend na Vercel

Crie uma conta em Vercel e importe o repositório.

Configure o Project Settings com:

Framework Preset: Create React App (Vercel detecta automaticamente).

Root Directory: frontend.

Build Command: npm run build.

Output Directory: build.

Nas Environment Variables, adicione REACT_APP_API_BASE_URL ou a variável que seu front‑end usa para chamar a API. Por exemplo:

REACT_APP_API_BASE_URL=https://x4payassessoria.com


Após o deploy, a Vercel fornece uma URL (ex.: https://x4payassessoria.vercel.app). Para usar seu domínio x4payassessoria.com (ou www.x4payassessoria.com), adicione o domínio no painel de domínios da Vercel e configure os registros DNS (A ou CNAME) no seu provedor de domínio.

🔧 Ambiente de produção

Para assegurar que o front e o back se comuniquem em produção:

O front deve referenciar a API via variável de ambiente (REACT_APP_API_BASE_URL) apontando para o domínio ou subdomínio onde o back‑end está publicado.

No back‑end, configure o allow_origins do CORS para incluir o domínio do front (https://x4payassessoria.com e https://www.x4payassessoria.com). Dessa forma, o navegador não bloqueia requisições cross‑origin.

🛠 Dependências principais

Backend:

fastapi – framework para criação de APIs rápidas em Python.

uvicorn – servidor ASGI utilizado para rodar a aplicação.

pydantic – modelos de validação de dados.

python-dotenv – carregamento de variáveis de ambiente de um arquivo .env.

aiosmtplib – envio assíncrono de e‑mails (SMTP) via SendGrid.

Frontend:

react – biblioteca JavaScript para construção de UI.

react-router-dom – roteamento no lado do cliente.

react-input-mask – máscara para o campo de telefone.

Outras dependências do Create React App (Webpack, Babel, etc.).

📨 Variáveis de ambiente (backend)

Os seguintes parâmetros são usados para envio de e‑mail e configuração do servidor:

Variável	Descrição
SMTP_HOST	Host do servidor SMTP (ex.: smtp.sendgrid.net).
SMTP_PORT	Porta do SMTP (587 para STARTTLS ou 465 para SSL).
SMTP_USER	Nome de usuário (SendGrid usa sempre apikey).
SMTP_PASSWORD	Chave de API do SendGrid ou senha do serviço.
EMAIL_TO	(Opcional) Endereço que receberá as mensagens.
CORS_ORIGINS	(Opcional) Lista de domínios permitidos pelo CORS.

Estas variáveis podem ser definidas no painel do Railway (Production) e num .env local para desenvolvimento.

📝 Observações

Sempre que adicionar novas imagens à pasta public/ do front‑end, reinicie o servidor (npm start) ou crie uma nova build (npm run build) para que o React inclua os assets.

As telas foram estilizadas usando classes CSS personalizadas (global-btn, form-control, etc.) e seguem a identidade visual da X4Pay Assessoria.

Para personalizar os textos e imagens, edite os componentes em frontend/src/pages e frontend/src/assets.

📌 Licença

Este projecto foi desenvolvido para fins institucionais da X4Pay Assessoria. Caso deseje reutilizar o código, consulte os autores ou contribuintes para mais informações.

🤝 Contribuição

Sinta‑se livre para abrir issues ou enviar pull requests. Sugestões e correções são muito bem‑vindas.