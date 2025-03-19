import testRoutes from '../routes/testRoutes.js';
import fileRoutes from '../routes/fileRoutes.js';
import infoRoutes from '../routes/infoRoutes.js';
import authRoutes from '../routes/authRoutes.js';

export default function setupRoutes(app) {
    app.use('/ping', testRoutes); // test route
    app.use('/home', authRoutes); //everything that needs authentication needs to go through authRoute
    app.use('/api/files', fileRoutes);
    app.use('/api/info', infoRoutes);
}
