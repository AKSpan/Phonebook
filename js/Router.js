/**
 * Created by Span on 06.11.2015.
 */
Phonebook.Router = Backbone.Router.extend({
    routeParams: {},
    routes: {
        '': 'index',
        info: 'showContact',
        list: 'showAllContacts',

    },
    index: function () {
        new Phonebook.Views.Login();
    },
    showContact: function () {
        new Phonebook.Views.Info();
    },
    showAllContacts: function () {
        console.log('list')
        new Phonebook.Views.LoadList(this.routeParams.list);
    }
});
Phonebook.Router.rout = new Phonebook.Router();
Backbone.history.start();