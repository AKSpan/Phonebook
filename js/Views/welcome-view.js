/**
 * Created by Span on 09.11.2015.
 */
Phonebook.Views.Welcome = Backbone.View.extend({
    template: 'welcome',
    el: '#content',
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
        "keyup .login input":"changeInputs"
    },
    login: function () {
        console.log(this.$el.find('input[name="user"]').val())
    },
    changeInputs: function (data) {
        console.log($(data.currentTarget).val())
    }
});