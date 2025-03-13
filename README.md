/project-root
  /frontend                 # Frontend application (Vue)
    /src
      /components           # Reusable Vue components
      /views                # Vue views (pages)
      /assets               # Static assets (images, styles, etc.)
      App.vue               # Root Vue component
      main.js               # Entry point for the Vue app
    /public
      index.html            # Main HTML file
    package.json            # Vue dependencies
    vite.config.js          # Vue/Vite configuration
  /backend                  # Backend application (Node.js)
    /controllers            # Logic for each route
      authController.js     # Authentication logic
      fileController.js     # File handling logic
      infoController.js     # Data fetching logic
    /models                 # Mongoose schemas
      userModel.js          # MongoDB user schema
      fileModel.js          # MongoDB file schema
    /routes                 # Route definitions
      authRoutes.js         # Routes for user authentication
      fileRoutes.js         # Routes for file management
      infoRoutes.js         # Routes for retrieving information
    /services               # Reusable backend logic
      userService.js        # User-related operations
      fileService.js        # File-related operations
    /middleware             # Middleware for validation and authentication
      authMiddleware.js     # Auth checks (e.g., JWT verification)
    /uploads                # Directory to store uploaded files
      example_file.txt      # Uploaded files are saved here
    app.js                  # Main Node.js backend script
    package.json            # Node.js dependencies
  /apache                   # Apache configuration files
    httpd.conf              # Apache settings and reverse proxy rules
  /database                 # Database-related files
    seed.js                 # Script to seed initial database data (optional)
  /docs                     # Documentation for the project
    README.md               # Instructions for setup and usage
  .env                      # Environment variables for sensitive data
  .gitignore                # Files and directories to exclude from Git

/project-root
	/frontend
 		/src
   			/components
	  		/views
	 		/assets
			App.vue
   			main.js
	  	/public
			index.html
   		package.json
	 	vite..config.js
   /backend
   		/controllers
	 		authController.js
			fileController.js
   			infoController.js
	  	/models
			userModel.js
   			fileModel.js
	  	/routes
			authRoutes.js
   			fileRoutes.js
	  		infoRoutes.js
	 	/services
   			userservice.js
	  		fileservice.js
	 	/middleware
   			authMiddleware.js
	  	/uploads
			space for file uploads
   		app.js
	 	package.json
  	/apache
   		httpd.conf
	/database
 		seed.js
   	/docs
		documentation
  	.env
   	.gitignore
