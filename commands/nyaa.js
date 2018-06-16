const messages = [
	'•~• Nyaaw rubs onii chan\'s bulge quietly moans onii chaan last night was so much fun •w•~I loved the part where we had anal : 3 uwu randomly starts deepthroating you Nyaa~your cock is so tasty onii~chan give me your cummies I want to taste them I want you inside me~Go in onii - chan give me your cummies~ ; 3',
	'The ting goes uwaaa! Nya nya nya nya~! : 3 Kyakun-nya-nya, and a pyon-pyon-purr-nyaa Skyaaaaa~~~ Nya-nya-meow-meow-purr-purr Pyan, pyan!!! You don\'t knyaaw~big paw : 3',
	'The YiffnessGram™ Furry Test is a multistage knot capacity test that progressively gets more difficult as it continues. The 200 pound bara furry test will begin in 30 nyas. Line up at the cage doors. The breeding speed starts slowly, but gets faster each minute after you hear this signal. [nyaa!!~<33] A single nya should be completed each time you hear this sound. [prrrr~] Remember to yiff in a fursuit, and yiff as long as possible. The second time you fail to complete a whole yiff before the nya, your furry ass is over. The test will begin on the word meow. On your bark, get yiffy, meow!!~',
];

module.exports = {
	name: 'nyaa',
	description: 'NYAAA~~~~~',
	args: false,
	guildOnly: true,
	execute(message, args) {
		message.channel.send(`${messages[Math.floor(Math.random() * messages.length)] }`);
	},
};