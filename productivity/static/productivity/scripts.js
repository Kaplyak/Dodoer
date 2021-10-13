let interval_id = null;
function timer(action) {

    if (action == "start_timer"){
        interval_id = setInterval(decrease, 1000);

        function decrease() {
            let minutes = Number(document.querySelector('#minutes').innerHTML);
            let seconds = Number(document.querySelector('#seconds').innerHTML);

            if (seconds > 0) {
                seconds -= 1;
            }
            else if (minutes == 0 && seconds == 0) {
                clearInterval(interval_id);
            }
            else if (seconds == 0) {
                seconds = 59;
                minutes -= 1;
            }

            // Place string from values into the innerHTML of minutes and seconds. For single digit numbers, add a 0 to their left.
            document.querySelector('#minutes').innerHTML = minutes.toString().padStart(2, "0");
            document.querySelector('#seconds').innerHTML = seconds.toString().padStart(2, "0");
        }
    }
    
    else if (action == "stop_timer") {
        clearInterval(interval_id);
    }
}