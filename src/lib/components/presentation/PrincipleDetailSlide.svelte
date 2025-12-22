<script>
    import { getPrincipleImage } from '$lib/utils/principleUtils.js';
    
    let { currentPrinciple, currentSlide } = $props();
</script>

<div class="w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-fadeIn">
    
    <!-- Left: Graphic & Title -->
    <div class="lg:col-span-7 relative">
         <div class="absolute -top-20 -left-20 w-64 h-64 bg-yellow-500/20 rounded-full blur-[80px]"></div>
         
         <div class="relative z-10">
            <div class="inline-flex items-center gap-3 mb-6 bg-black/50 border border-white/10 rounded-full px-4 py-2 backdrop-blur-xl">
                <span class="text-xs text-slate-400 uppercase tracking-wider">Principle {currentSlide - 2}</span>
                <span class="text-xs text-slate-600">/</span>
                <span class="text-xs text-slate-600">9</span>
            </div>

            <div class="flex items-center gap-6 mb-8 absolute -top-32 left-0 -translate-x-1/2 -translate-y-1/2 -z-10">
                 <div class="w-32 h-32 md:w-128 md:h-128 relative">
                     <img src={getPrincipleImage(currentPrinciple.id)} alt={currentPrinciple.name} class="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(255,209,35,0.4)] animate-pulse-slow" />
                 </div>
            </div>
            
            <h2 class="text-5xl md:text-8xl font-bold text-white mb-2 leading-tight break-keep drop-shadow-[0_0_30px_rgba(255,209,35,0.4)] ">
                {currentPrinciple.name}
            </h2>
            <h3 class="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 font-light mb-8">
                {currentPrinciple.nameEn}
            </h3>

            <div class="p-6 bg-gradient-to-br from-yellow-500/10 to-purple-500/5 border-l-2 border-yellow-500 rounded-r-xl">
                <p class="text-lg text-slate-300 leading-relaxed italic">
                "{currentPrinciple.shortDescription}"
                </p>
            </div>
         </div>
    </div>

    <!-- Right: Details -->
    <div class="lg:col-span-5 space-y-6">
        {#each currentPrinciple.principles as principleText, i}
          {@const [title, ...descParts] = principleText.split(':\\n')}
          <div class="group bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-yellow-500/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/5">
            <div class="flex items-start gap-5">
              <div class="shrink-0 w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-500 group-hover:text-white transition-colors duration-300">
                  {i + 1}
              </div>
              <div>
                <h4 class="text-2xl font-semibold text-white group-hover:text-yellow-300 transition-colors whitespace-pre-wrap break-keep">
                    {title.split(':')[0]}
                </h4>
                <p class="text-xl text-white/70 mb-3 group-hover:text-yellow-300 transition-colors whitespace-pre-wrap break-keep">
                  {title.split(':')[1]}
                </p>
                <p class="text-slate-400 leading-relaxed text-[15px] whitespace-pre-wrap break-keep">
                  {descParts}
                </p>
              </div>
            </div>
          </div>
        {/each}
    </div>
</div>
