
export async function nextLectureRequest() {
    const url = 'http://localhost:3333/next-lecture'; // Adjust the URL according to your startingSetup

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
        if (response.status === 201) {
            return 1;
        }
        if (response.status === 202) {
            return 2;
        }
        if (response.status === 203) {
            return 3;
        }
        return 0;

    } catch (error) {
        console.error('Error:', error);
        return 0;
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
export async function editLectureRequest(req, res) {
    const url = 'http://localhost:3333/edit-lecture';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: req.body
        })
        res.send(response);
        return;
    }
    catch (error) {
        res.status(500).send({message : "Internal error"});
    }
}
export async function addLectureRequest(req, res) {
    const url = 'http://localhost:3333/add-lecture';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify(req.body)
        })
        const data = await response.json();
        res.status(response.status).send({ message : data.message});
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message : "Internal error"});
    }
}
