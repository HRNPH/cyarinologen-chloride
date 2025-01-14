$(document).ready(function() {

    var canvas = document.getElementById('meme');
    var ctx = canvas.getContext('2d');

    // Main drawing function
    function drawMeme() {
        var img = document.getElementById('start-image');
        var fontSize = parseInt($('#text_font_size').val());
        // check if img is valid
        if (img.width > 0 && img.height > 0) {} else {
            $('#start-image').attr('src', `./pcharian/error.jpg`)
            img = document.getElementById('start-image');
        }

        // set form field properties
        $('#text_top_offset').attr('max', img.height);
        $('#text_bottom_offset').attr('max', img.height);

        // initialize canvas element with desired dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // catch errors if image is not loaded
        ctx.drawImage(img, 0, 0, img.height * 2, img.width * 2, 0, 0, img.height * 2.1, img.width * 2.1)

        // settings for writing text
        ctx.lineWidth = parseInt($('#text_stroke_width').val());
        ctx.font = fontSize + 'pt sans-serif';
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        var lineHeight = fontSize + parseInt($('#text_line_height').val());
        var maxTextAreaWidth = canvas.width * 0.85;

        // text 1
        var text1 = $('#text_top').val();
        text1 = text1.toUpperCase();
        x = parseInt($('#text_horizon_offset').val());
        y = parseInt($('#text_top_offset').val());
        writeText(ctx, text1, x, y, maxTextAreaWidth, lineHeight);

        // text 2
        var text2 = $('#text_bottom').val();
        text2 = text2.toUpperCase();
        x = parseInt($('#text_bottomhorizon_offset').val());
        y = parseInt($('#text_bottom_offset').val());
        writeText(ctx, text2, x, y, maxTextAreaWidth, lineHeight);

    };

    // function to write text on Image
    function writeText(ctx, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';
        var lines = [];

        for (var n = 0; n < words.length; n++) {
            var testLine = line + ' ' + words[n];
            var testWidth = ctx.measureText(testLine).width;
            if (testWidth > maxWidth) {
                lines.push(line);
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }

        // pushing the last line
        lines.push(line);

        // displaying the text on canvas
        for (var k = 0; k < lines.length; k++) {
            ctx.strokeText(lines[k], x, y + lineHeight * k);
            ctx.fillText(lines[k], x, y + lineHeight * k);
        }

    };

    // function to change the image according to the one selected by user
    $("#imgInp").change(function() {
        var input = this;

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#start-image').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }

        window.setTimeout(function() { drawMeme() }, 500);
    });

    // function to change to the image in "pcharian" folder according to the index selected by user
    $('#imgIndx').change(function() {
        // get the index of the image
        var imgIndx = $('#imgIndx').val();

        $('#start-image').attr('src', `./pcharian/${imgIndx}.jpg`);


        window.setTimeout(function() {
            drawMeme()
        }, 500)
    });

    // register event listeners
    $(document).on('change keydown keyup', '#text_top', function() {
        drawMeme();
    });
    $(document).on('change keydown keyup', '#text_bottom', function() {
        drawMeme();
    });
    $(document).on('input change', '#text_top_offset', function() {
        $('#text_top_offset__val').text($(this).val());
        drawMeme();
    });
    $(document).on('input change', '#text_horizon_offset', function() {
        $('#text_horizon_offset__val').text($(this).val());
        drawMeme();
    });
    $(document).on('input change', '#text_bottom_offset', function() {
        $('#text_bottom_offset__val').text($(this).val());
        drawMeme();
    });
    $(document).on('input change', '#text_bottomhorizon_offset', function() {
        $('#text_bottomhorizon_offset__val').text($(this).val());
        drawMeme();
    });
    $(document).on('input change', '#text_font_size', function() {
        $('#text_font_size__val').text($(this).val());
        drawMeme();
    });
    $(document).on('input change', '#text_line_height', function() {
        $('#text_line_height__val').text($(this).val());
        drawMeme();
    });
    $(document).on('input change', '#text_stroke_width', function() {
        $('#text_stroke_width__val').text($(this).val());
        drawMeme();
    });
    $(document).on('input change', '#canvas_size', function() {
        $('#canvas_size__val').text($(this).val());
        drawMeme();
    });

    $('#download_meme').click(function(e) {
        $(this).attr('href', canvas.toDataURL());
        $(this).attr('download', 'meme.png');
    });

    // replace this with a server-side processing method
    $('#download_meme').click(function(e) {
        $(this).attr('href', canvas.toDataURL());
        $(this).attr('download', 'meme.png');
    });

    // init at startup
    window.setTimeout(function() {
        drawMeme();
    }, 100);

});