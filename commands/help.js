const Discord = require('discord.js');

const prefix = process.env.PREFIX;

module.exports = {
	name: 'help',
	aliases: ['commands'],
	description: 'List all commands/info about specific commands',
	usage: '[command name]',
	cooldown: 3,
	execute(message, args) {
		const { commands } = message.client;

		const embed = new Discord.RichEmbed().setColor('#DD11FF');
		if (!args.length) {
			embed.setTitle('Help/Commands')
				.setDescription('List of all my commands:')
				.addField(commands.map(command => command.name).join(', '), `You can send ${prefix}help [command name] for info on a specific command.`);
		}
		else {
			if (!commands.has(args[0])) {
				return message.reply(`"${args[0]}" is not a valid command!`);
			}

			const command = commands.get(args[0]);

			embed.setTitle(`Help/__${command.name}__`);
			if (command.description) {
				embed.setDescription(`**Description:** ${command.description}`);
			}
			else {
				embed.setDescription('No description available');
			}

			if (command.aliases) {
				embed.addField('Aliases:', command.aliases.join(', '));
			}
			if (command.usage) {
				embed.addField('Usage:', `${prefix}${command.name} ${command.usage}`);
			}

			embed.addField('Cooldown:', `${command.cooldown || 1} second(s)`);
		}

		message.author.send(embed)
			.then(() => {
				if (message.channel.type !== 'dm') {
					if (!args.length) {
						message.channel.send('I slid into your DMs with my commands, babe.');
					}
					else {
						message.channel.send('I slid into your DMs with help, babe.');
					}
				}
			}).catch(() => {
				message.reply('I can\'t slide into your DMs :(');
			});
	},
};