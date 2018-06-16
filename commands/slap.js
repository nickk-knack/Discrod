const items = ['a giant fish',
	'a frying pan',
	'a whip',
	'a fuckin\' cock',
	'a dildo',
	'his 5.3 inch dick',
	'a shoe',
	'a used napkin',
	'a mexican midget',
	'a rubber chicken',
	'my Runescape girlfriend',
	'an STD',
	'a condom',
	'aaron\'s dong',
	'a pair of flip flops',
	'a wet noodle',
	'a single potato chip',
	'a flatbill',
	'a trout',
	'my big ol\' wang',
	'a classy cocaine purse',
	'a scientology pamphlet',
	'Regina\'s dead body'];

module.exports = {
	name: 'slap',
	description: 'Virtually slaps a user',
	usage: '<user>',
	args: true,
	guildOnly: true,
	cooldown: 1,
	execute(message, args) {
		const user = args[0];
		args.shift();
		let item = items[Math.floor(Math.random() * items.length)];
		if (args[0]) {
			// get rest of args, concat into string, make that the thing to slap with
			item = args.join(' ');
		}

		message.channel.send(`*slaps ${user} with ${item}!*`);
	},
};