const checkSameRoom = (message) => {
    if(!message.member.voice.channel)
        return message.reply('Please enter a voice channel!!!!');
    if(!message.guild.me.voice.channelID || message.guild.me.voice.channelID === message.member.voice.channelID)
        return;
    return message.reply('Please enter same room with Javis!!!!')
}
module.exports = {
    checkSameRoom
}