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


function zapiszListe() {
    const tasklist = document.querySelectorAll('#tasklist li, #doneTasks li');
    const tasks = [];
    
    tasklist.forEach(li => {
        tasks.push({
            tekst: li.textContent,
            zrobione: li.classList.contains('zrobione')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Lista zadań została zapisana:', tasks);
}


function TaskStatusChange(li) {
    li.onclick = function() {
        if (li.classList.contains('zrobione')) {
            li.classList.remove('zrobione')
            document.getElementById('tasklist').appendChild(li)
            zapiszListe()
            aktualizacjaLicznika()
        }
        else {
            li.classList.toggle('zrobione')
            document.getElementById('doneTasks').appendChild(li)
            zapiszListe()
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
        const tasks = JSON.parse(savedTasks);

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.tekst;
            if (task.zrobione) {
                li.classList.add('zrobione');
            }

            TaskStatusChange(li)


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
    const delButton = document.createElement('button');
    delButton.textContent = 'usuń'
    delButton.classList.add('delete-button');
    delButton.onclick = function() {
        console.log('jakikolwiek')
        li.remove()
        zapiszListe()
        aktualizacjaLicznika()
    }



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









