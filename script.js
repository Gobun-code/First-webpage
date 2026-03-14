








function pokazalert() {
    alert("działa");
}



function aktualizacjaLicznika() {
    const maxMisji = 10;
    const licznik = document.getElementById('licznik');
    const liczbaMisji = document.getElementById('tasklist').children.length;
    const procent = liczbaMisji / maxMisji;
    licznik.textContent = "liczba misji: " + liczbaMisji;
    const g = 255 * procent;
    const r = 255 * (1 - procent);
licznik.style.color = `rgb(${r}, ${g}, 0)`;
licznik.style.fontSize = `${35 + (liczbaMisji * 1.25)}px`;
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




    li.onclick = function() {
        if (li.classList.contains('zrobione')) {
            li.remove()
            aktualizacjaLicznika()
        }
        else {
        li.classList.toggle('zrobione')
        }
    }




    document.getElementById("tasklist").appendChild(li)

    aktualizacjaLicznika()

    input.value = "";    


    
}



document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask()
    }
    
})











