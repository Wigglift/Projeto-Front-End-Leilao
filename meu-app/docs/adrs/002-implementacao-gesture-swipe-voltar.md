# 002: Implementação de Gesture Swipe para Voltar

## Status

- Aceito

## Contexto

O aplicativo BidLive é um projeto acadêmico de leilões mobile desenvolvido com React Native e Expo. Durante a análise de melhorias de experiência do usuário, identificou-se a ausência de gestos nativos mobile que são esperados em aplicativos modernos.

A navegação atual depende exclusivamente de botões visuais para retornar às telas anteriores. Embora funcional, esta abordagem não aproveita os padrões de interação que usuários de dispositivos móveis já conhecem e utilizam diariamente em outros aplicativos. Em plataformas iOS, o gesto de arrastar da borda esquerda da tela para voltar é nativo do sistema operacional e amplamente utilizado. Em Android, este padrão também tem se tornado cada vez mais comum.

O projeto possui características específicas que influenciam as decisões de implementação. Por ser um projeto acadêmico, os dados são estáticos e provêm de endpoints mockados, não havendo leilões ocorrendo em tempo real. O escopo e o tempo disponível para desenvolvimento são limitados, exigindo foco em funcionalidades que demonstrem conhecimentos técnicos de forma efetiva sem adicionar complexidade desnecessária.

Durante a fase de planejamento, diversos gestos mobile foram considerados como candidatos para implementação: swipe para voltar, pull to refresh para atualizar dados, swipe horizontal para navegar entre fotos de produtos, long press para ações rápidas como favoritar e compartilhar, e pinch to zoom para ampliar imagens. Cada um destes gestos foi avaliado considerando o contexto acadêmico do projeto e o valor que agregaria à experiência do usuário.

O gesto pull to refresh, embora extremamente útil em aplicativos com dados dinâmicos, não se justifica em um contexto onde os dados são estáticos. Sua implementação adicionaria complexidade sem trazer benefício real para os usuários ou valor demonstrável para fins acadêmicos. Similarmente, o swipe horizontal entre fotos pressupõe a existência de galerias de múltiplas imagens por produto, funcionalidade que a API atual não fornece. Os gestos de long press e pinch to zoom, embora úteis, foram considerados secundários em relação à necessidade principal de melhorar a fluidez da navegação.

A biblioteca React Navigation, já utilizada no projeto, oferece suporte nativo para o gesto de swipe para voltar. Esta funcionalidade está disponível através de configurações simples e é mantida pela comunidade, garantindo compatibilidade e performance otimizada. A alternativa seria implementar um gesture handler customizado utilizando react-native-gesture-handler diretamente, o que proporcionaria maior controle mas também maior complexidade de desenvolvimento e manutenção.

## Decisão

Vamos implementar o gesto de swipe para voltar utilizando o suporte nativo do React Navigation. Esta implementação será aplicada às telas secundárias do aplicativo: AuctionDetails e Profile. A tela Home, por ser a tela principal da aplicação, não terá o gesto habilitado, mantendo consistência com padrões de navegação mobile onde telas raiz não possuem ação de voltar.

A configuração será realizada no arquivo App.jsx através das opções do Stack.Navigator. Habilitaremos a propriedade gestureEnabled globalmente através de screenOptions, permitindo que todas as telas herdem esta configuração por padrão. A propriedade fullScreenGestureEnabled também será habilitada para garantir que o gesto funcione adequadamente em dispositivos Android. A animação será configurada como slide_from_right para proporcionar uma transição visual suave e natural.

Para a tela Home especificamente, sobrescreveremos a configuração global definindo gestureEnabled como false em suas options. Isto previne que usuários tentem voltar de uma tela que conceitualmente não possui tela anterior. As telas de autenticação (Login, SignUp) e telas iniciais (Splash, Welcome) manterão seus comportamentos atuais sem modificações, pois representam fluxos lineares onde o gesto de voltar não é aplicável ou desejado.

Esta abordagem utiliza código nativo do React Navigation, evitando a necessidade de implementação customizada de gesture handling. O React Navigation já gerencia corretamente potenciais conflitos entre o gesto de swipe e o scroll vertical das telas, ativando o gesto apenas quando o toque inicia na borda esquerda da tela. Esta é uma solução testada e validada pela comunidade, reduzindo riscos de bugs e comportamentos inesperados.

## Consequências

A implementação do gesto de swipe para voltar traz melhorias significativas à experiência do usuário. A navegação entre telas se torna mais fluida e natural, permitindo que usuários retornem rapidamente à tela anterior através de um movimento intuitivo. Isto é particularmente relevante no contexto de um aplicativo de leilões, onde usuários frequentemente navegam entre múltiplos leilões para comparar produtos e valores.

O aplicativo passa a seguir convenções estabelecidas de plataformas mobile, criando uma sensação de profissionalismo e qualidade. Usuários de iOS reconhecerão imediatamente o padrão familiar do sistema operacional, enquanto usuários de Android que utilizam aplicativos modernos também estarão familiarizados com este tipo de interação. Não há necessidade de explicar ou ensinar o gesto aos usuários, pois ele segue padrões já internalizados.

Do ponto de vista de manutenção de código, a solução é vantajosa por utilizar funcionalidade nativa do React Navigation. Bugs e melhorias são gerenciados pela biblioteca oficial, reduzindo a carga de manutenção da equipe de desenvolvimento. Atualizações futuras do React Navigation trarão automaticamente otimizações e correções para o gesture handling.

A performance do aplicativo não é negativamente impactada. As animações são otimizadas pelo próprio React Navigation e o gesture handling é eficiente, não causando lag ou travamentos. O overhead computacional é mínimo e não perceptível aos usuários.

Existem algumas limitações na abordagem escolhida. A customização da animação e do comportamento do gesto é limitada às opções fornecidas pelo React Navigation. Não temos controle granular sobre aspectos como a sensibilidade do gesto ou a distância necessária para completar a ação de voltar. Estas limitações, entretanto, não são problemáticas no contexto do projeto, pois os padrões default do React Navigation são adequados e bem calibrados.

Usuários menos familiarizados com gestos mobile, particularmente alguns usuários Android, podem não descobrir espontaneamente esta funcionalidade. Este risco é mitigado pelo fato de que o botão visual de voltar permanece disponível e funcional. O gesto é uma adição complementar à navegação, não uma substituição dos métodos tradicionais.

Em um cenário futuro onde implementássemos carrosséis de imagens com swipe horizontal, seria necessário avaliar e possivelmente ajustar as áreas de ativação dos gestos para evitar conflitos. O React Navigation gerencia isto automaticamente na maioria dos casos, mas configurações adicionais podem ser necessárias dependendo da implementação específica. No estado atual do projeto, onde não há carrosséis implementados, este não é um problema.
