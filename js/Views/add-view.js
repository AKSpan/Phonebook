/**
 * Created by Span on 30.11.2015.
 */
Phonebook.Views.AddContact = Backbone.View.extend({
    el: '#content',
    add_contact_template: '',
    template: 'add',
    model: null,
    initialize: function () {
        var that = this;
        $.ajax({
            url: 'html/' + this.template + '.html',
            async: false,
            success: function (template) {
                that.$el.html(template);
                that.contact_notes_template = _.template($("#contact-show-template").html());
            }
        });
        this.render();
    },
    render: function () {
        var emptyContact = new Phonebook.Models.Contact();
        this.$el.append(this.contact_notes_template(emptyContact.toJSON()))
    },
    events: {
        "click #add-new-contact": "addContact",
        "click #add-new-phone":"addNewPhone",
        "click #add-new-social":"addNewSocial",
        "click .remove-new-field":"removeNewField"
    },
    addContact: function () {
        var newContact = {};
        var inputs = this.$el.find('.inputs');
        _.each(inputs, function (inp) {
            newContact[$(inp).attr('name')] = $(inp).val();
        });
    },
    addNewPhone: function () {
        var tmpl = _.template($('#new-phone-template').html());
        this.$el.find('#append-phone').append(tmpl);
    },
    addNewSocial: function () {
        var tmpl = _.template($('#new-social-template').html());
        this.$el.find('#append-social').append(tmpl);
    },
    removeNewField: function (elem) {
        var currentElem = $(elem.currentTarget);
        currentElem.parents('.drop-list-field').remove()
    }
});