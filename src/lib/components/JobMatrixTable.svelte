<script>
  import { jobFamilies } from '$lib/data/jobFamilies';
  import { jobLevels, levelColors } from '$lib/data/jobMatrix';
  import { competenciesByFamily } from '$lib/data/jobMatrixByFamily';

  let { family, onLevelClick } = $props();

  // 선택된 직군의 역량 카테고리 가져오기
  let competencyCategories = $derived(competenciesByFamily[family] || competenciesByFamily.engineering);
  let currentFamily = $derived(jobFamilies[family] || jobFamilies.engineering);
</script>

<div class="overflow-x-auto">
  <table class="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-300">
        <th class="px-2 py-2 text-left font-bold text-gray-700 text-sm w-[120px] sticky left-0 bg-gray-100 z-20 border-r-2 border-gray-300">
          역량
        </th>
        {#each jobLevels as level}
          {@const colorScheme = levelColors[level.color]}
          <th class="px-2 py-2 text-center font-bold {colorScheme.text} w-[150px]">
            <div class="text-lg">{level.id}</div>
            <div class="text-sm font-semibold">{level.nameKorean}</div>
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each competencyCategories as category}
        <tr class="border-b border-gray-200 hover:bg-gray-50">
          <td class="px-2 py-2 font-bold text-gray-700 text-xs {category.color} border-r-2 border-gray-300 sticky left-0 z-10">
            <div class="flex items-center gap-1">
              <span class="text-base">{category.icon}</span>
              <span class="text-sm leading-tight break-keep">{category.name}</span>
            </div>
          </td>
          {#each jobLevels as level}
            {@const colorScheme = levelColors[level.color]}
            <td class="px-2 py-2 text-gray-700 align-top text-sm leading-snug break-keep">
              {category.getDescription(level)}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<div class="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
  <div class="flex items-start gap-2 text-xs text-gray-600">
    <span class="font-semibold">💡</span>
    <div>
      <strong>표 읽는 법:</strong> 각 레벨과 역량의 교차점에서 해당 레벨에서 요구되는 구체적인 역량을 확인할 수 있습니다.
    </div>
  </div>
</div>
