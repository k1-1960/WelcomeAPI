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
