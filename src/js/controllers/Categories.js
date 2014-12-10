var _ = require('underscore');
var $ = require('jquery');
var categoryItems = require('./CategoryItems');
var Categories;

Categories = module.exports = {

    html: require('../../templates/partials/categories.jade'),

    container: {},

    _this: this,

    list: [
        'primary',
        'secondary',
        'handgun',
        'uniform',
        'vest',
        'backpack',
        'headgear',
        'goggles',
        'nvgs',
        'binoculars',
        'map',
        'gps',
        'radio',
        'compass',
        'watch'
    ], 

    render: function() {

        var _this = this;

        $('body').append(this.html);

        this.container = $('.main-categories');

        _.each(this.list, function(category) {

            $(document.createElement("a"))
                .attr({ href: "#" })
                .css("background-image", "url(images/categories/" + category + ".png)")
                .addClass("category")
                .addClass(category)
                .data({ "category": category })
                .appendTo(_this.container)
                .click(_this.switchCategory);
        });
    },

    switchCategory: function(e) {

        console.log('Switch category', $(this).data('category'));

        Categories.container.find('.active').removeClass('active');

        $(this).addClass('active');

        categoryItems.clearData();
        categoryItems.addData([
            {
                displayName: "<Empty>"
            },
            {
                displayName: "Testing"
            },
            {
                displayName: "Testing"
            },
            {
                displayName: "Testing"
            },
            {
                displayName: "Testing"
            },
            {
                displayName: "Testing"
            },
            {
                displayName: "Testing"
            },
            {
                displayName: "Testing"
            },
            {
                displayName: "Testing"
            },
            {
                displayName: "Testing"
            },
            {
                displayName: "Testing"
            },
            {
                displayName: "Testing"
            },
            {
                displayName: "Testing"
            },
            {
                displayName: "Testing"
            },
            {
                displayName: "Testing"
            },
            {
                displayName: "Testing"
            }
        ]);
    }
};