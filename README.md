# <center>G.A.T BOT</center>
## <center>Automação de gestão e administração de tarefas para grupos de whatsapp.</center>
<h4>

- Versão: 1.0.0 (Em Desenvolvimento).

- API: Baileys

- Equipe: AxiomMind Tecnology
</h4>

____

### FUNÇÕES:

>#### #Codigo padronizado para criação de comandos para a automação.

```JavaScript
const { PREFIX } = require("../../config");

module.exports = {
    name: 'Nome do comando',
    description: 'Descrição do comando',
    commands: ['comando1', 'comando2', 'comando3'],
    usage: `${PREFIX}comando`,
    handle: async ({/*FUNÇÃO*/}) => {

        //CÓDIGO + ARGUMENTO DA FUNÇÃO

    }
}
```



|FUNÇÃO|<center>DETALHES</center>|<center>ARGUMENTO</center>|
|-|:-|:-:|
|`` sendText `` | _Envia uma mensagem de texto com o emoji do bot._ | ``sendText`` ("mensagem de texto"); |
|`` sendRaply `` | _Envia uma mensagem de texto com o emoji do bot, citando a mensagem recebida._ |``sendRaply`` ("mensagem de texto");|
|`` sendReact ``|_Envia uma reação a uma mensagem._| ``sendReact``( "emoji", "key" ); |
|`` sendSuccessReact ``| _Envia uma reação de sucesso padrão._ |<center> - </center>|
|`` sendErrorReact ``| _Envia uma reação de erro padrão._ | <center> - </center>|
|`` sendWaitReact ``| _Envia uma reação de espera padrão._ | <center> - </center>|
|`` sendWarningReact ``| _Envia uma reação de aviso padrão._ | <center> - </center>|
|`` sendSuccessReply ``| _Envia uma mensagem de sucesso com reação de sucesso, citando a mensagem recebida._ | ``sendSuccessReply``("mensagem de texto"); |
|`` sendErrorReply ``| _Envia uma mensagem de erro com reação de erro., citando a mensagem recebida._ |``sendErrorReply``("mensagem de texto");|
|`` sendWaitReply ``| _Envia uma mensagem de espera com reação de espera, citando a mensagem recebida._ |``sendWaitReply``("mensagem de texto");|
|`` sendWarningReply ``| _Envia uma mensagem de aviso com reação de aviso, citando a mensagem recebida._|``sendWarningReply``("mensagem de texto");|
|`` sendStickeFromFile ``| _Envia um adesivo a partir de um caminho de arquivo._ |``sendStickeFromFile``("caminho do arquivo");|
|`` sendImageFromFile ``| _Envia uma imagem a partir de um caminho de arquivo._ |``sendImageFromFile``("caminho do arquivo");|
---
### SOBRE
####  *BIBLIOTECAS:*

- [<h3>Baileys</h3>](https://github.com/WhiskeySockets/Baileys)
    - _Alternativa que não requer que o Selenium ou qualquer outro navegador seja interface com o WhatsApp Web_
    - ``` npm install @WhiskeySockets/Baileys```
- [<h3>Pino</h3>](https://github.com/pinojs/pino)
  - _É uma ferramenta de registro muito popular e estabelecida há muito tempo, com mais de 10,9 mil estrelas do Github e milhões de downloads no npm._
  - ``` npm install pino```
- [<h3>QRCode-Terminal</h3>](https://github.com/gtanner/qrcode-terminal)
  - _Essas bibliotecas fornecem APIs simples para analisar e ler QR Codes de imagens e fontes de vídeo._
  - ``` npm install qrcode-terminal```