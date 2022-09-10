# carbon-footprint-web
Carbon footprint web app   

Run Local:
Need firebase.json file

npm run cred
Copy paste command with the directory of the firebase.json file
Also need .env file filed with the api key for firebase. Need to replace info in both the firebase files.

Then npm i and npm run client-install.

Finally npm run dev




Build and Deploy Steps:   
1. Push to github   
2. Make sure you the Dockerfile and Dockerignore files are set up   
3. docker buildx build --platform linux/amd64 -t carbon-footprint-web .  
4. docker tag carbon-footprint-web registry.heroku.com/carbon-footprint-web/web   
5. docker push registry.heroku.com/carbon-footprint-web/web  (may need to login to container with heroku container:login)
6. heroku container:release  web --app carbon-footprint-web



