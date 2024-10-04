import { Todo } from "./types/todo";

window.addEventListener("load", async () => {
  try {
    const response = await fetch("http://localhost:3003/api/todo");
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
    };

    data.forEach((todo: Todo) => {
      const row = document.createElement("tr");
      row.classList.add("border-b", "border-gray-300", "hover:bg-gray-100");

      // マッピングを使ってカテゴリを取得
      const categoryText = categoryMap[todo.category] || "unknown category";

      row.innerHTML = `
        <td class="py-3 px-6">${todo.id}</td>
        <td class="py-3 px-6">${categoryText}</td>
        <td class="py-3 px-6">${todo.title}</td>
        <td class="py-3 px-6">${todo.detail}</td>
        <td class="py-3 px-6">${todo.date}</td>
      `;
      tableBody.appendChild(row);
    });

    document.querySelector("table")?.appendChild(tableBody);
  } catch (error) {
    console.error("Error:", error);
  }
});

// Node.jsとElectronのバージョン情報を表示
document.getElementById(
  "info"
)!.innerText = `This app is using Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;
