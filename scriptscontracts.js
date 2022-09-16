const from = ""
const key = ""

window.onload = async () => {
    window.web3 = new Web3("https://mainnet.infura.io/v3/a0ca98b8bcb64d3dbdd7bf57e5417840")


    //Variables
    const red = document.getElementById("namered")

    const botonContract = document.getElementById("claim")
    const cardContract = document.getElementById("contract_functions")

    const address = document.getElementById("addressContract")
    const abi = document.getElementById("abi")
    const title = document.getElementById("addressContractH2")
    const value = document.getElementById("valueTransaction")

    //Functions
    const actualizarRed = function(){
        switch(red.value){
            case "Mainet":
                window.web3.setProvider("https://mainnet.infura.io/v3/a0ca98b8bcb64d3dbdd7bf57e5417840")
                break
            case "Ropsten":
                window.web3.setProvider("https://ropsten.infura.io/v3/a0ca98b8bcb64d3dbdd7bf57e5417840")
                break
            case "Rinkeby":
                window.web3.setProvider("https://rinkeby.infura.io/v3/a0ca98b8bcb64d3dbdd7bf57e5417840")
                break
            case "Kovan":
                window.web3.setProvider("https://kovan.infura.io/v3/a0ca98b8bcb64d3dbdd7bf57e5417840")
                break
            default:
                alert("EROR CON LA RED")
                break
        }
                
    }
    const send = async function(addfrom,key,direccionContrato,dataEncoded,valueT){
        var count = await web3.eth.getTransactionCount(addfrom)
           var transaction =	{
                to: direccionContrato,
                from : addfrom,
                gasLimit : web3.utils.toHex(100000),
                gasPrice : web3.utils.toHex(web3.utils.toWei("10", "gwei")),
                nonce : web3.utils.toHex(count),
                data: dataEncoded,
                value: web3.utils.toHex(web3.utils.toWei(valueT,"ether"))
            }
            try{
                var signTransaction  = await web3.eth.accounts.signTransaction(transaction,key)
            }catch(e){
                console.log("Error al firmar: " + e)
                return {error: true,output: e}
            }
            console.log("Transaccion Firmada")
            console.log("HASH: " + signTransaction.transactionHash)
        
            console.log("Vamos a enviarla")
            try{
                var result = await web3.eth.sendSignedTransaction(signTransaction.rawTransaction)
            }catch(e){
                console.log("Error al enviar: " + e)
                return {error: true,output: e}
            }
            console.log("Transaccion Enviada")
            return {error: false,output: result}
    }

    const clearABI = function(abi){
        let newABI = ""
        for(let i=0;i<abi.length;i++){
            if(abi[i]!=" " && abi[i]!="\t" && abi[i]!="\n"){
                newABI = newABI + abi[i]
            }
        }
        return newABI
    }

    const createFunctions = async function(){

        
        await actualizarRed()
        cardContract.style.display = "block"
        title.innerHTML = address.value

        //EN CASO DE CLAIM ANTERIOR ELIMINAMOS CONTENEDOR Y OUTPUT
        let contenedor = document.getElementById("contenedorFunctions")
        if(contenedor!=undefined){
            contenedor.remove()
        }
        let output = document.getElementById("output")
        if(output!=undefined) output.remove()

        
        
        //INSTANCIAMOS CONTRATO
        try {
            var abiarray = JSON.parse(clearABI(abi.value))
            var contrato = await new web3.eth.Contract(abiarray,address.value)
        } catch (error) {
            //cardContract.style.display = "none"
            alert("CONTRATO NO INSTANCIADO")
            return
        }

        //CREAMOS CONTENEDOR PRINCIPAL
        contenedor = document.createElement("div")
        contenedor.className = "contenedor"
        contenedor.id = "contenedorFunctions"
        cardContract.appendChild(contenedor)

        var element = '<div class="functionContract"><button class="botonFunction">getBalance</button><input class="arguments" type="text" placeholder="Argument"></div>'
        for (let i = 0; i < abiarray.length; i++) {

            let name = abiarray[i]["name"]

            //SOLO CUANDO NO SEA LA FUNCION CONSTRUCTORA
            if(name!=undefined){

                //VALORES DE CADA FUNCION
                let narg = abiarray[i]["inputs"].length
                let argumentos = abiarray[i]["inputs"]
                let argumentosTipo = []
                let nouts = abiarray[i]["outputs"].length
                let outputs = abiarray[i]["outputs"]
                let outputsTipo = []
                for(let t=0;t<nouts;t++){
                    outputsTipo.push(outputs[t]["type"])
                }
                //INTRODUCIMOS BOTON
                let e1 = document.createElement("div")
                e1.className = "functionContract"
                let e2 = document.createElement("button")
                e2.className = "botonFunction"
                e2.id = "botonFunction" + i
                e2.innerText  = name
                e1.appendChild(e2)

                //INTRODUCIMOS ARGUMENTOS
                if(narg>0){
                    for(let j=0;j<narg;j++){
                        let e3 = document.createElement("input")
                        e3.className = "arguments"+i
                        e3.id = "arguments"+i+j
                        e3.type = "text"
                        e3.placeholder = argumentos[j]["type"]
                        argumentosTipo.push(argumentos[j]["type"])
                        e1.append(e3)
                    }
                }

                //AÑADIMOS EL ELEMENTO FUNCION (BOTON + ARGS)
                contenedor.appendChild(e1)


                document.getElementById("botonFunction"+i).addEventListener('click', function(e){
                    let arg = document.getElementsByClassName("arguments"+i)
                    //se deberia comprobar que estan todos los argumentos
                    funcionContrato(e.target.innerText,arg.length,arg,argumentosTipo,nouts,outputs,outputsTipo,contrato,value.value)
                })
            }
        }
    }


    const funcionContrato = async function(nombre,narg,argumentos,argumentosT,nout,outputs,outputsT,contrato,valueT){
        let output = document.getElementById("output")
        if(output!=undefined) output.remove()

        console.log("NAME: " + nombre)
        console.log("ARG")
        for(let i=0;i<narg;i++){
            console.log(i+": " + argumentos[i].value)
        }
        console.log("OUTPUTS")
        for(let i=0;i<nout;i++){
            console.log(i+": " + outputsT[i])
        }
        
        //CUENTA PREDEFINIDA 3
        let direccionContrato = address.value
        let stringData = "contrato.methods." + nombre + "("
        if(narg>0){
            for(let i=0;i<narg;i++){
                if(i==0){
                    if(argumentosT[i]=="string"){
                        stringData = stringData + '"' + argumentos[i].value + '"'
                    }else{
                        stringData = stringData + argumentos[i].value
                    }
                }else{
                    if(argumentosT[i]=="string"){
                        stringData = stringData + ',"' + argumentos[i].value + '"'
                    }else{
                        stringData = stringData + "," + argumentos[i].value
                    }
                }
            }
        }
        stringData = stringData + ")"
        console.log(stringData)
        let data = eval(stringData).encodeABI()

        if(valueT=="") valueT = "0"
        
        let result = await send(from,key,direccionContrato,data,valueT)
        console.log(result['error'])
        if(result['error']==true){
            console.log("ERROR!!!")
            output = document.createElement("h2")
            output.id = "output"
            output.innerText = "OUTPUT: ERROR"
            cardContract.appendChild(output)
        }else{
            console.log("RESULT => " + result['output'])
            output = document.createElement("h2")
            output.id = "output"
            output.innerText = "OUTPUT: BIEN"
            cardContract.appendChild(output)
        }
    }

    //Listeners
    botonContract.onclick = createFunctions
    
}