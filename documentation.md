our blog website :- 

the additional features we use here are:
1. appwrite - for backend 
2. redux, redux-toolkit
3. react router
4. tailwind css
5. react hook form
6. tinymce - richtext editor
7. html -react-parser

so lets start with creating a new reacvt project using vite.
1. create a new project. (you can refer to documentation for setup react project using vite - https://vite.dev/guide/ )
2. then select react, then javascript.
3. then go to that projectfolder and run npm install
4. now lets install other dependecnies, 
redux - https://react-redux.js.org/introduction/getting-started
redux-toolkit - https://redux-toolkit.js.org/introduction/getting-started
react router - https://reactrouter.com/start/declarative/installation
appwrite - https://appwrite.io/docs/quick-starts/react
tinymce - https://www.tiny.cloud/docs/tinymce/latest/react-cloud/
html react parser - https://www.npmjs.com/package/html-react-parser
react hook form - https://www.react-hook-form.com/get-started

directly run the below command...
npm install react-redux @reduxjs/toolkit react-router appwrite @tinymce/tinymce-react html-react-parser react-hook-form

then install tailwind with the documentation...
tailwind css - https://tailwindcss.com/docs/installation/using-vite 

now lets test everything is working good. so run nom run dev.

if everything is ok. lets omove ahead.

- make a .env file in project root.
- now add the .env to the gitignore so that it is not push to the github code or expose publically. 
- now lets add enviromental variables. always remeber there is a syntax of write a enviromental variables.
we need the following values.
VITE_APPWRITE_URL=""
VITE_APPWRITE_PROJECT_ID=""
VITE_APPWRITE_DATABASE_ID=""
VITE_APPWRITE_COLLECTION_ID=""
VITE_APPWRITE_BUCKET_ID=""
VITE_TINYMCE=""

u can get all these from appwrite and from tinymce website.

1. create a account on appwrite. 
link - https://appwrite.io/
2. then click on create project. 
3. name the project.
4. now u can get the appwrite url and project id from settings past them int o respective place.
5. now create a datbase and copy paste the database id in to env.
6. create a collection and copuy paste the id into env file.
7. now in collection setting go to permission choose all users and select all operation i.e create, read update, delete. 
8. now create attributes i.e title, content, featured image, status, userid. 
9. now create a indeces named ststaus. 
10. then crete a storage named images. and change a setting of permissonas sllowing all to do all the opratons. 
11. copy paste the bucket id into env file. 