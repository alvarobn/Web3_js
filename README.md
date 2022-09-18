# Web3_js

_Proyecto de pruebas de web3.js sobre la red de Ethereum. Se utiliza una plantilla basica de html en la cual definos nuestro scripts en javascript que utilizaran web3.js para comunicarse con la red. Se implementan funciones basicas como obtener balance de una wallet, realizar transacciones entre billeteras, balances de contratos ERC20 y varias funcionalidades más. Se implementa tambien un sistema de selección de red para testeos._

## Comenzando 🚀

### Pre-requisitos 📋

_Para una correcta funcionalidad de los scripts sera necesario disponer de web3.js instalado en su equipo. Una vez instalado instancie web3 en su equipo antes de utilizar la pagina:_

```
npm i web3
```

### Ajustes Personalizados ⚙️

_Para este prototipo se han utilizado los nodos proporcionados por [infura](https://infura.io/). Se recomienda cambiar estos nodos por unos propios:_

```
window.web3.setProvider("https://mainnet.infura.io/v3/a0ca98b8bcb64d3dbdd7bf57e5417840")
window.web3.setProvider("https://ropsten.infura.io/v3/a0ca98b8bcb64d3dbdd7bf57e5417840")
window.web3.setProvider("https://rinkeby.infura.io/v3/a0ca98b8bcb64d3dbdd7bf57e5417840")
window.web3.setProvider("https://kovan.infura.io/v3/a0ca98b8bcb64d3dbdd7bf57e5417840")
```
Por otro lado se debe configurar las variables "from" y "key" del archivo "scriptscontracts.js" para que las peticiones se realicen de forma correcta:
```
const from = ""
const key = ""
```


## IMPORTANTE 🚨

En la última aportación se ha creado un apartado para integrar Smart Contracts donde se podrá interactuar con sus funciones. Actualmente, solo se toman en cuenta argumentos de tipo "int" y "string", además no hay integrado un sistema de visualización de las respuestas.

### ROXIMAMENTE 📌

* Mayor flexibilidad con el tipo de argumentos utilizados.
* Implementación de una correcta visualización de respuestas.
* Incorporación de algun sistema para modificar el gas a utilizar.

## Autor ✒️

_Proyecto desarrollado con ❤️ por:_

* **Alvaro Borreguero Nava** - [alvarobn](https://github.com/alvarobn)

---
