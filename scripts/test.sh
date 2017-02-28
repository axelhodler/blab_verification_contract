#!/bin/sh

docker run --rm -p 8545:8545 axelhodler/testrpc > testrpc.log 2>&1 &
./truffle.sh test
docker ps | tail -n 1 | awk '{print $1}' | xargs docker kill | > /dev/null
