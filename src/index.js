const electron=require('electron');
const path=require('path');
const BrowserWindow=electron.remote.BrowserWindow;
const axios=require('axios');
const ipc=electron.ipcRenderer


const notifyBtn=document.getElementById('notifyBtn')
var price = document.querySelector('#price')
var targetPriceVal;
var targetPrice = document.getElementById('targetPrice')

const notification={
    title:'Crypto Notifier',
    body:'Bitcoin just crossed your target price!',
    icon: path.join(__dirname, '../assets/images/btc.png')
}

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=INR')
    .then(res => {
        const cryptos = res.data.BTC.INR
        price.innerHTML = '₹'+cryptos.toLocaleString('en')

        if(targetPrice.innerHTML!=''&&targetPriceVal<res.data.BTC.INR)
        {
            const myNotification=new window.Notification(notification.title,notification)
        }
    })
}

getBTC();
setInterval(getBTC,3000);



notifyBtn.addEventListener('click',function(event){
    const modalPath=path.join('file://',__dirname,'add.html')
    let win =new BrowserWindow({frame:false,transparent:true,alwaysOnTop: true,width:400,height:200})
    win.on('close',function(){win=null})
    win.loadURL(modalPath)
    win.show()
})

ipc.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = '₹'+targetPriceVal.toLocaleString('en')
})

/////USD................................................
var price1 = document.querySelector('#price1')

function getBTC1() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
        const cryptos = res.data.BTC.USD
        price1.innerHTML = '$'+cryptos.toLocaleString('en')
    })
}

getBTC1();
setInterval(getBTC1,30000);


