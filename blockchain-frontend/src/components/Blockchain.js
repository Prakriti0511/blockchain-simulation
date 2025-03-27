import React, { useState } from 'react';
import Block from './Block';
import './Blockchain.css';
import { sha256 } from 'js-sha256'; // Install with `npm install js-sha256`

function Blockchain() {
  const [blockchain, setBlockchain] = useState([
    {
      index: 0,
      timestamp: '01/01/2025',
      transactions: 'Genesis Block',
      previousHash: '0',
      nonce: 0,
      hash: sha256('Genesis Block0'),
    },
  ]);

  const [miningDifficulty, setMiningDifficulty] = useState(3); // Number of leading zeros in the hash

  // Proof-of-Work function: Finds a valid nonce
  const proofOfWork = (block) => {
    let nonce = 0;
    let hash = '';
    const target = '0'.repeat(miningDifficulty); // Hash must start with '000...' based on difficulty

    do {
      nonce++;
      hash = sha256(
        block.index + block.timestamp + JSON.stringify(block.transactions) + block.previousHash + nonce
      );
    } while (!hash.startsWith(target)); // Keep incrementing nonce until hash starts with target zeros

    return { nonce, hash };
  };

  // Function to mine and add a new block
  const mineBlock = () => {
    const latestBlock = blockchain[blockchain.length - 1];
    const newBlock = {
      index: latestBlock.index + 1,
      timestamp: new Date().toLocaleString(),
      transactions: { sender: 'User1', receiver: 'User2', amount: Math.floor(Math.random() * 100) },
      previousHash: latestBlock.hash,
    };

    // Find a valid nonce and hash using Proof-of-Work
    const { nonce, hash } = proofOfWork(newBlock);
    newBlock.nonce = nonce;
    newBlock.hash = hash;

    // Update the blockchain with the new block
    setBlockchain([...blockchain, newBlock]);
  };

  return (
    <div className="container">
      <h1>Blockchain Simulation with Proof-of-Work</h1>

      <div className="mining-controls">
        <button onClick={mineBlock} className="mine-button">
          Mine New Block
        </button>
        <div className="difficulty-setting">
          <label>Mining Difficulty: </label>
          <input
            type="number"
            min="1"
            max="6"
            value={miningDifficulty}
            onChange={(e) => setMiningDifficulty(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="blockchain-display">
        {blockchain.map((block, index) => (
          <div className="blockchain-link" key={index}>
            <Block block={block} />
            {index < blockchain.length - 1 && <div className="arrow">➔</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blockchain;
