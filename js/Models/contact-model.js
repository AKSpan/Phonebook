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
        //group_letter: 'A-Z',
        name: 'Имя',
        surname: 'Фамилия',
        thirdname: 'Отчество',
        birthday: 'Дата рождения',
        phone: [{
            name: 'home',
            number: 'qwe'
        }],
        avatar: 'img/default-avatar.png',
        social: [{name:'vk',url:'vkcom'}],
        owner: ''
    },
    addSocial: function (social) {
        this.attributes.social.push(social);
    }
});
