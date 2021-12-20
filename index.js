async function main() {
  
    const API_URL ="https://data-seed-prebsc-1-s1.binance.org:8545"
    const PRIVATE_KEY=" # paste your account private key"
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '# Paste from address' //TODO: replace this address with your own public address
   
    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

    const transaction = {
     'to': '# Paste To address', //  Address to send BNB
     'value': 1000000000000000000,  // you must mention in wei /// 1 BNB = 1000000000000000000 WEI
     'gas': 30000,
     'nonce': nonce,
     // optional data field to send message or execute smart contract
    };
   
    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
    
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check the status of your transaction in BSC Scan ","Link : https://testnet.bscscan.com/tx/"+hash);
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

main();

//Reference docs

// Hi,
// My impression is that you will end sending WEI every time, 
// but depending on the application that will display the value sent it will show it in BNB or WEI depending on the value that you sent. 
// In this particular case when 500 WEI are sent, it they were to display it in BNB it would have been 0.000000000000000500 BNB, 
// that maybe would not look so great as 500 WEI.

// 1 BNB = 1000000000000000000 WEI and the application can display the value in what is better to display from case to case.