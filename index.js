// const { prefix, token } = require('./config.json');
require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');
const cooldowns = new Discord.Collection();
const prefix = process.env.PREFIX;
const token = process.env.TOKEN;

console.log('Starting bot...');

// Load in all commands
console.log('\tLoading commands...');
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
console.log('\tCommands loaded.');

// Events
console.log('\tLoading events...');
client.on('ready', () => {
	console.log(`\tLogged in as ${client.user.tag}!`);
	console.log('Finished loading!');
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