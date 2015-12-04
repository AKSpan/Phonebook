/**
 * Created by Span on 06.11.2015.
 */
Phonebook.Router = Backbone.Router.extend({
    routeParams: {},
    routes: {
        '': 'index',
        info: 'showContact',
        list: 'showAllContacts',
        add:'addContact',

    },
    index: function () {
        new Phonebook.Views.Login();
    },
    showContact: function () {
        new Phonebook.Views.Info();
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