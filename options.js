// Selecting necessary HTML elements
const activeCellElement = document.querySelector(".selected-cell");
const form = document.getElementById("options-form");
const expressionInput = document.getElementById("expression");

// Variable to store the currently selected cell
let selectedCell = null;

// Object to store the state of each cell
const state = {};

// Default state for cell styling
const defaultState = {
    innerText: "",
    isBold: false,
    align: "left",
    isUnderlined: false,
    isItalic: false,
    fontSize: "16",
    fontFamily: "Sans Serif",
    textColor: "#000000",
    backgroundColor: "FFFFFF"
};

// Function to apply cell information to the form
function applyCellInfoToForm() {
    if (state[selectedCell.id]) {
        const data = state[selectedCell.id];
        for (let key in data) {
            if (form[key].type === "checkbox") {
                form[key].checked = data[key];
            } else {
                form[key].value = data[key];
            }
        }
    } else {
        form.reset();
    }
}

// Function to handle changes in the inner text of the cell
function onChangeInnerText(e) {
    if (state[selectedCell.id]) {
        state[selectedCell.id].innerText = selectedCell.innerText;
    } else {
        state[selectedCell.id] = { ...defaultState, innerText: selectedCell.innerText };
    }
}

// Function to handle focus on a cell
function onFocusCell(e) {
    if (selectedCell) {
        selectedCell.classList.remove("active-cell");
    }
    selectedCell = e.target;
    activeCellElement.innerText = selectedCell.id;
    selectedCell.classList.add("active-cell");
    applyCellInfoToForm();
}

// Function to apply styles to the selected cell
function applyStylesToSelectedCell(styles) {
    selectedCell.style.fontSize = styles.fontSize + "px";
    selectedCell.style.fontFamily = styles.fontFamily;
    selectedCell.style.fontWeight = styles.isBold ? "bold" : "normal";
    selectedCell.style.fontStyle = styles.isItalic ? "italic" : "normal";
    selectedCell.style.textDecoration = styles.isUnderlined ? "underline" : "none";
    selectedCell.style.textAlign = styles.align;
    selectedCell.style.color = styles.textColor;
    selectedCell.style.backgroundColor = styles.backgroundColor;
}

// Event listener for form changes
form.addEventListener("change", function () {
    if (!selectedCell) {
        alert("Please select a cell before making any changes.");
        form.reset();
        return;
    }

    const formData = {
        fontFamily: form["fontFamily"].value,
        fontSize: form["fontSize"].value,
        isBold: form["isBold"].checked,
        isItalic: form["isItalic"].checked,
        isUnderlined: form["isUnderlined"].checked,
        align: form["align"].value,
        textColor: form["textColor"].value,
        backgroundColor: form["backgroundColor"].value
    };

    state[selectedCell.id] = { ...formData, innerText: selectedCell.innerText };
    applyStylesToSelectedCell(formData);
});

// Event listener for expression input
expressionInput.addEventListener("keyup", (e) => {
    if (!selectedCell) {
        alert("Please select a cell to apply the result.");
        return;
    }

    if (e.code === "Enter" && selectedCell) {
        let expression = expressionInput.value;
        try {
            selectedCell.innerText = eval(expression);
        } catch (error) {
            console.error("Error evaluating expression:", error);
            selectedCell.innerText = "Error: " + error.message;
        }
    }
});
