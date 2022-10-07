const express = require('express');
const app = express();
const nw = require('niby-welcomes');
const Canvas = require('canvas');
const {Buffer} = require('node:buffer');
const wel = require('./canvasEngine/Welcome');
app.use(express.urlencoded({
extended: true
}));

app.get("/", (req, res) => {
	res.send(`<body><iframe src='https://darkguybot.github.io/docs'></iframe></body>`)
})

app.get("/welcome", async (req, res) => {
	let sp = req.query;
console.log(sp)
let lienzo = await new wel()
	.setGuildName(sp.guild)
  .setAvatar(sp.avatar)
  .setBackground(sp.background)
  .setUsername(sp.username)
	.setDiscriminator(sp.discriminator)
	.toAttachment();
// https://MyApiForDG.k1a.repl.co?guild=DarkGuy&avatar=https://cdn.discordapp.com/avatars/838091364344397835/73a8a7867455ecc991b810a41f37c9a8.jpg&background=https://media.discordapp.net/attachments/921798413547352065/973120096664973332/442432.jpg&username=K1&discriminator=1960		
	res.json({
		img: Buffer.from(lienzo.toBuffer(), 'utf8')
	})
});

app.get('/niby-koya', async (req, res) => {
	try {
	let r = req.query;

	let img = await new nw.Welcome()
	.setUsername(r.username, { color: "#ffffff" })
	.setWelcomeMessage(r.message)
	.setAvatar(r.avatar)
	.setBackgroundUrl(r.background)
	.setBorder(r.border === "true" ? true : false)
  .setStyle('koya')
	.setMemberCount(`Eres el miembro #${r.count}`);

	//console.log(await img.build());
	res.json(await img.build());
	} catch (_) { 
		console.log(_);
	}
});
	
app.listen(0202, () => console.log('Online'));
