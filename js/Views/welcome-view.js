/**
 * Created by Span on 09.11.2015.
 */
Phonebook.Views.Welcome = Backbone.View.extend({
    template: 'welcome',
    el: '#content',
    model: null,
    initialize: function () {
        this.model = new Phonebook.Models.Welcome({name: '', pass: ''});
        this.render();
    },
    render: function () {
        var that = this;
        $.get("html/" + this.template + ".html", function (template) {
            that.$el.html(template);
        });
        return this;
    },
    events: {
        "click #login": "login",
        "keyup .login input": "changeInputs"
    },
    login: function () {
        this.model.save({
                action: 'login'
            },
            {
                success: function (data) {
                    console.log('s', data)
                },
                error: function (data) {
                    console.log('e', data)
                }
            });
    },
    changeInputs: function (data) {
        this.model.set($(data.currentTarget).attr('name'), $(data.currentTarget).val());
    }
});