
const username = document.getElementById("username-input");
const continueBtn = document.getElementById("continueBtn");

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

const classData = {
    Mage: {
        intelligence: 8,
        wisdom: 5,
        strength: 2,
        dexterity: 4,
        maxMana: 150,
        maxHp: 80
    },

    Assassin: {
        intelligence: 4,
        wisdom: 3,
        strength: 5,
        dexterity: 9,
        maxMana: 100,
        maxHp: 90
    },

    Warlord: {
        intelligence: 3,
        wisdom: 4,
        strength: 10,
        dexterity: 4,
        maxMana: 80,
        maxHp: 130
    },

    Alchemist: {
        intelligence: 9,
        wisdom: 7,
        strength: 3,
        dexterity: 5,
        maxMana: 130,
        maxHp: 90
    },

    Berserker: {
        intelligence: 2,
        wisdom: 2,
        strength: 12,
        dexterity: 6,
        maxMana: 70,
        maxHp: 150
    }
};

continueBtn.addEventListener("click", function() {

    const selectedClass = document.querySelector(
        'input[name="class"]:checked'
    );

    const playerName = username.value.trim();

    if (playerName === "") {
        alert("Please enter a name.");
        return;
    }
    if (selectedClass === null) {
        alert("Please choose a class.");
        return;
    }

    player.name = playerName;
    player.class = selectedClass.value;

    setStartingStats();

    localStorage.setItem("playerData", JSON.stringify(player));

    window.location.href = "../index.html";
});

function setStartingStats() {

    const selectedClass = classData[player.class];

    player.stats.intelligence = selectedClass.intelligence;
    player.stats.wisdom = selectedClass.wisdom;
    player.stats.strength = selectedClass.strength;
    player.stats.dexterity = selectedClass.dexterity;

    player.maxMana = selectedClass.maxMana;
    player.mana = selectedClass.maxMana;

    player.maxHp = selectedClass.maxHp;
    player.hp = selectedClass.maxHp;
}