
const questManaCost = 10;

const player = {
    name: "",
    class: "",
    level: 1,
    xp: 0,
    gold: 0,

    hp: 100,
    maxHp: 100,

    mana: 100,
    maxMana: 100,

    stats: {
        intelligence: 0,
        wisdom: 0,
        strength: 0,
        dexterity: 0
    }
};

// Load character
const savedPlayerData = localStorage.getItem("playerData");

if (savedPlayerData !== null) {

    const playerData = JSON.parse(savedPlayerData);

    if (playerData.name === "" || playerData.class === "") {
        window.location.href = "pages/character.html";
    } else {
        Object.assign(player, playerData);
    }
    } else {
    window.location.href = "pages/character.html";
}

function savePlayerData() {
    localStorage.setItem("playerData", JSON.stringify(player));
}
//

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
let playerName = document.getElementById("name");
let manaDrain = document.getElementById("manaDrain");

function renderPlayer(){
    playerLevel.textContent = player.level;
    playerGold.textContent = player.gold;
    playerClass.textContent = "Class: " + player.class;
    playerName.textContent = "Name: " + player.name;

    renderXpBar();
    renderManaBar();
}

function renderXpBar(){
    let xpRequired = getXpRequired();

    let percentage = (player.xp / xpRequired) * 100;

    percentage = Math.min(percentage, 100);

    xpProgress.style.width = percentage + "%";
}

function renderManaBar() {
    let percentage = (player.mana / player.maxMana) * 100;

    percentage = Math.max(percentage, 0);
    percentage = Math.min(percentage, 100);

    manaDrain.style.width = percentage + "%";
}

let selectionWindow = document.getElementById("selection-window");
let confirmSelectionWindow = document.getElementById("confirmCategory");
let intelligence = document.getElementById("intelligence");
let wisdom = document.getElementById("wisdom");
let strength = document.getElementById("strength");
let dexterity = document.getElementById("dexterity");

function renderStats(){

    intelligence.textContent =
        "Intelligence: " + player.stats.intelligence;

    wisdom.textContent =
        "Wisdom: " + player.stats.wisdom;

    strength.textContent =
        "Strength: " + player.stats.strength;

    dexterity.textContent =
        "Dexterity: " + player.stats.dexterity;
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
    renderStats();
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

function completeQuest(index) {
    let quest = myQuests[index];

    if (quest.rewarded === true) {
        return;
    }

    player.xp += quest.xp;
    player.gold += quest.gold;
    quest.rewarded = true;

    player.mana = Math.max(0, player.mana - quest.manaCost);

    if (quest.category === "Study") {
        player.stats.intelligence += 2;

    } else if (quest.category === "Train") {
        player.stats.strength += 2;

    } else if (quest.category === "Read") {
        player.stats.wisdom += 2;

    } else if (quest.category === "Clean") {
        player.stats.dexterity += 2;
    }

    checkLevelUp();
    getAchievement();
    savePlayerData();
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

    selectionWindow.style.display = "block";

    renderQuests();
}

confirmSelectionWindow.addEventListener("click", function() {

    let selectedCategory = document.querySelector(
        'input[name="category"]:checked'
    );

    if (selectedCategory === null) {
        return;
    }

    let text = questInput.value.trim();

    let newQuest = {};

    newQuest.text = text;
    newQuest.category = selectedCategory.value;
    newQuest.xp = 20;
    newQuest.gold = 10;
    newQuest.done = false;
    newQuest.rewarded = false;
    newQuest.manaCost = questManaCost;

    myQuests.push(newQuest);

    questInput.value = "";

    selectionWindow.style.display = "none";

    renderQuests();
});

addQuestBtn.addEventListener("click", addQuest);

questInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addQuest();
    }
});

//achievement system
let achievements = [
    { name: "Getting started", unlocked: false },
    { name: "Hardworker", unlocked: false },
    { name: "Oath keeper", unlocked: false },
    { name: "Growing strong", unlocked: false },
    { name: "Mastermind", unlocked: false },
    { name: "Your reiatsu is so big!", unlocked: false },
    { name: "Bankai", unlocked: false }
];

function getAchievement(){
    if(player.level === 2 && achievements[0].unlocked === false){
        alert(achievements[0].name);
        achievements[0].unlocked = true;
    };
    if(player.stats.strength === 10 && achievements[3].unlocked === false){
        alert(achievements[3].name);
        achievements[3].unlocked = true;
    }
    if(player.stats.dexterity === 10 && achievements[2].unlocked === false){
        alert(achievements[2].name);
        achievements[2].unlocked = true;
    }
    if(player.stats.intelligence === 10 && achievements[4].unlocked === false){
        alert(achievements[4].name);
        achievements[4].unlocked = true;
    }
    if(player.maxMana === 500 && achievements[5].unlocked === false){
        alert(achievements[5].name);
        achievements[5].unlocked = true;
    }
    if(player.maxMana === 1000 && achievements[6].unlocked === false){
        alert(achievements[6].name);
        achievements[6].unlocked = true;
    }
    
    saveAchievements();
}

function saveAchievements() {
    localStorage.setItem("achievements", JSON.stringify(achievements));
}

renderQuests();