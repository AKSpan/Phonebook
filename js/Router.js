/**
 * Created by Span on 06.11.2015.
 */
Phonebook.Router = Backbone.Router.extend({
    routeParams: {},
    routes: {
        '': 'index',
        info: 'showContact',
        list: 'showAllContacts',

    },
    index: function () {
        new Phonebook.Views.Login();
    },
    showContact: function () {
        new Phonebook.Views.Info();
    },
    showAllContacts: function (data) {
       // console.log(this.routeParams.list)
        new Phonebook.Views.LoadList(this.routeParams.list);
    },
    navigate: function(route, options) {
        console.log(options)
        var routeOption = {
                trigger: true
            },
            params = (options && options.params) ? options.params : null;
        $.extend(routeOption, options);
        delete routeOption.params;

        //set the params for the route
        this.param(route, params);
        Backbone.Router.prototype.navigate(route, routeOption);
    },
    param: function(fragment, params) {
        var matchedRoute;
        _.any(Backbone.history.handlers, function(handler) {
            if (handler.route.test(fragment)) {
                matchedRoute = handler.route;
            }
        });
        if (params !== undefined) {
            this.routeParams[fragment] = params;
        }

        return this.routeParams[fragment];
    }
});
Phonebook.Router.rout = new Phonebook.Router();
Backbone.history.start();