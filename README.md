# carbon-footprint-web
Carbon footprint web app   



Build and Deploy Steps:   

1. Push to github   
2. Make sure you the Dockerfile and Dockerignore files are set up   
3. docker buildx build --platform linux/amd64 -t carbon-footprint-web .  
4. docker tag carbon-footprint-web registry.heroku.com/carbon-footprint-web/web   
5. docker push registry.heroku.com/carbon-footprint-web/web   
6. heroku container:release  web --app carbon-footprint-web



