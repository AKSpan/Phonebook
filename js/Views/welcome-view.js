/**
 * Created by Span on 09.11.2015.
 */
Phonebook.Views.Login = Backbone.View.extend({
    template: 'welcome',
    el: '#content',
    model: null,
    initialize: function () {
        this.model = new Phonebook.Models.Login({name: '', pass: ''});
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
        "keyup .login input": "changeInputs",
        "click .choose-inputs": "changeChoose"
    },
    login: function () {
        this.model.save({
                action: 'login'
            },
            {
                success: function (data) {
                    Phonebook.Router.rout.navigate("list", {trigger: true});
                    console.log('s', data)
                },
                error: function (data) {
                    console.log('e', data)
                }
            });
    },
    changeInputs: function (data) {
        this.model.set($(data.currentTarget).attr('name'), $(data.currentTarget).val());
    },
    changeChoose: function (data) {
        var currInp = $(data.currentTarget);
        var that = this;
        if (currInp.hasClass("choose-active")) {
            currInp.parents("#choosing").find('input').addClass("choose-active");
            currInp.removeClass("choose-active")
        }
        switch (currInp.attr('id'))
        {
            case 'choose-sign-up':
                $.get("html/signup.html", function (template) {
                    that.$el.find('.login').html(template);
                });
                break;
            case 'choose-login':
                $.get("html/login.html", function (template) {
                    that.$el.find('.login').html(template);
                });
                break;
        }
    }
});