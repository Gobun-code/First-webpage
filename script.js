








function pokazalert() {
    alert("działa");
}



function aktualizacjaLicznika() {
    document.getElementById('licznik').textContent = "liczba misji: " + document.getElementById('tasklist').children.length
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











