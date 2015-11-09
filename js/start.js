/**
 * Created by Span on 06.11.2015.
 */
window.Phonebook = {
    Views: {},
    Models: {},
    Collections: {},
    Router: {}
};

$(document).ready(function () {
    $("#test").click(function () {
        var dt = {
            owner: "Span",
            name: "Алексей",
            surname: "Kатаев",
            thirdname: "Яковлевич",
            birthday: "10.01.1991",
            phone: "+79118158639",
            avatar: "lol.jpg",
            social: {
                vk: "vk.com",
                instagram: "insta.com"
            }
        };
        console.log("Yo");
        $.ajax({//create an ajax request to load_page.php
            url: "/mongo",
            type: "POST",
            data: JSON.stringify(dt),
            success: function (data) {
                console.log("S = ", data)
            },
            error: function (data) {
                console.log("e = ", data)
            }
        });
    })
});
