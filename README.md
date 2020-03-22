Installation steps

cd node-postgres
docker build -t yemliha/node-postgres .

cd node-postgres/client
docker build -t vuejs/dockerize-todo-app .

cd node-postgres
docker-compose up -d