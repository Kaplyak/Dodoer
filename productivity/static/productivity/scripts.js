// Function add task
let interval_id = null;
let cycle = "productive";
let ellapsedTime = 0;
const username = document.querySelector("#username").value;

function timer(action) {
    if (action == "start_timer"){
        document.querySelector("#start-timer").style.display = "none";
        document.querySelector("#stop-timer").style.display = "inline";
        interval_id = setInterval(decrease, 1000);

        function decrease() {
            let minutes = Number(document.querySelector('#minutes').innerHTML);
            let seconds = Number(document.querySelector('#seconds').innerHTML);

            if (seconds > 0) {
                seconds -= 1;
                ellapsedTime += 1;
            }
            else if (minutes == 0 && seconds == 0) {
                // Put ellapsed time in database.
                if (cycle == "productive") {
                    fetch('/' + username + '/updatetime', {
                        method: 'PUT',
                        body: JSON.stringify({
                            productive: true,
                            time: ellapsedTime
                        })
                    })
                }

                else {
                    fetch('/' + username + '/updatetime', {
                        method: 'PUT',
                        body: JSON.stringify({
                            productive: false,
                            time: ellapsedTime
                        })
                    })
                }


                // 

                ellapsedTime = 0;
                clearInterval(interval_id);
                
                document.querySelector("#start-timer").style.display = "inline";
                document.querySelector("#stop-timer").style.display = "none";

                if (cycle == "productive") {
                    document.querySelector("#timer-title").innerHTML = "Time for a quick break!"
                    cycle = "break";
                    minutes = 5;
                    seconds = 0;
                }
                else {
                    document.querySelector("#timer-title").innerHTML = "Let's work!"
                    cycle = "productive";
                    minutes = 25;
                    seconds = 0;
                }
            }

            else if (seconds == 0) {
                seconds = 59;
                minutes -= 1;
                ellapsedTime += 1;
            }

            // Place string from values into the innerHTML of minutes and seconds. For single digit numbers, add a 0 to their left.
            document.querySelector('#minutes').innerHTML = minutes.toString().padStart(2, "0");
            document.querySelector('#seconds').innerHTML = seconds.toString().padStart(2, "0");
        }
    }
    
    else if (action == "stop_timer") {
        document.querySelector("#start-timer").style.display = "inline";
        document.querySelector("#stop-timer").style.display = "none";

        // Put ellapsed time in database.
        ellapsedTime = 0;
        clearInterval(interval_id);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Profile
    if (window.location.pathname == '/profile') {
        let obj;

        fetch('/' + username + '/updatetime')
        .then(response => response.json())
        .then(data => obj = data)
        .then(obj => {
            let productive_time = obj.productive_time / 60;
            let break_time = obj.break_time / 60;

            const data = {
            labels: ['Productive time', 'Break time'],
            datasets: [
                {
                    label: 'Productivity dataset',
                    data: [productive_time, break_time],
                    backgroundColor: ['#BDE7FB', '#CFE39D'],
                    borderColor: 'rgba(255, 0, 0, 0)',
                    color: 'white',
                }
            ]
            };
        
            const config = {
                type: 'doughnut',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 14,
                                    family: 'montserrat'
                                },
                                color: 'white'
                            }
                        }
                    }
                },
            };
        
            let productivity_chart = new Chart(
                document.getElementById('productivity_chart'),
                config
            );
        }) 
    }


    // Timer
    else if (window.location.pathname == '/timer') {
    }
        
        


    // Kanban board
    if (window.location.pathname == '/tasklist') {
        document.querySelector('#submit-task').onclick = addTask;

        // Create new task.
        function addTask() {
            const username = document.querySelector("#username").value;

            //Fetch post request, owner, title, description, state.
            fetch('/tasks', {
                method: 'POST',
                body: JSON.stringify({
                    title: document.querySelector('#new-task-title').value,
                    description: document.querySelector('#new-task-description').value
                })
              })
        }






        // Drag and drop
        dragula([
            document.getElementById('1'),
            document.getElementById('2'),
            document.getElementById('3'),
            document.getElementById('4')
        ])
    
        .on('drag', function(el) {
        
            // add 'is-moving' class to element being dragged
            el.classList.add('is-moving');
        })
        .on('dragend', function(el) {
            let parentId = el.parentNode.id;
            console.log(parentId);
            if (parentId == '1') {
                newState = 'ideas'
            } else if (parentId == '2') {
                newState = 'todo'
            } else if (parentId == '3') {
                newState = 'doing'
            } else if (parentId == '4') {
                newState = 'done'
            }
            
            // fetch put element, to change 'state' on database. For example, from 'state: ideas' to 'state: to do'
            fetch(`/movetask/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    state: ''
                })
            })
            
            // remove 'is-moving' class from element after dragging has stopped
            el.classList.remove('is-moving');
            
            // add the 'is-moved' class for 600ms then remove it
            window.setTimeout(function() {
                el.classList.add('is-moved');
                window.setTimeout(function() {
                    el.classList.remove('is-moved');
                }, 600);
            }, 100);
        });
        
        
        var createOptions = (function() {
            var dragOptions = document.querySelectorAll('.drag-options');
            
            // these strings are used for the checkbox labels
            var options = ['Research', 'Strategy', 'Inspiration', 'Execution'];
            
            // create the checkbox and labels here, just to keep the html clean. append the <label> to '.drag-options'
            function create() {
                for (var i = 0; i < dragOptions.length; i++) {
        
                    options.forEach(function(item) {
                        var checkbox = document.createElement('input');
                        var label = document.createElement('label');
                        var span = document.createElement('span');
                        checkbox.setAttribute('type', 'checkbox');
                        span.innerHTML = item;
                        label.appendChild(span);
                        label.insertBefore(checkbox, label.firstChild);
                        label.classList.add('drag-options-label');
                        dragOptions[i].appendChild(label);
                    });
        
                }
            }
            
            return {
                create: create
            }
            
            
        }());
        
        var showOptions = (function () {
            
            // the 3 dot icon
            var more = document.querySelectorAll('.drag-header-more');
            
            function show() {
                // show 'drag-options' div when the more icon is clicked
                var target = this.getAttribute('data-target');
                var options = document.getElementById(target);
                options.classList.toggle('active');
            }
            
            
            function init() {
                for (i = 0; i < more.length; i++) {
                    more[i].addEventListener('click', show, false);
                }
            }
            
            return {
                init: init
            }
        }());
        
        createOptions.create();
        showOptions.init();
    }
})