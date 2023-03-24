
const crypto = require('crypto-js')
const sha256 = crypto.SHA256
const message = "DESCUBRA O NOUNCE DESSA MENSAGEM"
const difficulty = 6
const maxNounce = 1000000000;
                    11081224
for (let i = 0; i <= maxNounce; i++){
    const hashMined = sha256(i+message)
    if (hashMined.toString().substring(0, difficulty) === '000000'){
        console.log(i, hashMined.toString())
        break;
    }
}