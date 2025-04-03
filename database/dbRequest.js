import { comparePassword } from './utils.js';
import { collection } from './mongoose.js';
import { Stundenplan } from './models.js';

async function loginCheck(username, password) {
    // Anfrage an MongoDB, ob der Benutzer existiert
    try {
        const user = await collection.findOne({ username });
        if (!user) {
            return false;
        }
        // extrahiere das Passwort, das gehasht gespeichert ist
        const hashedPassword = user.password;

        // Vergleiche das eingegebene Passwort mit dem gehashten Passwort
        const isMatch = await comparePassword(password, hashedPassword);
        if (!isMatch) {
            return false;
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function updateStundenplanStatus(id, status) {
    try {
        const eintrag = await Stundenplan.findByIdAndUpdate(
            id,
            { findet_statt: status },
            { new: true }
        );
        if (!eintrag) {
            console.log("Eintrag nicht gefunden");
            return null;
        }
        console.log("Eintrag aktualisiert:", eintrag);
        return eintrag;
    } catch (error) {
        console.error("Fehler beim Aktualisieren:", error);
        return null;
    }
}

function roleCheck(username) {
    // Hole den Benutzer und extrahiere die Rolle
    return collection.findOne({ username })
        .then(user => {
            if (user) {
                return user.role;
            } else {
                return null; // Benutzer nicht gefunden
            }
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der Rolle:", error);
            return null;
        });
}

export { loginCheck, roleCheck, updateStundenplanStatus };
