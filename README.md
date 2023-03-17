# K6 Grafana
## How to run performance tests using docker-compose with images:
- K6
- Grafana
- InfluxDB

![image](https://user-images.githubusercontent.com/22678683/225870179-acb4f507-fe9e-4fea-befd-37a671fb6246.png)


### Requirements
Download docker-compose 
https://docs.docker.com/compose/

### How to start
1. Go to the folder with the project in terminal:
``` ruby
cd k6-grafana-docker
```
2. Build environment with docker-compose by this command:
``` ruby
docker-compose up --build
```
3. Run test:
``` ruby
docker-compose run k6 run /scripts/basicTest.js
```
4. Check results in Grafana dashboard. go to this URL in browser<br>
http://localhost:3000/d/k6/k6-load-testing-results
