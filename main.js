$(function(){
    // jquery.knob progress bar plugin
    $(".dial").knob();

    $('.dial').trigger(
        'configure',
        {
            "fgColor":"blue",
            "width": 100,
        }
    );

    $('.dial').val(25).trigger('change');


    $("#check-api").click(function (e) {
        e.preventDefault();
        var countryName = $("#countryApiInput").val()

        $.ajax({
            url: `https://restcountries.eu/rest/v2/name/${countryName}`,
            method: "GET",
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                
                xhr.onreadystatechange = function () {
                    var rdState = xhr.readyState

                    var progress = 25 * rdState;

                    $(".progress-bar").css({"width": progress + "%"});

                    $(".main-progress").css({"width": progress + "%"});

                    $('.dial').val(progress).trigger('change');
                    
                    if (progress == 100) {
                        $(".progress-bar").css({"background-color": "green"});
    
                        $(".main-progress").css({"background-color": "green"});
    
                        $('.dial').trigger(
                            'configure',
                            {
                                "fgColor":"green",
                                
                            }
                        );
                        
                    }
                }
                
               return xhr;
            },
            dataType: "json",
            success: function (response) {
                
                response.map((data)=>{
                    console.log(data.demonym);
                    $(".country-name").text(`${data.name}`)
                    $(".country-capital").text(`${data.capital}`)
                    $(".region").text(`${data.region}`)
                    $(".sub-region").text(`${data.subregion}`)
                    $(".population").text(`${data.population}`)
                    data.currencies.map(c=>{$(".currency-name").text(c.name)});
                    $(".call-code").text(`${data.callingCodes}`)
                })
            }
        })
    
    })




    })
