/**
 * Created by Alexey on 09.11.2015.
 */
Phonebook.Views.List = Backbone.View.extend({
   template:'list',
    el:'#content',
    model:null,
    initialize: function (data) {
        console.log('init LIST view')
    }
});