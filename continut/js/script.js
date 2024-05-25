window.onload = (event) => {
    schimbaContinut("acasa");
};
function invatFunctions(){
    const canvas = document.getElementById("MyCanvas");
    var x1=0;
    var y1=0;
    var x2=0;
    var y2=0;
    var stare=0;
    canvas.addEventListener("click",function(e){
        const canvas = document.getElementById("MyCanvas");
        var ctx = canvas.getContext("2d");
        var cRect = canvas.getBoundingClientRect();
        var x = Math.round(e.clientX - cRect.left); 
        var y = Math.round(e.clientY - cRect.top);       
        if(stare==0)
        {
            x1=x;
            y1=y;
            stare = 1;
        }
        else if (stare==1) 
        {
            x2=x;
            y2=y;
            var FillInput = document.getElementById("FillColor");
            var BorderInput = document.getElementById("BorderColor");
            ctx.beginPath();
            ctx.fillStyle = FillInput.value;
            ctx.strokeStyle = BorderInput.value;
            ctx.rect(x1,y1,x2-x1,y2-y1);
            ctx.fill();
            ctx.stroke();
            stare=0;
        }
    })
    dataSiOra();  
    currentBrowser();
    adresaUrl();
    currentLocation();
    showOS();
    firstPicture()
}
function clearCanvas(){
    const canvas = document.getElementById("MyCanvas");
    var ctx = canvas.getContext("2d");
//    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,400,300);

}
function dataSiOra(){
    var date = new Date();
    var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
    setInterval(myTimer, 1000);
    function myTimer() {
    const d = new Date();
    document.getElementById("dateAndTime").innerHTML="<b>Data: </b>"+current_date +"<br/><b>Ora: </b>"+d.toLocaleTimeString();
}
}
function currentBrowser(){
    var browserName = navigator.appName;
    var browserVersion = navigator.appVersion;
    document.getElementById("broserCurent").innerHTML="<b>Browser name: </b>"+browserName+"<br/><b>Browser version: </b>"+browserVersion;
}
function adresaUrl(){
    document.getElementById("adresaURL").innerHTML="<b>Adresa URL: </b>"+window.location.href;
}
function currentLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
      } else {
        document.getElementById("locatieCurenta").innerHTML = "Geolocation is not supported by this browser.";
      }
}
function showPosition(position) {
    document.getElementById("locatieCurenta").innerHTML = "<b>Locatia curenta:</b><br/>Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}
function showOS(){
    document.getElementById("OSCurent").innerHTML = "<b>Sistem de operare: </b>"+ window.navigator.platform;    
}
function firstPicture(){
    const canvas = document.getElementById("MyCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,400,300);
    ctx.fillStyle = 'pink';
    ctx.fillRect(100,150,200,50);
    ctx.fillRect(150,200,100,50);
    ctx.fillRect(175,250,50,50);   
    ctx.fillRect(50,100,300,50);
    ctx.fillRect(75,50,100,50);
    ctx.fillRect(225,50,100,50);
}
function addColumn(){
    var table = document.getElementById("this_table");
    var index = document.getElementById("pozitiaAdaugare").value;
    var nrRows= table.rows.length;
    //console.log(nrRows);
    var i=0;
    while(i<nrRows){
        var row = table.rows[i]; 
        var c = row.insertCell(index);
        i++;            
    }
}
function addRow(){
    var table = document.getElementById("this_table");
    var index = document.getElementById("pozitiaAdaugare").value;
    //console.log(index);
    var newRow=table.insertRow(index);
    var nrCells= table.rows[0].cells.length;
    var i=0;
    while(i<nrCells){
        var c = newRow.insertCell(i);
        i++;            
    }
}
function changeColor(){
    var color = document.getElementById("culoareFundalTabel").value;
    document.getElementById("this_table").style.backgroundColor=color;
    var array =document.getElementsByClassName("faceParte");
    for(var i =0 ;i<array.length;i++){
        array[i].style.backgroundColor=color;
    }
}
function schimbaContinut(text,jsFisier,jsFunctie) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("continut").innerHTML = this.responseText;
            if (jsFisier) {
                var elementScript = document.createElement('script');
                elementScript.onload = function () {
                    console.log("hello");
                    if (jsFunctie) {
                        window[jsFunctie]();
                    }
                };
                elementScript.src = jsFisier;
                document.head.appendChild(elementScript);
            } else {
                if (jsFunctie) {
                    window[jsFunctie]();
                }
            } 
      }
    };
    xhttp.open("GET", text + ".html", true);
    xhttp.send();
}
var json
function cautaUtilizator(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            json = JSON.parse(this.responseText);
            console.log(json);
            user=document.getElementById("user").value;
            password=document.getElementById("parola").value;
            for (i=0;i<json.utilizatori.length;i++){
                if (user==json.utilizatori[i].utilizator){
                    if(password==json.utilizatori[i].parola){
                        document.getElementById("response").innerHTML="S-a gasit utilizatorul";
                    }
                }
            }
            if(document.getElementById("response").innerHTML!="S-a gasit utilizatorul"){
                document.getElementById("response").innerHTML="Nu s-a gasit utilizatorul";
            }

        }
    };
    xhttp.open("GET", "resurse/utilizatori.json", true);
    xhttp.send();
}
function inregistreazaFunc(){
    document.getElementById("varsta").addEventListener("change",function(){
        document.getElementById("age").innerHTML = document.getElementById("varsta").value;
    })
    document.getElementById("fieldset").addEventListener("change",function(){
        //console.log(document.getElementById("nume_utilizator").value);
        var requiredFields = document.querySelectorAll("[required]");
        var allFields=true;
        requiredFields.forEach(function(field) {
            if (field.value.trim() === '') {
                allFields = false;
                return false; // to break out of the forEach loop
            }
        });
        if (allFields) {
            //$(".buttons :input[value:'my button value']").prop("disabled", true);
            document.getElementById("registerButton").disabled=false;
        }
    })
}
function inregistreaza(){
    console.log("ITS WORKING");
    fetch("/api/utilizatori", {
        method: "POST",
        body: JSON.stringify({
            utilizator :document.getElementById("nume_utilizator").value,
            parola: document.getElementById("parola_cont").value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
 