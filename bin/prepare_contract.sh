#!/bin/sh

./node_modules/ethereumjs-testrpc/bin/testrpc --account="0xdb3083055c72ea2528902aae0ff8f9ee488ad9bf009d359da0db2824c9c45fe8,200000000000000000000" --account="0x9ac1f2f2cbb0d43909f1fa69554994fc63a1e5ff0e028f806fe035ac7cb78590,100000000000000000000" --account="0x864c51dd13443614d0ff6949a3bab604d2664370dfc3ddb0f35b30e324872f51,300000000000000000000" > testrpc.log 2>&1 &

CONTRACT_PROVIDER=http://localhost:8545
CONTRACT_ADDRESS=`./truffle.sh migrate | grep Verification: | awk '{print $2}'`
CONTRACT_ABI=`node bin/getabi.js`

echo $CONTRACT_PROVIDER $CONTRACT_ADDRESS $CONTRACT_ABI
