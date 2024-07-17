steps to setup express with typescript

-  npm -init
-  npm install express mongoose typescript ts-node-dev @types/node @types/express @types/mongoose zod
-  tsc --init 
-  change root and outDir
-  create script in package.json ("start" : "ts-node-dev --respawn --transpile-only src/app.ts")
-  validation using zod package
- explore services directory, all db query logic moved to services.
- refactored controllers (only business logic is there)
- type folder (contain intefaces/types)
- partial validation of patch requests
- expand userSchema with firstName, lastName, profilePic (use multer).            
- create blog schema (imageUrl), implement with multer.                              
- implement jwt                                                                    
- crud in blog (restricted routes)
- zod validation
- use express-validator
- use winston

