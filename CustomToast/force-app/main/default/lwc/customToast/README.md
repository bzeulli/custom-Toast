# customToast LWC

## Overview

`customToast` é um componente Lightning Web Component (LWC) genérico para exibição de mensagens toast personalizadas na plataforma Salesforce. Ele foi projetado para ser reutilizável e flexível, servindo como base para a criação de notificações visuais em outros componentes LWC.

## Principais Características

- Suporte a diferentes posições na tela (top, bottom, center, etc).
- Personalização de cor, tamanho, fonte e ícone.
- Suporte a mensagens persistentes ou temporizadas.
- Possibilidade de exibir ícones customizados.
- Suporte a animações de entrada e saída.
- API pública para exibir e limpar toasts.

## Como Usar

1. **Inclua o componente em seu HTML:**
    ```html
    <c-custom-toast></c-custom-toast>
    ```

2. **Chame o método `show` no JS do seu componente pai:**
    ```javascript
    const toast = this.template.querySelector('c-custom-toast');
    toast.show({
        message: 'Mensagem de exemplo!',
        position: 'bottom-center',
        duration: 4000,
        backgroundColor: '#29b6f6',
        showIcon: true,
        iconOptions: { name: 'iconInfo', color: '#fff' },
        fontOptions: { color: '#fff', size: '16px', weight: 'bold' }
    });
    ```

3. **Opções Disponíveis:**
    - `message`: Texto da mensagem.
    - `position`: Posição do toast na tela (`top-right`, `bottom-center`, etc).
    - `duration`: Tempo de exibição em milissegundos.
    - `backgroundColor`: Cor de fundo.
    - `width`, `height`: Tamanho do toast.
    - `persist`: Se `true`, o toast permanece até ser fechado manualmente.
    - `showIcon`: Exibe um ícone.
    - `iconOptions`: Personalização do ícone (`name`, `color`, `width`, `height`).
    - `fontOptions`: Personalização da fonte (`color`, `size`, `weight`).

4. **Exemplo de uso com loading:**
    ```javascript
    toast.showLoading({
        message: 'Carregando...',
        position: 'top-center',
        backgroundColor: '#888'
    });
    ```

## Recomendações

- Sempre inclua `<c-custom-toast>` no template do componente que irá disparar o toast.
- Utilize o método `clearToast()` para remover manualmente o toast, se necessário.
- Consulte o código fonte para mais opções de personalização.
- Caso precise utilizar mais de um toast ao mesmo tempo ou configurações personalizadas diferentes, use dois ou mais componentes de toast e os diferencia por Id ou classe no template.

---

Este componente é fundamental para padronizar e facilitar a experiência de notificações em aplicações Salesforce LWC.
