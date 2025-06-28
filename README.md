
# Trilhas - Desafio 5 🚀

Projeto front-end desenvolvido com **React + TypeScript + Vite**, com foco em arquitetura escalável, componentização, reutilização de código e boas práticas modernas. Essa aplicação serve como base para navegação entre trilhas de conteúdo e artigos, simulando um ambiente dinâmico e responsivo para usuários.

---

## 📚 Descrição

Este repositório é parte do Desafio 5 da Trilha Front-End. Seu objetivo é demonstrar domínio em:
- Estruturação de SPA (Single Page Application) com React
- Organização modular de componentes
- Utilização de boas práticas com TypeScript, CSS Modules e Hooks personalizados
- Gerenciamento de rotas com React Router

---

## 🧱 Arquitetura do Projeto

A aplicação segue um padrão de organização baseado em **responsabilidades separadas por pasta**:

```
src/
 ┣ assets/          # Imagens e ícones
 ┣ components/      # Componentes reutilizáveis (ex: Header, Footer, ContentCard)
 ┣ hooks/           # Hooks customizados
 ┣ pages/           # Páginas como LoginPage, HomePage, etc.
 ┣ services/        # Integrações com API
 ┣ store/           # (Futuro) estado global com Zustand ou Redux
 ┣ types/           # Interfaces e tipos globais
 ┣ utils/           # Funções utilitárias
 ┣ App.tsx          # Definição de rotas
 ┗ main.tsx         # Entrada principal do app
```
---

## ✅ Funcionalidades

- [x] SPA com navegação por rotas (react-router-dom)
- [x] Login e Cadastro com validações
- [x] Exibição de trilhas e artigos
- [x] Componentes reaproveitáveis
- [x] Layout responsivo com CSS Modules

---

## 🧠 Boas Práticas Adotadas

- ✅ Componentes com responsabilidade única
- ✅ Tipagem completa com TypeScript
- ✅ Estilos isolados com CSS Modules
- ✅ Hooks customizados para lógica compartilhada
- ✅ Estrutura clara e modular (por camadas)
- ✅ ESLint + Prettier para padronização de código

---

## 📦 Principais Dependências

- `react` / `react-dom`
- `typescript`
- `vite`
- `react-router-dom`
- `eslint`, `prettier`
- `@types/react`, `@types/node`

---

## ❗ Tratativas de Erro

- Validação de campos obrigatórios em formulários
- Verificação de senha e confirmação
- Navegação segura com rotas protegidas
- Boas práticas de organização para evitar falhas de execução
- (Página 404 ainda não implementada)

---

## 🤝 Contribuições

Formato de mensagem de commit padrão:

```
📦 Tipo: natureza do commit (obrigatório)
📝 Escopo: sempre "trilhas" ou nome do módulo
🔢 Numeração: número da tarefa no Trello + breve descrição
```

### Tipos de Commit

- ✨ `feature`: Nova funcionalidade
- 🐛 `bugfix`: Correção de erro


## 📌 Status do Projeto

🔧 Em desenvolvimento  
📤 Deploy: ainda não publicado   
