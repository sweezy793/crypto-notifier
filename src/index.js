const electron=require('electron');
const path=require('path');
const BrowserWindow=electron.remote.BrowserWindow;
const axios=require('axios');

const notifyBtn=document.getElementById('notifyBtn')
var price = document.querySelector('#price')
var targetPrice = document.getElementById('targetPrice')

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=INR')
    .then(res => {
        const cryptos = res.data.BTC.INR
        price.innerHTML = '₹'+cryptos.toLocaleString('en')
    })
}

getBTC();
setInterval(getBTC,30000);


var price1 = document.querySelector('#price1')
var targetPrice1 = document.getElementById('targetPrice')

function getBTC1() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
        const cryptos = res.data.BTC.USD
        price1.innerHTML = '$'+cryptos.toLocaleString('en')
    })
}

getBTC1();
setInterval(getBTC1,30000);



notifyBtn.addEventListener('click',function(event){
    const modalPath=path.join('file://',__dirname,'add.html')
    let win =new BrowserWindow({frame:false,transparent:true,alwaysOnTop: true,width:400,height:200})
    win.on('close',function(){win=null})
    win.loadURL(modalPath)
    win.show()
})