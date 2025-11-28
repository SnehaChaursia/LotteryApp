// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleLottery {

    address public owner;          // Contract deployer → manager
    address[] public players;      // Players list

    constructor() {
        owner = msg.sender;        // Deployer becomes owner
    }

    // Players join by sending 0.01 ETH
    function enter() public payable {
        require(msg.value == 0.01 ether, "Send exactly 0.01 ETH to join");
        players.push(msg.sender);
    }

    // Owner picks winner
    function pickWinner() public onlyOwner {
        require(players.length > 0, "No players in lottery");

        uint randomIndex = random() % players.length;
        address winner = players[randomIndex];

        // Transfer contract balance to winner
        payable(winner).transfer(address(this).balance);

        // Reset players array correctly
        delete players;
    }

    // Simple pseudo-random number generator
    function random() private view returns (uint) {
        return uint(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.prevrandao,
                    players.length,
                    msg.sender
                )
            )
        );
    }

    // Owner-only modifier
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }
}