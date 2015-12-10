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
        "click .remove-new-field":"removeNewField",
        "change select":"changeSelected"
    },
    changeSelected: function (data) {
        var currSel = $(data.currentTarget);
        var optionSelected = $("option:selected", currSel).val();
        currSel.find('option').removeAttr('selected');
        currSel.find('option[value="' + optionSelected + '"]').attr('selected', 'selected');
        currSel.val(optionSelected)
    },
    addContact: function () {
        var newContact = {};
        var inputs = this.$el.find('.inputs');
        _.each(inputs, function (inp) {
            newContact[$(inp).attr('name')] = $(inp).val();
        });

        newContact["avatar"] = $("#avatar-img").attr("src");
        /************PHONES************/
        var div = $('#phones').find('#append-phone > .drop-list-field');
        var selects = div.find('select');
        inputs = div.find('#new-phone-val');
        newContact["phone"]={}
        for(var i=0;i < selects.length;i++)
            newContact["phone"][i] = {name:$(selects[i]).find('option[selected]').val(),number:$(inputs[i]).val()};
        /************SOCIAL************/
        var div = $('#social').find('#append-social > .drop-list-field');
        var selects = div.find('select');
        inputs = div.find('#new-social-val');
        newContact["social"]={}
        for(var i=0;i < selects.length;i++)
            newContact["social"][i] = {name:$(selects[i]).find('option[selected]').val(),url:$(inputs[i]).val()};
        /*************END**************/
        var ncModel= new Phonebook.Models.Contact(newContact);
        console.log(ncModel);

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