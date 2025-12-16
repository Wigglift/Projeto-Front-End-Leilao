# Projeto Leilão - App Mobile

Aplicativo mobile de leilão desenvolvido com React Native e Expo, permitindo visualizar produtos, fazer buscas e filtrar por categorias.

## Tecnologias

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **React Navigation** - Navegação entre telas
- **Styled Components** - Estilização dos componentes
- **Axios** - Requisições HTTP
- **JSON Server** - API REST fake para desenvolvimento local

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/client) instalado no seu dispositivo móvel

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Wigglift/Projeto-Front-End-Leilao.git
cd meu-app
```

2. Instale as dependências:
```bash
npm install
```

## Inicialização do Projeto

⚠️ **IMPORTANTE**: Este projeto requer **dois terminais** rodando simultaneamente.

### Opção 1: Iniciar manualmente (recomendado)

**Terminal 1** - Inicie o servidor JSON (API Mock):
```bash
npm run database
```

**Terminal 2** - Inicie o aplicativo Expo:
```bash
npx expo start
```

### Opção 2: Iniciar com um único comando para rodar via web

```bash
npm run dev
```

Este comando iniciará automaticamente o JSON Server e o Expo simultaneamente.

## Como usar

1. Após executar os comandos acima, um QR Code aparecerá no terminal
2. Abra o aplicativo **Expo Go** no seu celular
3. Escaneie o QR Code exibido
4. O aplicativo será carregado no seu dispositivo

## Estrutura do Projeto

```
meu-app/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   └── styleds/         # Componentes estilizados
│   ├── screens/             # Telas do aplicativo
│   │   ├── Home/            # Tela principal
│   │   ├── Login/           # Tela de login
│   │   ├── Bid.jsx          # Tela de lance
│   │   └── Settings.jsx     # Tela de configurações
│   ├── services/            # Serviços e APIs
│   │   ├── api.js           # Configuração do Axios
│   │   └── auctionService.js
│   └── utils/               # Utilitários
│       └── timeUtils.js
├── utils/
│   └── mock/
│       └── db.json          # Banco de dados fake (JSON Server)
├── assets/                  # Imagens e recursos
├── App.jsx                  # Componente principal
└── package.json             # Dependências do projeto
```

## Funcionalidades

- Login de usuário
- Listagem de produtos/leilões
- Busca de produtos
- Filtro por categorias
- Visualização de detalhes
- Interface responsiva e moderna

## Scripts Disponíveis

```bash
npm start          # Inicia o Expo
npm run android    # Inicia no emulador Android
npm run ios        # Inicia no emulador iOS
npm run web        # Inicia na web
npm run database   # Inicia o JSON Server
npm run dev        # Inicia tudo simultaneamente
```

## API Local

O JSON Server roda na porta **3001** e fornece os seguintes endpoints:

- `GET http://localhost:3001/produtos` - Lista produtos
- `GET http://localhost:3001/produtos/:id` - Busca produto específico
- Outros endpoints conforme estrutura do `db.json`

## Notas

- O servidor JSON precisa estar rodando para o app funcionar corretamente
- Em dispositivos físicos, certifique-se de estar na mesma rede Wi-Fi
- A API se ajusta automaticamente ao IP da máquina host

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto é privado e de uso educacional.
