module.exports = {
	name: 'alexa',
	description: 'This is so sad.',
	usage: '[search terms]',
	args: false,
	guildOnly: true,
	cooldown: 5,
	execute(message, args) {
		if (args < 2) {
			return message.channel.send(`ɴᴏᴡ ᴘʟᴀʏɪɴɢ: Despacito 2

(Feat: Lil Pump, XXXTentacion, Death Grips, 6ix9ine, 2pac, Lil Peep, Lil Yatchy, Twenty One Pilots, Jaden Smith, Kurt Cobain, Rihanna, Chris Brown, Ice Cube, David Bowie, Toto, Nat King Cole, My Chemical Romance, The Who, Smash Mouth, DJ Khaled, Imagine Dragons, The Notorious B.I.G, Rush, Garth Brooks, Van Halen, Mozart, Queen, Frank Jav Cee, Skrillex, Nikki Minaj, Kid Cudi, Metallica, Black Sabbath, Bad Company, a-ha, Earth Wind and Fire, Foster the People, Alexander Hamilton, Arctic Monkeys, Paramore, Iron Maiden, Panic! At The Disco, Aerosmith, Elton John, Nirvana, Avril Lavigne, All Time Low, Tom Petty, AJR, Muse, Green Day, Deadmau5, Simple Plan, Vanilla Ice, Heart, Village People, Styx, The Clash, The Police, Gorillaz, Boston, Journey, Pearl Jam, Led Zeppelin, Eminem, The Killers, Drake, Hannah Montana, Vacations, Frank Ocean, Radiohead, Prince, Men at Work, Marshmello, The Strokes, Cardi B, Fall Out Boy, Blink-182, Michael Jackson, Lynyrd Skynyrd, Bob Marley, Eric Clapton, Pitbull, Will.i.am, Black Eyed Peas, Beastie Boys, R.E.M, Backstreet Boys, Kanye West, Dean Martin, Logic, KE$HA, G-Eazy, Rick Ashley)

───────────⚪────── ◄◄⠀▐▐ ⠀► 𝟸:𝟷𝟾 / 𝟹:𝟻𝟼 ⠀ ───○ 🔊⠀ ᴴᴰ ⚙️`);
		}

		// Eventually want to take search and autocomplete a song from it
		// and put the now playing dealy
		console.log('unimplemented');
		return;
	},
};