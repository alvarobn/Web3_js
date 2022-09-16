window.onload = async () => {
    window.web3 = new Web3("https://mainnet.infura.io/v3/a0ca98b8bcb64d3dbdd7bf57e5417840")


    //Variables
    const red = document.getElementById("namered")

    const botonBalance = document.getElementById("claim")
    const address = document.getElementById("addressBalance")
    const balance = document.getElementById("balance")
            
    const botonTransaction = document.getElementById("send")
    const addressFrom = document.getElementById("addressFrom")
    const addressTo = document.getElementById("addressTo")
    const key = document.getElementById("key")
    const amount = document.getElementById("amount")
    const hash = document.getElementById("hash")

    const botonBalanceContract = document.getElementById("claimcontract")
    const addresContract = document.getElementById("addressContract")
    const addressContractBalance = document.getElementById("addressBalanceContract")
    const balanceContract = document.getElementById("balancecontract")

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
    const getBalance = async function() {
        await actualizarRed()
        const direccion = address.value
        var value = await window.web3.eth.getBalance(direccion)
        var etherbalance = await window.web3.utils.fromWei(value,'ether')
        balance.innerText = etherbalance + " ETH"
    }
    const sendTransaction = async function() {
        await actualizarRed()
        var count = await window.web3.eth.getTransactionCount(addressFrom.value)
        var transaction =	{
            from : addressFrom.value,
            to : addressTo.value,
            value : web3.utils.toHex(web3.utils.toWei(amount.value, 'ether')),
            gas : web3.utils.toHex(21000),
            gasPrice : web3.utils.toHex(web3.utils.toWei("10", "gwei")),
            nonce : web3.utils.toHex(count)
        }
        var error, signTransaction = await window.web3.eth.accounts.signTransaction(transaction,key.value)
        if(error){
            alert("Error al firmar: " + error)
            return error,null
        }else{
            alert("Transaccion Firmada")
            hash.innerText = signTransaction.transactionHash
        }
        alert("Vamos a enviarla")
        var error,result = await window.web3.eth.sendSignedTransaction(signTransaction.rawTransaction)
        if(error){
            alert("Error al enviar: " + error)
            return error,null
        }else{
            alert("Transaccion Enviada")
            return null,result
        }
    }

    const getBalanceContract = async function() {
        await actualizarRed()
        var abiDefault = [{"constant":true ,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"}]
        var contrato = await new window.web3.eth.Contract(abiDefault,addresContract.value)
        var balance = Math.floor(await contrato.methods.balanceOf(addressContractBalance.value).call())
        var name = await contrato.methods.name().call()
        var decimals = Math.floor(await contrato.methods.decimals().call())
        var balance1 = balance/(Math.pow(10,decimals))
        balanceContract.innerText = balance1 + " " + name
    }

    //Listeners
    botonBalance.onclick = getBalance
    botonTransaction.onclick = sendTransaction
    botonBalanceContract.onclick = getBalanceContract

}