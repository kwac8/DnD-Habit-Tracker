
const username = document.getElementById("username-input");
const continueBtn = document.getElementById("continueBtn");

const player = {
    name: "",
    class: "",
    level: 1,
    xp: 0,
    gold: 0
};

const stats = {
    intelligence: 0,
    wisdom: 0,
    strength: 0,
    dexterity: 0,
    mana: 100
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

    localStorage.setItem("playerData", JSON.stringify({
        player: player,
        stats: stats
    }));

    console.log("PLAYER:", player);
    console.log("STATS:", stats);

    window.location.href = "../index.html";
});

function setStartingStats() {

    if (player.class === "Mage") {
        stats.intelligence = 8;
        stats.wisdom = 5;
        stats.strength = 2;
        stats.dexterity = 4;
        stats.mana = 150;

    } else if (player.class === "Assassin") {
        stats.intelligence = 4;
        stats.wisdom = 3;
        stats.strength = 5;
        stats.dexterity = 9;
        stats.mana = 100;

    } else if (player.class === "Warlord") {
        stats.intelligence = 3;
        stats.wisdom = 4;
        stats.strength = 10;
        stats.dexterity = 4;
        stats.mana = 80;

    } else if (player.class === "Alchemist") {
        stats.intelligence = 9;
        stats.wisdom = 7;
        stats.strength = 3;
        stats.dexterity = 5;
        stats.mana = 130;

    } else if (player.class === "Berserker") {
        stats.intelligence = 2;
        stats.wisdom = 2;
        stats.strength = 12;
        stats.dexterity = 6;
        stats.mana = 70;
    }
}