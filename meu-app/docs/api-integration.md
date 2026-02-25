# Integração com a API de Leilões

## Visão Geral

O aplicativo utiliza uma API REST externa para gerenciar leilões e autenticação. A comunicação é feita através de requisições HTTP com autenticação via JWT (Bearer Token).

## Arquitetura

### Serviços (Services Layer)

#### 1. authService.js
Responsável pela autenticação e gerenciamento de tokens.

**Funcionalidades:**
- Login com username e password
- Armazenamento seguro do token JWT no AsyncStorage
- Gerenciamento de expiração do token (2 horas)
- Logout e limpeza de credenciais

**Métodos principais:**
```javascript
authService.login(username, password)      // Faz login e armazena token
authService.getToken()                     // Recupera token válido
authService.isAuthenticated()              // Verifica se está autenticado
authService.logout()                       // Remove token (logout)
```

#### 2. api.js
Configuração centralizada do Axios para requisições HTTP.

**Características:**
- Base URL configurada para a API de leilões
- Interceptor de requisição que adiciona automaticamente o Bearer Token
- Timeout de 15 segundos
- Tratamento de erros com mensagens específicas por código HTTP

**Interceptor de Autenticação:**
```javascript
// Adiciona automaticamente o token em todas as requisições
config.headers.Authorization = `Bearer ${token}`;
```

#### 3. auctionService.js
Serviço completo para gerenciamento de leilões.

**Funcionalidades:**
- Listagem de leilões e categorias
- Busca e filtros (tipo, localidade, data, leiloeiro)
- Consulta de lotes de leilão
- Mapeamento de dados da API para formato do frontend

**Métodos principais:**
```javascript
auctionService.getCategories()                        // Lista tipos/categorias
auctionService.getAuctions()                          // Lista todos os leilões
auctionService.getAuctionsByCategory(categoryId)      // Filtra por categoria
auctionService.searchAuctions(query)                  // Busca textual
auctionService.getAuctionsByDateRange(start, end)     // Filtra por data
auctionService.getAuctionsByLocation(city, state)     // Filtra por localidade
auctionService.getAuctionLots(auctionId, filters)     // Lista lotes
```

## Endpoints da API

### Autenticação
**URL Base:** `http://ec2-3-20-227-42.us-east-2.compute.amazonaws.com:3000`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/login` | Autentica usuário e retorna token JWT |

**Exemplo de Request:**
```json
{
  "username": "usuario",
  "password": "senha"
}
```

**Exemplo de Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Leilões
**URL Base:** `http://ec2-3-20-227-42.us-east-2.compute.amazonaws.com:3000`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/leiloes` | Lista todos os leilões |
| GET | `/leiloes/tipo/:tipo` | Busca leilões por tipo |
| GET | `/leiloes/localidade?cidade=X&estado=Y` | Busca por localidade |
| GET | `/leiloes/intervalo_data/:dataInicial/:dataFinal` | Busca por intervalo de datas |
| GET | `/leiloes/leiloeiro/:nome` | Busca por leiloeiro |
| GET | `/leiloes/leiloeiros` | Lista todos os leiloeiros |
| GET | `/leiloes/cidades_estados` | Lista cidades e estados |
| GET | `/leiloes/tipos` | Lista todos os tipos |
| GET | `/leiloes/:id/lotes` | Lista lotes de um leilão |
| GET | `/leiloes/:id/lotes/anos_fabricacao` | Lista anos de fabricação dos lotes |
| GET | `/leiloes/:id/lotes/tipos_veiculos` | Lista tipos de veículos dos lotes |
| GET | `/leiloes/:id/lotes/tipos` | Lista tipos de lotes |

**Exemplo de Response (Leilão):**
```json
{
  "id": 90,
  "data": "2024-01-11T03:00:00.000Z",
  "horario": "14:00:00",
  "tipo": "SEGURADORAS",
  "cidade": "RIO DE JANEIRO",
  "estado": "RJ",
  "leiloeiro": "PEDRO AFONSECA"
}
```

## Mapeamento de Dados

A API retorna dados em um formato específico que é mapeado para o formato esperado pelo frontend:

**API → Frontend:**
- `id` → `id` (convertido para string)
- `data` + `horario` → `dataFim`
- Campos calculados: `titulo`, `descricao`, `imagemUrl`, `timeRemaining`, `currentBidFormatted`

## Fluxo de Autenticação

1. **Login:**
   - Usuário insere credenciais na tela de Login
   - `authService.login()` é chamado
   - Token JWT é recebido e armazenado no AsyncStorage
   - Navegação para a tela Home

2. **Requisições Autenticadas:**
   - Interceptor do Axios recupera o token do AsyncStorage
   - Token é adicionado ao header `Authorization: Bearer ${token}`
   - Requisição é enviada para a API

3. **Expiração do Token:**
   - Token tem validade de 2 horas
   - `authService.getToken()` verifica a expiração
   - Se expirado, retorna `null` e remove o token
   - Usuário precisa fazer login novamente

4. **Logout:**
   - `authService.logout()` é chamado
   - Token é removido do AsyncStorage
   - Usuário é redirecionado para a tela de Login

## Tratamento de Erros

### Códigos HTTP
- **401 Unauthorized:** Token inválido ou expirado
- **404 Not Found:** Recurso não encontrado
- **500 Internal Server Error:** Erro no servidor
- **Timeout:** Conexão demorou mais de 15 segundos

### Estratégias
- Mensagens de erro amigáveis para o usuário
- Fallbacks quando endpoints falham (ex: categorias padrão)
- Loading states durante requisições

## Boas Práticas Implementadas

1. **Camada de Serviço:** Separação clara entre UI e lógica de API
2. **Autenticação Centralizada:** Token gerenciado em um único lugar
3. **Interceptors:** Adição automática de headers de autenticação
4. **Type Safety:** JSDoc com documentação dos parâmetros e retornos
5. **Error Handling:** Tratamento consistente de erros
6. **Data Mapping:** Transformação de dados da API para formato do frontend
7. **Token Expiration:** Gerenciamento automático de expiração

## Exemplo de Uso

### Na Tela de Login
```javascript
import authService from "../../services/authService";

const handleLogin = async () => {
  try {
    await authService.login(username, password);
    navigation.navigate("Home");
  } catch (error) {
    Alert.alert("Erro no Login", error.message);
  }
};
```

### Na Tela Home
```javascript
import auctionService from "../../services/auctionService";

const loadAuctions = async () => {
  try {
    const data = await auctionService.getAuctionsByCategory(selectedCategory);
    setAuctions(data);
  } catch (error) {
    console.error("Erro ao carregar leilões:", error);
  }
};
```

## Testes

Todos os serviços mencionados neste documento possuem cobertura de testes automatizados:

- **authService**: Testes de login, logout, validação de token e expiração
- **auctionService**: Testes de busca, filtros, categorias e tratamento de erros
- **Telas**: Testes de integração para Login e Home

Para mais detalhes sobre a estrutura de testes, execução e cobertura, consulte o [Guia de Testes](../TESTING.md).
