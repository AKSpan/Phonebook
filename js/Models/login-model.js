/**
 * Created by Alexey on 09.11.2015.
 */
Phonebook.Models.Login = Backbone.Model.extend({
    defaults: {
        user: '',
        password: ''
    },

    url: null,
    save: function (data, opts) {
        //console.log(this.attributes.user,this.attributes.password)
        var username = this.attributes.user;
        var password = this.attributes.password;
        var key = CryptoJS.SHA1(username + password);
        opts.contentType = 'application/json';

        if (data.hasOwnProperty("action"))
            switch (data.action) {
                case "login":
                    this.url = '/phonebk/login';

                    break;
                case "registration":
                    this.url = '/phonebk/registration';
                    break;
            }

        data.user = {
            user: username,
            pass: key.toString()
        };
        opts.data = JSON.stringify(data);
        return Backbone.Model.prototype.save.call(this, data, opts);
    }
});
