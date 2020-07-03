// import { pageObjects } from './my-module.js';

console.log("Hi from fireOrder script");
// Search Scrip and make it display pop up
// document.getElementById('searchinput').value='ITC'
// document.getElementById('searchinput').dispatchEvent(new Event('input', { bubbles: true }))
// Array.from(document.querySelectorAll('#step5 > div > ul li div'))
//   .find(el => el.textContent === 'ITC').dispatchEvent(new Event('click', { bubbles: true }))
// Array.from(document.querySelectorAll('#indexRow'))
//   .find(el => el.querySelector('div.left > span').textContent === 'ITC')
//   .querySelector('div.moreoptions > div.primary-btn.buy-button.ng-scope > span')
//   .dispatchEvent(new Event('click', { bubbles: true }));


// // Place order

// let placeOrderPopUp = document.querySelector('#mainbody > div.mainview.ng-scope > div.large-popup');

// // By default its buy
// //switch between buy and sell
// placeOrderPopUp.querySelector('div.switch span').click();

// // selects NRML or MIS or CNC
// let productsList = placeOrderPopUp.querySelectorAll('div.popup-form div.row div.buy-sell-popup-product div');
// let product = Array.from(productsList).find(el => el.querySelector('div span label').textContent === 'CNC'); //NRML or MIS
// product.querySelector('div span input').dispatchEvent(new Event('click', { bubbles: true })); // clicks CNC

// // Selects LMT or MKT or SL or SL-M
// let orderTypesList = placeOrderPopUp.querySelectorAll('div.popup-form div.row div.buy-sell-popup-type div');
// let orderType = Array.from(orderTypesList).find(el => el.querySelector('div span label').textContent === 'MKT'); //LMT or MKT or SL or SL-M
// orderType.querySelector('div span input').dispatchEvent(new Event('click', { bubbles: true })); // clicks MKT

// // Enter Qty, price, Trigger price, Disc.qty
// let parentForInputElements = Array.from(placeOrderPopUp.querySelectorAll('div.popup-form div.row.fields div'));
// let parentForBoInputElements = Array.from(placeOrderPopUp.querySelectorAll('div.popup-form div.row.bofields div'));

// //Enter qty
// let qtyInputElement = parentForInputElements.find(el => el.querySelector('div label').textContent.includes('QTY'));
// qtyInputElement.querySelector('div input').value = 10

// //Enter price
// let priceInputElement = parentForInputElements.find(el => el.querySelector('div label').textContent.includes('PRICE ('));
// priceInputElement.querySelector('div input').value = 100

// //Enter Trigger price
// let triggerPriceInputElement = parentForInputElements.find(el => el.querySelector('div label').textContent.includes('TRIGGER PRICE'));
// triggerPriceInputElement.querySelector('div input').value = 100

// //Enter Disc.qty

// let discQtyInputElement = parentForInputElements.find(el => el.querySelector('div label').textContent.includes('DISC. QTY'));
// discQtyInputElement.querySelector('div input').value = 100

// //STOPLOSS (ABSOLUTE)
// let stopLossAbsoluteInputElement = parentForBoInputElements.find(el => el.querySelector('div label').textContent.includes('STOPLOSS'));
// stopLossAbsoluteInputElement.querySelector('div input').value = 100

// //TARGET (ABSOLUTE)
// let targetAbsoluteInputElement = parentForBoInputElements.find(el => el.querySelector('div label').textContent.includes('TARGET'));
// targetAbsoluteInputElement.querySelector('div input').value = 100

// //TRAILING STOPLOSS (ABSOLUTE)
// let TSLAbsoluteInputElement = parentForBoInputElements.find(el => el.querySelector('div label').textContent.includes('TRAILING STOPLOSS'));
// TSLAbsoluteInputElement.querySelector('div input').value = 100

// // Regular, BO, AMO
// let orderOptionsList = placeOrderPopUp.querySelectorAll('div.popup-form div.row div.buy-sell-popup-more div');

// //Regular
// let regularOrderOptionElement = Array.from(orderOptionsList).find(el => el.querySelector('div span label').textContent === 'Regular');
// regularOrderOptionElement.querySelector('div span input').dispatchEvent(new Event('click', { bubbles: true }));

// //BO
// let boOrderOptionElement = Array.from(orderOptionsList).find(el => el.querySelector('div span label').textContent === 'BO');
// boOrderOptionElement.querySelector('div span input').dispatchEvent(new Event('click', { bubbles: true }));

// //AMO
// let amoOrderOptionElement = Array.from(orderOptionsList).find(el => el.querySelector('div span label').textContent === 'AMO');
// amoOrderOptionElement.querySelector('div span input').dispatchEvent(new Event('click', { bubbles: true }));

// //Day order option
// let dayOrderOptionElement = Array.from(orderOptionsList).find(el => el.querySelector('div span label').textContent === 'DAY');
// dayOrderOptionElement.querySelector('div span input').dispatchEvent(new Event('click', { bubbles: true }));

// //IOC order option
// let iocOrderOptionElement = Array.from(orderOptionsList).find(el => el.querySelector('div span label').textContent === 'IOC');
// iocOrderOptionElement.querySelector('div span input').dispatchEvent(new Event('click', { bubbles: true }));

// // Click Buy

// let placeOrderButtonList = placeOrderPopUp.querySelectorAll('div.popup-form div.row div.more-btns button');

// let buyOrderButtonElement = Array.from(placeOrderButtonList).find(el => el.querySelector('button span').textContent === 'BUY')
// buyOrderButtonElement.dispatchEvent(new Event('click', { bubbles: true }));


const pageObjects = {
	selectors: {
		searchInput: 'searchinput',
		scripSearchList: '#step5 > div > ul li div',
		subscribedScripsList: '#indexRow',
		individualScrip: 'div.left > span',
		clickOnIndividualScrip: 'div.moreoptions > div.primary-btn.buy-button.ng-scope > span',
		buySellSwitchOnPopUp: 'div.switch span',
		placeOrderPopUp: '#mainbody > div.mainview.ng-scope > div.large-popup',
		insidePlaceOrderPopUp: {
			buySellSwitch: 'div.switch span',
			productsListDiv: 'div.popup-form div.row div.buy-sell-popup-product div',
			productLabel: 'div span label',
			productRadioButton: 'div span input',
			orderOptionListDiv: 'div.popup-form div.row div.buy-sell-popup-more div',
			orderOptionLabel: 'div span label',
			orderOptionRadioButton: 'div span input',
			orderTypesListDiv: 'div.popup-form div.row div.buy-sell-popup-type div',
			orderTypeLabel: 'div span label',
			orderTypeRadioButton: 'div span input',
		}
	},
	checkElement: async (selector, refNode = document) => {
		while (refNode.querySelector(selector) === null) {
			await new Promise(resolve => requestAnimationFrame(resolve))
		}
		return refNode.querySelector(selector);
	},
	checkElements: async (selector, waitCondition = ((refNode, selector) => refNode.querySelectorAll(selector).length === 0), refNode = document) => {
		console.log('Inside check elements');
		console.log(refNode.querySelectorAll(selector));
		while (waitCondition(refNode, selector)) {
			await new Promise(resolve => requestAnimationFrame(resolve))
		}
		return refNode.querySelectorAll(selector);
	}
};


// CNC or NRML or MIS

// LMT and REGULAR
//   QTY
//   PRICE
//   DISC.QTY
//   AMO
//   DAY Or IOC


//   CNC or NRML or MIS

//   MKT
//     QTY
//     DISC.QTY
//     REGULAR
//     DAY Or IOC

// enter CNC or mis or nrml
// enter regular or bo or amo
// enter lmt or mkt or sl or slm
// enter qty, price, trig price, dis.qty based on what is enabled

searchScripAndDisplayPopUp('ITC')
	.then(r => cncNormalMIS('MIS')
		.then(a => regularBoAmo('Regular')
			.then(b => lmtMktSlSlm('MKT'))));
// cncNormalMIS('MIS');
// regularBoAmo('Regular');
// lmtMktSlSlm('MKT')
// qtyAndPrice('MKT', 1, 0, 0, 0);

// checkElement('body') //use whichever selector you want
// .then((element) => {
//      console.info(element);
//      //Do whatever you want now the element is there
// });

async function searchScripAndDisplayPopUp(scripName, type = 'BUY') {
		// Search Scrip and make it display pop up
		document.getElementById(pageObjects.selectors.searchInput).value = scripName; //ITC
		await document.getElementById(pageObjects.selectors.searchInput).dispatchEvent(new Event('input', {
			bubbles: true
		}));
		await pageObjects.checkElements(pageObjects.selectors.scripSearchList,
				(refNode, selector) => Array.from(refNode.querySelectorAll(selector)).find(el => el.textContent === scripName) === undefined)
			.then((elements) => Array.from(elements)
				.find(el => el.textContent === scripName)
				.dispatchEvent(new Event('click', {
					bubbles: true
				}))
			);
		await pageObjects.checkElements(pageObjects.selectors.subscribedScripsList,
			(refNode, selector) => Array.from(refNode.querySelectorAll(selector)).find(el => el.querySelector(pageObjects.selectors.individualScrip).textContent === scripName) === undefined)
			.then((elements) => Array.from(elements)
				.find(el => el.querySelector(pageObjects.selectors.individualScrip).textContent === 'ITC')
				.querySelector(pageObjects.selectors.clickOnIndividualScrip)
				.dispatchEvent(new Event('click', {
					bubbles: true
				}))
			);
		if(type === 'SELL'){
			await pageObjects.checkElement(pageObjects.selectors.placeOrderPopUp)
				.then(element => element.querySelector(pageObjects.selectors.insidePlaceOrderPopUp.buySellSwitch).click());
		}
}

async function cncNormalMIS(type) {
	let placeOrderPopUp = document.querySelector(pageObjects.selectors.placeOrderPopUp);
	// selects NRML or MIS or CNC
	let productsList = placeOrderPopUp.querySelectorAll(pageObjects.selectors.insidePlaceOrderPopUp.productsListDiv);
	let product = Array.from(productsList)
		.find(el => el.querySelector(pageObjects.selectors.insidePlaceOrderPopUp.productLabel)
			.textContent === type); //CNC or NRML or MIS
	await product.querySelector(pageObjects.selectors.insidePlaceOrderPopUp.productRadioButton)
		.dispatchEvent(new Event('click', {
			bubbles: true
		}));
}

async function regularBoAmo(type) {
	let placeOrderPopUp = document.querySelector(pageObjects.selectors.placeOrderPopUp);
	// Regular, BO, AMO
	let orderOptionsList = placeOrderPopUp.querySelectorAll(pageObjects.selectors.insidePlaceOrderPopUp.orderOptionListDiv);
	let orderOptionElement = Array.from(orderOptionsList)
		.find(el => el.querySelector(pageObjects.selectors.insidePlaceOrderPopUp.orderOptionLabel)
			.textContent === type);
	await orderOptionElement.querySelector(pageObjects.selectors.insidePlaceOrderPopUp.orderOptionRadioButton)
		.dispatchEvent(new Event('click', {
			bubbles: true
		}));
}

async function lmtMktSlSlm(type) {
	let placeOrderPopUp = document.querySelector(pageObjects.selectors.placeOrderPopUp);
	// Selects LMT or MKT or SL or SL-M
	let orderTypesList = placeOrderPopUp.querySelectorAll(pageObjects.selectors.insidePlaceOrderPopUp.orderTypesListDiv);
	let orderType = Array.from(orderTypesList)
		.find(el => el.querySelector(pageObjects.selectors.insidePlaceOrderPopUp.orderTypeLabel)
			.textContent === type); //LMT or MKT or SL or SL-M
	await orderType.querySelector(pageObjects.selectors.insidePlaceOrderPopUp.orderTypeRadioButton)
		.dispatchEvent(new Event('click', {
			bubbles: true
		}));
}

function qtyAndPrice(type, qty, price, trigPrice, discQty) {
	let placeOrderPopUp = document.querySelector('#mainbody > div.mainview.ng-scope > div.large-popup');
	// Enter Qty, price, Trigger price, Disc.qty
	let parentForInputElements = Array.from(placeOrderPopUp.querySelectorAll('div.popup-form div.row.fields div'));
	//Enter qty
	let qtyInputElement = parentForInputElements.find(el => el.querySelector('div label')
		.textContent.includes('QTY'));
	qtyInputElement.querySelector('div input')
		.value = qty;
	//Enter price
	if (!(type === 'MKT')) {
		let priceInputElement = parentForInputElements.find(el => el.querySelector('div label')
			.textContent.includes('PRICE ('));
		priceInputElement.querySelector('div input')
			.value = price;
	}
	//Enter Trigger price
	if (type === 'SL' || type === 'SLM') {
		let triggerPriceInputElement = parentForInputElements.find(el => el.querySelector('div label')
			.textContent.includes('TRIGGER PRICE'));
		triggerPriceInputElement.querySelector('div input')
			.value = trigPrice;
	}
	//Enter Disc.qty
	let discQtyInputElement = parentForInputElements.find(el => el.querySelector('div label')
		.textContent.includes('DISC. QTY'));
	discQtyInputElement.querySelector('div input')
		.value = discQty;
}

function boAdditionalDetails(sl, target, tsl) {
	let placeOrderPopUp = document.querySelector('#mainbody > div.mainview.ng-scope > div.large-popup');
	let parentForBoInputElements = Array.from(placeOrderPopUp.querySelectorAll('div.popup-form div.row.bofields div'));
	//STOPLOSS (ABSOLUTE)
	let stopLossAbsoluteInputElement = parentForBoInputElements.find(el => el.querySelector('div label')
		.textContent.includes('STOPLOSS'));
	stopLossAbsoluteInputElement.querySelector('div input')
		.value = sl;
	//TARGET (ABSOLUTE)
	let targetAbsoluteInputElement = parentForBoInputElements.find(el => el.querySelector('div label')
		.textContent.includes('TARGET'));
	targetAbsoluteInputElement.querySelector('div input')
		.value = target;
	//TRAILING STOPLOSS (ABSOLUTE)
	let TSLAbsoluteInputElement = parentForBoInputElements.find(el => el.querySelector('div label')
		.textContent.includes('TRAILING STOPLOSS'));
	TSLAbsoluteInputElement.querySelector('div input')
		.value = tsl;
}

function dayOrIOC(sl, target, tsl) {
	let placeOrderPopUp = document.querySelector('#mainbody > div.mainview.ng-scope > div.large-popup');
	let orderOptionsList = placeOrderPopUp.querySelectorAll('div.popup-form div.row div.buy-sell-popup-more div');
	//Day order option
	let dayOrderOptionElement = Array.from(orderOptionsList)
		.find(el => el.querySelector('div span label')
			.textContent === 'DAY');
	dayOrderOptionElement.querySelector('div span input')
		.dispatchEvent(new Event('click', {
			bubbles: true
		}));

	//IOC order option
	let iocOrderOptionElement = Array.from(orderOptionsList)
		.find(el => el.querySelector('div span label')
			.textContent === 'IOC');
	iocOrderOptionElement.querySelector('div span input')
		.dispatchEvent(new Event('click', {
			bubbles: true
		}));
}

function buyOrSell(type) {
	let placeOrderPopUp = document.querySelector('#mainbody > div.mainview.ng-scope > div.large-popup');
	let placeOrderButtonList = placeOrderPopUp.querySelectorAll('div.popup-form div.row div.more-btns button');

	let buyOrderButtonElement = Array.from(placeOrderButtonList)
		.find(el => el.querySelector('button span')
			.textContent === type) //BUY or SELL
	buyOrderButtonElement.dispatchEvent(new Event('click', {
		bubbles: true
	}));
}