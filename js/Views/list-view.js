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
        this.contact_notes_template = $('#contact-note-template').html();
        this.renderListContact(collection);
    },
    renderListContact: function (collection) {
        var that = this;
        _.each(collection.models, function (record) {
            that.renderOneContact(record);
        });

    },
    renderOneContact: function (contact) {
        console.log(contact.toJSON())
       this.$el.html(this.list_contact_template(contact.toJSON()));
       //_.template(this.contact_notes_template,contact.toJSON());

        // this.$el.append(_.template(this.contact_notes_template,contact.toJSON()));
        //  console.log(this.$el);
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
