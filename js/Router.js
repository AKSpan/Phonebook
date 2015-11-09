/**
 * Created by Span on 06.11.2015.
 */
Phonebook.Router = Backbone.Router.extend({
    initialize: function () {
      console.log('Init router');
    },
   routes:
   {
       '':'index',
       'list':'showList',
       'test':'test'
   },
    index: function () {
        console.log("Index");
        new Phonebook.Views.Welcome();
    },
    showList: function () {
        new Phonebook.Views.List();
    },
    test: function () {
        console.log('test')
    }
});
Phonebook.Router.rout = new Phonebook.Router();
Backbone.history.start();