<script>
  import { push } from 'svelte-spa-router';
  import { sampleOKRs } from '$lib/data/okrData';
  import OKRDetail from './OKRDetail.svelte';

  let { params } = $props();

  let okr = $derived(sampleOKRs.find(o => o.id === params.id));

  function handleBack() {
    push('/okr');
  }
</script>

{#if okr}
  <OKRDetail {okr} onBack={handleBack} />
{:else}
  <div class="max-w-5xl mx-auto px-4 py-8">
    <div class="text-center py-12">
      <p class="text-gray-500 text-lg">OKR을 찾을 수 없습니다.</p>
      <button
        onclick={handleBack}
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        OKR 목록으로 돌아가기
      </button>
    </div>
  </div>
{/if}
