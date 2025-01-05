const searchFun = () => {
    let filter = document.getElementById('search').value.toUpperCase();
    if (filter != "") {
        document.getElementById('upcoming').style.display = "none";
        document.getElementById('magician-img').style.display = "none";
    }
    else {
        document.getElementById('upcoming').style.display = "";
        document.getElementById('magician-img').style.display = "";
    }

    let myGames = document.getElementById('grid-container');

    let a = myGames.getElementsByTagName('a');

    var flag = 0;

    for (var i = 0; i < a.length; i++) {
        let divHolder = a[i].getElementsByTagName('div');
        let name = divHolder[0].getElementsByTagName('strong');

        if (name[0]) {
            let textValue = name[0].textContent || name[0].innerHTML;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = "";
                flag = 1;
            } else {
                a[i].style.display = "none";
            }
        }
    }
}

function patronAmntChoose(id){
    elements = document.getElementsByClassName('amnt');
    Array.from(elements).forEach(function(element){
        element.style.backgroundColor="";
        element.style.color = "";
    });
    document.getElementById(id).style.backgroundColor = "rgb(255, 136, 0)";
    document.getElementById(id).style.color = "white";
}