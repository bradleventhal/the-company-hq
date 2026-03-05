"use client"

export default function QATab() {
  // Show hardcoded QA results from tonight's sprint
  const qaResults = [
    { agent: "Ohtani", deliverable: "qa-auto-router.js", grade: "A-", status: "PASS", summary: "Routing logic matches peer-review pairings" },
    { agent: "Ohtani", deliverable: "hourly-backup.sh", grade: "B", status: "FAIL", summary: "Hard-coded paths, auto-commits unsafe for cron" },
    { agent: "Ohtani", deliverable: "hourly-backup.sh v2", grade: "pending", status: "IN QA", summary: "Fixed: configurable paths, dry-run mode, safety checks" },
    { agent: "JJettas", deliverable: "territory-intel-analysis.md", grade: "pending", status: "IN QA", summary: "Top 20 offices, cross-sell, trip optimization" },
    { agent: "Marino", deliverable: "meeting-prep-and-talk-tracks.md", grade: "pending", status: "IN QA", summary: "10 objection killers, 3 competitive one-pagers" },
    { agent: "McVay", deliverable: "wholesaler-intel-deep-dive.md", grade: "pending", status: "IN QA", summary: "Fund flows, competitive landscape, sourced data" },
    { agent: "Steph", deliverable: "territory-intel-module-spec.md", grade: "pending", status: "IN QA", summary: "Map view, office cards, trip planner spec" },
    { agent: "Tyreek", deliverable: "scout-brief-evening.md", grade: "pending", status: "IN QA", summary: "5 sourced findings, no fabrication" },
    { agent: "Jarvis", deliverable: "morning-briefing-2026-03-05.md", grade: "pending", status: "IN QA", summary: "Market data, pipeline, next-day preview" },
  ]

  const statusColor = (s: string) => {
    if (s === "PASS") return "#22c55e"
    if (s === "FAIL") return "#ef4444"
    return "#eab308"
  }

  return (
    <div style={{ maxHeight: 400, overflowY: "auto", fontSize: 11, color: "#e2e8f0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "2px solid #475569", fontWeight: 700, color: "#94a3b8" }}>
        <div style={{ width: "15%" }}>Agent</div>
        <div style={{ width: "30%" }}>Deliverable</div>
        <div style={{ width: "10%", textAlign: "center" }}>Grade</div>
        <div style={{ width: "10%", textAlign: "center" }}>Status</div>
        <div style={{ width: "35%" }}>Summary</div>
      </div>
      {qaResults.map((q, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1e293b" }}>
          <div style={{ width: "15%" }}>{q.agent}</div>
          <div style={{ width: "30%", color: "#94a3b8" }}>{q.deliverable}</div>
          <div style={{ width: "10%", textAlign: "center", fontWeight: 700 }}>{q.grade}</div>
          <div style={{ width: "10%", textAlign: "center", color: statusColor(q.status) }}>{q.status}</div>
          <div style={{ width: "35%", color: "#64748b" }}>{q.summary}</div>
        </div>
      ))}
    </div>
  )
}
