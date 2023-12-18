const generateBtn = document.querySelector(".generator");
const div = document.querySelector(".whiteboard");
const container = document.querySelector(".generator-container");
const placeholder = document.querySelector(".placeholder");

let hexGenerated = false;

div.addEventListener("click", (e) => {
    console.log(div.children);
    if (hexGenerated) {
        navigator.clipboard.writeText(e.target.innerText);

        if (container.lastElementChild.classList[0] !== "copied") {
            const span = document.createElement("span");
            span.innerText = "Copied";
            span.classList.add("copied");
            setTimeout(() => {
                span.style.backgroundColor = "black";
            }, 0);
            container.appendChild(span);
        }

        // console.log(container.lastElementChild.classList[0] == "copied");
    }
});

// generate button
generateBtn.addEventListener("click", () => {
    div.removeChild(div.firstElementChild);

    if (container.lastElementChild.classList[0] == "copied") {
        container.removeChild(container.lastElementChild);
    }

    const span = document.createElement("span");
    span.innerText = generate();
    div.appendChild(span);
    // console.log(div.children);
    hexGenerated = true;
});

// randome hex color code generator
function generate() {
    const possibleUnits = "ABCDEF1234567890";
    let value = "#";

    for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * possibleUnits.length);
        value += possibleUnits[index];
    }

    return value;
}

const boxes = document.querySelectorAll(".box");
const forms = document.querySelectorAll("form");
// const input = document.querySelectorAll("input");
const body = document.body;

boxes.forEach((box) => {
    box.style.backgroundColor = box.innerText;
    box.addEventListener("click", (e) => {
        const input = box.firstElementChild.firstElementChild;
        if (e.target !== input) {
            body.style.backgroundColor = box.innerText;
        }
    });
});

forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let boxSpan = form.parentElement.lastElementChild;
        boxSpan.innerText = form.firstElementChild.value;
        let box = form.parentElement;
        box.style.backgroundColor = box.innerText;
    });

    form.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.value.match(/^#[a-fA-F0-9]{6}$/)) {
            let boxSpan = form.parentElement.lastElementChild;
            boxSpan.innerText = form.firstElementChild.value;
            const box = form.parentElement;
            box.style.backgroundColor = box.innerText;
        }
    });

    form.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        navigator.clipboard.readText().then((text) => {
            form.firstElementChild.value = text;
        });
    });
});

// forms.forEach((form) => {});
