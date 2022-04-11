pragma solidity ^0.8.13;

contract Shop {

	address private owner;

	struct Item {
		uint id;
		address owner;
		uint timeOfPurchase;
	}

	constructor() {
		owner = msg.sender;
	}

	Item[] public items;
	address[] public clients;
	
	receive() external payable {}
	fallback() external payable {}

	function addItem(uint _id, uint _quantity) public {
		require(msg.sender == owner, "Cannot add item. You are not the owner.");
		for(uint i; i < _quantity; i++) {
			items.push(Item(_id, owner, 0));
		}
	}

	function listItems() public view returns(Item[] memory) {
		return items;
	}

	function buyItem(uint _id) public payable {
		require(msg.sender != owner, "You can't buy your own stock.");
		owner.call{value: msg.value}("");
			
		//Transfer shop's item to the client.
		for(uint i; i < items.length; i++) {
			if(items[i].id == _id && items[i].owner == owner && address(this).balance > 0) {
				items[i].owner = msg.sender;
				items[i].timeOfPurchase = block.number;
				clients.push(msg.sender);
				return;
			}
		}
	}

	function returnItem(uint _id, address payable client) public payable {
		require(msg.sender == owner, "You can't just operate with the shop owner's money.");
		client.call{value: msg.value}("");
		
		//Transfer client's item to the shop.
		for(uint i; i < items.length; i++) {
			if (items[i].id == _id && items[i].owner == client && address(this).balance > 0 && block.number - items[i].timeOfPurchase < 100) {
				items[i].owner = owner;
				items[i].timeOfPurchase = 0;
				return;
			}
		}
	}

	function listClients() public view returns(address[] memory) {
		return clients;
	}
}
