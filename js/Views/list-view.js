/**
 * Created by Alexey on 14.11.2015.
 */
Phonebook.Views.List = Backbone.View.extend({
    el: '#contacts',
    template: '',
    collection:null,
    initialize: function (collection) {
        //console.log("init LIST collection",collection)
        this.template = _.template($('#list-template').html());
        this.renderListContact(collection);
    },
    renderListContact: function (collection) {
        var that = this;
        //console.log("collection",collection)
        _.each(collection.models,function(record){
           that.renderOneContact(record);
        });

    },
    renderOneContact: function (contact) {
        this.$el.append(this.template(contact.toJSON()));
    }
});
Phonebook.Views.LoadList = Backbone.View.extend({
    url_name: 'list',
    el: '#content',
    model: null,
    collection:null,
    initialize: function (search) {
        var that = this;
        this.collection = new Phonebook.Collections.Contacts();
        this.collection.fetch({
            data:search,
            type:'post',
            async:false,
            success: function () {
                that.render();
            }
        });


    },
    render: function () {
        var that = this;
        $.ajax({
            url: "html/" + this.url_name + ".html",
            success: function (template) {
                that.$el.html(template);
            },
            async: false
        });
        new Phonebook.Views.List(this.collection);
    }
});
