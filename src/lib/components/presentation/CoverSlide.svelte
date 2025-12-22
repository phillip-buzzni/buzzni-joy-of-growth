<script>
    import Principle3DCarousel from '../Principle3DCarousel.svelte';

    let { nextSlide } = $props();
</script>

<div class="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
    <!-- 3D Carousel - Visual Layer (z-30 to be ON TOP) -->
    <div class="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
            <!-- Make container full screen so centering works same as Text -->
            <div class="w-screen h-screen fixed left-0 top-0 mix-blend-screen ">
            <Principle3DCarousel />
            </div>
    </div>

    <!-- Text Content - Z-20 -->
    <div class="relative z-20 text-center space-y-8 px-4 mt-20 md:mt-0">
        <!-- Added text-shadow to ensure readability even if overlapped slightly -->
        <h1 class="text-6xl md:text-9xl font-bold tracking-tight leading-none text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        BUZZNI <br />
        <span class="text-transparent bg-clip-text bg-gradient-to-br from-white to-yellow-100">
        LEADERSHIP <br />
        </span>
        <span class="text-transparent bg-clip-text bg-gradient-to-br from-yellow-100 to-yellow-400">PRINCIPLES</span>
        </h1>
        <p class="text-xl md:text-3xl text-slate-200 font-light leading-relaxed drop-shadow-md max-w-2xl mx-auto">
        우리가 함께 성장하는 방법. <br />
        버즈니의 핵심 가치와 일하는 방식에 대하여.
        </p>
        
        <div class="pt-8 relative z-40"> <!-- Button extra z-index to be sure -->
            <button onclick={nextSlide} class="pointer-events-auto px-12 py-5 bg-yellow-300 hover:bg-yellow-400 text-black rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(253,224,71,0.3)] hover:shadow-[0_0_50px_rgba(253,224,71,0.5)] font-bold text-xl flex items-center gap-3 mx-auto group">
                시작하기
                <span class="group-hover:translate-x-1 transition-transform">→</span>
            </button>
        </div>
    </div>
</div>
