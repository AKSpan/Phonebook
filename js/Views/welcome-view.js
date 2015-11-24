/**
 * Created by Span on 09.11.2015.
 */
Phonebook.Views.Login = Backbone.View.extend({
    template: 'welcome',
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
    events: {
        "click #login": "login",
        "keyup .login input": "changeInputs",
        "click .choose-inputs": "changeChoose",
        "click #complete-sign-up": "signUp"
    },
    login: function () {
        var that = this;
        var name = this.$el.find("#login-username").val();
        var pass = this.$el.find("#login-pass").val();
        this.model = new Phonebook.Models.Login({user: name, password: pass});

        this.model.save({
                action: 'login'
            },
            {
                success: function (data) {
                    var code = data.get('code');
                    var answer = data.get('answer');
                    if (code >= 400)
                        that.fillInfoPopup('#error-popup', answer, 'img/error.png');
                    else {
                        console.log(data.get('code'))
                        Phonebook.Router.rout.navigate("list", {trigger: true});
                    }
                },
                error: function (data) {
                    console.log('e', data)
                }
            });
    },
    changeChoose: function (data) {
        var currInp = $(data.currentTarget);
        var that = this;
        if (currInp.hasClass("choose-active")) {
            currInp.parents("#choosing").find('input').addClass("choose-active");
            currInp.removeClass("choose-active")
        }
        switch (currInp.attr('id')) {
            case 'choose-sign-up':
                that.$el.find('#login-block').hide();
                that.$el.find('#sign-up-block').show();
                break;
            case 'choose-login':
                that.$el.find('#sign-up-block').hide();
                that.$el.find('#login-block').show();
                break;
        }
    },
    signUp: function () {
        var that = this;
        var name = this.$el.find("#sign-up-username").val();
        var pass = this.$el.find("#sign-up-pass").val();
        var pass2 = this.$el.find("#sign-up-pass2").val();
        if (name.length < 1 || pass.length < 1 || pass2.length < 1)
            this.fillInfoPopup('#error-popup', "Fill the fields");
        else if (pass !== pass2)
            this.fillInfoPopup('#error-popup', "Password mismatch!");
        else {
            this.model = new Phonebook.Models.Login({user: name, password: pass});
            this.model.save({
                    action: 'registration'
                },
                {
                    success: function (data) {
                        var code = data.get('code');
                        var answer = data.get('answer');
                        if (code >= 400)
                            that.fillInfoPopup('#error-popup', answer);
                        else
                            that.fillInfoPopup('#success-popup', answer);
                    },
                    error: function (data) {
                        console.log('e', data)
                        that.fillInfoPopup('#error-popup', name);
                    }
                });
        }
    },
    fillInfoPopup: function (element, text) {
        var that = this;

        that.$el.find(element).fadeIn('slow').delay(4000).fadeOut('slow');
        if (element == '.success-popup')
            that.$el.find('.new-user-nickname').html(text);
        else
            that.$el.find('.popup-text').html(text);

    }
});