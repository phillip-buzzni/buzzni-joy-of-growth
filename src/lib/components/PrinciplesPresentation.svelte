<script>
  import { leadershipPrinciples } from '$lib/data/leadershipPrinciples.js';
  import { push } from 'svelte-spa-router';
// Slide Components
  import CoverSlide from './presentation/CoverSlide.svelte';
  import ManifestoSlide from './presentation/ManifestoSlide.svelte';
  import OverviewSlide from './presentation/OverviewSlide.svelte';
  import PrincipleDetailSlide from './presentation/PrincipleDetailSlide.svelte';
  import UsageExamplesSlide from './presentation/UsageExamplesSlide.svelte';

  let currentSlide = $state(0);
  
  function exitPresentation() {
    push('/talent');
  }

  // 슬라이드 구성: 커버(0), 선언문(1), 전체보기(2), 개별원칙(3~11), 적용예시(12)
  const totalSlides = 4 + leadershipPrinciples.length; // 13 슬라이드

  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
    }
  }

  function goToSlide(index) {
    currentSlide = index;
  }

  // 키보드 네비게이션
  function handleKeydown(event) {
    if (event.key === 'ArrowRight' || event.key === ' ') {
      event.preventDefault();
      nextSlide();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prevSlide();
    } else if (event.key === 'Escape') {
      exitPresentation();
    }
  }

  // 현재 원칙 (개별 슬라이드용: 인덱스 3 ~ 11)
  let currentPrinciple = $derived(
    currentSlide >= 3 && currentSlide < 3 + leadershipPrinciples.length 
      ? leadershipPrinciples[currentSlide - 3] 
      : null
  );
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="min-h-screen bg-[#050505] text-white relative overflow-hidden font-sans selection:bg-blue-500/30">
  <!-- 배경 장식 (Glow Effects & Lines) -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <!-- Center/Top Blue Glow -->
    <div class="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
    
    <!-- Bottom/Right Purple Glow -->
    <div class="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-purple-700/15 rounded-full blur-[140px] mix-blend-screen"></div>
    
    <!-- Top/Right Cyan Accent -->
    <div class="absolute top-[10%] right-[20%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] mix-blend-screen"></div>

    <!-- Geometric Lines -->
    <svg class="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="100%" x2="100%" y2="0" stroke="url(#lineGradient)" stroke-width="1" />
      <circle cx="80%" cy="20%" r="300" stroke="url(#circleGradient)" stroke-width="1" fill="none" />
      <circle cx="20%" cy="80%" r="400" stroke="url(#circleGradient2)" stroke-width="1" fill="none" />
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0" />
          <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0" />
          <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="circleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0" />
            <stop offset="50%" stop-color="#8b5cf6" stop-opacity="0.2" />
            <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0" />
          </linearGradient>
      </defs>
    </svg>
  </div>

  <!-- UI Elements: Header / Global -->
  <div class="absolute top-8 left-8 z-20 flex items-center gap-3">
      <img src="/images/buzzni_logo_white.png" alt="Buzzni" class="h-10" />
      <span class="text-slate-500 text-sm">|</span>
      <span class="text-slate-400 text-sm tracking-widest font-light">JOY OF GROWTH</span>
  </div>

  <!-- 나가기 버튼 -->
  <button
    onclick={exitPresentation}
    class="absolute top-8 right-8 z-50 group flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 hover:border-white/20"
  >
    <span class="text-sm text-slate-400 group-hover:text-white transition-colors">나가기</span>
    <div class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
        <span class="text-xs">✕</span>
    </div>
  </button>

  <!-- 슬라이드 컨테이너 -->
  <div class="relative z-10 min-h-screen flex flex-col pt-24 pb-12 px-8 md:px-16 max-w-[1920px] mx-auto w-full">
    <!-- 슬라이드 콘텐츠 -->
    <div class="flex-1 flex flex-col justify-center">
      
      {#if currentSlide === 0}
         <CoverSlide {nextSlide} />

      {:else if currentSlide === 1}
         <ManifestoSlide />

      {:else if currentSlide === 2}
         <OverviewSlide {goToSlide} />
      
      {:else if currentSlide < totalSlides - 1 && currentPrinciple}
         <PrincipleDetailSlide {currentPrinciple} {currentSlide} />

      {:else if currentSlide === totalSlides - 1}
         <UsageExamplesSlide />
      {/if}
    </div>

    <!-- 하단 네비게이션 (Footer) -->
    <div class="fixed bottom-0 left-0 right-0 p-8 z-50 pointer-events-none">
      <div class="max-w-[1920px] mx-auto w-full flex items-end justify-between pointer-events-auto">
          
          <!-- Page Number -->
          <div class="font-mono text-slate-600 text-sm">
             {String(currentSlide + 1).padStart(2, '0')} <span class="text-slate-800 mx-2">/</span> {String(totalSlides).padStart(2, '0')}
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-6">
             <!-- Progress Line -->
             <div class="hidden md:block w-48 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
                <div class="absolute top-0 left-0 bottom-0 bg-yellow-500 transition-all duration-500" style="width: {((currentSlide + 1) / totalSlides) * 100}%"></div>
             </div>

             <div class="flex items-center gap-2">
                 <button onclick={prevSlide} disabled={currentSlide === 0} class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all text-white">
                    ←
                 </button>
                 <button onclick={nextSlide} disabled={currentSlide === totalSlides - 1} class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 disabled:opacity-20 disabled:cursor-not-allowed transition-all text-white">
                    →
                 </button>
             </div>
          </div>
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
      filter: blur(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  }

  .animate-fadeIn {
    /* Made explicit global use or keep local - simple animations can be global but kept here for now since subcomponents use it */
    /* Wait, scoped styles in subcomponents won't see this keyframe unless I define it there or make it global. 
       Usually Svelte styles are scoped. I should create an app.css or layout.svelte for global styles, 
       BUT for now I'll duplicate the keyframes or move them to specific components if needed.
       Actually, standard Tailwind `animate-ping` etc work globally. 
       My `animate-fadeIn` is custom CSS. 
       I will duplicate the keyframe definition in child components or rely on `global.css` if I had one. 
       Best practice to avoid breakage: I will add the keyframes to the child components too or use :global().
       Since I am rewriting the files, I added `animate-fadeIn` class usage in children. 
       I should add the style block to children too. 
       Let's do a quick fix: add the styles to children files if they are missing. I didn't add style blocks to children.
    */
    animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  :global(.animate-fadeIn) {
    animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  :global(.animate-pulse-slow) {
    animation: pulse-slow 8s infinite ease-in-out;
  }

  @keyframes pulse-slow {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
  }
</style>
