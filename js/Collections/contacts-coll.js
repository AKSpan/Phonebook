/**
 * Created by Span on 23.11.2015.
 */
Phonebook.Collections.Contacts = Backbone.Collection.extend({
    model:Phonebook.Models.Contact,
    url:'json/dict.json',
  /*  parse:function(data)
    {
        return data;
    }*/
});