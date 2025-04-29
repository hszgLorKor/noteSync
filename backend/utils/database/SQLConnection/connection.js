
export async function nextLectureRequest() {
    const url = 'http://localhost:3333/next-lecture'; // Adjust the URL according to your setup

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching lectures: ${response.statusText}`);
        }

        return await response.json(); // Return the lectures from the response

    } catch (error) {
        return null; // Return null or handle the error accordingly
    }
}

export async function permissionRequest(username) {
    const url = `http://localhost:3333/permission/${encodeURIComponent(username)}`; // Use encodeURIComponent to safely encode the username
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 701) {
            return 1;
        }
        if (response.status === 702) {
            return 2;
        }
        if (response.status === 703) {
            return 3;
        }
        return null;

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function loginRequest(username, password) {
    const url = 'http://localhost:3333/login';
    const requestData = {
        username: username,
        password: password
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });
        return response.status === 200; // Will return true or false based on status

    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}
