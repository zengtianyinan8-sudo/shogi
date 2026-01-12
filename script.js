function checkPassword() {
  const correct = "shogibuura";   // 正解のパスワード
  const input = document.getElementById("password").value;

  if (input === correct) {
    document.getElementById("login").style.display = "none";
    document.getElementById("content").style.display = "block";
  } else {
    alert("パスワードが違います");
  }
}

const API_URL = "https://script.google.com/macros/s/AKfycbw5nYjgZv8WLWraQtM1dz6hEGt_psDNbHRzjfFXr14BLw9eZgl1EWLK5Lo6qvvIoqv4Dw/exec"
function post() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  if (!name || !message) {
    alert("名前とメッセージを入力してください");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ name, message }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(() => {
    document.getElementById("message").value = "";
    load();
  });
}

function load() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const board = document.getElementById("board");
      board.innerHTML = "";
      data.reverse().forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${item.name}</strong><br>${item.message}<hr>`;
        board.appendChild(div);
      });
    });
}

window.onload = load;
