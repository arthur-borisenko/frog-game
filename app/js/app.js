var totalTries;
var currentTries;
var frogIdMap;
var flagRun;

function logMapElements(value, key, map) {
    console.log(`m[${key}] = ${value}`);
}

function hide(el) {
    el.style = "display:none";
}

function show(el) {
    el.style = "display:block";
}

new Map([['foo', 3], ['bar', {}], ['baz', undefined]])
    .forEach(logMapElements);

initGame()

function initGame() {
    flagRun = true
    totalTries = 0;
    currentTries = 2;
    frogIdMap = new Map([
        ["frog1", "kuvshinka-1"],
        ["frog2", "kuvshinka-2"],
        ["frog3", "kuvshinka-3"],
        ["frog4", "kuvshinka-4"],
        ["frog5", "kuvshinka-5"]
    ]);

    hideAllFrogs(frogIdMap);
    initListeners(frogIdMap)
}

function jumpFrogById(frogId, frogIdMap) {
    if (flagRun) {
        hideAllFrogs(frogIdMap);
        showFrogById(frogId);
    }
}

function hideAllFrogs(frogIdMap) {
    frogIdMap.forEach(
        (kuvshinkaId, frogId) => hideFrogById(frogId)
    );
}

function hideFrogById(frogId) {
    var el = document.getElementById(frogId);
    el.style = "display:none";
}

function showFrogById(frogId) {
    var el = document.getElementById(frogId);
    if (frogId === "frog4") {
        el.style = "display:block";
        flagRun = false
        show(document.getElementById("win"))
    }
}

function clickProcessor(frogId, frogIdMap) {
    return function () {
        jumpFrogById(frogId, frogIdMap)
        if (flagRun) {
            totalTries = totalTries + 1;
            document.getElementById("counter1").innerHTML = totalTries;
            document.getElementById("counter2").innerHTML = currentTries - totalTries;
        }
        if (totalTries > currentTries - 1) {
            if (flagRun) {
                show(document.getElementById("lose"))
            }
            flagRun = false;
        }
    };
}

function initListeners(frogIdMap) {
    frogIdMap.forEach(
        (kuvshinkaId, frogId, map) => {
            document.getElementById(kuvshinkaId).addEventListener("click", clickProcessor(frogId, frogIdMap));
        }
    )
}