import testRoutes from '../routes/testRoutes.js';
import fileRoutes from '../routes/fileRoutes.js';
import infoRoutes from '../routes/infoRoutes.js';
import authRoutes from '../routes/authRoutes.js';
import loginRoutes from '../routes/loginRoutes.js';

export default function setupRoutes(app) {
    app.use('/ping', testRoutes); // test route
    app.use('/dashboard', authRoutes); //everything that needs authentication needs to go through authRoute
    app.use('/api/files', fileRoutes); //only for file up- / downloading
    app.use('/api/info', infoRoutes); //only for information requests
    app.use('/login', loginRoutes); //send login routes through login/verification process
}
