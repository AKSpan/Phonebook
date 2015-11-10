/**
 * Created by Alexey on 09.11.2015.
 */
Phonebook.Views.Info = Backbone.View.extend({
    template: 'info',
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