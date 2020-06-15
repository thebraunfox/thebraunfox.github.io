// fetch API implementation

/*fetch('http://api.are.na/v2/channels/k-frag/contents')
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
                console.log(data);
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });*/

//jQuery Implementation

let channel = 'https://api.are.na/v2/channels/k-frag';

//Clear Cache
$.ajax({
    cache: false
});
$.ajaxSetup({ cache: false });

//Load Content

getBlocks();

function getBlocks() {
    $.ajax({
        url: channel,
        dataType: 'json',
        type: 'GET',
        cache: false,
        data: {
            page: 0,
            per: 0
        },
        success: function(data) {

            console.log(data);

            //Display Channel Title
            let chName = data.title;
            $('.ch-title').append('<h2>Channel:'+chName+'</h2>');


            for (let i = 0; i < data.contents.length; i++) {

                let dataClass = data.contents[i].class;
                let blockID = data.contents[i].id;
                let title = data.contents[i].title;


                if (dataClass === 'Media' ) {

                    let blockUrl = data.contents[i].source.url;
                    let authorName = data.contents[i].embed.author_name;
                    let image = data.contents[i].image.display.url;

                    console.log(blockUrl);
                    $('.gallery').append('<div class= "item" id="'+blockID+'" style="background-image: url('+image+')"></div>');
                    $('#'+blockID).append('<div class="block-text"><a role="button" href="'+blockUrl+'" target="_blank" ><p class="block-text">'+authorName+'</p></a></div>');



                } else if (dataClass === 'Image'){

                    let imageUrl = data.contents[i].image.display.url;

                    console.log(imageUrl);
                    $('.gallery').append('<div class= "item" id="'+blockID+'") style="background-image: url('+imageUrl+')"></div>');
                    $('#'+blockID).append('<a role="button" href="'+imageUrl+'" target="_blank" ><p class="block-text">'+title+'</p></a>')
                       // .prepend('<img src="'+imageUrl+'">');


                }else if (dataClass === 'Attachment'){


                    let fileURL = data.contents[i].attachment.url;
                    console.log(fileURL);
                    $('.gallery').append('<div class= "item" id="'+blockID+'")></div>');
                    $('#'+blockID).append('<p class="block-text">'+title+'</p>');



                }else{


                    console.log(title);
                    $('.gallery').append('<div class= "item" id="'+blockID+'")></div>');
                    $('#'+blockID).append('<p class="block-text">'+title+'</p>');


                }

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);

        }
    })
    }


