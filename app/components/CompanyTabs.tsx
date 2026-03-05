"use client"

import { useState } from "react"
import AgentsTab from "./tabs/AgentsTab"
import TasksTab from "./tabs/TasksTab"
import QATab from "./tabs/QATab"
import PipelineTab from "./tabs/PipelineTab"

type Tab = "office" | "agents" | "tasks" | "qa" | "pipeline"

export default function CompanyTabs({ onTabChange }: { onTabChange?: (tab: Tab) => void }) {
  const [tab, setTab] = useState<Tab>("office")

  const handleTab = (id: Tab) => {
    setTab(id)
    onTabChange?.(id)
  }

  const TabButton = ({ id, label }: { id: Tab; label: string }) => (
    <button
      onClick={() => handleTab(id)}
      style={{
        padding: "6px 12px",
        borderRadius: 6,
        border: tab === id ? "2px solid #00d4ff" : "1px solid #334155",
        background: tab === id ? "#0f172a" : "#020617",
        color: "#e2e8f0",
        fontSize: 11,
        fontFamily: `"Press Start 2P", monospace`,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  )

  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
        width: "min(900px,95vw)",
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          background: "#020617ee",
          border: "2px solid #334155",
          borderRadius: 10,
          padding: 10,
        }}
      >
        <div style={{ display: "flex", gap: 8, marginBottom: tab === "office" ? 0 : 10 }}>
          <TabButton id="office" label="🏢 Office" />
          <TabButton id="agents" label="👥 Agents" />
          <TabButton id="tasks" label="📋 Tasks" />
          <TabButton id="qa" label="✅ QA" />
          <TabButton id="pipeline" label="📈 Pipeline" />
        </div>

        {tab === "agents" && <AgentsTab />}
        {tab === "tasks" && <TasksTab />}
        {tab === "qa" && <QATab />}
        {tab === "pipeline" && <PipelineTab />}
      </div>
    </div>
  )
}
