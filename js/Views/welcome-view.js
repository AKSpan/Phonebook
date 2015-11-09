/**
 * Created by Span on 09.11.2015.
 */
Phonebook.Views.Welcome = Backbone.View.extend({
    template: 'welcome',
    el: '#content',
    model: Phonebook.Models.Welcome,
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
        "keyup .login input": "changeInputs"
    },
    login: function () {
        //console.log("l", this.$el.find('input[name="user"]').val())
       // console.log("p", this.$el.find('input[name="password"]').val())
        this.model = new Phonebook.Models.Welcome({
            user: this.$el.find('input[name="user"]').val(),
            pass: this.$el.find('input[name="password"]').val()
        });
        console.log('r',Phonebook.Router.rout)

       Phonebook.Router.rout.navigate('list',{trigger:true});

    },
    changeInputs: function (data) {
       // console.log($(data.currentTarget).val())
    }
});