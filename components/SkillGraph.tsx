import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import type { GraphNode, GraphLink } from '../types';

interface SkillGraphProps {
  nodes: GraphNode[];
  links: GraphLink[];
  onNodeClick: (node: GraphNode) => void;
  selectedNodeId?: string;
  highlightedSkillIds: Set<string>;
}

const SkillGraph: React.FC<SkillGraphProps> = ({ nodes, links, onNodeClick, selectedNodeId, highlightedSkillIds }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const simulationRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const drag = (simulation?: d3.Simulation<GraphNode, GraphLink> | null) => {
      function dragstarted(this: SVGGElement, event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
        if (!event.active && simulation) simulation.alphaTarget(0.3).restart();
        (d as any).fx = (d as any).x;
        (d as any).fy = (d as any).y;
        d3.select(this).select('circle').transition().duration(150).attr('r', d.radius * 1.2);
      }

      function dragged(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
        (d as any).fx = event.x;
        (d as any).fy = event.y;
      }

      function dragended(this: SVGGElement, event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
        if (!event.active && simulation) simulation.alphaTarget(0);
        (d as any).fx = null;
        (d as any).fy = null;
        d3.select(this).select('circle').transition().duration(150).attr('r', d.radius);
      }

      return d3.drag<SVGGElement, GraphNode>().on("start", dragstarted).on("drag", dragged).on("end", dragended);
    };

    const svg = d3.select(svgRef.current);
    const { width, height } = svgRef.current.getBoundingClientRect();

    svg.selectAll("*").remove(); // Clear previous render

    const container = svg.append("g");

    const link = container.append("g")
      .attr("stroke", "#4b5563") // gray-600
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5);

    const node = container.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("cursor", "pointer")
      .on("click", (event, d) => onNodeClick(d))
      .on("mouseover", function() {
        d3.select(this).select('text')
          .transition().duration(200)
          .attr('font-size', '16px')
          .attr('fill', '#f9fafb'); // gray-50
      })
      .on("mouseout", function() {
         d3.select(this).select('text')
          .transition().duration(200)
          .attr('font-size', '12px')
          .attr('fill', '#f3f4f6'); // gray-100
      })
      .call(drag(simulationRef.current));

    node.append("circle")
      .attr("r", 0)
      .attr("fill", d => d.type === 'employee' ? '#3b82f6' : '#10b981') // blue-500 : green-500
      .attr("stroke", "#e5e7eb") // gray-200
      .attr("stroke-width", 2)
      .transition()
      .duration(750)
      .delay((_d, i) => i * 10)
      .attr("r", d => d.radius);

    node.append("text")
      .text(d => d.name)
      .attr("x", d => d.radius + 5)
      .attr("y", 5)
      .attr("fill", "#f3f4f6") // gray-100
      .attr("font-size", "12px")
      .attr("paint-order", "stroke")
      .attr("stroke", "#111827") // gray-900
      .attr("stroke-width", "0.5px");
      
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
      });

    svg.call(zoom);

    if (!simulationRef.current) {
        simulationRef.current = d3.forceSimulation<GraphNode, GraphLink>(nodes)
        .force("link", d3.forceLink<GraphNode, GraphLink>(links).id(d => d.id).distance(90))
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(width / 2, height / 2));
    } else {
        simulationRef.current.nodes(nodes);
        const linkForce = simulationRef.current.force<d3.ForceLink<GraphNode, GraphLink>>("link");
        if(linkForce) {
            linkForce.links(links);
        }
        simulationRef.current.alpha(1).restart();
    }
    
    simulationRef.current.on("tick", () => {
      link
        .attr("x1", d => (d.source as any).x!)
        .attr("y1", d => (d.source as any).y!)
        .attr("x2", d => (d.target as any).x!)
        .attr("y2", d => (d.target as any).y!);

      node.attr("transform", d => `translate(${(d as any).x},${(d as any).y})`);
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, links, onNodeClick]);

  useEffect(() => {
      const svg = d3.select(svgRef.current);
      
      const employeeNodeIdsWithHighlightedSkills = new Set<string>();
      links.forEach(link => {
        const targetId = typeof link.target === 'string' ? link.target : link.target.id;
        const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
        if(highlightedSkillIds.has(targetId)) {
          employeeNodeIdsWithHighlightedSkills.add(sourceId);
        }
      });

      svg.selectAll('g > g > circle') // Adjusted selector to target circles within the container>node groups
         .transition().duration(300)
         .attr('stroke', d => {
            const node = d as GraphNode;
            if (node.id === selectedNodeId) return '#f59e0b'; // amber-500
            if (highlightedSkillIds.has(node.id) || employeeNodeIdsWithHighlightedSkills.has(node.id)) return '#ec4899'; // pink-500
            return '#e5e7eb'; // gray-200
         })
         .attr('stroke-width', d => (d as GraphNode).id === selectedNodeId || highlightedSkillIds.has((d as GraphNode).id) || employeeNodeIdsWithHighlightedSkills.has((d as GraphNode).id) ? 4 : 2);
  
      svg.selectAll<SVGLineElement, GraphLink>('line')
          .transition().duration(300)
          .attr('stroke-width', d => {
              const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
              const targetId = typeof d.target === 'string' ? d.target : d.target.id;
              return (selectedNodeId === sourceId || selectedNodeId === targetId) ? 3 : 1.5;
          })
          .attr('stroke', d => {
              const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
              const targetId = typeof d.target === 'string' ? d.target : d.target.id;
              return (selectedNodeId === sourceId || selectedNodeId === targetId) ? '#f59e0b' : '#4b5563';
          })
          .attr('stroke-opacity', d => {
              const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
              const targetId = typeof d.target === 'string' ? d.target : d.target.id;
              return (selectedNodeId === sourceId || selectedNodeId === targetId) ? 1 : 0.6;
          });

  }, [selectedNodeId, highlightedSkillIds, links]);

  return <svg ref={svgRef} className="w-full h-full bg-gray-800 rounded-lg shadow-inner"></svg>;
};

export default SkillGraph;