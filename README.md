Functionalities of Blockchain Simulation Project
Genesis Block Initialization

The blockchain starts with a predefined "Genesis Block" (block 0) that acts as the initial block in the chain.

Proof-of-Work (PoW)

Each new block is mined using a PoW mechanism, requiring the block's hash to start with a specific number of leading zeros.

Mining becomes more computationally intensive as the difficulty increases.

Mining Difficulty Adjustment

Users can dynamically set the mining difficulty (1 to 6) using an input field on the frontend.

Higher difficulty increases the time it takes to mine a block.

Dynamic Block Addition

When a block is successfully mined, it is automatically added to the blockchain and displayed on the frontend.

Block Structure
Each block contains:

Index: Position in the chain.

Timestamp: Time of block creation.

Transactions: Random dummy transactions (sender, receiver, amount).

Nonce: Value found via PoW to meet the hash requirement.

Hash: Unique SHA-256 hash of the block.

Previous Hash: Links to the hash of the previous block to ensure chain integrity.

Chain Visualization

The entire blockchain is displayed on the frontend, showing all blocks linked together.

Hash-Based Chain Security

Each block is cryptographically linked, making it difficult to tamper with any block without invalidating the entire chain.
