/**
 * Created by Span on 09.11.2015.
 */
Phonebook.Views.Welcome = Backbone.View.extend({
    template: 'welcome',
    el: '#content',
    model: null,
    initialize: function () {
        this.model = new Phonebook.Models.Welcome();
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
        console.log('model', this.model);
        if (this.model.has('user') && this.model.get('user') == 'Span')
            Phonebook.Router.rout.navigate('info', {trigger: true});
        else
            alert('deny')
    },
    changeInputs: function (data) {
        this.model.set($(data.currentTarget).attr('name'), $(data.currentTarget).val());
    }
});