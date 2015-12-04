/**
 * Created by Span on 30.11.2015.
 */
Phonebook.Views.AddContact = Backbone.View.extend({
template:'add-contact',
    el:'#content',
    model:null,
    initialize: function () {
        this.render();
    },

});