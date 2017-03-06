#!/bin/sh

docker run --rm -p 8545:8545 axelhodler/testrpc > testrpc.log 2>&1 &

CONTRACT_ADDRESS=`./truffle.sh migrate | grep Verification: | awk '{print $2}'`
CONTRACT_ABI=`node scripts/getabi.js`

if [ ${#CONTRACT_ADDRESS} != 42 ]; then
  echo "Contract Address could not be resolved, exitting.."
  exit
fi

echo $CONTRACT_ADDRESS $CONTRACT_ABI
