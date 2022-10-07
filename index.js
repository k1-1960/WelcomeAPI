const express  = require('express');
const nw       = require('niby-welcomes');
const {Buffer} = require('node:buffer');

const app = express();

app.use(express.urlencoded({
extended: true
}));

app.get("/", (req, res) => {
	res.send(`<body><iframe src='https://darkguybot.github.io/docs'></iframe></body>`);
});

app.get('/niby-koya', async (req, res) => {
	try {
  	let query = req.query;
    
  	let img = await new nw.Welcome()
  	.setUsername(query.username || 'User', { color: "#ffffff" })
	  .setWelcomeMessage(query.message)
  	.setAvatar(query.avatar)
  	.setBackgroundUrl(query.background)
  	.setBorder(query.border === "true" ? true : false)
    .setStyle('koya')
  	.setMemberCount(`Eres el miembro #${query.count || 0}`);

  	res.json(await img.build());
	} catch (_) { 
		console.log(_);
	}
});
	
app.listen(process.env.PORT || 3434, () => console.log('Server on port', process.env.PORT || 3434));
