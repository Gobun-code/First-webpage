function aktualizacjaLicznika() {
    const maxMisji = 10;
    const licznik = document.getElementById('licznik');
    const liczbaMisji = document.getElementById('tasklist').children.length;
    const procent = liczbaMisji / maxMisji;
    licznik.textContent = "task count: " + liczbaMisji;
    const g = 255 * procent;
    const r = 255 * (1 - procent);
licznik.style.color = `rgb(${r}, ${g}, 0)`;
licznik.style.fontSize = `${35 + (liczbaMisji * 1.25)}px`;
}



function zapiszListe() {
    const tasklist = document.querySelectorAll('#tasklist li');
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


function zaznacziusun(li) {
    li.onclick = function() {
        if (li.classList.contains('zrobione')) {
            li.remove()
            zapiszListe()
            aktualizacjaLicznika()
        }
        else {
            li.classList.toggle('zrobione')
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

            zaznacziusun(li)


        document.getElementById('tasklist').appendChild(li);
        });
    }
}





function addTask() {
    const input =
    document.getElementById("taskInput");
    const TaskText = input.value;

    const li = document.createElement("li");


    if (TaskText !== "") {
        li.textContent = TaskText;
    }
    else {return}

    zaznacziusun(li)


    document.getElementById("tasklist").appendChild(li)

    zapiszListe()

    aktualizacjaLicznika()

    input.value = "";    
}

wczytajDane();
aktualizacjaLicznika();
clearTasks();


document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask()
    }
})









