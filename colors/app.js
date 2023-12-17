const boxes = document.querySelectorAll(".box");
const forms = document.querySelectorAll("form");
const body = document.body;

boxes.forEach((box) => {
    box.style.backgroundColor = box.innerText;
    box.addEventListener("click", (e) => {
        if (box.firstElementChild !== e.target) {
            // console.log(e.target.innerText, box, e);
            body.style.backgroundColor = box.innerText;
        }
    });
});

// console.log(forms);
forms.forEach((form) => {
    // console.log(form);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // console.log(form.children[0].value);
        const elem = form.parentElement.children;
        elem[elem.length - 1].innerText = form.children[0].value;
        boxes.forEach((box) => {
            box.style.backgroundColor = box.innerText;
        });
    });
});

// console.log(box);

const btn = document.querySelector(".generator");
const div = document.querySelector(".whiteboard");
// console.log(btn);

div.addEventListener("click", (e) => {
    // console.log(e.target.innerText);
    navigator.clipboard.writeText(e.target.innerText);
    // e.target.innerText += " copied";
});

btn.addEventListener("click", () => {
    div.innerText = generate();
});

document.addEventListener("DOMContentLoaded", () => {
    div.innerText = generate();
});

function generate() {
    const possibleUnits = "ABCDEF1234567890";
    let value = "#";

    for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * possibleUnits.length);
        value += possibleUnits[index];
    }

    return value;
}

// generate();
