var _ = require('underscore');
var $ = require('jquery');
var scrollBar = require('perfect-scrollbar');
var accessoryCategories = require('./AccessoryCategories');
var CategoryItems;

CategoryItems = module.exports = {

    html: require('../../templates/partials/category-items.jade'),

    container: {},

    render: function() {

        $('body').append(this.html);

        this.container = $('.category_items');

        this.container.perfectScrollbar({
            suppressScrollX: true,
            includePadding: true
        });
    },

    clearData: function() {

        this.container.find('.list').html('');
        this.container.perfectScrollbar('update');
        this.container.hide();
    },

    addData: function(listData) {

        var _this = this;

        _.each(listData, function(item) {

            $(document.createElement("a"))
                .attr({ href: "#" })
                .text(item.displayName)
                .addClass("list_item")
                .data({ "itemID": 123 })
                .appendTo(_this.container.find('.list'))
                .click(_this.chooseItem);
        });

        if(_.size(listData))
            this.container.show();
        else
            this.container.hide();

        this.container.scrollTop(0);
        this.container.perfectScrollbar('update');        
    },

    chooseItem: function(e) {

        console.log('Chose item', $(this).data('itemID'));

        CategoryItems.container.find('.active').removeClass('active');
        $(this).addClass('active');

        accessoryCategories.render();
        accessoryCategories.changeParent($(this).data('itemID'));
    }
};