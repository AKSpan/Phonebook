/**
 * Created by Alexey on 14.11.2015.
 */
Phonebook.Views.List = Backbone.View.extend({
    el: '#contacts',
    list_contact_template: '',
    contact_notes_template: '',
    collection: null,
    initialize: function (collection) {
        this.list_contact_template = _.template($('#list-template').html());
        this.contact_notes_template = _.template($('#contact-note-template').html());
        this.renderListContact(collection);
    },
    renderListContact: function (collection) {
        var that = this;


        _.each(collection.models, function (record) {
            that.$el.append(that.list_contact_template(record.toJSON()));
            that.renderOneContact(record);
        });

    },
    renderOneContact: function (record) {
        var that = this;
        var letter = record.toJSON().group_letter;
        var contacts = record.toJSON().contacts;

        _.each(contacts, function (cont) {
            var currElem = that.$el.find("#group_"+letter).find("#contact-notes-block");
            currElem.append(that.contact_notes_template(cont));
        });
    }
});
Phonebook.Views.LoadList = Backbone.View.extend({
    url_name: 'list',
    el: '#content',
    model: null,
    collection: null,
    initialize: function (search) {
        var that = this;
        this.collection = new Phonebook.Collections.Contacts();
        this.collection.fetch({
            data: search,
            type: 'post',
            async: false,
            success: function () {
                that.render();
            }
        });


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
        new Phonebook.Views.List(this.collection);
    }
});
