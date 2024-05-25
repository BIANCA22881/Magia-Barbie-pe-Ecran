onmessage = (e) =>{
    const workerResult = e.data;
    if (workerResult == "Au fost adaugate produse in lista de cumparaturi"){
        postMessage("Modificati cosul de cumparaturi")
    }else if(workerResult=="Au fost sterse produsele din lista de cumparaturi"){
        postMessage("Stergeti toate produsele din lista")
    }else if("Afiseaza lista de cumparaturi"){
        postMessage("Modificati cosul de cumparaturi")
    }
    console.log(workerResult)
}