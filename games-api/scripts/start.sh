#!/bin/bash

cd /home/ec2-user/games-api

npm ci --omit=dev

nohup npm run start:prod > /var/log/games-api.log 2>&1 &