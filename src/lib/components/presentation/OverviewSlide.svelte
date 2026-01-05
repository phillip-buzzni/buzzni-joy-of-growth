<script>
    import { leadershipPrinciples } from '$lib/data/leadershipPrinciples.js';
    import { getPrincipleImage } from '$lib/utils/principleUtils.js';
    
    let { goToSlide } = $props();
</script>

<div class="max-w-7xl mx-auto w-full animate-fadeIn h-full flex flex-col justify-center">
    <div class="text-center mb-12">
         <span class="text-yellow-500 tracking-widest text-sm font-semibold uppercase mb-2 block">Overview</span>
         <h2 class="text-4xl md:text-5xl font-bold text-white">8가지 리더십 원칙</h2>
    </div>
    
    <div class="flex flex-wrap justify-center gap-4">
      <!-- Center Circle Layout or Standard Grid -->
       <div class="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
        {#each leadershipPrinciples as principle, i}
          <button
            onclick={() => goToSlide(i + 3)}
            class="group relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300 hover:border-yellow-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] text-left"
          >
            <div class="relative z-10 flex flex-col h-full">
                <div class="mb-4 w-24 h-24 overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                     <img src={getPrincipleImage(principle.id)} alt={principle.name} class="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,209,35,0.3)]" />
                </div>
                
                <div class="mt-auto flex-1">
                    <p class="text-xs text-slate-500 uppercase tracking-wider mb-2">
                      {principle.nameEn}
                    </p>
                    <h3 class="text-3xl font-semibold text-white mb-1 group-hover:text-yellow-400 transition-colors break-keep">
                      {principle.name}
                    </h3>
                </div>
            </div>
          </button>
        {/each}
       </div>
    </div>
</div>
