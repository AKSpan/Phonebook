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
        var name = this.$el.find("#login-username").val();
        var pass = this.$el.find("#login-pass").val();
        this.model = new Phonebook.Models.Login({user: name, password: pass});

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
    /* changeInputs: function (data) {
     this.model.set($(data.currentTarget).attr('name'), $(data.currentTarget).val());
     console.log(this.model)
     },*/
    changeChoose: function (data) {
        var currInp = $(data.currentTarget);
        var that = this;
        if (currInp.hasClass("choose-active")) {
            currInp.parents("#choosing").find('input').addClass("choose-active");
            currInp.removeClass("choose-active")
        }
        switch (currInp.attr('id')) {
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
    },
    signUp: function () {
var that = this;
        var name = this.$el.find("#sign-up-username").val();
        var pass = this.$el.find("#sign-up-pass").val();
        var pass2 = this.$el.find("#sign-up-pass2").val();
        if (name.length < 1 || pass.length < 1 || pass2.length < 1)
            alert("Fill the fields");
        else if (pass !== pass2)
            alert("Password mismatch!");
        else {
            this.model = new Phonebook.Models.Login({user: name, password: pass});
            this.model.save({
                    action: 'registration'
                },
                {
                    success: function (data) {
                        $.get("html/popup.html", function (template) {
                            that.$el.find('#info-popup').html(template);
                            that.$el.find('#info-popup').fadeIn('slow');
                            that.$el.find('#new-user-nickname').html(name);
                            that.$el.find('#popup-reg-result').attr('src','img/done.png');
                        });
                    },
                    error: function (data) {
                        console.log('e', data)
                        $.get("html/popup.html", function (template) {
                            console.log(that.$el.find('#info-popup'))
                            that.$el.find('#info-popup').html(template);
                            that.$el.find('new-user-nickname').html(name);
                        });
                    }
                });
        }
    }
});