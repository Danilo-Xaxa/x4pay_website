# Plano de Melhorias — x4pay_website

10 melhorias concretas ordenadas por prioridade. Cada item inclui o problema,
a solucao esperada e os arquivos envolvidos para facilitar a execucao.

---

## 1. Lazy loading de imagens (Performance)

**Problema**: Todas as `<img>` usam `src` padrao sem `loading="lazy"`. Isso faz
o navegador baixar todas as imagens de uma vez, prejudicando LCP e tempo de
carregamento inicial — especialmente em mobile.

**Solucao**: Adicionar `loading="lazy"` em todas as imagens que nao estao no
viewport inicial (hero). A imagem principal do hero deve manter `loading="eager"`
(ou omitir o atributo) para nao atrasar o LCP.

**Arquivos**:
- `frontend/src/components/ProcessOne.jsx` (icones dos 4 cards)
- `frontend/src/components/TeamOne.jsx` (logos dos clientes no carousel)
- `frontend/src/components/GoalArea.jsx`
- `frontend/src/components/AboutOne.jsx` (ou variante usada)
- Qualquer outro componente com `<img>` abaixo da dobra

---

## 2. Envio de email assincrono no backend (Performance/UX)

**Problema**: `send_email_resend()` em `backend/app/main.py:162-167` faz uma
requisicao HTTP sincrona ao Resend com timeout de 15s. O usuario fica esperando
a resposta do Resend antes de receber feedback — se o Resend demorar, a UX e
horrivel.

**Solucao**: Usar `BackgroundTasks` do FastAPI para enviar o email em background.
Retornar 200 imediatamente ao usuario e processar o envio depois.

```python
from fastapi import BackgroundTasks

@app.post("/contact")
async def contact(request: Request, form: ContactForm, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_email_resend, subject, html_body, form.email)
    return ApiResponse(success=True, message="Mensagem recebida com sucesso!")
```

**Arquivos**:
- `backend/app/main.py` (funcao `send_email_resend` e endpoints `/contact`, `/contact_x4agro`)

---

## 3. CORS mais restritivo (Seguranca)

**Problema**: Em `backend/app/main.py:62`, o regex `r"https://.*\.vercel\.app"`
permite que QUALQUER app hospedado na Vercel faca requisicoes a API. Alem disso,
`allow_headers=["*"]` na linha 65 aceita todos os headers.

**Solucao**:
- Trocar o regex para ser especifico aos projetos:
  `r"https://x4pay.*\.vercel\.app|https://x4agro.*\.vercel\.app"`
- Restringir headers para apenas os necessarios: `["Content-Type"]`

**Arquivos**:
- `backend/app/main.py` (bloco de CORS middleware, linhas ~47-66)

---

## 4. Schema.org FAQPage para SEO (SEO)

**Problema**: A secao de FAQ existe no site mas nao tem marcacao estruturada
`FAQPage`. O Google usa esse schema para exibir Rich Results com perguntas e
respostas diretamente na SERP — e um ganho de visibilidade gratuito.

**Solucao**: Adicionar JSON-LD do tipo `FAQPage` no componente de FAQ ou via
`HelmetReact`. Exemplo:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que e subadquirencia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Resposta aqui..."
      }
    }
  ]
}
```

**Arquivos**:
- `frontend/src/components/FaqOne.jsx` (extrair perguntas/respostas como dados)
- `frontend/src/elements/HelmetReact.jsx` (ou novo script JSON-LD inline no FAQ)

---

## 5. Suporte a prefers-reduced-motion (Acessibilidade)

**Problema**: O site tem muitas animacoes (fade-in-up, hover transitions, carousel
autoplay) mas nao respeita `prefers-reduced-motion`. Usuarios com sensibilidade a
movimento (vestibulopatias, enxaqueca) nao conseguem desativar as animacoes.

**Solucao**: Adicionar media query global no SCSS:

```scss
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

E no hook `useScrollAnimation`, verificar a preferencia:

```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

**Arquivos**:
- `frontend/src/index.scss` (media query global)
- `frontend/src/hooks/useScrollAnimation.js` (pular animacao se reduced-motion)

---

## 6. Remover dependencias e imports nao usados (Performance/Bundle)

**Problema**:
- `react-on-screen` esta no `package.json` mas o `useScrollAnimation` hook faz a
  mesma coisa com IntersectionObserver nativo. E peso morto no bundle.
- `FaqOne.jsx` importa `TrackVisibility` de `react-on-screen` mas nunca usa.
- Possivelmente `swiper` e importado mas nao usado na landing page atual.

**Solucao**:
- Remover `react-on-screen` do `package.json`
- Limpar imports orfaos em todos os componentes
- Auditar se `swiper` e `react-modal-video` sao realmente usados; remover se nao

**Arquivos**:
- `frontend/package.json`
- `frontend/src/components/FaqOne.jsx` (import orfao)
- Rodar `npm ls` e `npx depcheck` para encontrar outros

---

## 7. Modularizar o backend (Organizacao)

**Problema**: Toda a logica da API esta em `backend/app/main.py` (~232 linhas):
models Pydantic, config de environment, funcao de email, middleware de logging,
CORS, e rotas. Conforme o projeto cresce, isso vira um gargalo de manutencao.

**Solucao**: Separar em modulos:

```
backend/app/
├── main.py          # Setup do app, middlewares, CORS
├── config.py        # Variaveis de ambiente
├── models.py        # ContactForm, ContatoX4AgroForm, ApiResponse
├── services/
│   └── email.py     # send_email_resend()
└── routes/
    ├── contact.py   # /contact, /contact_x4agro
    └── health.py    # /
```

**Arquivos**:
- `backend/app/main.py` (decomposicao completa)

---

## 8. Memoizacao de componentes internos (Performance)

**Problema**: Em `TeamOne.jsx`, os componentes `SampleNextArrow` e
`SamplePrevArrow` sao definidos DENTRO do componente principal. Isso significa
que sao recriados a cada render, forcando o react-slick a reinicializar o
carousel.

**Solucao**: Mover as arrow components para fora do componente ou usar
`React.memo`. Tambem extrair o objeto `settings` do Slider para fora do render
(ou usar `useMemo`).

**Arquivos**:
- `frontend/src/components/TeamOne.jsx` (arrow components + settings)
- Verificar outros componentes com Slider/Carousel pelo mesmo padrao

---

## 9. Logging sem dados sensiveis + rotacao de log (Seguranca/Ops)

**Problema**:
- `backend/app/main.py:141` faz `logger.info(f"Novo contato: {form.name} ({form.email})")`
  — dados pessoais em texto plano nos logs.
- Linha 34 usa `FileHandler("backend.log")` sem rotacao — o arquivo cresce
  indefinidamente ate encher o disco.

**Solucao**:
- Mascarar dados pessoais nos logs: `logger.info("Novo contato recebido")`
  (sem nome/email).
- Trocar `FileHandler` por `RotatingFileHandler`:

```python
from logging.handlers import RotatingFileHandler
handler = RotatingFileHandler("backend.log", maxBytes=5_000_000, backupCount=5)
```

**Arquivos**:
- `backend/app/main.py` (setup de logging + todas as chamadas logger.info com dados pessoais)

---

## 10. Testes automatizados para o backend (Qualidade)

**Problema**: Zero testes. Qualquer mudanca no backend (rotas, validacao, email)
pode quebrar silenciosamente. Nao tem como validar rate limiting, CORS, ou
formato de resposta sem testar manualmente.

**Solucao**: Criar suite de testes com `pytest` + `TestClient` do FastAPI:

```python
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    r = client.get("/")
    assert r.status_code == 200

def test_contact_valid():
    r = client.post("/contact", json={...})
    assert r.status_code == 200

def test_contact_invalid_email():
    r = client.post("/contact", json={"email": "invalido"})
    assert r.status_code == 422

def test_rate_limit():
    for _ in range(6):
        r = client.post("/contact", json={...})
    assert r.status_code == 429
```

**Arquivos**:
- Criar `backend/tests/test_contact.py`
- Criar `backend/tests/conftest.py` (fixtures, mock do Resend)
- Adicionar `pytest` e `httpx` ao `requirements.txt`
