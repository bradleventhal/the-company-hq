"use client"

import tasks from "../../../data/task-tracker.json"

export default function TasksTab() {
  const taskList = (tasks as any).tasks ?? []

  const statusColor = (s: string) => {
    if (s === "complete") return "#22c55e"
    if (s === "in-progress") return "#3b82f6"
    if (s.includes("blocked")) return "#ef4444"
    if (s.includes("pending")) return "#eab308"
    return "#94a3b8"
  }

  return (
    <div style={{ maxHeight: 400, overflowY: "auto", fontSize: 11, color: "#e2e8f0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "2px solid #475569", fontWeight: 700, color: "#94a3b8" }}>
        <div style={{ width: "15%" }}>ID</div>
        <div style={{ width: "40%" }}>Task</div>
        <div style={{ width: "20%" }}>Assignee</div>
        <div style={{ width: "25%", textAlign: "right" }}>Status</div>
      </div>
      {taskList.map((t: any) => (
        <div key={t.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1e293b" }}>
          <div style={{ width: "15%", color: "#64748b" }}>{t.id}</div>
          <div style={{ width: "40%" }}>{t.title}</div>
          <div style={{ width: "20%", color: "#94a3b8" }}>{t.assignee}</div>
          <div style={{ width: "25%", textAlign: "right", color: statusColor(t.status) }}>{t.status}</div>
        </div>
      ))}
    </div>
  )
}
