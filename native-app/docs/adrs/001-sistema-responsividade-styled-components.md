# 001: Sistema de Responsividade com Styled Components

## Status

- Aceito

## Contexto

O aplicativo de leilão precisa funcionar em múltiplos dispositivos com tamanhos de tela variados, desde smartphones pequenos até tablets. Inicialmente, os componentes utilizavam valores fixos (hardcoded) para tamanhos de fonte, espaçamentos e dimensões de componentes, o que resultava em uma experiência inconsistente entre diferentes dispositivos.

Os principais problemas identificados foram:

1. Valores de pixel fixos não escalavam proporcionalmente em telas maiores ou menores.
2. Componentes pareciam desproporcionais em tablets, com muito espaço vazio ou elementos muito pequenos.
3. Fontes ficavam pequenas demais em dispositivos grandes e potencialmente grandes demais em dispositivos pequenos.
4. Cores e tokens de design estavam espalhados pelos arquivos de estilo, dificultando manutenção e consistência visual.
5. Não havia um sistema centralizado para gerenciar o tema visual da aplicação.

A aplicação já utilizava styled-components/native para estilização, mas sem aproveitar seus recursos de forma eficiente para criar uma experiência verdadeiramente responsiva. Era necessário implementar uma solução que escalasse automaticamente os elementos da interface baseado nas dimensões da tela do dispositivo, mantendo as proporções do design original.

## Decisão

Vamos implementar um sistema completo de responsividade utilizando a Dimensions API do React Native em conjunto com o styled-components já existente no projeto. Este sistema será composto por duas partes fundamentais:

Primeiro, criaremos um módulo de responsividade (`src/utils/responsive.js`) que fornecerá funções de escala baseadas nas dimensões da tela. Definiremos um design base usando as dimensões do iPhone 11/12/13 (390x844px) como referência, e todas as escalas serão calculadas proporcionalmente a partir desta base. O módulo exportará funções como `moderateScale`, `horizontalScale`, `verticalScale` e `fontScale`, além de helpers prontos para uso como tokens de `spacing`, `fontSize` e `borderRadius` já calculados.

Segundo, estabeleceremos um sistema de tema centralizado (`src/styles/theme.js`) que consumirá os valores responsivos e organizará todos os tokens de design da aplicação. Este tema incluirá paletas de cores completas, tamanhos de fonte escalados, espaçamentos padronizados, definições de sombra para as três plataformas, e alturas padrão de componentes. O tema será importado diretamente nos arquivos de estilo, sem necessidade de Context API neste momento.

Vamos atualizar todos os componentes existentes em `src/components/styleds/` para utilizar os valores do tema ao invés de valores hardcoded. Cada componente passará a referenciar `theme.spacing.lg`, `theme.fontSize.xl`, `theme.colors.primary` e assim por diante. Para casos específicos onde os tokens do tema não são suficientes, as funções de escala estarão disponíveis para uso direto.

Adotaremos a estratégia de escala moderada (`moderateScale`) como padrão para espaçamentos e elementos de UI, pois ela aplica um fator de moderação que evita que os elementos escalem de forma muito agressiva em telas grandes. Para fontes, utilizaremos `fontScale` que considera também as configurações de acessibilidade do dispositivo.

## Consequências

**Consequências Positivas:**

A experiência do usuário será consistente em todos os tamanhos de dispositivo. Um usuário em um iPhone SE terá a mesma experiência proporcional que um usuário em um iPad, com todos os elementos escalando de forma harmoniosa. O aplicativo parecerá nativo em qualquer dispositivo, sem elementos desproporcionais.

A manutenção do código será significativamente simplificada. Todas as cores, espaçamentos e tamanhos estarão centralizados no tema. Mudanças visuais globais, como ajustar o tamanho padrão de fonte ou modificar a cor primária, serão feitas em um único lugar e refletidas automaticamente em toda a aplicação.

A consistência visual será garantida através dos tokens de design. Desenvolvedores não precisarão mais decidir entre usar "14px" ou "16px" para um texto secundário - eles simplesmente usarão `theme.fontSize.md`. Isso reduz decisões arbitrárias e mantém a linguagem visual coesa.

O código dos componentes ficará mais legível e autoexplicativo. Ao invés de ver `font-size: 16px`, veremos `font-size: ${theme.fontSize.lg}px`, o que comunica melhor a intenção do tamanho (grande, não apenas 16 pixels).

Novos desenvolvedores terão mais facilidade para contribuir. A documentação em `docs/responsividade.md` fornece exemplos práticos de como criar novos componentes seguindo os padrões estabelecidos. O sistema é intuitivo e não requer conhecimento profundo de cálculos responsivos.

**Consequências Negativas:**

Há um pequeno overhead de performance devido aos cálculos de escala, porém este overhead é negligível. Os cálculos acontecem apenas uma vez durante a inicialização dos componentes, não em cada render.

A implementação de temas dinâmicos (como dark mode) futuramente exigirá refatoração para utilizar ThemeProvider do styled-components ao invés de importação direta. Esta foi uma decisão consciente para manter simplicidade inicial, mas representa débito técnico para quando essa funcionalidade for necessária.

Desenvolvedores precisarão aprender e seguir os novos padrões. Há uma curva de aprendizado pequena para entender quando usar tokens do tema versus funções de escala diretamente. A documentação mitiga isso, mas ainda requer disciplina da equipe.

Componentes de terceiros ou exemplos da comunidade não seguirão automaticamente este padrão e precisarão ser adaptados. Copiar e colar código de exemplos externos exigirá um passo extra de conversão para usar nosso sistema de tema.

O bundle da aplicação aumentará ligeiramente devido ao código adicional do sistema de responsividade e tema. Este aumento é mínimo (alguns KB) e o benefício em manutenibilidade e experiência do usuário compensa amplamente.
