const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Owner operations", () => {
	let shop;
	
	beforeEach(async () => {
		const Shop = await ethers.getContractFactory("Shop");
		shop = await Shop.deploy();

		await shop.deployed();

	});

	it("List non-existent item", async () => {
		expect(await shop.listItems(1)).to.equal(0);
	});
	it("Add item for the first time", async () => {
		await shop.addItem(1, 3);
		expect(await shop.listItems(1)).to.equal(3);
	});

	it("Add to present item", async () => {
		await shop.addItem(1, 3);
		await shop.addItem(1, 5);
		expect(await shop.listItems(1)).to.equal(8);
	});
});

describe("Client operations", () => {
	let shop;

	beforeEach(async () => {
		const Shop = await ethers.getContractFactory("Shop");
		shop = await Shop.deploy();

		await shop.deployed();
	});

	it("Buy item", async () => {
		const [owner, buyer] = await ethers.getSigners();

		await shop.addItem(1, 3);
		await shop.connect(buyer).buyItem(1);
		expect(await shop.listItems(1)).to.equal(2);
		expect(await shop.listClientItems(buyer.address, 1)).to.equal(1);
	});

	it("Return Item", async () => {
		const [owner, buyer] = await ethers.getSigners();

		// Under 100 units of block time
		await shop.addItem(1, 3);
		await shop.connect(buyer).buyItem(1);
		await shop.connect(buyer).returnItem(1);
		expect(await shop.listItems(1)).to.equal(3);
		expect(await shop.listClientItems(buyer.address, 1)).to.equal(0);

		// Over 100 units of block time;
		await shop.connect(buyer).buyItem(1);
		for(let i = 2; i < 102; i++) {
			await shop.addItem(i, 1);
			await shop.connect(buyer).buyItem(i);
		}
		expect(await shop.listItems(1)).to.equal(2);
	});

	it("List all clients", async () => {
		const [owner, buyer1, buyer2] = await ethers.getSigners();
		
		await shop.addItem(1, 3);
		await shop.connect(buyer1).buyItem(1);
		await shop.connect(buyer2).buyItem(1);
		expect(await shop.listClients()).to.eql([buyer1.address, buyer2.address]);
	});
});
