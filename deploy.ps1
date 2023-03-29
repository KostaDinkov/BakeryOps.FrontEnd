npm run build
docker stop frontend-nginx
docker rm frontend-nginx
docker rmi orders-frontend
docker build -t orders-frontend .
docker run -d -p 80:80 `
-e TZ=Europe/Sofia `
--name frontend-nginx orders-frontend
