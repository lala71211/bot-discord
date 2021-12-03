const {checkSameRoom} = require('../../utils');
module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'music',
    description: 'play music on youtube',
    run: async(client,message, args) => {
        if(checkSameRoom(message))
            return;
        await client.player.play(message,args.join(' '),true);
    }
}