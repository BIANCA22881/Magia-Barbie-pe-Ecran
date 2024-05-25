var listaCumparaturi = [];
var nrProducts = 0;
var retArray;
var retString;
const myWorker=new Worker("js/worker.js");
class Produs{
    constructor(nameProduct,quantity,nrProducts){
        this.nameProduct=nameProduct;
        this.quantity=quantity;
        this.nrProducts=nrProducts
    }
    add(){
        listaCumparaturi.push(this);
    }
}
function adaugaProdus(){
    nume=document.getElementById("numeProdus").value;
    cantitate=document.getElementById("cantitatea").value;
    //luam din localStorage
    retString=localStorage.getItem("listaCumparaturi")
    if(retString==null){
        listaCumparaturi=[];
        nrProducts=0;
    }else{
        listaCumparaturi=JSON.parse(retString);
        nrProducts=listaCumparaturi.length;
    }
    //console.log(retArray);
    //myWorker.postMessage("Afiseaza lista de cumparaturi")
    nrProducts++
    var produs = new Produs(nume,cantitate,nrProducts);
    produs.add()
    
    let stringV = JSON.stringify(listaCumparaturi);
    localStorage.setItem("listaCumparaturi",stringV);
    showCumparaturi();
    myWorker.postMessage("Au fost adaugate produse in lista de cumparaturi");
}
function showCumparaturi(){
    retString=localStorage.getItem("listaCumparaturi")
    if(retString==null){
        listaCumparaturi=[];
        nrProducts=0;
    }else{
        listaCumparaturi=JSON.parse(retString);
        nrProducts=listaCumparaturi.length;
    }
    console.log(listaCumparaturi);
    myWorker.postMessage("Afiseaza lista de cumparaturi")
}
myWorker.onmessage= (e) =>{
    response=e.data;
    if (response == "Modificati cosul de cumparaturi") {
        var body=document.getElementsByTagName("div")[0];
        var tableExists = document.getElementsByTagName("table")[1];
        //table=body.childNodes[0]
        if(tableExists){
            body.removeChild(tableExists);
        }
        var table=document.createElement("table");
        table.id="tabelCumparaturi"
        //
        var headRow=document.createElement("tr");
        var cellH1 = document.createElement("th");
        var cellTextH1 = document.createTextNode("NR.");
        cellH1.append(cellTextH1);
        headRow.append(cellH1);
        
        var cellH2 = document.createElement("th");
        var cellTextH2 = document.createTextNode("NUME");
        cellH2.append(cellTextH2);
        headRow.append(cellH2);
        
        var cellH3 = document.createElement("th");
        var cellTextH3 = document.createTextNode("CANTITATE");
        cellH3.append(cellTextH3);
        headRow.append(cellH3);

        table.append(headRow);
        for(i=0;i<listaCumparaturi.length;i++){
            console.log("Bagam in tabel: ");
            console.log(listaCumparaturi[i]);

            var row=document.createElement("tr");
            //
            var cell1 = document.createElement("td");
            var cellText1 = document.createTextNode(listaCumparaturi[i].nrProducts);
            cell1.append(cellText1);
            row.append(cell1);
            
            var cell2 = document.createElement("td");
            var cellText2 = document.createTextNode(listaCumparaturi[i].nameProduct);
            cell2.append(cellText2);
            row.append(cell2);
            
            var cell3 = document.createElement("td");
            var cellText3 = document.createTextNode(listaCumparaturi[i].quantity);
            cell3.append(cellText3);
            row.append(cell3);
            //
            table.append(row)
        }
        body.append(table);
    }else if(response == "Stergeti toate produsele din lista"){
        localStorage.clear();
        listaCumparaturi=[];
        nrProducts=0;
        var body = document.getElementsByTagName("div")[0];
        var table = document.getElementsByTagName("table")[1];
        //table=body.childNodes[0]
        if(table){
            body.removeChild(table);
        }
    }
}
function deleteProducts(){
    myWorker.postMessage("Au fost sterse produsele din lista de cumparaturi");
}