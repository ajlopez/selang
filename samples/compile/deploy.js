
const selang = require('../..');
const rskapi = require('rskapi');
const fs = require('fs');

const code = fs.readFileSync(process.argv[2]).toString();

console.log(code);

const result = selang.compile(code);

console.log();
console.log(result);

const host = rskapi.host('http://localhost:4444');

(async function() {
    const accounts = await host.getAccounts();
    
    const tx = {
        from: accounts[0],
        gas: 6000000,
        gasPrice: 0,
        data: result
    }
    
    const txhash = await host.sendTransaction(tx);
    let txrec = await host.getTransactionReceiptByHash(txhash);
    
    while (!txrec)
        txrec = await host.getTransactionReceiptByHash(txhash);
    
    console.dir(txrec);
    
    const runcode = await host.getCode(txrec.contractAddress);
    
    console.log(runcode);
    
    const tx2 = {
        from: accounts[0],
        to: txrec.contractAddress,
        gas: 6000000,
        gasPrice: 0,
        data: '8ada066e'
    }
    
    const counter = await host.callTransaction(tx2);
    
    console.log(parseInt(counter));
    
    const tx3 = {
        from: accounts[0],
        to: txrec.contractAddress,
        gas: 6000000,
        gasPrice: 0,
        data: 'd09de08a'
    }

    const txhash3 = await host.sendTransaction(tx3);
    let txrec3 = await host.getTransactionReceiptByHash(txhash3);
    
    while (!txrec3)
        txrec3 = await host.getTransactionReceiptByHash(txhash3);

    console.log(txrec3);
    
    const counter2 = await host.callTransaction(tx2);
    
    console.log(parseInt(counter2));
})();

