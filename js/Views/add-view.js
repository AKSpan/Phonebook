/**
 * Created by Span on 30.11.2015.
 */
Phonebook.Views.AddContact = Backbone.View.extend({
    el: '#content',
    add_contact_template: '',
    template: 'add',
    model: null,
    WIDTH: 200,
    HEIGHT: 350,
    initialize: function () {
        var that = this;
        $.ajax({
            url: 'html/' + this.template + '.html',
            async: false,
            success: function (template) {
                that.$el.html(template);
                that.contact_notes_template = _.template($("#contact-show-template").html());
            }
        });
        this.render();
    },
    render: function () {
        var emptyContact = new Phonebook.Models.Contact();
        this.$el.append(this.contact_notes_template(emptyContact.toJSON()))
    },
    events: {
        "click #add-new-contact": "addContact",
        "click #add-new-phone": "addNewPhone",
        "click #add-new-social": "addNewSocial",
        "click .remove-new-field": "removeNewField",
        "change select": "changeSelected",
        "click #avatar-img": "changeAvatar",
        "change #avatar-img-file": "showFileInfo"
    },
    showFileInfo: function () {
        /*Получение base64 от img */
        var fileSelected = this.$el.find('#avatar-img-file').prop("files")[0];
        if (fileSelected.size > 0) {
            this.resize_image(fileSelected, this.WIDTH, this.HEIGHT);
        }
    },
    changeAvatar: function () {
        this.$el.find(':file').click();
    },
    changeSelected: function (data) {
        var currSel = $(data.currentTarget);
        var optionSelected = $("option:selected", currSel).val();
        currSel.find('option').removeAttr('selected');
        currSel.find('option[value="' + optionSelected + '"]').attr('selected', 'selected');
        currSel.val(optionSelected)
    },
    addContact: function () {
        var newContact = {}, that = this;
        var inputs = this.$el.find('.inputs');
        _.each(inputs, function (inp) {
            newContact[$(inp).attr('name')] = $(inp).val();
        });

        newContact["avatar"] = $("#avatar-img").attr("src");
        /************PHONES************/
        var div = $('#phones').find('#append-phone > .drop-list-field');
        var selects = div.find('select');
        inputs = div.find('#new-phone-val');
        newContact["phone"] = [];
        for (var i = 0; i < selects.length; i++)
            newContact["phone"].push({name: $(selects[i]).find('option[selected]').val(), number: $(inputs[i]).val()});
        /************SOCIAL************/
        div = $('#social').find('#append-social > .drop-list-field');
        selects = div.find('select');
        inputs = div.find('#new-social-val');
        newContact["social"] = [];
        for (var i = 0; i < selects.length; i++)
            newContact["social"].push({name: $(selects[i]).find('option[selected]').val(), url: $(inputs[i]).val()});
        /*************END**************/
        var ncModel = new Phonebook.Models.Contact(newContact);
        console.log(ncModel);

        ncModel.save({
                action: 'add'
            },
            {
                success: function (data) {
                    console.log("save add scs", data)


                },
                error: function (data) {
                    console.log('e', data)
                }
            });
    },
    addNewPhone: function () {
        var tmpl = _.template($('#new-phone-template').html());
        this.$el.find('#append-phone').append(tmpl);
    },
    addNewSocial: function () {
        var tmpl = _.template($('#new-social-template').html());
        this.$el.find('#append-social').append(tmpl);
    },
    removeNewField: function (elem) {
        var currentElem = $(elem.currentTarget);
        currentElem.parents('.drop-list-field').remove()
    },
    resize_image: function (file, newW, newH) {
        var that = this;
        var reader = new FileReader();
        reader.onloadend = function () {
            var tempImg = new Image();
            tempImg.src = reader.result;
            tempImg.onload = function () {
                var MAX_WIDTH = newW;
                var MAX_HEIGHT = newH;
                var tempW = tempImg.width;
                var tempH = tempImg.height;
                if (tempW > tempH) {
                    if (tempW > MAX_WIDTH) {
                        tempH *= MAX_WIDTH / tempW;
                        tempW = MAX_WIDTH;
                    }
                } else {
                    if (tempH > MAX_HEIGHT) {
                        tempW *= MAX_HEIGHT / tempH;
                        tempH = MAX_HEIGHT;
                    }
                }
                var canvas = document.createElement('canvas');
                canvas.width = newW;
                canvas.height = newH;
                var ctx = canvas.getContext("2d");
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, newW, (newH - tempH) / 2);
                ctx.drawImage(tempImg, 0, (newH - tempH) / 2 - 1, tempW, tempH);
                ctx.fillStyle = 'white';
                ctx.fillRect(0, (newH - tempH) / 2 + tempH - 1, newW, (newH - tempH) / 2 + 2);
                var dataURL = canvas.toDataURL("image");
                that.$el.find('#avatar-img').attr('src', dataURL);
            }

        };
        reader.readAsDataURL(file);
    }
});