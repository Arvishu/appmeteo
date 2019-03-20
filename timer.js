function timer(){

let date=new Date()
let h=date.getHours();
if (h<10) {h = "0" + h}
let m=date.getMinutes();
if (m<10) {m = "0" + m}
let s=date.getSeconds();
if (s<10) {s = "0" + s}



let clock = h + " : "+ m + " : " + s

document.getElementById("clock").innerText = clock;
document.getElementById("clock").textContent = clock;
    
    setTimeout(timer, 1000);
}
timer();