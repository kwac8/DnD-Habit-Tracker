// 1. Quests --till 105
let questInput = document.getElementById("questInput");
let addQuestBtn = document.getElementById("addQuestBtn");
let questList = document.getElementById("questList");

let myQuests = [];

let saved = localStorage.getItem("myQuests");
if (saved !== null) {
    myQuests = JSON.parse(saved);
}

function saveQuests() {
    localStorage.setItem("myQuests", JSON.stringify(myQuests));
}

function renderQuests() {
    questList.innerHTML = "";

    for (let i = 0; i < myQuests.length; i++) {
        let quest = myQuests[i];

        let li = document.createElement("li")
        li.className = "questItem";;

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = quest.done;

        let span = document.createElement("span");
        span.textContent = quest.text;
        if (quest.done === true) {
            span.className = "questDone";
        }

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "×";
        deleteBtn.className = "deleteQuestBtn";

        checkbox.setAttribute("data-index", i);
        deleteBtn.setAttribute("data-index", i);

        checkbox.addEventListener("change", handleCheck);
        deleteBtn.addEventListener("click", handleDelete);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        questList.appendChild(li);
    }

    saveQuests();
}

function handleCheck(event) {
    let index = event.target.getAttribute("data-index");
    index = parseInt(index);

    if (myQuests[index].done === true) {
        myQuests[index].done = false;
    } else {
        myQuests[index].done = true;
    }

    renderQuests();
}

function handleDelete(event) {
    event.stopPropagation();

    let index = event.target.getAttribute("data-index");
    index = parseInt(index);

    myQuests.splice(index, 1);
    renderQuests();
}

function addQuest() {
    let text = questInput.value;
    text = text.trim();

    if (text === "") {
        return;
    }

    let newQuest = {};
    newQuest.text = text;
    newQuest.done = false;

    myQuests.push(newQuest);

    questInput.value = "";
    renderQuests();
}

addQuestBtn.addEventListener("click", addQuest);

questInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addQuest();
    }
});

renderQuests();
// 1