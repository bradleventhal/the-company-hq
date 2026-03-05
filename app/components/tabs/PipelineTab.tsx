"use client"

import tasks from "../../../data/task-tracker.json"

export default function PipelineTab() {
  const taskList = (tasks as any).tasks ?? []
  const pipeline = taskList.filter((t: any) =>
    ["in-progress", "queued", "code-complete-deploy-blocked", "pending-brady"].includes(t.status)
  )

  if (pipeline.length === 0) {
    return (
      <div style={{ fontSize: 11, color: "#94a3b8", padding: 20, textAlign: "center" }}>
        All clear — no active pipeline items
      </div>
    )
  }

  return (
    <div style={{ maxHeight: 400, overflowY: "auto", fontSize: 11, color: "#e2e8f0" }}>
      {pipeline.map((t: any) => (
        <div key={t.id} style={{ padding: "8px 0", borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.status === "in-progress" ? "#3b82f6" : "#eab308", flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700 }}>{t.assignee}</div>
            <div style={{ color: "#94a3b8" }}>{t.title}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
