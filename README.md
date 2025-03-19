## Overview

- **Frontend**: Built with Vue.js using Vite as the build tool. Contains components, views, and static assets.
- **Backend**: Built with Node.js, featuring modular controllers, services, and routes. Uses Mongoose for MongoDB integration.
- **Database**: Includes optional seeding scripts for initial data population.
- **Apache**: Configuration for reverse proxy and server settings.
- **Docs**: Project documentation and setup instructions.

This structure separates concerns and organizes files by functionality, making it easier to navigate and maintain.

/project-root
│
├── /frontend              # Frontend application (Vue.js)
│   ├── /src
│   │   ├── /components    # Reusable Vue components
│   │   ├── /views         # Vue views (pages)
│   │   ├── /assets        # Static assets (images, styles, etc.)
│   │   ├── App.vue        # Root Vue component
│   │   └── main.js        # Entry point for the Vue app
│   ├── /public
│   │   └── index.html     # Main HTML file
│   ├── package.json       # Vue dependencies
│   └── vite.config.js     # Vue/Vite configuration
│
├── /backend               # Backend application (Node.js)
│   ├── /controllers       # Logic for each route
│   │   ├── authController.js  # Authentication logic
│   │   ├── fileController.js  # File handling logic
│   │   └── infoController.js  # Data fetching logic
│   ├── /models            # Mongoose schemas
│   │   ├── userModel.js   # MongoDB user schema
│   │   └── fileModel.js   # MongoDB file schema
│   ├── /routes            # Route definitions
│   │   ├── authRoutes.js  # Routes for user authentication
│   │   ├── fileRoutes.js  # Routes for file management
│   │   └── infoRoutes.js  # Routes for retrieving information
│   ├── /services          # Reusable backend logic
│   │   ├── userService.js # User-related operations
│   │   └── fileService.js # File-related operations
│   ├── /middleware        # Middleware for validation and authentication
│   │   └── authMiddleware.js  # Auth checks (e.g., JWT verification)
│   ├── /uploads           # Directory to store uploaded files
│   │   └── example_file.txt  # Uploaded files are saved here
│   ├── app.js             # Main Node.js backend script
│   └── package.json       # Node.js dependencies
│
├── /database              # Database-related files
│   └── seed.js            # Script to seed initial database data (optional)
│
├── /docs                  # Documentation for the project
│   └── README.md          # Instructions for setup and usage
│
├── /apache                # Apache configuration files
│   └── httpd.conf         # Apache settings and reverse proxy rules
│
├── .env                   # Environment variables for sensitive data
└── .gitignore             # Files and directories to exclude from Git
