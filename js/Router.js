/**
 * Created by Span on 06.11.2015.
 */
Phonebook.Router = Backbone.Router.extend({
    routeParams: {},
    routes: {
        '': 'index',
        //info: 'showContact',
        list: 'showAllContacts',
        'list/:id': 'showContact',
        add:'addContact',

    },
    index: function () {
        new Phonebook.Views.Login();
    },
    showContact: function (id) {
        //console.log("id=",id)
        new Phonebook.Views.Info({id:id});
    },
    showAllContacts: function () {
        var data = JSON.stringify({search:""});
        new Phonebook.Views.LoadList(data);
    },
    addContact: function () {
        new Phonebook.Views.AddContact();
    }
});
Phonebook.Router.rout = new Phonebook.Router();
Backbone.history.start();