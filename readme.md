# RentalX

#### FAQ

Docker commands

build: docker build -t rentx .

run: docker run -p 3333:3333 rentx

Docker-Compose commands

run: docker-compose up

TYPEORM

create migration: yarn typeorm migration:create -n nameOfMigration

run migration: yarn typeorm migration:run
