import {currentLectureData, editLectureRequest} from "../dbConnection.js";


export default async function editLecture(req, res) {
    const id = parseInt(req.body.id) || null;
    const lecturename = req.body.lecturename || null;
    const description = req.body.description || null;
    const professor = req.body.professor || null;
    const date = parseInt(req.body.date) || null;
    const room = req.body.room || null;
    const start = req.body.start === 'start' || null;
    const online = req.body.online === 'true' ? true
        : req.body.online === 'false' ? false
            : undefined;
    const information = req.body.information || null;

    const updates = {};

    if (lecturename !== null) updates.lecturename = lecturename;
    if (description !== null) updates.description = description;
    if (professor !== null) updates.professor = professor;
    if (date !== null) updates.date = date;
    if (room !== null) updates.room = room;
    if (start !== null) updates.start = start;
    if (online !== undefined) updates.online = online;
    if (information !== null) updates.information = information;

    if (id === null) {
        return res.status(400).send({ message: "Lecture ID is required." });
    }

    try {
        const result = await editLectureRequest(id, updates)
        if (!result.acknowledged) {
            res.status(404).send({message: "No lecture found to update."});
            return;
        }
        if (result.modifiedCount === 0) {
            res.status(200).send({message: "Lecture already matched update."});
            return;
        }
        if (result.modifiedCount > 0) {
            res.status(200).send({message: " " + result.modifiedCount + " : changes were made"});
            const data = await currentLectureData(id)
            //await publishUpdate(helper(data))
            //await publishUpdate2(helper(data))
            return;
        } else {
            return res.status(500).send({message: "Internal Server Error."});
        }
    }
    catch (err) {
        res.status(400).send({message: err});
    }
}

function helper(updatedData) {
    const fieldLabels = {
        lecturename: 'Lecture Name',
        description: 'Description',
        professor: 'Dozent',
        date: 'Date',
        room: 'Room',
        start: 'Start',
        online: 'Online',
        information: 'Additional Information'
    };

    // List of keys to exclude from the output
    const excludeKeys = ['_id', 'id'];

    const changeDescriptions = Object.keys(updatedData)
        .filter(key => !excludeKeys.includes(key))
        .map(key => {
            const label = fieldLabels[key] || key;
            const value = updatedData[key];

            // Format boolean or date nicely if needed
            if (typeof value === 'boolean') {
                return `${label}: ${value ? 'Yes' : 'No'}`;
            } else if (key === 'date') {
                // Format date if numeric
                return `${label}: ${new Date(value).toLocaleString()}`;
            } else {
                return `${label}: ${value}`;
            }
        });

    return `Updated lecture:\n${changeDescriptions.join('\n')}`;
}

const discordWebhookUrl = "https://discord.com/api/webhooks/1367931418172457041/GRPMjZw5lNlY-25uux3LOJK8-aqmpS1OT_bK_6p51Uwy40mdA01YisNgHvVGHoKlBEoE"; // Add this to your .env file

async function publishUpdate2(update) {
    if (!discordWebhookUrl) {
        console.warn("DISCORD_WEBHOOK_URL is not defined. Skipping Discord update.");
        return;
    }

    try {
        const response = await fetch(discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: update, // Send the update message as the content
            }),
        });

        if (response.ok) {
            console.log('Update sent to Discord successfully!');
        } else {
            console.error('Failed to send update to Discord:', response.status, response.statusText);
            try {
                const errorBody = await response.text();
                console.error('Discord error body:', errorBody);
            } catch (e) {
                console.error('Could not read Discord error body:', e);
            }
        }
    } catch (error) {
        console.error('Error sending update to Discord:', error);
    }
}