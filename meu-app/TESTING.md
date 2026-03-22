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

**Cobertura:**
- Renderiza com texto e ícone
- Renderiza sem ícone
- Callback onPress funciona corretamente
- Estado selected aplica estilo diferente
- Estado não selecionado
- Renderiza múltiplos chips corretamente

### 9. Componente MenuDrawer
**Arquivo:** `src/components/styleds/MenuDrawer/__tests__/MenuDrawer.test.jsx`

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

**Cobertura:**
- Renderiza informações básicas do leilão (título, leiloeiro, cidade)
- Exibe descrição do leilão quando disponível
- Lida com múltiplas ocorrências do mesmo texto (leiloeiro aparece 2x)

### 13. Componente LotCard
**Arquivo:** `src/components/styleds/LotCard/__tests__/LotCard.test.jsx`

**Cobertura:**
- Renderiza informações básicas (marca, modelo, preço, ano, combustível)
- Formatação correta de quilometragem (50,000 km)
- Exibe contador de itens corretamente (5 itens)
- Lida com ausência de marca/modelo (Veículo não identificado)
- Callback onPress
- Edge cases e dados incompletos

### 14. Tela LotList (Integração)
**Arquivo:** `src/screens/LotList/__tests__/LotList.test.jsx`

**Cobertura:**
- Carrega lotes ao iniciar com ordenação por ID decrescente
- Exibe mensagem de carregamento e estado vazio
- Navega para LotDetails ao clicar em LotCard
- Tratamento de erros de rede (console.error esperado)
- Mocks de navegação e gesture handling

### 15. Serviço de Lotes
**Arquivo:** `src/services/__tests__/lotService.test.js`

**Cobertura:**
- getLotesByLeilao ordena por ID decrescente (mais recentes primeiro)
- mapLoteData formata dados corretamente (km, preço, contagem)
- Lida com dados ausentes e inválidos
- Cálculo de contagem de itens (ar, vidro_eletrico, etc.)
- Tratamento de erros em todas as operações

### 16. Componente LotFilterModal
**Arquivo:** `src/components/styleds/LotFilterModal/__tests__/LotFilterModal.test.jsx`

**Cobertura:**
- Renderiza modal quando visível
- Carrega opções de filtros (tipos, anos, combustíveis)
- Aplica filtros corretamente
- Limpa filtros ao resetar
- Tratamento de erros de carregamento
- Estados loading e interações do usuário

### 17. Serviço de Foto do Usuário
**Arquivo:** `src/services/__tests__/userPhotoService.test.js`

**Cobertura:**
- Obtém foto do usuário com sucesso
- Remove foto do usuário corretamente
- Tratamento de erros (console.error esperado)
- Validação de URI e dados
- Estados de sucesso e falha

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
- [React Testing Library Cheatsheet](https://testing-library.com/docs/react-native-testing-library/docs/intro)
- [Jest Matchers Reference](https://jestjs.io/docs/using-matchers)
