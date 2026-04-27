<script>
    import { getPrincipleImage } from '$lib/utils/principleUtils.js';
</script>

<div class="max-w-7xl mx-auto w-full animate-fadeIn py-12">
    <div class="text-center mb-12">
         <span class="text-yellow-500 tracking-widest text-sm font-semibold uppercase mb-2 block">How We Work</span>
         <h2 class="text-4xl md:text-6xl font-bold text-white mb-4">원칙은 살아 숨쉬는 조직을 만들기 위해</h2>
         <p class="text-xl text-slate-400">우리는 이 원칙들을 액자에 걸어두지 않고, 매일의 의사결정과 성장에 사용합니다.</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- 1. 채용 (Recruitment) -->
        <div class="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-2">
             <div class="absolute inset-0 bg-gradient-to-b from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
             <div class="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden p-2">
                <img src={getPrincipleImage('mission-over-individual')} alt="Recruitment" class="w-full h-full object-contain" />
             </div>
             <h3 class="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">채용 (Recruitment)</h3>
             <p class="text-slate-400 text-sm leading-relaxed mb-3">
                기술적 역량뿐만 아니라, 8가지 리더십 원칙에 부합하는지 깊이 있게 인터뷰합니다.
             </p>
             <ul class="space-y-2 text-slate-500 text-sm">
                <li class="flex items-start gap-2">
                    <span class="text-blue-500">•</span>
                    <span>컬처 인터뷰의 핵심 기준</span>
                </li>
             </ul>
        </div>

        <!-- 2. 의사결정 (Decision Making) -->
        <div class="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-2">
             <div class="absolute inset-0 bg-gradient-to-b from-yellow-500/0 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
             <div class="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden p-2">
                <img src={getPrincipleImage('customer-delight')} alt="Decision" class="w-full h-full object-contain" />
             </div>
             <h3 class="text-xl font-bold mb-3 text-white group-hover:text-yellow-300 transition-colors">매일의 의사결정</h3>
             <p class="text-slate-400 text-sm leading-relaxed mb-3">
                딜레마 상황에서 원칙은 의사결정의 북극성이 됩니다. "어떤 결정이 '고객의 기대'를 더 뛰어넘는가?"를 묻습니다.
             </p>
             <ul class="space-y-2 text-slate-500 text-sm">
                <li class="flex items-start gap-2">
                    <span class="text-yellow-500">•</span>
                    <span>갈등 해결의 기준점</span>
                </li>
             </ul>
        </div>

        <!-- 3. 평가와 승진 (Evaluation) -->
        <div class="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-2">
             <div class="absolute inset-0 bg-gradient-to-b from-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
             <div class="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden p-2">
                <img src={getPrincipleImage('aim-higher')} alt="Evaluation" class="w-full h-full object-contain" />
             </div>
             <h3 class="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">평가와 승진</h3>
             <p class="text-slate-400 text-sm leading-relaxed mb-3">
                성과뿐 아니라 이 원칙들을 얼마나 잘 실천했는지가 평가의 핵심입니다. 다음 레벨로의 성장은 이 원칙들의 심화로 정의됩니다.
             </p>
             <ul class="space-y-2 text-slate-500 text-sm">
                <li class="flex items-start gap-2">
                    <span class="text-purple-500">•</span>
                    <span>360도 피드백의 문항 기준</span>
                </li>
             </ul>
        </div>

        <!-- 4. 전략과 목표 (Strategy) -->
        <div class="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-2">
             <div class="absolute inset-0 bg-gradient-to-b from-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
             <div class="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden p-2">
                <img src={getPrincipleImage('focus-on-impact')} alt="Strategy" class="w-full h-full object-contain" />
             </div>
             <h3 class="text-xl font-bold mb-3 text-white group-hover:text-red-300 transition-colors">전략과 목표 (OKR)</h3>
             <p class="text-slate-400 text-sm leading-relaxed mb-3">
                OKR 수립 시 'Focus on Impact'와 'Mission Over Individual'을 기준으로 목표를 정렬하고 우선순위를 정합니다.
             </p>
             <ul class="space-y-2 text-slate-500 text-sm">
                <li class="flex items-start gap-2">
                    <span class="text-red-500">•</span>
                    <span>임팩트 중심의 목표 설정</span>
                </li>
             </ul>
        </div>

        <!-- 5. 실패와 회고 (Retrospective) -->
        <div class="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-2">
             <div class="absolute inset-0 bg-gradient-to-b from-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
             <div class="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden p-2">
                <img src={getPrincipleImage('execution-over-perfection')} alt="Retro" class="w-full h-full object-contain" />
             </div>
             <h3 class="text-xl font-bold mb-3 text-white group-hover:text-orange-300 transition-colors">실패와 회고</h3>
             <p class="text-slate-400 text-sm leading-relaxed mb-3">
                실패 시 사람을 비난하지 않습니다. 'Execution over Perfection'과 '가설 검증'의 관점에서 배운 점을 회고합니다.
             </p>
             <ul class="space-y-2 text-slate-500 text-sm">
                <li class="flex items-start gap-2">
                    <span class="text-orange-500">•</span>
                    <span>Blameless Culture</span>
                </li>
             </ul>
        </div>

        <!-- 6. 협업과 커뮤니케이션 (Collaboration) -->
        <div class="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-2">
             <div class="absolute inset-0 bg-gradient-to-b from-green-500/0 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
             <div class="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden p-2">
                <img src={getPrincipleImage('ask-for-feedback')} alt="Collab" class="w-full h-full object-contain" />
             </div>
             <h3 class="text-xl font-bold mb-3 text-white group-hover:text-green-300 transition-colors">협업과 소통</h3>
             <p class="text-slate-400 text-sm leading-relaxed mb-3">
                '투명한 소통'과 '근원적 질문'을 통해 오해를 줄이고 신뢰를 쌓습니다. 동료를 위해 먼저 움직입니다.
             </p>
             <ul class="space-y-2 text-slate-500 text-sm">
                <li class="flex items-start gap-2">
                    <span class="text-green-500">•</span>
                    <span>1:1 미팅과 팀 회의의 원칙</span>
                </li>
             </ul>
        </div>

        <!-- 7. AX 기술과 혁신 (Innovation) -->
        <div class="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-2">
             <div class="absolute inset-0 bg-gradient-to-b from-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
             <div class="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden p-2">
                <img src={getPrincipleImage('act-proactively')} alt="Innovation" class="w-full h-full object-contain" />
             </div>
             <h3 class="text-xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors">AX 기술과 혁신</h3>
             <p class="text-slate-400 text-sm leading-relaxed mb-3">
                AI 기술을 통해 일하는 방식을 혁신하고, 새로운 시대에 맞는 압도적인 생산성과 가치를 만들어냅니다.
             </p>
             <ul class="space-y-2 text-slate-500 text-sm">
                <li class="flex items-start gap-2">
                    <span class="text-cyan-500">•</span>
                    <span>기술 중심의 업무 효율화 기준</span>
                </li>
             </ul>
        </div>
    </div>
</div>
