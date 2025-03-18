import testRoutes from '../routes/testRoutes.js';
import fileRoutes from '../routes/fileRoutes.js';
import infoRoutes from '../routes/infoRoutes.js';
import authRoutes from '../routes/authRoutes.js';

export default function setupRoutes(app) {
    app.use('/', testRoutes); // test route
}
