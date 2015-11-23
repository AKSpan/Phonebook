/**
 * Created by Alexey on 14.11.2015.
 */
Phonebook.Views.List = Backbone.View.extend({
    el: '#contacts',
    template: '',
    collection:null,
    initialize: function () {
        this.template = _.template($('#list-template').html());
        this.renderListContact();
    },
    renderListContact: function () {
        var that = this;
        this.collection = new Phonebook.Collections.Contacts();

        this.collection.fetch({
            success: function () {
                that.collection.each(function (field) {
                   that.renderOneContact(field)
                });
            },
            error: function() {
                console.log('Failed to fetch!');
            }
        });
    },
    renderOneContact: function (contact) {
        this.$el.append(this.template(contact.toJSON()));
    }
});
Phonebook.Views.LoadList = Backbone.View.extend({
    url_name: 'list',
    el: '#content',
    model: null,
    initialize: function () {
        this.render();

    },
    render: function () {
        var that = this;
        $.ajax({
            url: "html/" + this.url_name + ".html",
            success: function (template) {
                that.$el.html(template);
            },
            async: false
        });
        new Phonebook.Views.List();
    }
});
