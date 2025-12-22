<script>
  import { leadershipPrinciples, principleColors } from '../data/leadershipPrinciples.js';
</script>

<div class="max-w-7xl mx-auto px-4 py-8">
  <!-- Header -->
  <div class="text-center mb-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">버즈니 리더십 원칙</h1>
    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
      우리가 추구하는 9가지 가치와 행동 원칙
    </p>
  </div>

  <!-- Declaration (moved to top) -->
  <div class="mb-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12">
    <div class="max-w-4xl mx-auto space-y-6 text-gray-700 text-lg leading-relaxed break-keep">
      <p>
        우리는 <strong class="text-gray-900">'성장의 즐거움'</strong>을 믿는 사람들이다.
      </p>

      <p>
        어제보다 나은 오늘, 오늘보다 나은 내일을 만들어가는 과정 자체가 즐거움이라고 믿는다.
        그리고 그 성장이 나 혼자만의 것이 아니라 팀과 함께, 고객과 함께 이루어질 때
        비로소 진정한 가치가 된다고 믿는다.
      </p>

      <p>
        이 9가지 원칙은 우리가 함께 성장하기 위해 스스로에게 던지는 질문이자,
        서로에게 하는 약속이다.
      </p>

      <p>
        이 원칙들은 <strong class="text-gray-900">채용, 평가, 보상</strong>을 포함한
        모든 가치 판단의 기준이 될 것이다.
      </p>

      <p class="text-sm text-gray-400 text-right pt-4">
        v1.0.20260101
      </p>
    </div>
  </div>

  <!-- Principles Grid -->
  <div class="grid grid-cols-1 md:grid-cols-1 gap-6 mb-12">
    {#each leadershipPrinciples as principle}
      {@const colors = principleColors[principle.color]}
      <div class="bg-white rounded-2xl border-2 {colors.border} p-6 hover:shadow-lg transition-shadow">
        <!-- Header -->
        <div class="flex justify-start items-center gap-4 mb-4">
          <div class="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-2xl">
            <div class="text-4xl">{principle.icon}</div>
          </div>
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-gray-900">{principle.name}</h3>
            <p class="text-base {colors.text} font-medium">{principle.nameEn}</p>
          </div>
        </div>

        <!-- Description -->
        <div class="text-sm font-semibold text-gray-500 mb-2">해설</div>
        <p class="text-gray-700 mb-2 text-lg font-bold">{principle.shortDescription}</p>
        <p class="text-gray-700 text-lg mb-4 break-keep">{principle.fullDescription}</p>

        <!-- Principles -->
        <div class="text-sm font-semibold text-gray-500 mb-2">행동 원칙</div>
        <div class="space-y-2">
          {#each principle.principles as item}
            <div class="flex items-start gap-2">
              <span class="text-base {colors.text} mt-1">▪</span>
              <span class="text-base text-gray-600 whitespace-pre-wrap break-keep">{item}</span>
            </div>
          {/each}
        </div>

        <!-- Level Preview -->
         <div class="flex gap-2 mt-4">
          <div class="flex-1 pt-4 border-t border-r border-gray-200">
            <div class="text-xs font-semibold text-gray-500 mb-2">DO</div>
            <div class="space-y-1">
              {#each principle.behaviors as behavior}
                <div class="text-xs text-gray-600 flex items-start gap-2">
                  <span class="text-gray-400 uppercase text-[10px] w-8">{behavior.level}</span>
                  <span>{behavior.title}</span>
                </div>
              {/each}
            </div>
          </div>

          <!-- Anti-Patterns -->
          <div class="flex-1 pt-4 border-t border-gray-200">
            <div class="text-xs font-semibold text-red-600 mb-2">DON'T</div>
            <ul class="space-y-1">
              {#each principle.antiPatterns as antiPattern}
                <li class="text-xs text-gray-600 flex items-start gap-2">
                  <span class="text-red-500 mt-0.5">✗</span>
                  <span>{antiPattern}</span>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    {/each}
  </div>

</div>
