const { prefix, token } = require('./config.json');
// Include saveInterval when reimplementing currency ^
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');
const cooldowns = new Discord.Collection();
// const userCurrency = new Discord.Collection();

console.log('Starting bot...');

// Load in all commands
console.log('\tLoading commands...');
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
console.log('\tCommands loaded.');

// Holy hell, I went about implementing this currency bit in a terrible way.
// Probably going to rip it out

// Check if currency file exists, create it if not
// console.log('\tLooking for currency file...');
// try {
// 	fs.accessSync('currency.json', fs.constants.F_OK);
// 	console.log('\tFound currency file.');
// }
// catch (e) {
// 	console.log('\tCurrency file not found, creating it now...');
// 	try {
// 		fs.writeFileSync('currency.json', '');
// 		console.log('\tCreated currency file.');
// 	}
// 	catch (err) {
// 		console.log('\tFailed to create currency file ', err);
// 	}
// }

// Load currency
// console.log('\tLoading currency file...');
// const rawCurrency = fs.readFileSync('currency.json');
// if (rawCurrency.toString('hex') == '') {
// 	console.log('\tCurrency file empty.');
// }
// else {
// 	const readCurrency = JSON.parse(rawCurrency);
// 	for (const user of readCurrency.users) {
// 		userCurrency.set(user.name, user.currency);
// 	}
// 	console.log('\tCurrency file loaded.');
// }

// Definitions for currency functions
// function addCurrency(user, amount) {
// 	userCurrency.set(user, amount);
// }

// function saveCurrency() {
// 	// The way this is currently written doesn't properly work.
// 	// Need to save the json file such that there is a user object with each user and their currency amount
// 	// Or, find a way to read the json file so that each user is an object with a currency amount
// 	const newRawCurrency = JSON.stringify(userCurrency);
// 	try {
// 		fs.writeFileSync('currency.json', newRawCurrency);
// 		console.log('Saved currency file.');
// 	}
// 	catch (e) {
// 		console.log('Failed to write currency file back ', e);
// 	}
// }

// Events
console.log('\tLoading events...');
client.on('ready', () => {
	console.log(`\tLogged in as ${client.user.tag}!`);
	console.log('Finished loading!');
	// Save currency every 1 minute
	// setInterval(saveCurrency, saveInterval * 60 * 1000);
});

client.on('message', msg => {
	// Command needs to start with prefix
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}> |\\${prefix})\\s*`);
	if (!prefixRegex.test(msg.content) || msg.author.bot) {
		// Auto dogan
		if (msg.author.id === '182615528383184896') {
			if (Math.floor(Math.random() * 20) == 1) {
				msg.react('268177866926194690');
			}
		}

		// if (Math.floor(Math.random() * 2) == 1) {
		// 	const randAmount = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
		// 	addCurrency(msg.author.tag, randAmount);
		// 	saveCurrency();
		// }

		return;
	}

	// Get command args and command name
	const [, matchedPrefix] = msg.content.match(prefixRegex);
	const args = msg.content.slice(matchedPrefix.length).split(/ +/);
	const commandName = args.shift();

	// Get the actual command object, check if it exists
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) {
		return 'That command does not exist!';
	}

	// Check if command needs to be sent in a server
	if (command.guildOnly && msg.channel.type !== 'text') {
		return msg.reply('I can\'t execute that command in a DM.');
	}

	// Check if args are required
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${msg.author}.`;

		if (command.usage) {
			reply += `\nProper usage: "${prefix}${command.name} ${command.usage}"`;
		}

		return msg.channel.send(reply);
	}

	// Execute command
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown) * 1000;

	if (!timestamps.has(msg.author.id)) {
		timestamps.set(msg.author.id, now);
		setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
	}
	else {
		const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return msg.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before using the ${command.name} command.`);
		}

		timestamps.set(msg.author.id, now);
		setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
	}

	try {
		command.execute(msg, args);
	}
	catch (error) {
		console.error(error);
		msg.reply('there was an error executing the command. :(');
	}
});

client.on('disconnect', () => {
	console.log('bye bitch');
});

/* client.on('typingStart', (channel, user) => {
	// console.log(`${user.id} started typing`);

	if (user.id === '182615528383184896') {
		channel.send('Stop typing, Chris');
	}
}); */

// channel.startTyping/stopTyping
console.log('\tEvents loaded.');
console.log('\tLogging in...');
client.login(token);