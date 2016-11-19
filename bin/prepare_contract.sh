#!/bin/sh

CONTRACT_PROVIDER=http://localhost:8545
CONTRACT_ADDRESS=`./truffle.sh migrate | grep Verification: | awk '{print $2}'`
CONTRACT_ABI=`node bin/getabi.js`
