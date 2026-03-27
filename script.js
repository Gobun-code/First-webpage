function aktualizacjaLicznika() {
    function licznikzwykły() {
    const maxMisji = 10;
    const licznik = document.getElementById('licznikZwykły');
    const liczbaMisji = document.getElementById('tasklist').children.length;
    const procent = liczbaMisji / maxMisji;
    licznik.textContent = "task count: " + liczbaMisji;
    const g = 255 * procent;
    const r = 255 * (1 - procent);
licznik.style.color = `rgb(${r}, ${g}, 0)`;
licznik.style.fontSize = `${35 + (liczbaMisji * 1.25)}px`;
}
    function licznikzrobione() {
        const maxMisji = 10;
        const licznik = document.getElementById('licznikZrobione');
        const liczbaMisji = document.getElementById('doneTasks').children.length;
        const procent = liczbaMisji / maxMisji;
        licznik.textContent = "task count: " + liczbaMisji;
        const g = 255 * procent;
        const r = 255 * (1 - procent);
    licznik.style.color = `rgb(${r}, ${g}, 0)`;
    licznik.style.fontSize = `${35 + (liczbaMisji * 1.25)}px`;
    }
    licznikzwykły()
    licznikzrobione()
}

const tasks = [];

function zapiszListe() {
    // const tasklist = document.querySelectorAll('#tasklist li, #doneTasks li');
    
    // // tasklist.forEach(li => {
    //     tasks.push({
    //         tekst: li.textContent,
    //         zrobione: li.classList.contains('zrobione'),
    //         id: li.dataset.id,
    //         date: new Date(),
    //     });
    // });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // console.log('Lista zadań została zapisana:', tasks);
}


function TaskStatusChange(li) {
    li.onclick = function(event) {
        // console.log(event.target.tagName)
        if(event.target.tagName == 'LI'){
            console.log(tasks)
            if (li.classList.contains('zrobione')) {
                li.classList.remove('zrobione')
                tasks.map(task => task.id === li.dataset.id? task.zrobione = false: null)

                // zapiszListe()
                // aktualizacjaLicznika()

                // console.log(tasks, event.target.dataset.id)
            }
            else {
                li.classList.add('zrobione')
                tasks.map(task => task.id === li.dataset.id? task.zrobione = true: null)
                document.getElementById('doneTasks').appendChild(li)
            }
            // tasks.filter(task => task.id !== li.dataset.id )
            zapiszListe()
            wczytajDane()
            aktualizacjaLicznika()

        }
    }
}


function clearTasks() {
    document.getElementById('clearTasks').
    onclick = function() {
    document.getElementById('tasklist').
    querySelectorAll('li').forEach(li => {
        li.remove()})
       
    document.getElementById('doneTasks').
    querySelectorAll('li').forEach(li => {
        li.remove()
    })
    zapiszListe()
    aktualizacjaLicznika()}
}




function clearDone() {
    document.getElementById('clearDone').
    onclick = function() {
    document.getElementById('doneTasks').
    querySelectorAll('li.zrobione').forEach(li => {
        li.remove()
    })
    zapiszListe()
    aktualizacjaLicznika()}
}






function wczytajDane() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks[JSON.parse(savedTasks)];
        console.log('działa', tasks)

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.tekst;
            if (task.zrobione) {
                li.classList.add('zrobione');
            }



        const listaDocelowa = task.zrobione 
        ? document.getElementById('doneTasks')
        : document.getElementById('tasklist');
        listaDocelowa.appendChild(li);
        });
    }
}





function addTask() {
    const input =
    document.getElementById("taskInput");
    const TaskText = input.value;

    const span = document.createElement('span');
    span.textContent = TaskText

    const li = document.createElement("li");
    li.setAttribute('data-id', Date.now())
    const delButton = document.createElement('button');
    delButton.textContent = 'X'
    delButton.classList.add('delete-button');
    delButton.onclick = function() {
        // console.log('jakikolwiek')
        li.remove()
        zapiszListe()
        aktualizacjaLicznika()
    }

    tasks.push({
    tekst: li.textContent,
    zrobione: li.classList.contains('zrobione'),
    id: li.dataset.id,
    date: new Date(),
});
// console.log(tasks)


    if (TaskText !== "") {
    }
    else {return}

    TaskStatusChange(li)


    li.appendChild(span)
    li.appendChild(delButton)
    document.getElementById('tasklist').appendChild(li)

    zapiszListe()

    aktualizacjaLicznika()

    input.value = "";    
}

wczytajDane();
aktualizacjaLicznika();
clearTasks();
clearDone();


document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask()
    }
})









