/**
 * Created by Alexey on 09.11.2015.
 */
Phonebook.Models.Welcome = Backbone.Model.extend({
    user: '',
    pass: '',
    initialize: function (data) {
        this.user = data.user;
        this.pass = data.pass;
    }

});
