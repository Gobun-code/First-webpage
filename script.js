const tasks = [];

document.getElementById('toDoList').addEventListener('click',(event) => TaskStatusChange(event.target) )
document.getElementById('doneList').addEventListener('click',(event) => TaskStatusChange(event.target) )



document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask()
    }
})


function addTask() {
    const input =
    document.getElementById("taskInput");
    const taskText = input.value;
    
    if(taskText == ''){
        return
    }
    
    tasks.push({
        tekst: taskText,
        zrobione: false,
        id: Date.now(),
        date: new Date(),
    });

    zapiszListe();
    wczytajDane();

    aktualizacjaLicznika()

    input.value = "";    
}

function renderTasks(){
    const toDoList = document.getElementById('toDoList')
    const doneList = document.getElementById('doneList')
    toDoList.innerHTML = ''
    doneList.innerHTML = ''

    tasks.map(task =>{
        if(task.zrobione){
            doneList.innerHTML += `
            <li data-id=${task.id} class="zrobione"> <span> ${task.tekst} </span> <span> ${String(task.date).substring(0, 10)} ${String(task.date).substring(11, 19)} </span> <button class="delete-button"> X </button></li>`
            document.querySelectorAll('.delete-button').forEach((button) => {button.addEventListener('click',(e) => deleteButton(e))})
        }
        else{
            toDoList.innerHTML += `
            <li data-id=${task.id}> <span> ${task.tekst} </span> <span> ${String(task.date).substring(0, 10)} ${String(task.date).substring(11, 19)} </span> <button class="delete-button"> X </button></li>`
            document.querySelectorAll('.delete-button').forEach((button) => {button.addEventListener('click',(e) => deleteButton(e))})
        }
    })
}

function zapiszListe() {
    localStorage.clear()
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function wczytajDane() {
    const savedTasks = localStorage.getItem('tasks');
    tasks.length = 0
    tasks.push(...JSON.parse(savedTasks))
    console.log(tasks)
    renderTasks()
}

function aktualizacjaLicznika() {
    function licznikzwykły() {
        const maxMisji = 10;
        const licznik = document.getElementById('licznikZwykły');
        const liczbaMisji = document.getElementById('toDoList').children.length;
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
        const liczbaMisji = document.getElementById('doneList').children.length;
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

function TaskStatusChange(li) {
    console.log(li)
    if(li.tagname!='BUTTON'){

        tasks.map(task => task.id == li.closest('li').dataset.id
        ? task.zrobione = !task.zrobione
        :null)

        renderTasks();
        zapiszListe();
        aktualizacjaLicznika();
    }
    else{console.log('czy klikam guziora')}
}

function clearTasks() {
    tasks.splice(0, tasks.length)
    renderTasks()
    zapiszListe()
    aktualizacjaLicznika()
}

function clearDone() {
    const toDoT = tasks.filter(task => task.zrobione === false)
    tasks.splice(0, tasks.length)
    tasks.push(...toDoT)

    renderTasks()
    zapiszListe()
    aktualizacjaLicznika()
}

function deleteButton(e){
    console.log('usuwanie')
    const unDeleted = tasks.filter(task => task.id != e.target.closest('li').dataset.id )
    tasks.splice(0, tasks.length)
    tasks.push(...unDeleted)

    renderTasks()
    zapiszListe()
    aktualizacjaLicznika()



}

wczytajDane();
aktualizacjaLicznika();







// dodać sortowanie po dacie