/**
 * Created by Span on 23.11.2015.
 */
Phonebook.Collections.Contacts = Backbone.Collection.extend({
    model:Phonebook.Models.Contact,
    url:'/phonebk',
    parse:function(data)
    {
       // console.log("parse contact collection");
        return data;
    }
});