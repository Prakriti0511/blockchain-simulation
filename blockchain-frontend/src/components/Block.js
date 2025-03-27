import React from 'react';

function Block({ block }) {
  return (
    <div className="block-container">
      <h3>Block {block.index}</h3>
      <p><strong>Timestamp:</strong> {block.timestamp}</p>
      <p><strong>Transactions: </strong> {JSON.stringify(block.transactions)}</p>
      <p><strong>Nonce:</strong> {block.nonce}</p>
      <p><strong>Previous Hash:</strong> {block.previousHash}</p>
      <p><strong>Hash:</strong> {block.hash}</p>
    </div>
  );
}

export default Block;
