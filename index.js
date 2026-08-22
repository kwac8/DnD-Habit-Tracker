
const player = {
    name: "Adventurer",
    class: "Mage",
    level: 1,
    xp: 0,
    gold: 0
};

function getXpRequired(){
    return player.level * 100;
}

function checkLevelUp() {
    let xpRequired = getXpRequired();

    while (player.xp >= xpRequired) {
        player.xp -= xpRequired;
        player.level++;

        xpRequired = getXpRequired();
    }
}

let playerClass = document.getElementById("playerClass");
let playerLevel = document.getElementById("playerLevel");
let playerGold = document.getElementById("playerGold");
let xpProgress = document.getElementById("xpProgress");

function renderPlayer(){
    playerLevel.textContent = player.level;
    playerGold.textContent = player.gold;
    playerClass.textContent = "Class: " + player.class;

    renderXpBar();
}

function renderXpBar(){
    let xpRequired = getXpRequired();

    let precentage = (player.xp / xpRequired) * 100;

    precentage = Math.min(precentage, 100);

    xpProgress.style.width = precentage + "%";
}

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
    renderPlayer();
}

function handleCheck(event) {
    let index = parseInt(event.target.getAttribute("data-index"));
    let quest = myQuests[index];

    if (quest.done === false) {
        quest.done = true;
        completeQuest(index);
    } else {
        quest.done = false;
    }

    renderQuests();
}

function completeQuest(index){
    let quest = myQuests[index];

    if (quest.rewarded === true){
        return;
    }
    player.xp += quest.xp;
    player.gold += quest.gold;
    quest.rewarded = true;

    checkLevelUp();
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
    newQuest.xp = 20;
    newQuest.gold = 10;
    newQuest.done = false;
    newQuest.rewarded = false;

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