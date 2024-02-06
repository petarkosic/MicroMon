# MicroMon

Microservices Monitoring App

# Simple Microservices Monitoring App

This is a microservices monitoring application built using Docker Compose, Prometheus, Grafana, and NGINX.

## Overview

The application consists of multiple microservices for users and posts, along with NGINX for load balancing, Prometheus for monitoring, and Grafana for visualization.

## Services

### Users Microservices

- **users-1**: Microservice handling user-related functionalities.
- **users-2**: Second instance of the user microservice for redundancy.

### Posts Microservices

- **posts-1**: Microservice handling post-related functionalities.
- **posts-2**: Second instance of the post microservice for redundancy.

### NGINX

- **nginx**: Load balancer server routing traffic to users and posts microservices.

### Prometheus

- **prometheus**: Monitoring service for collecting and querying metrics.

### Grafana

- **grafana**: Visualization and dashboarding service for Prometheus metrics.

## Setup

Clone this repository to your local machine and navigate to it:

```bash
git clone https://github.com/petarkosic/MicroMon.git
cd MicroMon
```

Run Docker Compose to build and start the services:

```bash
docker-compose up --build -d
```

## Access the services

- Users microservices: http://localhost:8080/users
- Posts microservices: http://localhost:8080/posts
- Prometheus: http://localhost:9090/
- Grafana: http://localhost:3000/

## Configuration

Configuration files for NGINX, Prometheus, and Grafana can be found in the config directory.
Modify these files as per your requirements.

## Tear Down

To stop and remove the containers, use the following command:

```bash
docker-compose down
```
