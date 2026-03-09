# Sistema de Responsividade

## Índice

1. [O que foi implementado](#o-que-foi-implementado)
2. [Uso básico](#uso-básico)
3. [Funções disponíveis](#funções-disponíveis)
4. [Tema](#tema)
5. [Exemplos práticos](#exemplos-práticos)

---

## O que foi implementado

Criamos um sistema de responsividade baseado na Dimensions API do React Native que escala automaticamente todos os tamanhos (fontes, espaçamentos, componentes) baseado no tamanho da tela do dispositivo.

**Arquivos criados:**
- `src/utils/responsive.js` - Funções de escala e helpers
- `src/theme/` - Sistema de design tokens centralizados
  - `src/theme/index.js` - Exportação centralizada
  - `src/theme/colors.js` - Paleta de cores
  - `src/theme/typography.js` - Sistema tipográfico

**Componentes atualizados:**
- Todos os componentes em `src/components/styleds/`
- Todas as screens (Home, Login, Profile, SignUp, Welcome, Splash, AuctionDetails)

---

## Uso básico

### Em styled components

```javascript
import styled from "styled-components/native";
import { colors, spacing, typography, borderRadius } from "../../../theme";

export const Container = styled.View`
  padding: ${spacing.lg}px;
  background-color: ${colors.backgroundCard};
  border-radius: ${borderRadius.md}px;
`;

export const Title = styled.Text`
  font-size: ${typography.sizes.xl}px;
  font-weight: ${typography.weights.bold};
  color: ${colors.text};
`;
```

### Valores customizados

Quando precisar de valores específicos que não estão no tema:

```javascript
import { moderateScale, horizontalScale } from "../../../utils/responsive";

export const CustomBox = styled.View`
  width: ${horizontalScale(300)}px;
  height: ${moderateScale(150)}px;
`;
```

---

## Funções disponíveis

### Escalas principais

```javascript
import { 
  horizontalScale, 
  verticalScale, 
  moderateScale,
  fontScale 
} from '@/utils/responsive';
```

**horizontalScale(size)**
Escala baseada na largura da tela. Use para widths específicos.

```javascript
width: ${horizontalScale(200)}px;  // 200px no design base, escala proporcionalmente
```

**verticalScale(size)**
Escala baseada na altura da tela. Use para heights específicos.

```javascript
height: ${verticalScale(100)}px;
```

**moderateScale(size, factor = 0.5)**
Escala moderada - não escala demais. Use para espaçamentos e quando não quer escala muito agressiva.

```javascript
padding: ${moderateScale(16)}px;
margin: ${moderateScale(20)}px;
```

**fontScale(size)**
Escala específica para fontes, considera também a configuração de acessibilidade do dispositivo.

```javascript
font-size: ${fontScale(16)}px;
```

### Helpers de porcentagem

```javascript
import { wp, hp } from '@/utils/responsive';

// wp = width percentage
width: ${wp(80)}%;  // 80% da largura da tela

// hp = height percentage  
height: ${hp(50)}%;  // 50% da altura da tela
```

### Breakpoints

```javascript
import { isSmallDevice, isTablet, isLargeTablet, dimensions } from '@/utils/responsive';

// Usar condicionalmente
const padding = isTablet ? 32 : 16;

// Ou no styled component
padding: ${isTablet ? '32px' : '16px'};

// Verificar dimensões
console.log(dimensions.width);    // 390 (exemplo)
console.log(dimensions.isTablet);  // false
```

### Helpers de Plataforma

```javascript
import { isWeb, isMobile, isIOS, isAndroid } from '@/utils/responsive';

// isWeb - true quando é web/desktop
padding-top: ${isWeb ? 0 : theme.spacing.lg}px;

// isMobile - true quando é iOS ou Android
margin: ${isMobile ? '10px' : '20px'};

// isIOS - true quando é iOS
font-family: ${isIOS ? 'San Francisco' : 'Roboto'};

// isAndroid - true quando é Android
elevation: ${isAndroid ? 4 : 0};
```

### Tokens

```javascript
import { spacing, fontSize, borderRadius, componentHeight } from '@/utils/responsive';

// Spacing
spacing.xs    // 4px escalado
spacing.sm    // 8px escalado
spacing.md    // 12px escalado
spacing.lg    // 16px escalado
spacing.xl    // 20px escalado
spacing.xxl   // 24px escalado
spacing.xxxl  // 32px escalado

// Font sizes
fontSize.xs       // 10px escalado
fontSize.sm       // 12px escalado
fontSize.md       // 14px escalado
fontSize.lg       // 16px escalado
fontSize.xl       // 18px escalado
fontSize.xxl      // 20px escalado
fontSize.xxxl     // 24px escalado
fontSize.heading  // 28px escalado
fontSize.display  // 32px escalado

// Border radius
borderRadius.xs   // 4px escalado
borderRadius.sm   // 8px escalado
borderRadius.md   // 12px escalado
borderRadius.lg   // 16px escalado
borderRadius.xl   // 20px escalado
borderRadius.full // 999px escalado (círculo/pill)

// Component heights
componentHeight.button  // 56px escalado
componentHeight.input   // 56px escalado
componentHeight.card    // 180px escalado
componentHeight.header  // 60px escalado
```

---

## Tema

O sistema de tema (`src/theme/`) centraliza todos os valores de design. Sempre use o tema ao invés de valores hardcoded.

### Estrutura do Tema

```javascript
src/theme/
  ├── index.js        // Exportação centralizada
  ├── colors.js       // Paleta de cores (80+ cores)
  └── typography.js   // Sistema tipográfico
```

### Cores

```javascript
import { colors } from '../../theme';

// Cores principais
colors.primary          // #5A9FD4 (azul primário)
colors.primaryDark      // #2C5F7F
colors.primaryLight     // #7BB3E0

// Backgrounds (dark theme)
colors.background       // #0A1929
colors.backgroundCard   // #13202E
theme.colors.text.primary     // #333333
theme.colors.text.secondary   // #666666
theme.colors.text.light       // #999999
theme.colors.text.white       // #ffffff

// Backgrounds
theme.colors.background.primary    // #f8f8f8
theme.colors.background.secondary  // #ffffff
theme.colors.background.input      // #f5f5f5
theme.colors.background.disabled   // #cccccc

// Bordas
theme.colors.border.light     // #e0e0e0
theme.colors.border.medium    // #cccccc
theme.colors.border.dark      // #999999

// Estados
theme.colors.success   // #4caf50
theme.colors.warning   // #ff9800
theme.colors.error     // #f44336
```

### Font weights

```javascript
theme.fontWeight.regular   // '400'
theme.fontWeight.medium    // '500'
theme.fontWeight.semibold  // '600'
theme.fontWeight.bold      // '700'
```

### Sombras

```javascript
// Sombra pequena
shadow-color: ${theme.shadows.small.shadowColor};
shadow-offset: ${theme.shadows.small.shadowOffset.width}px ${theme.shadows.small.shadowOffset.height}px;
shadow-opacity: ${theme.shadows.small.shadowOpacity};
shadow-radius: ${theme.shadows.small.shadowRadius}px;
elevation: ${theme.shadows.small.elevation};

// Sombra média
${theme.shadows.medium.shadowColor}
// ...

// Sombra grande
${theme.shadows.large.shadowColor}
// ...
```

### Opacidade

```javascript
theme.opacity.disabled  // 0.6
theme.opacity.light     // 0.8
theme.opacity.medium    // 0.5
```

---

## Exemplos práticos

### Componente simples

```javascript
import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const Card = styled.View`
  background-color: ${theme.colors.background.secondary};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
  margin-bottom: ${theme.spacing.md}px;
`;

export const CardTitle = styled.Text`
  font-size: ${theme.fontSize.xl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm}px;
`;

export const CardDescription = styled.Text`
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  line-height: ${theme.fontSize.xl}px;
`;
```

### Componente com props dinâmicas

```javascript
import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const Badge = styled.View`
  background-color: ${props => 
    props.variant === 'success' ? theme.colors.success :
    props.variant === 'warning' ? theme.colors.warning :
    theme.colors.error
  };
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
  border-radius: ${theme.borderRadius.full}px;
`;

export const BadgeText = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.white};
`;
```

### Componente com valores customizados

```javascript
import styled from "styled-components/native";
import theme from "../../../styles/theme";
import { moderateScale, wp } from "../../../utils/responsive";

export const HeroImage = styled.Image`
  width: ${wp(100)}%;
  height: ${moderateScale(250)}px;
  border-radius: ${theme.borderRadius.lg}px;
`;

export const IconContainer = styled.View`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${theme.colors.primary};
  justify-content: center;
  align-items: center;
`;
```

### Screen completa

```javascript
import styled from "styled-components/native";
import theme from "../../styles/theme";
import { moderateScale } from "../../utils/responsive";

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background.primary};
`;

export const Header = styled.View`
  background-color: ${theme.colors.primary};
  padding: ${moderateScale(60)}px ${theme.spacing.xl}px ${theme.spacing.xxl}px;
  border-bottom-left-radius: ${theme.borderRadius.full}px;
  border-bottom-right-radius: ${theme.borderRadius.full}px;
`;

export const Title = styled.Text`
  font-size: ${theme.fontSize.display}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.sm}px;
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: ${theme.spacing.xl}px;
`;

export const Section = styled.View`
  margin-bottom: ${theme.spacing.xxl}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${theme.fontSize.xxl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg}px;
`;
```

### Lista com FlatList

```javascript
export const ListContainer = styled.FlatList`
  flex: 1;
  padding: ${theme.spacing.lg}px;
`;

export const ListItem = styled.TouchableOpacity`
  background-color: ${theme.colors.background.secondary};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
  margin-bottom: ${theme.spacing.md}px;
  shadow-color: ${theme.shadows.medium.shadowColor};
  shadow-offset: ${theme.shadows.medium.shadowOffset.width}px ${theme.shadows.medium.shadowOffset.height}px;
  shadow-opacity: ${theme.shadows.medium.shadowOpacity};
  shadow-radius: ${theme.shadows.medium.shadowRadius}px;
  elevation: ${theme.shadows.medium.elevation};
`;
```

### Botão com estados

```javascript
export const Button = styled.TouchableOpacity`
  background-color: ${props => 
    props.disabled ? theme.colors.background.disabled : theme.colors.primary
  };
  padding: ${theme.spacing.md}px ${theme.spacing.xl}px;
  border-radius: ${theme.borderRadius.md}px;
  opacity: ${props => props.disabled ? theme.opacity.disabled : 1};
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
`;
```

---

## Dimensões base

O sistema usa como referência um iPhone 11/12/13:
- Largura: 390px
- Altura: 844px

Todos os valores são escalados proporcionalmente baseados nestas dimensões.

## Quando usar cada escala

- **moderateScale**: Padrão para espaçamentos, paddings, margins
- **fontScale**: Sempre para fontes (já incluído nos tokens do tema)
- **horizontalScale**: Widths específicos
- **verticalScale**: Heights específicos
- **wp/hp**: Quando precisa de porcentagem da tela

## Quando usar helpers de plataforma

- **isWeb**: Para ajustes específicos de desktop/navegador
- **isMobile**: Para ajustes que afetam iOS e Android
- **isIOS**: Para ajustes específicos de iOS
- **isAndroid**: Para ajustes específicos de Android

**Exemplo prático:**
```javascript
import styled from "styled-components/native";
import theme from "../../styles/theme";
import { isWeb, isMobile } from "../../utils/responsive";

export const HeaderTop = styled.View`
  padding-top: ${isWeb ? 0 : theme.spacing.lg}px;
  shadow-opacity: ${isMobile ? 0.1 : 0};
`;
```

## Regra de ouro

Sempre use os tokens do tema primeiro. Só use as funções de escala diretamente quando precisar de um valor específico que não existe no tema.
