function pull_animals(view_animal_url, requestURL_In)
{
    //API request URL (locally hosted PHP file that pulls from Petango)
    var requestURL = requestURL_In;


    jQuery.getJSON(requestURL, function(results) {
        var output_area = document.getElementById('animal');
        var output_html = "";

        results.XmlNode.map(function(animal) {            
            //Safety check. Make sure there isn't a null node (the last node is usually null)
            if(animal.adoptableSearch == undefined) {
                return;
            }
            //Format the animals breed. Don't include Mix as a secondary breed (too vague, too cluttered).
            var animal_breed_formatted = format_breed(animal.adoptableSearch["PrimaryBreed"]);
            
            if( animal.adoptableSearch["SecondaryBreed"] != "Mix") { animal_breed_formatted += ", " + format_breed(animal.adoptableSearch["SecondaryBreed"]);}

            //All animal detail formatting goes here.
            var animal_detail_formatted = "<div class='adoptable-animal'>" +
                                        "<a href='" + view_animal_url + animal.adoptableSearch["ID"] + "/'><img class='animal-picture' src=" + animal.adoptableSearch["Photo"] + "></a>" +
                                        "<div class='animal-name'><a href='" + view_animal_url + animal.adoptableSearch["ID"] + "/'>" + animal.adoptableSearch["Name"] + "</a></div>" +
                                        "<p>" +animal_breed_formatted + "</p>" +
                                        "<p>" + animal.adoptableSearch["Sex"] + "</p>" +
                                        "</div>";
            output_html += animal_detail_formatted;
            return;
        });
        output_area.innerHTML = output_html;
    });
}

function format_breed(breed_string) {
    var split_string = breed_string.split(", ");
    split_string.reverse();
    output_breed_string = split_string.join(" ");
    if(output_breed_string == "") {
        if(breed_string.length > 22) {
            return breed_string.substr(0,22) + "..";
        } else {
            return breed_string;
        }
    } else {
        if(breed_string.length > 22) {
            return output_breed_string.substr(0,24) + "..";
        } else {
            return output_breed_string;
        }
    }
}