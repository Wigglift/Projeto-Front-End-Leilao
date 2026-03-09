# Guia de Testes

## Visão Geral

Este documento descreve a estrutura de testes do projeto, utilizando **React Testing Library** e **Jest** para garantir a qualidade e confiabilidade do código. Os testes cobrem componentes, serviços, utilitários e telas da aplicação.

## Configuração

### Dependências

- `@testing-library/react-native` - Biblioteca principal para testes de componentes React Native
- `jest-expo` - Preset do Jest otimizado para projetos Expo
- `jest` - Framework de testes JavaScript

### Arquivos de Configuração

- `jest.config.js` - Configuração do Jest com preset expo, transform patterns e thresholds de cobertura
- `jest.setup.js` - Setup global com mocks (AsyncStorage, React Navigation, Expo modules) e polyfills

## Executando os Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch (reexecuta ao salvar arquivos)
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

## Estrutura de Testes

```
src/
├── components/
│   └── styleds/
│       ├── Button/__tests__/Button.test.jsx
│       └── AuctionCard/__tests__/AuctionCard.test.jsx
├── screens/
│   ├── Login/__tests__/Login.test.jsx
│   └── Home/__tests__/Home.test.jsx
├── services/
│   └── __tests__/
│       ├── authService.test.js
│       └── auctionService.test.js
└── utils/
    └── __tests__/timeUtils.test.js
```

## Testes Implementados

### 1. Componente Button
**Arquivo:** `src/components/styleds/Button/__tests__/Button.test.jsx`

**Cobertura:**
- Renderização com título
- Callback onPress funciona corretamente
- Estado disabled impede cliques
- Variantes (primary/secondary)
- Loading state

### 2. Componente AuctionCard
**Arquivo:** `src/components/styleds/AuctionCard/__tests__/AuctionCard.test.jsx`

**Cobertura:**
- Renderiza todas as props corretamente
- onPress é chamado ao clicar
- Funciona sem imagem
- Exibe contagem de lances

### 3. Serviço de Autenticação
**Arquivo:** `src/services/__tests__/authService.test.js`

**Cobertura:**
- Login bem-sucedido armazena token no AsyncStorage
- Login falho lança erro apropriado
- Logout limpa token do AsyncStorage
- getToken valida expiração (2 horas)
- Token expirado retorna null

### 4. Utilitários de Tempo
**Arquivo:** `src/utils/__tests__/timeUtils.test.js`

**Cobertura:**
- formatCurrency formata valores em BRL (R$)
- Lida com zero, valores negativos e números grandes
- calculateTimeRemaining calcula dias/horas/minutos restantes
- Trata datas passadas, futuras e inválidas
- Valores nulos e edge cases

### 5. Tela de Login (Integração)
**Arquivo:** `src/screens/Login/__tests__/Login.test.jsx`

**Cobertura:**
- Renderiza formulário completo (inputs, botão, checkbox)
- Valida campos vazios antes de submeter
- Chama authService.login com credenciais corretas
- Exibe Alert de erro em falha de login
- Toggle do checkbox "Lembrar de mim"
- Estado de loading durante autenticação
- Navegação para Home após login bem-sucedido

### 6. Serviço de Leilões
**Arquivo:** `src/services/__tests__/auctionService.test.js`

**Cobertura:**
- getCategories retorna categorias com "Todos" como primeira opção
- Filtra tipos nulos, undefined ou inválidos
- getActiveAuctions retorna leilões ativos formatados
- Filtra leilões sem dados obrigatórios (id, data, tipo, cidade, estado)
- searchAuctions busca por cidade, tipo, estado ou leiloeiro
- getAuctionsByCategory: retorna todos quando "all", senão filtra por tipo
- getAuctionsByDateRange filtra por intervalo de datas (YYYY-MM-DD)
- getAuctionsByLocation filtra por cidade e estado
- getAuctionsByAuctioneer filtra por nome do leiloeiro
- getAuctioneers retorna lista de leiloeiros disponíveis
- getCitiesAndStates retorna lista de cidades e estados
- Tratamento apropriado de erros em todas as operações

### 7. Tela Home (Integração)
**Arquivo:** `src/screens/Home/__tests__/Home.test.jsx`

**Cobertura:**
- Renderiza categorias e leilões corretamente ao iniciar
- Exibe saudação dinâmica baseada no horário (Bom dia/Boa tarde/Boa noite)
- Carrega leilões ao selecionar categoria via CategoryChip
- Busca leilões com debounce de 500ms no SearchInput
- Limpa busca e recarrega leilões quando texto é vazio
- Navega para AuctionDetails ao clicar em AuctionCard
- Aplica filtros de localidade (cidade/estado)
- Aplica filtros de leiloeiro
- Exibe Alert de erro ao falhar aplicação de filtros
- Realiza logout com confirmação via Alert
- Trata erros ao carregar categorias (console.error)
- Trata erros ao carregar leilões (console.error)

### 8. Componente CategoryChip
**Arquivo:** `src/components/styleds/CategoryChip/__tests__/CategoryChip.test.jsx`
**Total de testes:** 6

**Cobertura:**
- Renderiza com texto e ícone
- Renderiza sem ícone
- Callback onPress funciona corretamente
- Estado selected aplica estilo diferente
- Estado não selecionado
- Renderiza múltiplos chips corretamente

### 9. Componente MenuDrawer
**Arquivo:** `src/components/styleds/MenuDrawer/__tests__/MenuDrawer.test.jsx`
**Total de testes:** 10

**Cobertura:**
- Renderiza menu quando visível
- Não renderiza quando invisível
- Callback onClose funciona ao clicar no overlay
- Menu item "Início" existe e pode ser pressionado
- Menu item "Perfil" existe e pode ser pressionado
- Menu item "Lances" existe e pode ser pressionado
- Menu item "Favoritos" existe e pode ser pressionado
- Menu item "Configurações" existe e pode ser pressionado
- Botão de logout existe e chama onLogout
- Todos os itens do menu são renderizados corretamente

### 10. Componente BidConfirmationModal
**Arquivo:** `src/components/styleds/BidConfirmationModal/__tests__/BidConfirmationModal.test.jsx`
**Total de testes:** 8

**Cobertura:**
- Renderiza modal quando visível
- Não renderiza quando invisível
- Exibe valor do lance formatado corretamente
- Botão "Confirmar" chama onConfirm
- Botão "Cancelar" chama onCancel
- Formata valores corretamente (R$ 25.000, R$ 30.000, R$ 50.000)
- Todos os elementos do modal são exibidos

### 11. Componente FilterModal
**Arquivo:** `src/components/styleds/FilterModal/__tests__/FilterModal.test.jsx`
**Total de testes:** 10

**Cobertura:**
- Renderiza modal quando visível
- Não renderiza quando invisível
- Carrega opções de cidades/estados e leiloeiros
- Inputs de data funcionam corretamente
- Valida que data inicial não seja posterior à final
- Aplica filtros corretamente ao clicar "Aplicar"
- Limpa filtros ao clicar "Limpar"
- Fecha modal ao clicar "Fechar"
- Exibe Alert em caso de erro ao carregar opções
- Pickers de localidade e leiloeiro funcionam corretamente

### 12. Tela AuctionDetails (Integração)
**Arquivo:** `src/screens/AuctionDetails/__tests__/AuctionDetails.test.jsx`
**Total de testes:** 17

**Cobertura:**
- Renderiza detalhes do leilão corretamente
- Timer de 60 segundos inicia automaticamente
- Timer decrementa a cada segundo
- Timer chega a zero e abre modal de finalização
- Botões de lance rápido (R$ 26k, R$ 28k, R$ 32k, R$ 35k)
- Abrir modal de lance customizado
- Validação de lance mínimo no modal customizado
- Modal de confirmação de lance abre corretamente
- Confirmação de lance exibe Alert de sucesso
- Cancelamento de lance fecha modal
- Modal de leilão finalizado exibe mensagem de vitória
- Fechar modal de finalização navega de volta
- Timer limpa interval ao desmontar componente
- Navegação funciona corretamente
- Todos os modais funcionam corretamente

## Mocks Configurados

### AsyncStorage
```javascript
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));
```

### React Navigation
```javascript
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
  }),
}));
```

## Boas Práticas

1. Organize testes por funcionalidade usando `describe` blocks
2. Use `beforeEach` para limpar mocks entre testes (`jest.clearAllMocks()`)
3. Teste comportamento e resultados, não implementação interna
4. Use `waitFor` para operações assíncronas
5. Nomeie testes de forma descritiva (em PT-BR: "deve fazer X quando Y")
6. Mock apenas dependências externas (APIs, AsyncStorage, navegação)
7. Use `jest.useFakeTimers()` para testar debounce e timers
8. Evite testar detalhes de implementação (classes CSS, estrutura interna)

## Troubleshooting

### Erro: "Cannot find module"
```bash
npm install --legacy-peer-deps
```

### Testes falhando após mudanças
```bash
npm test -- --clearCache
```

### Ver output detalhado
```bash
npm test -- --verbose
```

## Recursos Adicionais

- [React Testing Library Docs](https://callstack.github.io/react-native-testing-library/)
- [Jest Docs](https://jestjs.io/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
