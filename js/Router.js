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
       info:'showContact',
       list:'showAllContacts',

   },
    index: function () {
        console.log("Index");
        new Phonebook.Views.Welcome();
    },
    showContact: function () {
        new Phonebook.Views.Info();
    },
    showAllContacts:function(){
      new Phonebook.Views.List();
    }
});
Phonebook.Router.rout = new Phonebook.Router();
Backbone.history.start();