
let input;
let selectedval;
let token;
$(document).ready(function(){
     $(".Details").hide();
     
$(".btn").click(() => { 

        /*selectedval=$("#myselect").val().text();*/
        selectedval=$( "#myselect option:selected" ).text();
       
        input=$("#title").val();
        if(input==""){
            alert("Enter title name");
           
        }
        else{
            if(selectedval=="By Id"){
                token="i="+input;
            }
            if(selectedval=="By Title"){
                token="t="+input;
            }
            getMovieDetails();
        }
   
});

});

let getMovieDetails = () => {

    // API call to get user details

    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'http://www.omdbapi.com/?'+token+'&apikey=51664879&',
        success: (response) => {
            console.log(response);

            if(response.Error=="Movie not found!"){
                 $("#result").html("No movie found");
            }          
            else{
            $("#result").html(response.Type+"-Details:");
            $(".Details").show();

            $("#Title").html(`<i>`+response.Title+`</i>`);
            $("#ReleasedDate").html("Released Date-"+response.Released);
            $("#ReleasedDate").append(`<i>`+" - "+response.Country+"("+response.Language+")"+`</i>`);
            $("#ReleasedDate").append(`<p>`+" "+response.imdbRating+`/10 - IMDb`+`</p>`);
            $("#ReleasedDate").append(`<p>`+`<strong>`+`ID-  `+`</strong>`+response.imdbID+","+" "+`<strong>`+`Votes: `+`</strong>`+response.imdbVotes+`</p>`);
          

            
            if(response.Poster=="N/A"){
               

                 $('.card-img-top').attr("src","omdb.png" );
            }
            else{
                 $('.card-img-top').attr("src", response.Poster);
            }

           
           $('.card-body').html(`<h5 class="card-title">`+`Rating : `+response.Rated+`</h5>`+`<h6 class="card-text">`+response.Year+`-`+response.Genre+`</h6>`);
           $('.card-body').append(`<p class="card-text">`+`Duration: `+response.Runtime+`</p>`);
           $('.card-body').append(`<p class="card-text">`+`DVD Release: `+response.DVD+`</p>`);            



            $('.moreDetails').html(`<i><h2 class="det">`+`Cast and Crew`+`</h2></i>`);

           
            $('.moreDetails').append(`<p class="det">`+response.Plot+`</p>`);
            $('.moreDetails').append(`<p class="det">`+`<strong>`+"Director:"+`</strong>`+response.Director+`</p>`+`<p class="det">`+`<strong>`+`Actors:  `+`</strong>`+response.Actors+`</p>`
                +`<p class="det">`+`<strong>`+`Writer:  `+`</strong>`+response.Writer+`</p>`+
                `<p class="det">`+`<strong>`+`Production:  `+`</strong>`+response.Production+`</p>`+
                `<p class="det">`+`<strong>`+`Awards:  `+`</strong>`+response.Awards+`</p>`+
                `<p class="det">`+`<strong>`+`External Link:  `+`</strong>`+`<a href=`+response.Website+`>`+response.Website+`</a>`+`</p>`+
                 `<p class="det">`+`<strong>`+`Box Office:  `+response.BoxOffice+`</strong>`+`</p>`
                /* `<p class="det">`+`DVD Release-`+response.DVD+`</p>`*/);

            
            let ratings=response.Ratings;
            

            if(ratings.length!=0){

            for(rate of ratings){
              
               
               $('.moreDetails').append(`<p class="det">`+`<strong>`+rate.Source+`</strong>`+"-"+rate.Value+`</p>`);

            }  

            }              

      
        }
           


            /* $('#dataSection').css('display', 'block');
            $('#userName').append(response.name);

            $('#favouritrQuote').append(response.quotes);

            $('#profilePhoto').html('<img src="' + response.picture.data.url + '" class="img-fluid profileHeight"/>');

            $('#cover').css('background-image', 'url(' + response.cover.source + ')');
*/



        }, error: (err) => {
           /* $("#result").append("No movie found");*/
             console.log(err.responseJSON.error.message);
             alert(err.responseJSON.error.message);

        }

    });// end ajax call 

}