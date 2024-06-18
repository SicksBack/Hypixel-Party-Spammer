const mineflayer = require('mineflayer');
const fs = require('fs');
const path = require('path');


const accountsFilePath = path.join(__dirname, 'accounts.txt');

async function readAccounts(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data.trim().split('\n');
    } catch (error) {
        console.error('Error reading accounts file:', error);
        return [];
    }
}

async function createBot(email) {
    const bot = mineflayer.createBot({
        host: 'hypixel.net',
        version: '1.8.9',
        auth: 'microsoft',
        username: email,
        viewDistance: 2
    });

    let inviteInterval;
    let spamInterval;
    let leavePartyTimeout; //change this text to whatever ya want
    const spamMessage = '/pc EVERYONE JOIN discord.gg/skyblockcentre ! SKYBLOCK GWs DUNGEONS + MORE';
    const spammedPlayers = new Set();

    bot.once('spawn', async () => {
        console.log('Bot spawned. Sending command /l bw...');
        bot.chat('/l bw');
        spamInterval = setInterval(() => {
            bot.chat(`/pc ${spamMessage}`);
        }, 5000); 
    });

    bot.on('message', async (rawMessage) => {
        const message = rawMessage.toString();
        console.log('[CHAT]', message);

        if (message.includes('You have 5 or more invites pending')) {
            console.log('Too many invites pending. Sending /p leave.');
            bot.chat('/p leave');
        } else if (message.includes('You left the party!')) {
            console.log('Left the party successfully.');
        } else if (message.includes('Friend request from')) {
            const player = message.match(/Friend request from (.+)/)[1];
            console.log(`Accepting friend request from ${player}`);
            bot.chat(`/f accept ${player}`);
            spammedPlayers.add(player);
        }
    });

    bot.on('end', () => {
        clearInterval(inviteInterval);
        clearInterval(spamInterval);
        if (leavePartyTimeout) clearTimeout(leavePartyTimeout);
    });

    inviteInterval = setInterval(() => {
        const players = Object.keys(bot.players);
        if (players.length > 0) {
            const player = players[Math.floor(Math.random() * players.length)];
            bot.chat(`/p ${player}`);
            if (leavePartyTimeout) clearTimeout(leavePartyTimeout);
            leavePartyTimeout = setTimeout(() => {
                bot.chat('/p leave');
            }, 20000); 
        }
    }, 2000); 

    
    setInterval(() => {
        for (const player of spammedPlayers) {
            bot.chat(`/msg ${player} ${spamMessage}`);
        }
    }, 5000); 

    
    setTimeout(() => {
        console.log('Sending /p leave before /l command after 2 minutes...');
        bot.chat('/p leave');
        console.log('Sending /l command after 2 minutes...');
        bot.chat('/l');
        setTimeout(() => {
            console.log('Waiting 5 seconds and sending /l bw again...');
            bot.chat('/l bw');
        }, 5000); 
    }, 120000); 
}

async function main() {
    const accounts = await readAccounts(accountsFilePath);

    for (const account of accounts) {
        createBot(account);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Delay between bot logins
    }
}

main();
