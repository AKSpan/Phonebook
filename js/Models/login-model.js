/**
 * Created by Alexey on 09.11.2015.
 */
Phonebook.Models.Login = Backbone.Model.extend({
    defaults: {
        user: '',
        password: ''
    },
    url: '/phonebk',
    save: function (data, opts) {
        var username = this.get('user');
        var password = this.get('password');
        var key = CryptoJS.SHA1(username + password);
        opts.contentType = 'application/json';

        data.user = {
            user: username,
            pass: key.toString()
        };
        opts.data = JSON.stringify(data);
        return Backbone.Model.prototype.save.call(this, data, opts);
    },
    parse: function (data) {
       console.log(data,'parse')
        var res = {
            answer:data.answer,
            code:data.code
        };
       return res;
    }
});
