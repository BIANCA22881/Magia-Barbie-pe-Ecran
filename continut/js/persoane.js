function incarcaPersoane(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("continut").innerHTML = this.responseText;
            //console.log(this.responseText);
            xmText=this.responseXML
            //console.log(xmText);
            var peopleList = xmText.getElementsByTagName("persoana")
            console.log(peopleList);
            var main=document.getElementsByTagName("main")[0];
            var table=document.createElement("table");
            var head=document.createElement("tr");
            let i=1;
            while(i<peopleList[0].children.length*2){
                var cell=document.createElement("th");
                var cellText=document.createTextNode(peopleList[1].childNodes[i].nodeName)        
                cell.append(cellText);
                head.append(cell);
                i+=2;
            }
            table.append(head);
        
            for(i=0;i<peopleList.length;i++){
                var body=document.createElement("tr");
                let j=1;
                while(j<peopleList[i].children.length*2){
                    var cellB=document.createElement("td");
                    var text="";
                    //console.log(peopleList[i].children.length);
                    if(peopleList[i].childNodes[j].children.length==0)
                    {
                        text+=peopleList[i].childNodes[j].innerHTML;
                        //console.log(text);
                    }
                    else{
                        for(k=1;k<peopleList[i].childNodes[j].children.length*2;k+=2){
                            text+=peopleList[i].childNodes[j].childNodes[k].nodeName+": "+peopleList[i].childNodes[j].childNodes[k].innerHTML+", ";
                        }   
                    }
                    var cellBText=document.createTextNode(text)        
                    cellB.append(cellBText);
                    body.append(cellB);
                    j+=2;
                }
                table.append(body);
            }
            main.append(table);
        }
    };
    xhttp.open("GET", "resurse/persoane.xml", true);
    xhttp.send();
}
