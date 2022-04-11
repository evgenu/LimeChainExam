const { expect } = require('chai');
const { network, ethers } = require('hardhat');

describe("Owner Tests", () => {
	it("Add items and list items", async () => {
	//	await network.provider.request({
  	//		method: "hardhat_impersonateAccount",
  	//		params: ["0x70997970c51812dc3a010c7d01b50e0d17dc79c8"],
	//	});

		const Shop = await ethers.getContractFactory("Shop");
		const shop = await Shop.deploy();

		await shop.addItem(1, 1);

		expect(await shop.listItems(), `[
				  [
				    BigNumber { value: "1" },
				    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
				    BigNumber { value: "0" },
				    id: BigNumber { value: "1" },
				    owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
				    timeOfPurchase: BigNumber { value: "0" }
				  ]
				]`
		);

		await shop.addItem(2, 2);

		expect(await shop.listItems(), `[
				  [
				    BigNumber { value: "1" },
				    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
				    BigNumber { value: "0" },
				    id: BigNumber { value: "1" },
				    owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
				    timeOfPurchase: BigNumber { value: "0" }
				  ],
				  [
				    BigNumber { value: "2" },
				    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
				    BigNumber { value: "0" },
				    id: BigNumber { value: "2" },
				    owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
				    timeOfPurchase: BigNumber { value: "0" }
				  ],
				  [
				    BigNumber { value: "2" },
				    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
				    BigNumber { value: "0" },
				    id: BigNumber { value: "2" },
				    owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
				    timeOfPurchase: BigNumber { value: "0" }
				  ]
				]`
		);


		await shop.addItem(1, 1);

		expect(await shop.listItems(), `[
	
				  [
				    BigNumber { value: "1" },
				    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
				    BigNumber { value: "0" },
				    id: BigNumber { value: "1" },
				    owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
				    timeOfPurchase: BigNumber { value: "0" }
				  ],
				  [
				    BigNumber { value: "2" },
				    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
				    BigNumber { value: "0" },
				    id: BigNumber { value: "2" },
				    owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
				    timeOfPurchase: BigNumber { value: "0" }
				  ],
				  [
				    BigNumber { value: "2" },
				    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
				    BigNumber { value: "0" },
				    id: BigNumber { value: "2" },
				    owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
				    timeOfPurchase: BigNumber { value: "0" }
				  ],
				  [
				    BigNumber { value: "1" },
				    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
				    BigNumber { value: "0" },
				    id: BigNumber { value: "1" },
				    owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
				    timeOfPurchase: BigNumber { value: "0" }
				  ]
				]`
		);
	});
	
});
