# Api simple de bienvenidas para replit (Funcional con canvas)
> Usa [**niby-welcomes**](https://www.npmjs.com/package/niby-welcomes)
>> **🚨:warning: Todo el codigo mostrado en este README se usa en tu bot, no en la API. :warning:🚨**

Hola, para la mayoría es un hecho de que trabajar con canvas puede ser estresante e incluso en algunos casos imposible técnicamente.

Por ello, he decidido hacer publico esta "API" si se pudiera decir así, para crear tarjetas de bienvenidas con el modulo [niby-welcomes](https://www.npmjs.com/package/niby-welcomes), este mismo nos da la posibilidad de crear tarjetas de bienvenida muy lindas al estilo del amadisimo Koya.

## ¿Por que usar esto?
Bueno, cuando yo quise usar canvas en Android no podia, debido a que este sistema operativo no era compatible con canvas, y si, niby-welcomes también depende de canvas.

Por lo que una buena opción era crear una API en un host externo (como replit) y usar esta misma para recibir un buffer de la imagen y ya solo tendria que codificarla con algún constructor.

Obviamente no todo fue color de rosa, tarde un poco en comprender como funcionaban los Buffer y hacer un constructor para JavaScript y así poder usar la API aún más fácilmente.


## Constructor

Si, también daré el constructor, de hecho, es una clase:
```js
const http = require('superagent');
const {Buffer} = require('node:buffer');

require('dotenv').config();

const Welcome_Api = "Url.de-la-api-generada-por-tu.host/niby-koya";

module.exports = class Welcome {
  constructor () {
    this.query = {};
  }
  
  setMessage (message) {
    this.query.message = message;
    return this;
  }
  
  setUsername (username) {
    this.query.username = username;
    return this;
  }
  
  setBackground (url) {
    this.query.background = url;
    return this;
  }
  
  setAvatar (url) {
    this.query.avatar = url;
    return this;
  }
  
  setBorder (bool) {
    this.query.border = ['true','false'].includes(bool) ? bool : 'false';
    return this;
  }
  
  setCount (count) {
    this.query.count = count;
    return this;
  }
  
  async getBuffer (cb) {
    const {body} = await http.get(Welcome_Api)
    .query(this.query);
    
    if (body) {
      return cb(Buffer.from(body.data));
    } else {
      return false;
    }
  }
};
```

### ¿como usarla?
Este sería el ejemplo de un index.
```js
// Debemos requerir el archivo donde hemos hecho la clase/constructor
const WelcomeBuilder = require('./mi/archivo.js');

// Pedimos lo necesario a discord.js
const { Client, IntentsBitField, AttachmentBuilder } = require('discord.js');

// Creamos nuestro client.
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages
  ]
});

// hacemos un evento "guildMemberAdd" en donde recibimos un objeto member como parametro.
client.on('guildMemberAdd', async (member) => {
  const servidor = "Id del servidor";
  const welcome_channel_id = "Id del canal";
  const background = "Url de la imagen de fondo";
  
  // Si el servidor no es el del id específicado, no hace nada.
  if (member.guild.id !== servidor) return;
  
  // Buscando canal, si no existe, no hace nada.
  const welcome_channel = client.guilds.cache.get(servidor).channels.cache.get(welcome_channel_id);
  if (!welcome_channel) return;

  // creamos la imagen.
  new WelcomeBuilder()
  .setUsername(member.user.tag) // Establecemos el nombre del usuario
  .setMessage('Bienvenid@!') // El titulo de la tarjeta/imagen
  .setBackground(background) // Fondo de la imagen
  .setAvatar(member.user.displayAvatarURL({
      extension: 'png', size: 1024           // Avatar del usuario.
  }))
  .setCount(member.guild.memberCount)  // Conteo de miembros.
  .getBuffer(async (buffer) => {  // Obtenemos el buffer
    // Creamos el attachment.
    let card = new AttachmentBuilder(buffer, {
      name: `welcome-to-${member.user.tag}.jpg`
    });
      
    try {
      // creamos un objeto con estructura de mensaje de Discord.
      let message = {
        files: [card]  // añadimos la imagen como un archivo.
      };

      welcome_channel.send(message); // lo enviamos.
    } catch (error) {
      console.log(error);
      return;
    }
  });
});

client.login('tu-token-super-secreto');
```

### Si tienes algún problema y/o duda respecto a esto, no dudes en contactarme por Discord, me encuentras como [K1#1960](https://discord.com/users/838091364344397835) o como [@ImK1_1960](https://twitter.com/ImK1_1960) en Twitter.
