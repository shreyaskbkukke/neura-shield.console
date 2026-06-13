"use client";

import { useRef, useState, useCallback } from "react";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/foundation/Button";
import { ENTITY_TYPE_COLORS } from "./GraphLegend";
import { colors } from "@/theme/colors";

export interface CanvasNode {
  id: string;
  label: string;
  type: string;
  risk_level?: string;
  metadata?: Record<string, unknown>;
}

export interface CanvasEdge {
  source: string;
  target: string;
  label?: string;
  strength?: number;
}

interface NetworkCanvasProps {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  onNodeClick?: (node: CanvasNode) => void;
  height?: number;
}

function circularLayout(
  nodes: CanvasNode[],
  cx: number,
  cy: number,
  radius: number,
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();
  if (nodes.length === 0) return positions;
  if (nodes.length === 1) {
    positions.set(nodes[0].id, { x: cx, y: cy });
    return positions;
  }
  nodes.forEach((node, i) => {
    const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
    positions.set(node.id, {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    });
  });
  return positions;
}

const NODE_RADIUS = 22;
const LABEL_MAX = 12;

function truncate(s: string, n: number): string {
  return s.length > n ? `${s.slice(0, n)}…` : s;
}

export function NetworkCanvas({
  nodes,
  edges,
  onNodeClick,
  height = 480,
}: NetworkCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const width = 700;
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(cx, cy) * 0.7;

  const positions = circularLayout(nodes, cx, cy, radius);

  const handleNodeClick = useCallback(
    (node: CanvasNode) => {
      setSelectedId(node.id);
      onNodeClick?.(node);
    },
    [onNodeClick],
  );

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const resetZoom = () => setZoom(1);

  return (
    <div className="relative border border-navy-200 rounded-xl overflow-hidden bg-navy-50">
      <div className="absolute top-2 right-2 flex gap-1 z-10">
        <Button variant="ghost" size="icon-sm" onClick={zoomIn} title="Zoom in">
          <ZoomIn size={13} />
        </Button>
        <Button variant="ghost" size="icon-sm" onClick={zoomOut} title="Zoom out">
          <ZoomOut size={13} />
        </Button>
        <Button variant="ghost" size="icon-sm" onClick={resetZoom} title="Reset zoom">
          <Maximize2 size={13} />
        </Button>
      </div>

      {nodes.length === 0 ? (
        <div
          style={{ height }}
          className="flex items-center justify-center text-xs text-navy-400"
        >
          Select an offender to view their network
        </div>
      ) : (
        <svg
          ref={svgRef}
          width="100%"
          viewBox={`0 0 ${width} ${height}`}
          style={{ height, transformOrigin: "center", transform: `scale(${zoom})` }}
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.navy[300]} />
            </marker>
          </defs>

          {/* Edges */}
          {edges.map((edge, i) => {
            const src = positions.get(edge.source);
            const tgt = positions.get(edge.target);
            if (!src || !tgt) return null;

            const dx = tgt.x - src.x;
            const dy = tgt.y - src.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const nx = dx / len;
            const ny = dy / len;
            const x1 = src.x + nx * NODE_RADIUS;
            const y1 = src.y + ny * NODE_RADIUS;
            const x2 = tgt.x - nx * (NODE_RADIUS + 6);
            const y2 = tgt.y - ny * (NODE_RADIUS + 6);

            const opacity = edge.strength != null ? Math.max(0.3, Math.min(1, edge.strength)) : 0.5;

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={colors.navy[300]}
                strokeWidth={1.5}
                strokeOpacity={opacity}
                markerEnd="url(#arrow)"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const pos = positions.get(node.id);
            if (!pos) return null;
            const fill = ENTITY_TYPE_COLORS[node.type] ?? colors.navy[400];
            const isSelected = selectedId === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x},${pos.y})`}
                onClick={() => handleNodeClick(node)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  r={NODE_RADIUS}
                  fill={fill}
                  fillOpacity={0.15}
                  stroke={fill}
                  strokeWidth={isSelected ? 3 : 1.5}
                />
                {isSelected && (
                  <circle r={NODE_RADIUS + 6} fill="none" stroke={fill} strokeWidth={1} strokeDasharray="4 2" />
                )}
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={9}
                  fill={fill}
                  fontWeight={600}
                  dy={-2}
                >
                  {truncate(node.label, LABEL_MAX)}
                </text>
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={8}
                  fill={colors.navy[400]}
                  dy={8}
                >
                  {node.type.replace("_", " ")}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
