"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { NetworkCanvas, type CanvasNode, type CanvasEdge } from "@/components/graph/NetworkCanvas";
import { GraphLegend } from "@/components/graph/GraphLegend";
import { ErrorState } from "@/components/foundation/ErrorState";
import { EntityDetailDrawer } from "./EntityDetailDrawer";
import { SuspiciousAssociationsPanel } from "./SuspiciousAssociationsPanel";
import { OrganizedGroupsPanel } from "./OrganizedGroupsPanel";
import { useSuspiciousAssociations, useOrganizedGroups, useOffenderNetwork } from "../hooks";
import type { GraphNode, GraphEdge } from "../types";

function networkToCanvas(
  nodes: GraphNode[],
  edges: GraphEdge[],
): { canvasNodes: CanvasNode[]; canvasEdges: CanvasEdge[] } {
  const canvasNodes: CanvasNode[] = nodes.map((n) => ({
    id: n.id,
    label: n.label,
    type: "OFFENDER",
    risk_level: n.risk_level,
    metadata: {
      degree: n.network_degree,
      centrality: n.network_centrality.toFixed(3),
    },
  }));
  const canvasEdges: CanvasEdge[] = edges.map((e) => ({
    source: e.source,
    target: e.target,
    label: e.strength_label,
    strength: e.link_strength != null ? e.link_strength / 100 : 0.5,
  }));
  return { canvasNodes, canvasEdges };
}

export function GraphScreen() {
  const [offenderId, setOffenderId] = useState("154ee15e-9acd-43b7-85e1-88886118056f");
  const [offenderInput, setOffenderInput] = useState("154ee15e-9acd-43b7-85e1-88886118056f");
  const [selectedNode, setSelectedNode] = useState<CanvasNode | null>(null);

  const networkQuery = useOffenderNetwork(offenderId || null);
  const associationsQuery = useSuspiciousAssociations();
  const groupsQuery = useOrganizedGroups();

  const { canvasNodes, canvasEdges } = networkQuery.data
    ? networkToCanvas(networkQuery.data.nodes, networkQuery.data.edges)
    : { canvasNodes: [], canvasEdges: [] };

  function handleSearch() {
    const trimmed = offenderInput.trim();
    if (trimmed.match(/^[0-9a-f-]{36}$/i)) {
      setOffenderId(trimmed);
    }
  }

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            className="w-full h-8 pl-8 pr-3 rounded-lg border border-navy-200 bg-white text-xs text-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Enter offender UUID to load their network graph..."
            value={offenderInput}
            onChange={(e) => setOffenderInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
          />
        </div>
        <button
          onClick={handleSearch}
          className="h-8 px-3 rounded-lg bg-brand-600 text-white text-xs font-medium hover:bg-brand-700 transition-colors"
        >
          Load Network
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Graph canvas */}
        <div className="lg:col-span-2 space-y-3">
          {networkQuery.isError ? (
            <ErrorState
              title="Failed to load network"
              message={networkQuery.error?.message}
              onRetry={() => void networkQuery.refetch()}
            />
          ) : (
            <NetworkCanvas
              nodes={canvasNodes}
              edges={canvasEdges}
              onNodeClick={setSelectedNode}
              height={480}
            />
          )}
          <GraphLegend />
        </div>

        {/* Side panels */}
        <div className="space-y-4">
          <SuspiciousAssociationsPanel
            data={associationsQuery.data}
            isLoading={associationsQuery.isLoading}
          />
          <OrganizedGroupsPanel
            data={groupsQuery.data}
            isLoading={groupsQuery.isLoading}
          />
        </div>
      </div>

      <EntityDetailDrawer node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  );
}
