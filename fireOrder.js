// import { pageObjects } from './my-module.js';

console.log("Hi from fireOrder script");
console.log(fireOrderParams);
fireOrderParams.scrips.forEach(element => {
	placeOrder(JSON.parse(element));
});
function pageObjects() {
	return {
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
				parentForQtyPriceElements: 'div.popup-form div.row.fields div',
				parentForBoInputElements: 'div.popup-form div.row.bofields div',
				orderOptionsListDiv: 'div.popup-form div.row div.buy-sell-popup-more div',
				placeOrderButtonListDiv: 'div.popup-form div.row div.more-btns button'
			}
		},
		checkElement: async (selector, refNode = document) => {
			console.log('Inside checkElement');
			console.log(refNode.querySelector(selector));
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
	}
}
async function searchScripAndDisplayPopUp(scripName, type = 'BUY') {
	console.log('Inside searchScripAndDisplayPopUp');
	// Search Scrip and make it display pop up
	document.getElementById(pageObjects().selectors.searchInput).value = scripName; //ITC
	await document.getElementById(pageObjects().selectors.searchInput).dispatchEvent(new Event('input', {
		bubbles: true
	}));
	await pageObjects().checkElements(pageObjects().selectors.scripSearchList,
		(refNode, selector) => Array.from(refNode.querySelectorAll(selector)).find(el => el.textContent === scripName) === undefined)
		.then((elements) => Array.from(elements)
			.find(el => el.textContent === scripName)
			.dispatchEvent(new Event('click', {
				bubbles: true
			}))
		);
	await pageObjects().checkElements(pageObjects().selectors.subscribedScripsList,
		(refNode, selector) => Array.from(refNode.querySelectorAll(selector)).find(el => el.querySelector(pageObjects().selectors.individualScrip).textContent === scripName) === undefined)
		.then((elements) => Array.from(elements)
			.find(el => el.querySelector(pageObjects().selectors.individualScrip).textContent === scripName)
			.querySelector(pageObjects().selectors.clickOnIndividualScrip)
			.dispatchEvent(new Event('click', {
				bubbles: true
			}))
		);
	if (type === 'SELL') {
		await new Promise(r => setTimeout(r, 500));
		await pageObjects().checkElement(pageObjects().selectors.placeOrderPopUp)
			.then(element => pageObjects().checkElement(pageObjects().selectors.insidePlaceOrderPopUp.buySellSwitch, element)
				.then(elem => elem.click()));
	}
}

async function cncNormalMIS(type) {
	console.log('Inside cncNormalMIS');
	let placeOrderPopUp = document.querySelector(pageObjects().selectors.placeOrderPopUp);
	// selects NRML or MIS or CNC
	let productsList = placeOrderPopUp.querySelectorAll(pageObjects().selectors.insidePlaceOrderPopUp.productsListDiv);
	let product = Array.from(productsList)
		.find(el => el.querySelector(pageObjects().selectors.insidePlaceOrderPopUp.productLabel)
			.textContent === type); //CNC or NRML or MIS
	await new Promise(r => setTimeout(r, 1000));
	product.querySelector(pageObjects().selectors.insidePlaceOrderPopUp.productRadioButton).click();
}

async function regularBoAmo(type) {
	console.log('Inside regularBoAmo');
	let placeOrderPopUp = document.querySelector(pageObjects().selectors.placeOrderPopUp);
	// Regular, BO, AMO
	let orderOptionsList = placeOrderPopUp.querySelectorAll(pageObjects().selectors.insidePlaceOrderPopUp.orderOptionListDiv);
	let orderOptionElement = Array.from(orderOptionsList)
		.find(el => el.querySelector(pageObjects().selectors.insidePlaceOrderPopUp.orderOptionLabel)
			.textContent === type);
	await new Promise(r => setTimeout(r, 500));
	orderOptionElement.querySelector(pageObjects().selectors.insidePlaceOrderPopUp.orderOptionRadioButton).click();
}

async function lmtMktSlSlm(type) {
	console.log('Inside lmtMktSlSlm');
	let placeOrderPopUp = document.querySelector(pageObjects().selectors.placeOrderPopUp);
	// Selects LMT or MKT or SL or SL-M
	let orderTypesList = placeOrderPopUp.querySelectorAll(pageObjects().selectors.insidePlaceOrderPopUp.orderTypesListDiv);
	let orderType = Array.from(orderTypesList)
		.find(el => el.querySelector(pageObjects().selectors.insidePlaceOrderPopUp.orderTypeLabel)
			.textContent === type); //LMT or MKT or SL or SL-M
	await new Promise(r => setTimeout(r, 500));
	orderType.querySelector(pageObjects().selectors.insidePlaceOrderPopUp.orderTypeRadioButton).click();
}

async function qtyAndPrice(type, qty, price, trigPrice, discQty) {
	console.log('Inside qtyAndPrice');
	let placeOrderPopUp = document.querySelector(pageObjects().selectors.placeOrderPopUp);
	// Enter Qty, price, Trigger price, Disc.qty
	let parentForInputElements = Array.from(placeOrderPopUp.querySelectorAll(pageObjects().selectors.insidePlaceOrderPopUp.parentForQtyPriceElements));
	//Enter qty
	let qtyInputElement = parentForInputElements.find(el => el.querySelector('div label').textContent.includes('QTY'));
	qtyInputElement.querySelector('div input').value = qty;
	//Enter price
	if (!(type === 'MKT') && !(type === 'SLM')) {
		let priceInputElement = parentForInputElements.find(el => el.querySelector('div label').textContent.includes('PRICE ('));
		priceInputElement.querySelector('div input').value = price;
	}
	//Enter Trigger price
	if (type === 'SL' || type === 'SLM') {
		let triggerPriceInputElement = parentForInputElements.find(el => el.querySelector('div label').textContent.includes('TRIGGER PRICE'));
		triggerPriceInputElement.querySelector('div input').value = trigPrice;
	}
	//Enter Disc.qty
	let discQtyInputElement = parentForInputElements.find(el => el.querySelector('div label').textContent.includes('DISC. QTY'));
	discQtyInputElement.querySelector('div input').value = discQty;
}

async function boAdditionalDetails(sl, target, tsl) {
	console.log('Inside boAdditionalDetails');
	let placeOrderPopUp = document.querySelector(pageObjects().selectors.placeOrderPopUp);
	let parentForBoInputElements = Array.from(placeOrderPopUp.querySelectorAll(pageObjects().selectors.insidePlaceOrderPopUp.parentForBoInputElements));
	//STOPLOSS (ABSOLUTE)
	let stopLossAbsoluteInputElement = parentForBoInputElements.find(el => el.querySelector('div label').textContent.includes('STOPLOSS'));
	stopLossAbsoluteInputElement.querySelector('div input').value = sl;
	//TARGET (ABSOLUTE)
	let targetAbsoluteInputElement = parentForBoInputElements.find(el => el.querySelector('div label').textContent.includes('TARGET'));
	targetAbsoluteInputElement.querySelector('div input').value = target;
	//TRAILING STOPLOSS (ABSOLUTE)
	let TSLAbsoluteInputElement = parentForBoInputElements.find(el => el.querySelector('div label').textContent.includes('TRAILING STOPLOSS'));
	TSLAbsoluteInputElement.querySelector('div input').value = tsl;
}

async function dayOrIOC(type) {
	console.log('Inside dayOrIOC');
	let placeOrderPopUp = document.querySelector(pageObjects().selectors.placeOrderPopUp);
	let orderOptionsList = placeOrderPopUp.querySelectorAll(pageObjects().selectors.insidePlaceOrderPopUp.orderOptionsListDiv);
	//Day order option
	let dayOrderOptionElement = Array.from(orderOptionsList).find(el => el.querySelector('div span label')
			.textContent === type);// DAY or IOC
	dayOrderOptionElement.querySelector('div span input')
		.dispatchEvent(new Event('click', {
			bubbles: true
		}));
}

async function buyOrSell(type) {
	console.log('Inside buyOrSell');
	let placeOrderPopUp = document.querySelector(pageObjects().selectors.placeOrderPopUp);
	let placeOrderButtonList = placeOrderPopUp.querySelectorAll(pageObjects().selectors.insidePlaceOrderPopUp.placeOrderButtonListDiv);

	let buyOrderButtonElement = Array.from(placeOrderButtonList).find(el => el.querySelector('button span')
		.textContent === type); //BUY or SELL
	await new Promise(r => setTimeout(r, 1000));
	buyOrderButtonElement.dispatchEvent(new Event('click', {
		bubbles: true
	}));
}

function placeOrder(params) {
	console.log('Inside placeOrder');
	console.log(params);
	let regularBoAmoOrder = 'Regular';
	searchScripAndDisplayPopUp(params.scripName, params.buyOrSell)
		.then(r => cncNormalMIS('MIS'))
		.then(a => regularBoAmo(regularBoAmoOrder))
		.then(b => lmtMktSlSlm('MKT'))
		.then(c => qtyAndPrice('MKT', params.scripQty, 100, params.scripEntryPrice, 1))
		.then(d => regularBoAmoOrder === 'BO' ? boAdditionalDetails(5, 5, 2) : Promise.resolve())
		.then(e => dayOrIOC('IOC'))
		.then(f => buyOrSell(params.buyOrSell));
}