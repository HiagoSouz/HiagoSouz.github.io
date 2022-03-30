function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
} 

docReady(function() {


    var positionResult = document.getElementById('position-result');
    var orderResult = document.getElementById('order-result');
    var lastResult;
    var snd = new Audio("assets/beep-01a.mp3");  

    
    var html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", { fps: 10, qrbox: 250 });

    
    function onScanSuccess(decodedText) {
        isFaulty = true;
        
        snd.play();

        if (decodedText !== lastResult) {
            lastResult = decodedText;

            if(decodedText.length==8 && decodedText.match(/^([a-zA-Z0-9 _-]+)$/)){
                orderResult.innerHTML += `${decodedText}</div>`;
                isFaulty = false;
                positionResult.innerHTML = `</div>`;

            }

            if(decodedText.length==5 && decodedText.match(/^([0-9 _-]+)$/)){
                positionResult.innerHTML += `${decodedText}</div>`;
                isFaulty = false;
                orderResult.innerHTML = `</div>`;

            }

            if(isFaulty==false){
                document.getElementById("header").style.backgroundColor = '#90EE90';
            }
            
            else{
                document.getElementById("header").style.backgroundColor = '#E18181';
                navigator.vibrate(200);
                positionResult.innerHTML = `</div>`;
                orderResult.innerHTML = `</div>`;
            }

            

            
        }
    }
    
    function onScanError(qrCodeError) {
    }
    
    
    html5QrcodeScanner.render(onScanSuccess, onScanError);
});