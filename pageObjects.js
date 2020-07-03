var pageObjects = {
    selectors: {
        searchInput: 'searchinput',
        scripSearchList: '#step5 > div > ul li div',
        subscribedScripsList: '#indexRow',
        individualScrip: 'div.left > span',
        clickOnIndividualScrip: 'div.moreoptions > div.primary-btn.buy-button.ng-scope > span',
        buySellSwitchOnPopUp: 'div.switch span'
    },
    draw: function() {
        console.log('From graph draw function');
    }
}

export default pageObjects;