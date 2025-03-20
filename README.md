## Overview

- **Frontend**: Built with Vue.js using Vite as the build tool. Contains components, views, and static assets.
- **Backend**: Built with Node.js, featuring modular controllers, services, and routes. Uses Mongoose for MongoDB integration.
- **Database**: Includes optional seeding scripts for initial data population.
- **Apache**: Configuration for reverse proxy and server settings.
- **Docs**: Project documentation and setup instructions.

This structure separates concerns and organizes files by functionality, making it easier to navigate and maintain.

/project-root \
│
├── /frontend \
│   ├── /src \
│   │   ├── /components \
│   │   ├── /views \
│   │   ├── /assets \
│   │   ├── App.vue \
│   │   └── main.js \
│   ├── /public \
│   │   └── index.html \
│   ├── package.json \
│   └── vite.config.js \
│ \
├── /backend \
│   ├── /controllers \
│   │   ├── authController.js \
│   │   ├── fileController.js \
│   │   └── infoController.js \
│   ├── /models \
│   │   ├── userModel.js \
│   │   └── fileModel.js \
│   ├── /routes \
│   │   ├── authRoutes.js \
│   │   ├── fileRoutes.js \
│   │   └── infoRoutes.js \
│   ├── /services \
│   │   ├── userService.js \
│   │   └── fileService.js \
│   ├── /middleware \
│   │   └── authMiddleware.js \
│   ├── /uploads \
│   │   └── example_file.txt \
│   ├── app.js \
│   └── package.json \
│ \
├── /database \
│   └── mongoose.js \
│ \
├── /docs \
│   └── README.md \
│ \
├── /apache \
│   └── httpd.conf \
│ \
├── .env \
└── .gitignore \
