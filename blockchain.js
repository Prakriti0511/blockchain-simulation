const crypto = require('crypto'); // Import the crypto module for hashing

// Create the Block class
class Block {
  constructor(index, timestamp, transactions, previousHash = '') {
    this.index = index; // Block number or index
    this.timestamp = timestamp; // Block creation time
    this.transactions = transactions; // List of transactions
    this.previousHash = previousHash; // Hash of the previous block
    this.hash = this.calculateHash(); // Current block hash
    this.nonce = 0; // For Proof-of-Work
  }

  // Calculate the hash using SHA-256 and block data
  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(
        this.index +
          this.timestamp +
          JSON.stringify(this.transactions) +
          this.previousHash +
          this.nonce
      )
      .digest('hex');
  }

  // Simple Proof-of-Work: Increment the nonce until hash starts with '0000'
  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`Block mined: ${this.hash}`);
  }
}
class Blockchain {
    constructor() {
      this.chain = [this.createGenesisBlock()]; // Start with the genesis block
      this.difficulty = 4; // Mining difficulty for Proof-of-Work
    }
  
    // Create the genesis block (first block)
    createGenesisBlock() {
      return new Block(0, '01/01/2025', 'Genesis Block', '0');
    }
  
    // Get the latest block on the chain
    getLatestBlock() {
      return this.chain[this.chain.length - 1];
    }
  
    // Add a new block to the chain after mining it
    addBlock(newBlock) {
      newBlock.previousHash = this.getLatestBlock().hash;
      newBlock.mineBlock(this.difficulty); // Mine the block (Proof-of-Work)
      this.chain.push(newBlock);
    }
  
    // Validate the chain's integrity
    isChainValid() {
      for (let i = 1; i < this.chain.length; i++) {
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i - 1];
  
        // Check if current block's hash is still valid
        if (currentBlock.hash !== currentBlock.calculateHash()) {
          return false;
        }
  
        // Check if current block's previous hash matches previous block's hash
        if (currentBlock.previousHash !== previousBlock.hash) {
          return false;
        }
      }
      return true;
    }
  }
// Testing the Blockchain
// Created a new blockchain instance
    const myBlockchain = new Blockchain();

// Added dummy blocks to the chain
    console.log('Mining block 1...');
    myBlockchain.addBlock(new Block(1, '27/03/2025', { amount: 100 }));

    console.log('Mining block 2...');
    myBlockchain.addBlock(new Block(2, '28/03/2025', { amount: 50 }));

    console.log('Mining block 3...');
    myBlockchain.addBlock(new Block(3, '29/03/2025', { amount: 200 }));

// Displaying the blockchain
    console.log(JSON.stringify(myBlockchain, null, 4));

// Checking if the blockchain is valid
    console.log('Is blockchain valid?', myBlockchain.isChainValid());

// Tampering with the chain and checking again
    myBlockchain.chain[1].transactions = { amount: 1000 };
    myBlockchain.chain[1].hash = myBlockchain.chain[1].calculateHash();
    console.log('After tampering, is blockchain valid?', myBlockchain.isChainValid());
