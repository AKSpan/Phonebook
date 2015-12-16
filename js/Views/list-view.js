/**
 * Created by Alexey on 14.11.2015.
 */
Phonebook.Views.List = Backbone.View.extend({
    el: '#contacts',
    list_contact_template: '',
    contact_notes_template: '',
    collection: null,
    model: Phonebook.Models.Contact,
    initialize: function (collection) {

        this.list_contact_template = _.template($('#list-template').html());
        this.contact_notes_template = _.template($('#contact-note-template').html());
        this.renderListContact(collection);
    },
    renderListContact: function (collection) {
        var that = this;
        var answer = collection.models[0].get("answer");
        _.each(answer, function (data) {
            var letter = {group_letter: data.group_letter};
            /**Отрисовка групп по буквам**/
            that.$el.append(that.list_contact_template(letter));
            var contacts = data.contacts;
            _.each(contacts, function (currCont) {
                currCont["group_letter"] = letter.group_letter;
                /**Отрисовка контпактов в своб группу**/
                that.renderContactInGroup(currCont);
            })
        });
    },
    renderContactInGroup: function (contact) {
        var that = this;
        var currElem = that.$el.find("#group_" + contact.group_letter).find("#contact-notes-block");
        currElem.append(that.contact_notes_template(contact));
    },
    events: {
        "click .contact-note": "showContact",

    },
    showContact: function (data) {
        window.location.hash = "#list/" + $(data.currentTarget).attr("id");
    }

});
Phonebook.Views.LoadList = Backbone.View.extend({
    url_name: 'list',
    el: '#content',
    model: null,
    collection: null,
    initialize: function (search) {
        console.log('init contacts list')
        var tmp = JSON.parse(search);
        tmp["action"] = "contacts";
        search = JSON.stringify(tmp);
        var that = this;
        this.collection = new Phonebook.Collections.Contacts();
        this.collection.fetch({
            data: search,
            type: 'post',
            async: false,
            success: function (data) {
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
        //console.log("LoadList render coll", this.collection)
        new Phonebook.Views.List(this.collection);
    }
});
