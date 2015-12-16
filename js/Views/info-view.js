/**
 * Created by Alexey on 09.11.2015.
 */
Phonebook.Views.Info = Backbone.View.extend({
    template: 'info',
    el: '#content',
    model: null,
    initialize: function (id) {

        var sendData = {action: "show", id: id.id};
        $.ajax({
            method: "POST",
            url: "/phonebk",
            data: JSON.stringify(sendData),
            success: function (data) {
                console.log('scs data', data)
            }
        });
        this.render();
    },
    render: function () {
        var that = this;
        $.get("html/" + this.template + ".html", function (template) {
            that.$el.html(template);
        });
        return this;
    }
});