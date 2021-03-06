# pacserver

Built using node.js, express and MongoDB

Developed based on the need to provide dynamic generated PAC files with different proxy assignments per client IP address.

Inspired by https://github.com/DrRenz/PACtory

## Features

- Serve PAC files with proxy assignments based on source IPs
- Longest prefix matching to find the correct proxy for every source IP
- Recognizes `X-Forwarded-For` and `X-Real-IP` headers when behind a reverse proxy
- REST API for managing networks and proxy exceptions
- PAC file validation before serving (default test URL in `.env`)
- Dev container included for easy development in vscode
- API query to search for proxy for a given IP (e.g. `http://serverip/api/v1/getproxyforip?ip=10.1.2.3`)

## Installation

- Install MongoDB
- git clone the repo
- rename `.sample-env` to `.env` and edit settings
- `npm install` the dependencies

Docker:

- git clone the repo
- `docker build -t pacserver .`
- `docker run --rm pacserver:latest`

Docker Compose (App + MongoDB):

- git clone repo
- `docker-compose build`
- `docker-compose up -d`

## Run

- nodemon run: `npm run start:dev`
- prod run: `npm start`

## API Documentation

- SwaggerUI is available at `{{protocol}}://{{serverip:port}}/api-docs/` (default: `localhost:3000`)
- Edit protocol, server hostname/IP and port in SwaggerUI

## TODO
- Admin frontend
