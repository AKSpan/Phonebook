/**
 * Created by Span on 23.11.2015.
 */
Phonebook.Collections.Contacts = Backbone.Collection.extend({
    url:'/phonebk',
    parse:function(data)
    {
        return data;
    }
});