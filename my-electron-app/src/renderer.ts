import { Todo } from "./types/todo";

function formatDate(deadline: Date): string {
  const date = new Date(deadline);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}

async function loadTodos() {
  try {
    const response = await fetch("http://localhost:5266/tasks");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const tableBody = document.createElement("tbody");
    tableBody.classList.add("text-sm", "text-gray-600", "font-light");

    // カテゴリのマッピング
    const categoryMap: Record<number, string> = {
      1: "category1",
      2: "category2",
      3: "category3",
    };

    data.forEach((todo: Todo) => {
      const row = document.createElement("tr");
      row.classList.add("border-b", "border-gray-300", "hover:bg-gray-100");

      // マッピングを使ってカテゴリを取得
      const categoryText = categoryMap[todo.category] || "unknown category";
      const formattedDeadline = formatDate(todo.deadline);

      row.innerHTML = `
        <td class="py-3 px-6">${todo.id}</td>
        <td class="py-3 px-6">${categoryText}</td>
        <td class="py-3 px-6">${todo.title}</td>
        <td class="py-3 px-6">${todo.detail}</td>
        <td class="py-3 px-6"><a href="${todo.url}" target="_blank" rel="noopener noreferrer">${todo.url}</a></td>
        <td class="py-3 px-6">${formattedDeadline}</td>
      `;
      tableBody.appendChild(row);
    });

    document.querySelector("table")?.appendChild(tableBody);
  } catch (error) {
    console.error("Error:", error);
  }
}

window.addEventListener("load", () => {
  loadTodos(); // タスクのロードを実行

  // フォームのイベントリスナーを追加
  document.getElementById("todoForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();

  // 各要素が存在することを確認
  const titleElement = document.getElementById("title") as HTMLInputElement | null;
  const detailElement = document.getElementById("detail") as HTMLTextAreaElement | null;
  const urlElement = document.getElementById("url") as HTMLInputElement | null;
  const deadlineElement = document.getElementById("deadline") as HTMLInputElement | null;
  const categoryElement = document.getElementById("category") as HTMLSelectElement | null;

  if (!titleElement || !detailElement || !urlElement || !deadlineElement || !categoryElement) {
    console.error("One or more form elements are missing.");
    return;
  }

  const title = titleElement.value;
  const detail = detailElement.value;
  const url = urlElement.value;
  const deadline = deadlineElement.value;
  const category = Number(categoryElement.value);

  const newTodo = {
    title,
    detail,
    url,
    deadline,
    category,
  };

    try {
      const response = await fetch("http://localhost:5266/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Todo added:", data);

      // ページをリロードして新しいタスクを表示
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

// Node.jsとElectronのバージョン情報を表示
document.getElementById(
  "info"
)!.innerText = `This app is using Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;
