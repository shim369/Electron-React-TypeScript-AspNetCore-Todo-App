export function formatDate(deadline: Date): string {
  const date = new Date(deadline)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月を2桁に
  const day = String(date.getDate()).padStart(2, '0') // 日を2桁に
  return `${year}-${month}-${day}` // フォーマットを変更
}
