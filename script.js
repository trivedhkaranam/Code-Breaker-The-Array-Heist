let arr = new Array(10).fill(null);
let secret = [];

function init() {
  secret = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));
  document.getElementById("secretPattern").textContent = "Secret Pattern: " + secret.join(",");
  render();
}

function render() {
  const container = document.getElementById("array");
  container.innerHTML = "";
  arr.forEach((val) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = val !== null ? val : "";
    container.appendChild(cell);
  });
}

function insertAt() {
  const index = parseInt(document.getElementById("indexInput").value);
  const value = parseInt(document.getElementById("valueInput").value);

  if (isNaN(index) || isNaN(value) || index < 0 || index >= arr.length) {
    feedback("Index out of bounds or invalid!", true);
    return;
  }

  for (let i = arr.length - 1; i > index; i--) {
    arr[i] = arr[i - 1];
  }
  arr[index] = value;
  feedback(`Inserted ${value} at index ${index}!`);
  render();
  checkSecret();
}

function deleteAt() {
  const index = parseInt(document.getElementById("indexInput").value);
  if (isNaN(index) || index < 0 || index >= arr.length) {
    feedback("Index out of bounds!", true);
    return;
  }

  arr.splice(index, 1);
  arr.push(null);
  feedback(`Deleted element at index ${index}.`);
  render();
}

async function searchPattern() {
  const patternStr = document.getElementById("patternInput").value;
  if (!patternStr) {
    feedback("Enter a valid pattern (e.g., 1,2,3)", true);
    return;
  }

  const pattern = patternStr.split(",").map(Number);
  const container = document.getElementById("array").children;

  for (let i = 0; i <= arr.length - pattern.length; i++) {
    for (let j = 0; j < container.length; j++) container[j].classList.remove("highlight");

    let match = true;
    for (let j = 0; j < pattern.length; j++) {
      container[i + j].classList.add("highlight");
      if (arr[i + j] !== pattern[j]) match = false;
    }

    await new Promise(r => setTimeout(r, 600));

    if (match) {
      feedback("Pattern found at index " + i + " 🎉");
      checkSecret();
      return;
    }
  }
  feedback("Pattern not found.", true);
}

function resetArray() {
  arr = new Array(10).fill(null);
  feedback("Array reset.");
  render();
}

function feedback(msg, error = false) {
  const fb = document.getElementById("feedback");
  fb.textContent = msg;
  fb.className = error ? "error" : "success";
}

function checkSecret() {
  for (let i = 0; i <= arr.length - secret.length; i++) {
    let match = true;
    for (let j = 0; j < secret.length; j++) {
      if (arr[i + j] !== secret[j]) match = false;
    }
    if (match) {
      feedback("🎉 Level Complete! Secret Pattern " + secret.join(",") + " unlocked!");
      return;
    }
  }
}

init();
