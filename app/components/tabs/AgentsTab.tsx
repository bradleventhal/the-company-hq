"use client"

import registry from "../../../data/agent-registry.json"
import levels from "../../../data/agent-levels.json"

function gradeToOVR(g?: string) {
  const map: Record<string, number> = {
    "A+": 99, A: 95, "A-": 92,
    "B+": 88, B: 85, "B-": 82,
    "C+": 78, C: 75, D: 65, F: 50,
  }
  if (!g) return 70
  return map[g] ?? 70
}

function ovrColor(ovr: number) {
  if (ovr >= 95) return "#22c55e"
  if (ovr >= 88) return "#84cc16"
  if (ovr >= 82) return "#eab308"
  if (ovr >= 75) return "#f97316"
  return "#ef4444"
}

export default function AgentsTab() {
  const levelsMap = levels as Record<string, any>
  const agents = (registry as any).agents?.map((a: any) => {
    const level = levelsMap[a.id]
    const grade = level?.grade
    return { ...a, grade, ovr: gradeToOVR(grade), reps: level?.reps ?? 0, trend: level?.trend ?? "—" }
  }) ?? []

  return (
    <div style={{ maxHeight: 400, overflowY: "auto", fontSize: 11, color: "#e2e8f0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "2px solid #475569", fontWeight: 700, color: "#94a3b8" }}>
        <div style={{ width: "35%" }}>Agent</div>
        <div style={{ width: "15%", textAlign: "center" }}>Grade</div>
        <div style={{ width: "15%", textAlign: "center" }}>OVR</div>
        <div style={{ width: "15%", textAlign: "center" }}>Reps</div>
        <div style={{ width: "20%", textAlign: "center" }}>Trend</div>
      </div>
      {agents.map((a: any) => (
        <div key={a.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1e293b" }}>
          <div style={{ width: "35%" }}>{a.emoji ?? "🤖"} {a.name}</div>
          <div style={{ width: "15%", textAlign: "center" }}>{a.grade ?? "—"}</div>
          <div style={{ width: "15%", textAlign: "center", color: ovrColor(a.ovr), fontWeight: 700 }}>{a.ovr}</div>
          <div style={{ width: "15%", textAlign: "center" }}>{a.reps}</div>
          <div style={{ width: "20%", textAlign: "center" }}>{a.trend}</div>
        </div>
      ))}
    </div>
  )
}
