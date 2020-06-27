
// Search Scrip and make it display pop up
document.getElementById('searchinput').value='ITC'
document.getElementById('searchinput').dispatchEvent(new Event('input', { bubbles: true }))
Array.from(document.querySelectorAll('#step5 > div > ul li div'))
  .find(el => el.textContent === 'ITC').dispatchEvent(new Event('click', { bubbles: true }))
Array.from(document.querySelectorAll('#indexRow'))
  .find(el => el.querySelector('div.left > span').textContent === 'ITC')
  .querySelector('div.moreoptions > div.primary-btn.buy-button.ng-scope > span')
  .dispatchEvent(new Event('click', { bubbles: true }));


// Place order

let placeOrderPopUp = document.querySelector('#mainbody > div.mainview.ng-scope > div.large-popup');

// selects NRML or MIS or CNC
let productsList = placeOrderPopUp.querySelectorAll('div.popup-form div.row div.buy-sell-popup-product div');
let product = Array.from(productsList).find(el => el.querySelector('div span label').textContent === 'CNC'); //NRML or MIS
product.querySelector('div span input').dispatchEvent(new Event('click', { bubbles: true })); // clicks CNC

// Selects LMT or MKT or SL or SL-M
let orderTypesList = placeOrderPopUp.querySelectorAll('div.popup-form div.row div.buy-sell-popup-type div');
let orderType = Array.from(orderTypesList).find(el => el.querySelector('div span label').textContent === 'MKT'); //LMT or MKT or SL or SL-M
orderType.querySelector('div span input').dispatchEvent(new Event('click', { bubbles: true })); // clicks MKT

// Enter Qty, price, Trigger price, Disc.qty
let parentForInputElements = Array.from(placeOrderPopUp.querySelectorAll('div.popup-form div.row.fields div'));
let parentForBoInputElements = Array.from(placeOrderPopUp.querySelectorAll('div.popup-form div.row.bofields div'));

//Enter qty
let qtyInputElement = parentForInputElements.find(el => el.querySelector('div label').textContent.includes('QTY'));
qtyInputElement.querySelector('div input').value = 10

//Enter price
let priceInputElement = parentForInputElements.find(el => el.querySelector('div label').textContent.includes('PRICE ('));
priceInputElement.querySelector('div input').value = 100

//Enter Trigger price
let triggerPriceInputElement = parentForInputElements.find(el => el.querySelector('div label').textContent.includes('TRIGGER PRICE'));
triggerPriceInputElement.querySelector('div input').value = 100

//Enter Disc.qty

let discQtyInputElement = parentForInputElements.find(el => el.querySelector('div label').textContent.includes('DISC. QTY'));
discQtyInputElement.querySelector('div input').value = 100

//STOPLOSS (ABSOLUTE) 
let stopLossAbsoluteInputElement = parentForBoInputElements.find(el => el.querySelector('div label').textContent.includes('STOPLOSS'));
stopLossAbsoluteInputElement.querySelector('div input').value = 100

//TARGET (ABSOLUTE) 
let targetAbsoluteInputElement = parentForBoInputElements.find(el => el.querySelector('div label').textContent.includes('TARGET'));
targetAbsoluteInputElement.querySelector('div input').value = 100

//TRAILING STOPLOSS (ABSOLUTE) 
let TSLAbsoluteInputElement = parentForBoInputElements.find(el => el.querySelector('div label').textContent.includes('TRAILING STOPLOSS'));
TSLAbsoluteInputElement.querySelector('div input').value = 100

// Regular, BO, AMO
let orderOptionsList = placeOrderPopUp.querySelectorAll('div.popup-form div.row div.buy-sell-popup-more div');

//Regular
let regularOrderOptionElement = Array.from(orderOptionsList).find(el => el.querySelector('div span label').textContent === 'Regular');
regularOrderOptionElement.querySelector('div span input').dispatchEvent(new Event('click', { bubbles: true }));

//BO
let boOrderOptionElement = Array.from(orderOptionsList).find(el => el.querySelector('div span label').textContent === 'BO');
boOrderOptionElement.querySelector('div span input').dispatchEvent(new Event('click', { bubbles: true }));

//AMO
let amoOrderOptionElement = Array.from(orderOptionsList).find(el => el.querySelector('div span label').textContent === 'AMO');
amoOrderOptionElement.querySelector('div span input').dispatchEvent(new Event('click', { bubbles: true }));

//Day order option
let dayOrderOptionElement = Array.from(orderOptionsList).find(el => el.querySelector('div span label').textContent === 'DAY');
dayOrderOptionElement.querySelector('div span input').dispatchEvent(new Event('click', { bubbles: true }));

//IOC order option
let iocOrderOptionElement = Array.from(orderOptionsList).find(el => el.querySelector('div span label').textContent === 'IOC');
iocOrderOptionElement.querySelector('div span input').dispatchEvent(new Event('click', { bubbles: true }));

// Click Buy

let placeOrderButtonList = placeOrderPopUp.querySelectorAll('div.popup-form div.row div.more-btns button');

let buyOrderButtonElement = Array.from(placeOrderButtonList).find(el => el.querySelector('button span').textContent === 'BUY')
buyOrderButtonElement.dispatchEvent(new Event('click', { bubbles: true }));