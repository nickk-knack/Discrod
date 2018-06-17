# Discrod
Discord bot written using discord.js for my personal Discord server.

## Writing command plugins
#### Command plugins for Discrod are written as CommonJS modules, saved as a .js file and stored in the 'commands' folder. These modules consist of various properties as well as an 'execute' function.

#### There are 7 properties to add to a command plugin.
1. name
    * Type: `String`
    * *Required*
    * **The name of the command, what the user sends following your prefix to execute the command.**
2. aliases
    * Type: `Array of strings`
    * *Optional*
    * Example: `aliases: ['alias1', 'alias2', ...]`
    * **Optional names for the command that will be accepted in place of the actual command name.**
3. description
    * Type: `String`
    * *Optional, highly recommended*
    * **Describe what your command plugin does. Will be sent to the user when the user uses the 'help' command for your command plugin.**
4. usage
    * Type: `String`
    * *Optional, recommended if args is true*
    * Example: `usage: '<required arg> [optional arg]'`
    * **Proper usage for your command. Omit the prefix followed by your command name, as this is added when the user uses the 'help' command for your command plugin.**
5. args
    * Type: `Boolean`
    * *Required*
    * **Whether or not arguments are required for your command plugin.**
6. guildOnly
    * Type: `Boolean`
    * *Required*
    * **Whether or not your command plugin can only be used in a guild. If false, command can be used in a DM with the bot.**
7. cooldown
    * Type: `Integer`
    * *Optional (defaults to 1)*
    * **Cooldown time for the command, given in seconds.**

#### Execute function
The `execute` function must take two arguments, one for the message object, and another for the arguments. i.e.
```javascript
execute(message, args) {
    // Your execution code here
}
```
If you haven't used discord.js before, I recommend visiting their [API documentation for the message object](https://discord.js.org/#/docs/main/stable/class/Message) to get a peek at what is possible in the `execute` function.

### Example command plugin
file: `commands/hello.js`
```javascript
module.exports = {
    name: 'hello',
    aliases: ['hola', 'hi'],
    description: 'Say hi to the bot!',
    args: false,
    guildOnly: true,
    cooldown: 5,
    execute(message, args) {
        message.reply('Hello to you, too!');
    },
};
```