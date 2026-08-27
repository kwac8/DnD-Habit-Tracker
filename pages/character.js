
const username = document.getElementById("username-input");
const continueBtn = document.getElementById("continueBtn");

const player = {
    name: "",
    class: "",
    level: 1,
    xp: 0,
    gold: 0,

    sprite: "",
    portrait: "",

    hp: 100,
    maxHp: 100,

    mana: 100,
    maxMana: 100,

    x: 100,
    y: 100,
    width: 16,
    height: 16,
    speed: 2,

    stats: {
        intelligence: 0,
        wisdom: 0,
        strength: 0,
        dexterity: 0
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

    player.stats = {...selectedClass.stats};

    player.maxMana = selectedClass.maxMana;
    player.mana = selectedClass.maxMana;

    player.maxHp = selectedClass.maxHp;
    player.hp = selectedClass.maxHp;

    player.sprite = selectedClass.sprite;
    player.portrait = selectedClass.portrait;
}