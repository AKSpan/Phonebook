/**
 * Created by Alexey on 14.11.2015.
 */
Phonebook.Views.List = Backbone.View.extend({
    template: 'list',
    el: '#content',
    model: null,
    initialize: function () {
        this.render();
    },
    render: function () {
        var that = this;
        $.get("html/" + this.template + ".html", function (template) {
            that.$el.html(template);
        });
        return this;
    },
});