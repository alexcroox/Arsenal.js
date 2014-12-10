var _ = require('underscore');
var $ = require('jquery');
var AccessoryCategories;

AccessoryCategories = module.exports = {

    html: require('../../templates/partials/accessory-categories.jade'),

    container: {},

    _this: this,

    list: [], 

    render: function() {

        var _this = this;
        
        if(!this.container.length)
            $('body').append(this.html);

        this.container = $('.accessory-categories');
    },

    changeParent: function(itemID) {

        console.log('Chaning accessory parent', itemID);
    }
};