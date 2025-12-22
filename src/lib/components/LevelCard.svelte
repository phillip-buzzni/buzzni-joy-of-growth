<script>
  import { levelColors } from '$lib/data/jobMatrix';

  let { level, onClick } = $props();

  let colorScheme = $derived(levelColors[level.color]);
</script>

<div
  class="border-2 {colorScheme.border} rounded-lg p-6 {colorScheme.bg} {colorScheme.hover} transition-all cursor-pointer"
  onclick={onClick}
>
  <div class="flex items-start justify-between mb-4">
    <div>
      <div class="flex items-center gap-3 mb-2">
        <span class="{colorScheme.text} text-2xl font-bold">{level.id}</span>
        <span class="text-gray-400">|</span>
        <span class="{colorScheme.text} font-semibold text-lg">{level.name}</span>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-1">{level.nameKorean}</h3>
      <p class="text-gray-600 text-sm">{level.yearsOfExperience}</p>
    </div>
  </div>

  <p class="text-gray-700 mb-4">{level.description}</p>

  <div class="space-y-2">
    <div class="flex items-center gap-2 text-sm">
      <span class="{colorScheme.text} font-medium">📋</span>
      <span class="text-gray-600">{level.responsibilities.length}개 핵심 책임</span>
    </div>
    <div class="flex items-center gap-2 text-sm">
      <span class="{colorScheme.text} font-medium">💻</span>
      <span class="text-gray-600">{level.technicalSkills.length}개 기술 역량</span>
    </div>
    <div class="flex items-center gap-2 text-sm">
      <span class="{colorScheme.text} font-medium">👥</span>
      <span class="text-gray-600">{level.leadershipSkills.length}개 리더십 역량</span>
    </div>
  </div>
</div>
