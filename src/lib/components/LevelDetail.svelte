<script>
  import { levelColors } from '$lib/data/jobMatrix';

  let { level, onBack } = $props();

  let colorScheme = $derived(levelColors[level.color]);
</script>

<div class="max-w-5xl mx-auto px-4 py-8">
  <!-- Header -->
  <button
    onclick={onBack}
    class="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
  >
    <span>←</span>
    <span>레벨 목록으로</span>
  </button>

  <div class="mb-8 p-8 {colorScheme.bg} border-2 {colorScheme.border} rounded-xl">
    <div class="flex items-start justify-between mb-4">
      <div>
        <div class="flex items-center gap-3 mb-2">
          <span class="{colorScheme.text} text-4xl font-bold">{level.id}</span>
          <span class="text-gray-400 text-2xl">|</span>
          <span class="{colorScheme.text} font-semibold text-2xl">{level.name}</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{level.nameKorean}</h1>
        <p class="text-gray-600 text-lg">{level.yearsOfExperience}</p>
      </div>
    </div>
    <p class="text-gray-800 text-lg leading-relaxed">{level.description}</p>
  </div>

  <!-- Responsibilities -->
  <div class="mb-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
      <span>📋</span>
      <span>핵심 책임</span>
    </h2>
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <ul class="space-y-3">
        {#each level.responsibilities as responsibility}
          <li class="flex items-start gap-3">
            <span class="{colorScheme.text} font-bold">•</span>
            <span class="text-gray-700">{responsibility}</span>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <!-- Technical Skills -->
  <div class="mb-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
      <span>💻</span>
      <span>기술 역량</span>
    </h2>
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <ul class="space-y-3">
        {#each level.technicalSkills as skill}
          <li class="flex items-start gap-3">
            <span class="{colorScheme.text} font-bold">•</span>
            <span class="text-gray-700">{skill}</span>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <!-- Leadership Skills -->
  <div class="mb-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
      <span>👥</span>
      <span>리더십 역량</span>
    </h2>
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <ul class="space-y-3">
        {#each level.leadershipSkills as skill}
          <li class="flex items-start gap-3">
            <span class="{colorScheme.text} font-bold">•</span>
            <span class="text-gray-700">{skill}</span>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <!-- Growth Tips -->
  <div class="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 p-8">
    <h2 class="text-xl font-bold text-gray-900 mb-4">💡 레벨업 가이드</h2>
    <div class="space-y-3 text-gray-700">
      <p>• <strong>현재 레벨 마스터:</strong> 위의 모든 역량을 꾸준히 발휘하고 있는지 확인하세요</p>
      <p>• <strong>다음 레벨 준비:</strong> 한 단계 위 레벨의 요구사항을 미리 학습하고 실천하세요</p>
      <p>• <strong>360도 피드백:</strong> 동료, 리더, 팀원으로부터 정기적으로 피드백을 받으세요</p>
      <p>• <strong>지속적 학습:</strong> 새로운 기술과 방법론을 꾸준히 학습하고 적용하세요</p>
    </div>
  </div>
</div>
