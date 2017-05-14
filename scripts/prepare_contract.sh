#!/bin/sh

set -euo pipefail

docker run --rm -p 8545:8545 axelhodler/testrpc > testrpc.log 2>&1 &

./truffle.sh migrate

node scripts/addresses_and_abi.js
