/**
 * Created by Span on 23.11.2015.
 */
Phonebook.Models.Social = Backbone.Model.extend({
    defaults: {
        name: '',
        url: ''
    }
});
Phonebook.Models.Contact = Backbone.Model.extend({
    defaults: {
        name: 'Имя',
        surname: 'Фамилия',
        thirdname: 'Отчество',
        birthday: 'Дата рождения',
        phone: [{
            name: 'home',
            number: 'qwe'
        }],
        avatar: 'img/default-avatar.png',
        social: [{name: 'vk', url: 'vkcom'}],
        owner: ''
    },
    addSocial: function (social) {
        this.attributes.social.push(social);
    },
    url: '/phonebk',
    save: function (data, opts) {
     //   console.log(this.toJSON())
        data.contact = this.toJSON();
        opts.contentType = 'application/json';
        opts.data = JSON.stringify(data);
        return Backbone.Model.prototype.save.call(this, data, opts);
    }
});
