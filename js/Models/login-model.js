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

       /* if (data.hasOwnProperty("action"))
            switch (data.action) {
                case "login":
                    this.url = '/phonebk';

                    break;
                case "registration":
                    this.url = '/phonebk';
                    break;
            }
*/
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
