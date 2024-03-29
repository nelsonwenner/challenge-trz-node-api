<h1 align="center">TRZ (The resident zombie) - API</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/nelsonwenner/trz-api?color=%2304D361">

  <a href="https://github.com/nelsonwenner">
    <img alt="Made by @nelsonwenner" src="https://img.shields.io/badge/made%20by-%40nelsonwenner-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/nelsonwenner/ecoleta/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/nelsonwenner/trz-api?style=social">
  </a>
</p>

## :telescope: Diagram Database

<p align="center">
  <img alt="diagram" src="./diagram/zssn.png" />
</p>

## :rocket: Technologies

* [Typescript](https://www.typescriptlang.org/)
* [NodeJS](https://nodejs.org/en/)
* [Postgres](www.postgresql.org)
* [TypeOrm](https://typeorm.io/)
* [Docker](https://www.docker.com/)

## :electric_plug: Prerequisites

- [NodeJS LTS (>= 12.x)](https://nodejs.org/)
- [Docker (>= 19.03.x)](https://docs.docker.com/engine/install/ubuntu/)
- [Docker Compose (>= 1.05.x)](https://docs.docker.com/compose/install/)

## :information_source: Getting Started

1. Fork this repository and clone it on your machine.
2. Change the directory to `trz-api` where you cloned it.

## :closed_lock_with_key: Backend Getting Started 

```shell
/* Run docker */
$ docker-compose up -d

/* Down docker */
$ docker-compose down
```
  * Open backend, the host [localhost:3333](http://localhost:3333) 

## :toolbox: Running the tests

```shell
/* Access container of backend */
$ docker exec -it api-container /bin/bash

/* Run test */
$ npm run test:coverage
```

## :spiral_notepad: Swagger

With the server running, access [http://localhost:3333/docs](http://localhost:3333/docs)

## :memo: License
This project is under the MIT license. See the [LICENSE](LICENSE.md) for more information.

---
