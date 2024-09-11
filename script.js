const startButton = document.getElementsByClassName("start")[0];
    const resetButton = document.getElementsByClassName("reset")[0];
    const clearButton = document.getElementsByClassName("lap-clear-button")[0]; 
    const lapButton = document.getElementsByClassName("lap")[0];
    const minute = document.getElementsByClassName("minutes")[0];
    const second = document.getElementsByClassName("sec")[0];
    const centiSecondElem = document.getElementsByClassName("msec")[0];
    const laps = document.getElementsByClassName("laps")[0];
    
    let isplay = false;
    let isReset = false;
    let min;
    let sec;
    let centiSec;
    let secCounter = 0;
    let minCounter = 0;
    let centiCounter = 0;
    let lapCounter = 1;

    const togglebutton = () => {
        lapButton.classList.remove("hidden");
        resetButton.classList.remove("hidden");
    };

    const play = () =>{
        if(!isplay && !isReset){
            startButton.innerHTML = 'Pause';
            min = setInterval(() =>{
                minute.innerHTML = `${++minCounter} : `;
            }, 60 * 1000);
            sec = setInterval(() =>{
                if(secCounter === 60){
                    secCounter = 0;
                }
                second.innerHTML = `${++secCounter} : `;
            }, 1000);

            centiSec = setInterval(() =>{
                if(centiCounter === 100) {
                    centiCounter = 0;
                }
                centiSecondElem.innerHTML = `${++centiCounter}` ;
            }, 10);
            isplay = true;
            isReset = true;
        } else {
            startButton.innerHTML = 'Start';
            clearInterval(min);
            clearInterval(sec);
            clearInterval(centiSec);
            isplay = false;
        }
        togglebutton();
    };

    const reset = () =>{
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);
        lapButton.classList.add("hidden");
        resetButton.classList.add("hidden");
        minute.innerHTML = '0 :';
        second.innerHTML = `0 :`;
        centiSecondElem.innerHTML = `0`;
        secCounter = 0;
        minCounter = 0;
        centiCounter = 0;
        isplay = false;
        isReset = false;
    };

    const lap = () => {
        const li = document.createElement("li");
        const number = document.createElement("span");
        const timeStamp = document.createElement("span");

        li.setAttribute("class", "lap-item");
        number.setAttribute("class", "number");
        timeStamp.setAttribute("class", "time-stamp");

        number.innerHTML = `#${lapCounter++}`; 
        timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;

        li.append(number, timeStamp);
        laps.append(li);
    };

    const clearAll = () => {
        laps.innerHTML = '';  
    }

    startButton.addEventListener("click", play);
    resetButton.addEventListener("click", reset);
    lapButton.addEventListener("click", lap);
    clearButton.addEventListener("click", clearAll);  
   