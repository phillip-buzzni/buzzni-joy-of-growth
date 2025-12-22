<script>
  import { leadershipPrinciples } from '$lib/data/leadershipPrinciples.js';
  import { onDestroy, onMount } from 'svelte';
  import * as THREE from 'three';

  let container;
  let renderer, scene, camera;
  let carouselGroup;
  let animationId;

  // Configuration - "TRULY MASSIVE"
  const RADIUS = 28;       // Slightly reduced from 30 per user edit, but still massive
  const IMAGE_WIDTH = 6;   // User edited to 6
  const IMAGE_HEIGHT = 6;

  function getPrincipleImage(id) {
      const imageMap = {
          'customer-delight': 'customer-delight.png',
          'mission-over-individual': 'mission-over-individual.png',
          'aim-higher': 'aim-higher.png',
          'focus-on-impact': 'focus-on-impact.png',
          'question-assumptions': 'question-assumptions.png',
          'execution-over-perfection': 'execution-over-perfection.png',
          'move-with-agility': 'move-with-agility.png', 
          'ask-for-feedback': 'ask-for-feedback.png',
          'learn-proactively': 'learn-proactively.png'
      };
      return `/images/principles/${imageMap[id] || 'customer-delight.png'}`;
  }

  onMount(() => {
    initThree();
    animate();
    window.addEventListener('resize', onWindowResize);
  });

  onDestroy(() => {
    window.removeEventListener('resize', onWindowResize);
    if (animationId) cancelAnimationFrame(animationId);
    if (renderer) renderer.dispose();
  });

  function initThree() {
    scene = new THREE.Scene();
    
    const aspect = container.clientWidth / container.clientHeight;
    // FOV 45: Wider angle helps feel the scale when objects are close / large
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 200);
    // Camera closer relative to Radius -> More perspective distortion -> "Huge" feel
    camera.position.set(0, 0, 55); 
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    carouselGroup = new THREE.Group();
    scene.add(carouselGroup);

    const textureLoader = new THREE.TextureLoader();
    const count = leadershipPrinciples.length;
    
    leadershipPrinciples.forEach((principle, index) => {
        const texture = textureLoader.load(getPrincipleImage(principle.id), (tex) => {
             tex.colorSpace = THREE.SRGBColorSpace;
        });
        
        const geometry = new THREE.PlaneGeometry(IMAGE_WIDTH, IMAGE_HEIGHT);
        const material = new THREE.MeshBasicMaterial({ 
            map: texture, 
            transparent: true, 
            side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(geometry, material);

        const angle = (index / count) * Math.PI * 2;
        mesh.position.x = Math.cos(angle) * RADIUS;
        mesh.position.z = Math.sin(angle) * RADIUS;
        
        mesh.lookAt(camera.position); 

        carouselGroup.add(mesh);
    });
    
    // Initial Tilt (Will be overridden by animate)
    carouselGroup.rotation.x = -0.35; 
    carouselGroup.rotation.z = 0.05;
  }

  function onWindowResize() {
    if (!container || !camera || !renderer) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function animate() {
    animationId = requestAnimationFrame(animate);
    
    if (carouselGroup) {
        // Slow rotation around Y axis
        carouselGroup.rotation.y += 0.0008; 

        // Gentle Tilt Oscillation: -5 to +5 degrees variation (approx 0.087 rad)
        // Base tilt -0.35 (Near Up) + oscillation
        const time = Date.now() * 0.0005;
        carouselGroup.rotation.x = -0.35 + Math.sin(time) * 0.087;
        
        carouselGroup.children.forEach(mesh => {
            // 1. BILLBOARDING
            mesh.lookAt(camera.position);

            // 2. DEPTH & OPACITY
            const worldPos = new THREE.Vector3();
            mesh.getWorldPosition(worldPos);
            
            const zNorm = (worldPos.z + RADIUS) / (2 * RADIUS); 
            const clamped = Math.max(0, Math.min(1, zNorm));
            
            // User's preferred Opacity & Brightness settings:
            // Opacity: 0.2 + ...
            const opacity = 0.2 + Math.pow(clamped, 4) * 0.95; 
            
            // Brightness: 0.2 + ...
            const brightness = 0.2 + Math.pow(clamped, 2) * 0.9;
            
            mesh.material.opacity = opacity;
            mesh.material.color.setScalar(brightness);
            
            // Scale: Dramatic scaling for front items
            mesh.scale.setScalar(0.5 + clamped * 1.0); // Front items 1.5x size
        });
    }

    renderer.render(scene, camera);
  }
</script>

<div bind:this={container} class="w-full h-full relative z-10"></div>
