<script>
  import { onMount } from 'svelte';

  let { nodes = [], links = [] } = $props();

  let canvasRef;
  let width = 1200;
  let height = 1200;
  let simulationNodes = [];
  let simulationLinks = [];
  let selectedNode = $state(null);
  let hoveredNode = $state(null);
  let scale = $state(1);
  let translateX = $state(0);
  let translateY = $state(0);
  let isDragging = $state(false);
  let dragStart = { x: 0, y: 0 };
  let highlightedNodes = $state(new Set());
  let highlightedLinks = $state(new Set());

  // Force simulation 구현 (간단한 버전)
  function initializeSimulation() {
    const centerX = width / 2;
    const centerY = height / 2;

    // 노드 초기화
    simulationNodes = nodes.map((node, i) => ({
      ...node,
      x: centerX + (Math.random() - 0.5) * 150,
      y: centerY + (Math.random() - 0.5) * 150,
      vx: 0,
      vy: 0,
      fx: node.type === 'squad' ? null : null,
      fy: node.type === 'squad' ? null : null
    }));

    simulationLinks = links.map(link => ({
      ...link,
      source: simulationNodes.find(n => n.id === link.source),
      target: simulationNodes.find(n => n.id === link.target)
    }));

    // 스쿼드 노드를 원형으로 배치
    const squadNodes = simulationNodes.filter(n => n.type === 'squad');
    const radius = Math.min(width, height) * 0.35; // 반지름 증가
    squadNodes.forEach((node, i) => {
      const angle = (i / squadNodes.length) * Math.PI * 2;
      node.x = centerX + Math.cos(angle) * radius;
      node.y = centerY + Math.sin(angle) * radius;
      node.fx = node.x;
      node.fy = node.y;
    });

    animate();
  }

  function animate() {
    // Force simulation
    const alpha = 0.05; // 매우 작은 alpha
    const iterations = 1;

    for (let i = 0; i < iterations; i++) {
      // Link force
      simulationLinks.forEach(link => {
        const dx = link.target.x - link.source.x;
        const dy = link.target.y - link.source.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDistance = 300; // 거리 대폭 증가
        const force = (distance - targetDistance) * 0.02;

        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;

        if (!link.source.fx) {
          link.source.vx += fx;
          link.source.vy += fy;
        }
        if (!link.target.fx) {
          link.target.vx -= fx;
          link.target.vy -= fy;
        }
      });

      // Collision force - 충돌 거리 대폭 증가
      simulationNodes.forEach((node1, i) => {
        simulationNodes.slice(i + 1).forEach(node2 => {
          const dx = node2.x - node1.x;
          const dy = node2.y - node1.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDistance = (node1.size + node2.size) * 5; // 거리 대폭 증가

          if (distance < minDistance) {
            const force = (minDistance - distance) * 0.15;
            const fx = (dx / distance) * force;
            const fy = (dy / distance) * force;

            if (!node1.fx) {
              node1.vx -= fx;
              node1.vy -= fy;
            }
            if (!node2.fx) {
              node2.vx += fx;
              node2.vy += fy;
            }
          }
        });
      });

      // Apply velocities
      simulationNodes.forEach(node => {
        if (!node.fx) {
          node.vx *= 0.75; // 더 빠른 감쇠
          node.vy *= 0.75;
          node.x += node.vx * alpha;
          node.y += node.vy * alpha;

          // Boundary
          node.x = Math.max(node.size * 3, Math.min(width - node.size * 3, node.x));
          node.y = Math.max(node.size * 3, Math.min(height - node.size * 3, node.y));
        }
      });
    }

    draw();
  }

  function draw() {
    if (!canvasRef) return;

    const ctx = canvasRef.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    // Apply transformations
    ctx.save();
    ctx.translate(translateX, translateY);
    ctx.scale(scale, scale);

    // Draw links
    simulationLinks.forEach((link, idx) => {
      const isHighlighted = highlightedLinks.has(idx);
      const isDimmed = selectedNode && !isHighlighted;

      ctx.beginPath();
      ctx.moveTo(link.source.x, link.source.y);
      ctx.lineTo(link.target.x, link.target.y);

      if (isDimmed) {
        ctx.lineWidth = link.isLeader ? 1 : 0.5;
        ctx.strokeStyle = '#E5E7EB';
        ctx.globalAlpha = 0.2;
      } else if (isHighlighted) {
        ctx.lineWidth = link.isLeader ? 3 : 2;
        ctx.strokeStyle = link.isLeader ? '#3B82F6' : '#60A5FA';
        ctx.globalAlpha = 1;
      } else {
        ctx.lineWidth = link.isLeader ? 2 : 1;
        ctx.strokeStyle = link.isLeader ? '#3B82F6' : '#D1D5DB';
        ctx.globalAlpha = 1;
      }

      ctx.stroke();
      ctx.globalAlpha = 1;
    });

    // Draw nodes
    simulationNodes.forEach(node => {
      const isHighlighted = highlightedNodes.has(node.id);
      const isDimmed = selectedNode && !isHighlighted;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);

      if (isDimmed) {
        ctx.fillStyle = node.color;
        ctx.strokeStyle = '#E5E7EB';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.2;
      } else if (node === hoveredNode) {
        ctx.fillStyle = node.type === 'squad' ? '#2563EB' : '#1F2937';
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 3;
        ctx.globalAlpha = 1;
      } else if (isHighlighted) {
        ctx.fillStyle = node.color;
        ctx.strokeStyle = '#FBBF24';
        ctx.lineWidth = 3;
        ctx.globalAlpha = 1;
      } else if (node === selectedNode) {
        ctx.fillStyle = node.color;
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 1;
      } else {
        ctx.fillStyle = node.color;
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 1;
      }

      ctx.fill();
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Draw label
      if (!isDimmed || isHighlighted) {
        ctx.fillStyle = '#1F2937';
        ctx.font = node.type === 'squad' ? 'bold 12px sans-serif' : '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = isDimmed ? 0.3 : 1;
        ctx.fillText(node.label, node.x, node.y + node.size + 15);
        ctx.globalAlpha = 1;
      }

      // Badge for overloaded members
      if (node.type === 'member' && node.isOverloaded && !isDimmed) {
        ctx.fillStyle = '#EF4444';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText('⚠️', node.x + node.size - 5, node.y - node.size + 5);
      }
    });

    ctx.restore();
  }

  function screenToWorld(screenX, screenY) {
    return {
      x: (screenX - translateX) / scale,
      y: (screenY - translateY) / scale
    };
  }

  function updateHighlights(node) {
    if (!node) {
      highlightedNodes = new Set();
      highlightedLinks = new Set();
      return;
    }

    const newHighlightedNodes = new Set();
    const newHighlightedLinks = new Set();

    if (node.type === 'squad') {
      // 스쿼드 선택 시: 해당 스쿼드에 연결된 멤버들 하이라이트
      newHighlightedNodes.add(node.id);
      simulationLinks.forEach((link, idx) => {
        if (link.target.id === node.id) {
          newHighlightedNodes.add(link.source.id);
          newHighlightedLinks.add(idx);
        }
      });
    } else {
      // 멤버 선택 시: 해당 멤버가 속한 스쿼드들 하이라이트
      newHighlightedNodes.add(node.id);
      simulationLinks.forEach((link, idx) => {
        if (link.source.id === node.id) {
          newHighlightedNodes.add(link.target.id);
          newHighlightedLinks.add(idx);
        }
      });
    }

    highlightedNodes = newHighlightedNodes;
    highlightedLinks = newHighlightedLinks;
  }

  function handleCanvasClick(e) {
    if (isDragging) return;

    const rect = canvasRef.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const { x, y } = screenToWorld(screenX, screenY);

    const clickedNode = simulationNodes.find(node => {
      const dx = x - node.x;
      const dy = y - node.y;
      return Math.sqrt(dx * dx + dy * dy) <= node.size;
    });

    selectedNode = clickedNode || null;
    updateHighlights(clickedNode);
  }

  function handleCanvasMouseMove(e) {
    const rect = canvasRef.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;

    if (isDragging) {
      const dx = screenX - dragStart.x;
      const dy = screenY - dragStart.y;
      translateX += dx;
      translateY += dy;
      dragStart = { x: screenX, y: screenY };
      draw();
      return;
    }

    const { x, y } = screenToWorld(screenX, screenY);

    const node = simulationNodes.find(n => {
      const dx = x - n.x;
      const dy = y - n.y;
      return Math.sqrt(dx * dx + dy * dy) <= n.size;
    });

    const prevHoveredNode = hoveredNode;
    hoveredNode = node || null;
    canvasRef.style.cursor = node ? 'pointer' : isDragging ? 'grabbing' : 'grab';

    // 호버 상태가 변경되었을 때만 다시 그리기
    if (prevHoveredNode !== hoveredNode) {
      draw();
    }
  }

  function handleMouseDown(e) {
    const rect = canvasRef.getBoundingClientRect();
    dragStart = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    isDragging = true;
    canvasRef.style.cursor = 'grabbing';
  }

  function handleMouseUp() {
    isDragging = false;
    canvasRef.style.cursor = 'grab';
  }

  function handleWheel(e) {
    e.preventDefault();
    const rect = canvasRef.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.3, Math.min(3, scale * delta));

    // Zoom towards mouse position
    const worldBefore = screenToWorld(mouseX, mouseY);
    scale = newScale;
    const worldAfter = screenToWorld(mouseX, mouseY);

    translateX += (worldAfter.x - worldBefore.x) * scale;
    translateY += (worldAfter.y - worldBefore.y) * scale;

    draw();
  }

  function handleZoomIn() {
    const centerX = width / 2;
    const centerY = height / 2;
    const worldBefore = screenToWorld(centerX, centerY);
    scale = Math.min(3, scale * 1.2);
    const worldAfter = screenToWorld(centerX, centerY);
    translateX += (worldAfter.x - worldBefore.x) * scale;
    translateY += (worldAfter.y - worldBefore.y) * scale;
    draw();
  }

  function handleZoomOut() {
    const centerX = width / 2;
    const centerY = height / 2;
    const worldBefore = screenToWorld(centerX, centerY);
    scale = Math.max(0.3, scale / 1.2);
    const worldAfter = screenToWorld(centerX, centerY);
    translateX += (worldAfter.x - worldBefore.x) * scale;
    translateY += (worldAfter.y - worldBefore.y) * scale;
    draw();
  }

  function handleReset() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    draw();
  }

  let animationRunning = true;
  let animationFrameCount = 0;
  const maxAnimationFrames = 200; // 10초 후 애니메이션 정지 (50ms * 200)
  let intervalId;

  onMount(() => {
    initializeSimulation();

    intervalId = setInterval(() => {
      if (animationRunning && animationFrameCount < maxAnimationFrames) {
        animate();
        animationFrameCount++;

        // 일정 프레임 후 자동 정지
        if (animationFrameCount >= maxAnimationFrames) {
          animationRunning = false;
        }
      }
    }, 50);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  });

  // nodes props가 변경될 때만 재초기화
  let previousNodesLength = nodes.length;
  $effect(() => {
    // 노드 개수가 변경되었을 때만 재초기화
    if (nodes.length !== previousNodesLength && nodes.length > 0 && canvasRef) {
      previousNodesLength = nodes.length;
      initializeSimulation();
      animationFrameCount = 0;
      animationRunning = true;
    }
  });
</script>

<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
  <div class="mb-4 flex items-center justify-between">
    <div>
      <h3 class="text-lg font-bold text-gray-900 mb-2">조직 네트워크 그래프</h3>
      <div class="flex gap-4 text-xs text-gray-600">
        <div class="flex items-center gap-1">
          <div class="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>스쿼드</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
          <span>단일 스쿼드</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span>복수 스쿼드</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <span>과부하 (3개 이상)</span>
        </div>
      </div>
    </div>

    <!-- Zoom Controls -->
    <div class="flex items-center gap-2">
      <span class="text-xs text-gray-500 mr-2">{Math.round(scale * 100)}%</span>
      <button
        onclick={handleZoomOut}
        class="p-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors"
        title="축소"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
        </svg>
      </button>
      <button
        onclick={handleZoomIn}
        class="p-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors"
        title="확대"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <button
        onclick={handleReset}
        class="p-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors"
        title="초기화"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
  </div>

  <div class="relative">
    <canvas
      bind:this={canvasRef}
      {width}
      {height}
      class="border border-gray-200 rounded cursor-grab"
      onclick={handleCanvasClick}
      onmousemove={handleCanvasMouseMove}
      onmousedown={handleMouseDown}
      onmouseup={handleMouseUp}
      onmouseleave={handleMouseUp}
      onwheel={handleWheel}
    />

    {#if selectedNode}
      <div class="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
        <h4 class="font-bold text-gray-900 mb-2">{selectedNode.label}</h4>
        {#if selectedNode.type === 'member'}
          <div class="text-sm text-gray-600 space-y-1">
            <div>챕터: {selectedNode.chapter || '-'}</div>
            <div>참여 스쿼드: {selectedNode.squadCount}개</div>
            {#if selectedNode.isOverloaded}
              <div class="text-red-600 font-medium mt-2">⚠️ 과부하 상태</div>
            {/if}
          </div>
        {:else}
          <div class="text-sm text-gray-600">스쿼드</div>
        {/if}
        <button
          onclick={() => selectedNode = null}
          class="mt-3 text-xs text-blue-600 hover:text-blue-700"
        >
          닫기
        </button>
      </div>
    {/if}
  </div>

  <div class="mt-4 text-xs text-gray-500">
    💡 마우스 휠로 줌, 드래그로 이동, 노드 클릭으로 관련 노드 하이라이트. 스쿼드를 클릭하면 멤버들이, 멤버를 클릭하면 소속 스쿼드들이 강조됩니다.
  </div>
</div>
