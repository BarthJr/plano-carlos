# Website Plano de Marketing Local - Pedreiro Carlos

## 📋 Descrição
Website one-page responsivo em português brasileiro para apresentar o Plano de Marketing Local do Pedreiro Carlos em Itanhaém/SP. Desenvolvido com design profissional, gráficos interativos e funcionalidade de impressão em PDF.

## 🎨 Características do Design
- **Paleta de cores**: Cinza escuro (#111827), Teal (#0FA3B1), Laranja CTA (#F39C12), Branco
- **Tipografia**: Títulos ≥36px, corpo ≥18px, fonte Segoe UI
- **Layout**: Totalmente responsivo (desktop, tablet, mobile)
- **Impressão**: CSS otimizado para impressão A4 (fonte 12-14pt)

## 📊 Funcionalidades
- ✅ 15 seções completas conforme especificação
- ✅ Gráficos interativos com Chart.js (barras horizontais, pizzas circulares)
- ✅ Botão WhatsApp fixo com QR Code
- ✅ Funcionalidade de download PDF (impressão)
- ✅ Animações suaves e efeitos hover
- ✅ Design responsivo para todos os dispositivos
- ✅ Botão "voltar ao topo" automático

## 🗂️ Estrutura de Arquivos
```
pedreiro-carlos-website/
├── index.html          # Arquivo principal HTML
├── css/
│   ├── styles.css      # CSS principal responsivo
│   └── print.css       # CSS para impressão A4
├── js/
│   ├── charts.js       # Gráficos Chart.js
│   └── main.js         # JavaScript principal
├── images/             # Pasta para imagens (vazia)
└── README.md           # Esta documentação
```

## 🚀 Como Usar

### 1. Hospedagem
- Faça upload de todos os arquivos para seu servidor web
- Certifique-se de manter a estrutura de pastas
- O arquivo `index.html` deve estar na raiz

### 2. Personalização do WhatsApp
Edite o arquivo `js/main.js` e altere as configurações:
```javascript
const CONFIG = {
    whatsappNumber: '5513999999999', // ALTERE AQUI: seu número com código do país
    whatsappMessage: 'Olá! Vi o Plano de Marketing Local e gostaria de implementar em 7 dias. Vamos conversar?'
};
```

### 3. Funcionalidades Principais

#### Botão WhatsApp
- Botão fixo no canto inferior direito
- QR Code no hero section
- Abre WhatsApp Web (desktop) ou app (mobile)

#### Download PDF
- Botão no canto superior direito
- Usa funcionalidade de impressão do browser
- CSS otimizado para formato A4

#### Gráficos Interativos
- Dados baseados em pesquisa de mercado real
- Tooltips informativos ao passar o mouse
- Animações suaves de entrada

## 📱 Responsividade
- **Desktop**: Layout completo com 3 colunas
- **Tablet**: Layout adaptado com 2 colunas
- **Mobile**: Layout em coluna única
- **Impressão**: Otimizado para A4 com fonte legível

## 🎯 Seções Implementadas
1. Hero com CTA e QR Code
2. Sumário Executivo (4 cards)
3. Onde procuram primeiro (gráfico barras)
4. Confiança por canal (gráfico barras)
5. Conversão por canal (gráfico barras)
6. CPL por canal (gráfico barras)
7. Insights práticos (6 cards)
8. Concorrência local (grid de cards)
9. Palavras-chave & anúncios (clusters)
10. Plano de 90 dias (timeline)
11. Orçamento mensal (3 gráficos pizza + custos)
12. Funil & KPIs (gráfico + tabela)
13. Riscos & sazonalidade (cards)
14. Métricas & instrumentação (4 cards)
15. CTA final com garantia

## 🔧 Tecnologias Utilizadas
- **HTML5**: Estrutura semântica
- **CSS3**: Flexbox, Grid, animações, media queries
- **JavaScript ES6+**: Funcionalidades interativas
- **Chart.js**: Gráficos interativos
- **QRCode.js**: Geração de QR Code
- **Responsivo**: Mobile-first design

## 📞 Suporte Técnico
Para dúvidas sobre implementação ou personalização, consulte a documentação das bibliotecas utilizadas:
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [QRCode.js Documentation](https://github.com/davidshimjs/qrcodejs)

## 🎨 Customização de Cores
Para alterar as cores, edite as variáveis CSS no arquivo `css/styles.css`:
```css
:root {
    --primary-dark: #111827;    /* Cinza escuro */
    --primary-teal: #0FA3B1;    /* Teal */
    --primary-orange: #F39C12;  /* Laranja CTA */
    --primary-white: #ffffff;   /* Branco */
}
```

## ✅ Checklist de Implementação
- [ ] Alterar número do WhatsApp no arquivo `js/main.js`
- [ ] Testar em diferentes dispositivos
- [ ] Verificar funcionalidade de impressão
- [ ] Configurar domínio e hospedagem
- [ ] Testar todos os botões e links
- [ ] Verificar carregamento dos gráficos

---

**Desenvolvido com foco em conversão e experiência do usuário** 🚀

