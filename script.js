// パスワードチェック
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

// ★ 自分のGASのURL（/exec で終わるやつ）
const API_URL = "https://script.google.com/macros/s/AKfycbxLZcPfp9sOxddhCUsAUWH9kDbcrQxdvyjRJCbuaLvVgIwps1yJKTVfNrVedKgqmDaUgA/exec"

// 投稿する
function post() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  if (!name || !message) {
    alert("名前とメッセージを入力してください");
    return;
  }

  const url =
    API_URL +
    "?mode=post" +
    "&name=" + encodeURIComponent(name) +
    "&message=" + encodeURIComponent(message);

  fetch(url)
    .then(() => {
      document.getElementById("message").value = "";
      load();
    })
    .catch(() => {
      alert("投稿に失敗しました");
    });
}

// 読み込み
function load() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const board = document.getElementById("board");
      board.innerHTML = "";

      data.reverse().forEach(item => {
        const div = document.createElement("div");
        div.innerHTML =
          `<strong>${item.name}</strong><br>` +
          `${item.message}<hr>`;
        board.appendChild(div);
      });
    });
}

// ページを開いたら自動で読み込み
window.onload = load;
