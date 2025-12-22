<script>
  export let principle;
  export let onClick;

  import { principleColors } from '$lib/data/leadershipPrinciples';

  $: colorScheme = principleColors[principle.color];
</script>

<div
  class="border-2 {colorScheme.border} rounded-lg p-6 {colorScheme.bg} {colorScheme.hover} transition-all cursor-pointer"
  onclick={onClick}
>
  <div class="flex items-start gap-4">
    <div class="text-4xl">{principle.icon}</div>
    <div class="flex-1">
      <h3 class="{colorScheme.text} text-xl font-bold mb-1">
        {principle.name}
      </h3>
      <p class="text-gray-600 text-sm mb-3">{principle.nameEn}</p>
      <p class="text-gray-700 leading-relaxed">{principle.description}</p>

      <div class="mt-4 flex gap-2">
        <span class="text-xs {colorScheme.text} font-medium">
          {principle.behaviors.length}개 행동 지표
        </span>
        <span class="text-xs text-gray-500">•</span>
        <span class="text-xs {colorScheme.text} font-medium">
          {principle.questions.length}개 질문
        </span>
      </div>
    </div>
  </div>
</div>
