import crypto from "crypto-js";
const { SHA256 } = crypto;
import db from "./verifyDatabase.js";

class Blockchain {
    addBlock(){
        db.all('SELECT * FROM Blocks', (err, row)=>{
            const Bloco = new Block(row.length, new Date(), {TRANSACTION0: {
                remetente: 'carteira_privada0',
                destinatario: 'carteira_publica1',
                valor: '2BTC'
            }},  '0')
            Bloco.miningBlock(6, '0')
        })
    }
    generateGenesys(){
        db.run(`INSERT INTO Blocks (nounce, )`)
    }
    async getLastHash(blockNumber){
        const getAsync = () => new Promise((resolve, reject) => {
            db.get('SELECT Hash from Blocks where ID = '+blockNumber, function (err, row){
                if (err) reject(err)
                else resolve(row)
            })
        })
        const lastHash = await getAsync()
        return lastHash
    }
}

class Block {
    constructor(index, timestamp, data, previousHash){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nounce = 0;
        this.hash = this.calculateHash()
    }
    calculateHash(){
        return SHA256(this.index+this.timestamp+this.data+this.previousHash+this.nounce).toString();
    }
    miningBlock(difficulty, letterPattern){
        let pattern = ""
        for (let i = 0; i < difficulty; i++){
            pattern += letterPattern
        }
        while (this.hash.substring(0, difficulty) !== pattern){
            this.nounce++
            this.hash = this.calculateHash()
        }
        console.log(this.index+this.timestamp+this.data+this.previousHash, this.nounce)
    }
}
const Blockchainn = new Blockchain
Blockchainn.addBlock()