// https://www.dofactory.com/html/color-names

function getColors() {
    let colors = getColorsFromTables();
    colors.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
    colors = JSON.stringify(colors, null, "    ");
    // prettify rgb array (i.e. single line)
    colors = colors.replace(/(\d),\n +/g, "$1, ");
    colors = colors.replace(/\[\n +(\d)/g, "[$1");
    colors = colors.replace(/(\d)\n +\]/g, "$1]");
    // turn into a var, so we can just copy paste
    colors = "var colors = " + colors + ";";
    return colors;
}

function getColorsFromTables() {
    let colors = [];
    let tables = document.querySelectorAll(".color-table");
    tables.forEach(table => {
        colors = colors.concat(getColorsFromTable(table));
    });
    return colors;
}

function getColorsFromTable(table) {
    let colors = [];
    let rows = Array.from(table.tBodies[0].children);
    rows.shift();
    rows.forEach(row => {
        let color = {
            "name": row.children[1].textContent.trim(),
            "rgb": row.children[3].textContent.match(/\d+/g).map(value => parseInt(value))
        };
        colors.push(color);
    });
    return colors;
}

copy(getColors());
console.log(getColors());
