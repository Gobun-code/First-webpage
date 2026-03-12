function pokazalert() {
    alert("działa");
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
        }
        else {
        li.classList.toggle('zrobione')
        }
    }


    document.getElementById("tasklist").appendChild(li)

    input.value = "";    
}



document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask()
    }
    
})




function przekreślnik () {
    document.getElementById("tasklist"),addEventListener("click")
    
}





//plan jest taki:
// wziąć element z listy
//patrzeć czy nikt go nie klika
// jeżeli klika to zmienić jego czcionkę na przekreśloną

//zrobić przycisk
//który sprawia że zamiast tego co wyżej nappisałeś
//zamiast przekreślenia
//usuwa się element i chuj
//elo



