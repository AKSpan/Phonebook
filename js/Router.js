/**
 * Created by Span on 06.11.2015.
 */
Phonebook.Router = Backbone.Router.extend({
   routes:
   {
       '':'index',
       'page/:id':'page',
       'test':'test'
   },
    index: function () {
        console.log("Index")
    },
    page: function (id) {
        console.log('id = '+id)
    },
    test: function () {
        console.log('test')
    }
});
new Phonebook.Router();
Backbone.history.start();