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
        /**
         * Сделать - сначала отрисовать блоки по алфавиту.(???? сделать массив из group_letter из ответа???)
         * после отрисовки групп, отрисовать все контакты в свою группу.
         * Искать элемент для вставки по id=group_<%=group_letter%>
         * /
        //var that = this;
        //var collAnswerField = collection.models[0].get("answer");
        //_.each(collAnswerField, function (record) {
        //    var currLetter = {group_letter: record.group_letter};
        //    _.each(record.contacts, function (one_cont) {
        //        that.$el.append(that.list_contact_template(currLetter));
        //        that.renderOneContact(one_cont,currLetter.group_letter);
        //      //  console.log(one_cont)
        //    })
        //});

    },
    renderOneContact: function (contact,letter) {
//        var that = this;
//        var currElem =that.$el.find("#group_" + letter).find("#contact-notes-block");
//console.log(currElem)
//
//
//      /*  var that = this;
//        /!** @namespace record.toJSON().answer.group_letter *!/
//        var letter;// = record.group_letter;
//        /!** @namespace record.toJSON().answer.contacts *!/
//
//        _.each(record, function (cont) {
//          //  console.log("renderOneContact", cont)
//            var letter = cont.group_letter;
//            var currElem;
//            _.each(cont.contacts, function (loop) {
//                //  console.log("gl",letter,"curr Cont",loop)
//                currElem = that.$el.find("#group_" + letter).find("#contact-notes-block");
//                console.log("currElem", that.$el)
//                currElem.append(that.contact_notes_template(loop));
//            })
//        });*/
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
        /// console.log("LoadList render coll",this.collection)
        new Phonebook.Views.List(this.collection);
    }
});
