# How to run docker

```sh
docker-compose --env-file docker.env up -d --build
```

# Restart all docker containers

```sh
docker restart $(docker ps -a -q)
```