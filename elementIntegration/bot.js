import * as sdk from "matrix-js-sdk";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const now = Date.now();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '/.env') });

const loginID = process.env.LOGIN_ID;
const roomID = process.env.ROOM_ID;
const myUserId = process.env.MATRIX_USERNAME;
const myAccessToken = process.env.MATRIX_ACCESS_TOKEN;
const client = sdk.createClient({
    baseUrl: process.env.HOME_URL,
    accessToken: myAccessToken,
    userId: myUserId,
});
client.on("Room.timeline", function(event, room, toStartOfTimeline) {
    if (event.event.type === 'm.room.message') {
        if (event.event.sender === myUserId) {
            return
        }
        console.log("Message sent: '", event.event.content.body , "'")
        if (event.event.origin_server_ts > now) {
            console.log("new message")
            const content = {
                body: "Reacting to a message sent",
                msgtype: "m.text",
            };
            client.sendEvent(roomID, "m.room.message", content, "", (err, res) => {
                console.log(err);
            });
        }
    }
    else {
        console.log("error");
    }
});
/*
client.once('sync', function(state, prevState, res) {
    console.log(state); // state will be 'PREPARED' when the client is ready to use
});
 */

try {
    const loginData = {
        type: "m.login.token",
        token: loginID // Use the token directly, don't prepend "token :"
    };
    const result = await client.loginRequest(loginData);
    console.log("Result: ", result);
}
catch (err) {
    console.error("Error: ", err);
}
client.startClient();
/*
try {
    await client.initRustCrypto(false);
}
catch (error) {
    console.log(error);
}
 */