# FC Studio

Landing page institucional da FC Studio, agência de marketing digital especializada em estratégia, tráfego pago, branding e presença digital para negócios que querem crescer com clareza e resultados mensuráveis.

## 🚀 Tecnologias

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion

## 📍 Sobre o projeto

Este projeto consiste em uma landing page moderna e profissional para apresentar a FC Studio, destacar os serviços, comunicar a proposta de valor e captar leads via WhatsApp.

A estrutura foi pensada para ser fácil de manter, com informações centralizadas em arquivo de configuração e design com identidade visual premium.

## 🧩 Funcionalidades

- Hero section com proposta de valor clara
- Seção de serviços e diferenciais
- Destaque de resultados e métricas realistas
- Botões de contato com WhatsApp
- Formulário de lead com envio via WhatsApp
- Banner de consentimento de cookies
- Layout responsivo e otimizado para mobile
- Configurações centralizadas de branding e contato

## 📁 Estrutura do projeto

```bash
FCSTUDIO/
├── app/
│   ├── api/
│   ├── config.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── logo-fc-studio.png
├── .gitignore
├── .env.example
├── package.json
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── README.md
└── next-env.d.ts
```

## 🛠️ Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/SEU_USUARIO/fcstudio-landing.git
cd fcstudio-landing
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env.local` com base no `.env.example`:

```bash
cp .env.example .env.local
```

4. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

5. Acesse no navegador:

```bash
http://localhost:3000
```

## 🏗️ Build para produção

```bash
npm run build
npm start
```

## 📦 Variáveis de ambiente

O projeto usa um arquivo `.env.example` para facilitar a configuração e manutenção de valores como contato e identidade da marca.

Exemplo:

```env
NEXT_PUBLIC_COMPANY_NAME=FC Studio
NEXT_PUBLIC_PHONE=+55 (45) 99976-9060
NEXT_PUBLIC_EMAIL=fcstudiomk@gmail.com
```

## 📞 Contato

- Email: fcstudiomk@gmail.com
- WhatsApp: +55 (45) 99976-9060

## 📄 Licença

Este projeto está sob a licença MIT.

## 🙌 Autor

FC Studio
