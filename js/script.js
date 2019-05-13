$(function () {
    var searchInput = $('#searchInput');

    searchInput.on('focus', function () {
        $(this).animate({
            width: '100%',
        }, 400);
    })

    searchInput.on('blur', function () {
        $(this).animate({
            width: '50%'
        }, 400);
    })

    $('#searchForm').on('submit', function (e) {
        e.preventDefault();
        console.log(searchInput.val());
        $('#results').empty();
        $.get(
            "https://www.googleapis.com/youtube/v3/search", {
                part: 'snippet, id',
                q: searchInput.val(),
                type: 'video',
                key: 'YOUR API KEY'

            },
            function (data) {
                console.log(data);

                var prevPageToken = data.prevPageToken;
                var nextPageToken = data.nextPageToken;

                $.each(data.items, function (i, items) {

                    var output = getOutput(items);

                    $('#results').append(output);

                    

                })
                // var buttons = getButtons(prevPageToken, nextPageToken);
                // $('#buttons').append(buttons);
                // // $('button').addEventListener('click', nextPage());

            }
        )
    })



    function nextPage() {

        console.log('in nextPage fumnction')
        var token = $('#next-button').data('token');
        var q = $('#next-button').data('query');

        $('#searchForm').on('submit', function (e) {
            e.preventDefault();
            console.log(searchInput.val());
            $('#results').empty();
            $.get(
                "https://www.googleapis.com/youtube/v3/search", {
                    part: 'snippet, id',
                    pageToken: token,
                    q: q,
                    type: 'video',
                    key: 'AIzaSyBUSrZIR4VgVOMaW7elp6zYEwteDBUWxuc'
    
                },
                function (data) {
                    console.log(data);
    
                    var prevPageToken = data.prevPageToken;
                    var nextPageToken = data.nextPageToken;
    
                    $.each(data.items, function (i, items) {
    
                        var output = getOutput(items);
    
                        $('#results').append(output);
    
                    })
                    var buttons = getButtons(prevPageToken, nextPageToken);
                    $('#buttons').append(buttons);

                }
            )
        })
}


    function getOutput(items) {
        var videoId = items.id.videoId;
        var title = items.snippet.title;
        var description = items.snippet.description;
        var thumb = items.snippet.thumbnails.high.url;
        var channelTitle = items.snippet.channelTitle;
        var publishedAt = items.snippet.publishedAt;

        var output = '<br>' + '<li>' +
            '<div class="list-left">' +
            '<img  src="' + thumb + '">' +
            '</div>' +
            '<div class="list-right">' +
            '<h4>' + title + '</h4>'+
            '<small>By <span class="cTitle">' + channelTitle + '</span> published on ' + '<b>'+publishedAt+'</b>' +
            '<p>' + description + '</p>'+
            '<a class="btn btn-danger" href="http://www.youtube.com/embed/'+videoId+' ">Watch in YouTube</a>'
            '</div>' +
            '<br>' +
            '</li > ';

        return output;

    }
 
    
    function getButtons(prevPageToken, nextPageToken) {
        if (!prevPageToken) {
            var btnOutput = '<button id="next-button" class="btn btn-primary" data-token="'+nextPageToken+'" data-query="'+searchInput.val()+'"' + 'onclick="nextPage()"> Next Page </button>'
            
        
        }
        // else {
        //     var btnOutput = '<div class="btn-container">' +
        //         '<button id="prev-button" class="btn btn-primary" data-token="'+prevPageToken+'" data-query="'+searchInput.val()+'"' + 'onclick="prevPage()"> Previous Page </button>' +
        //         '<button id="next-button" class="btn btn-primary" data-token="'+nextPageToken+'" data-query="'+searchInput.val()+'"' + 'onclick="nextPage()"> Next Page </button>'
        //         + '</div>';
            
            
        // }
        
        return btnOutput;
}    

    
})
