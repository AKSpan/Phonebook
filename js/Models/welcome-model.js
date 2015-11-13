/**
 * Created by Alexey on 09.11.2015.
 */
Phonebook.Models.Welcome = Backbone.Model.extend({
       defaults:{
     user:'',
     password:''
     },
    url: '/phonebk/login',
    save: function (data, opts) {
        var username =  this.attributes.user;
        var password = this.attributes.password;
        var key = CryptoJS.SHA1(username+password);

        opts.contentType = 'application/json';
        data.auth = {
            user:username,
            pass: key.toString()
        };
        opts.data = JSON.stringify(data);
        return Backbone.Model.prototype.save.call(this, data, opts);
    }
});
