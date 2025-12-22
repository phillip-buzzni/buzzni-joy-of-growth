// 마크다운 파싱 유틸리티

// 테이블 파싱
function parseTable(text) {
  const tableRegex = /\|(.+)\|\n\|[-:| ]+\|\n((?:\|.+\|\n?)+)/g;

  return text.replace(tableRegex, (match, headerRow, bodyRows) => {
    const headers = headerRow.split('|').map(h => h.trim()).filter(h => h);
    const rows = bodyRows.trim().split('\n').map(row =>
      row.split('|').map(cell => cell.trim()).filter(cell => cell)
    );

    let table = '<table class="w-full my-3 text-sm border-collapse">';
    table += '<thead><tr class="bg-gray-100">';
    headers.forEach(h => {
      table += `<th class="border border-gray-300 px-3 py-1.5 text-left font-semibold break-keep">${h}</th>`;
    });
    table += '</tr></thead><tbody>';
    rows.forEach(row => {
      table += '<tr class="hover:bg-gray-50">';
      row.forEach(cell => {
        table += `<td class="border border-gray-300 px-3 py-1.5 break-keep">${cell}</td>`;
      });
      table += '</tr>';
    });
    table += '</tbody></table>';

    return table;
  });
}

// 마크다운 파싱 (헤딩, 볼드, 이탤릭, 코드, 리스트, 인용구, 테이블 등)
export function parseMarkdown(text) {
  if (!text) return '';

  let html = text
    // 코드 블록 ```code```
    .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre class="bg-gray-800 text-gray-100 p-3 rounded-lg my-2 overflow-x-auto text-xs"><code class="whitespace-pre-wrap">$2</code></pre>')
    // 인라인 코드 `code`
    .replace(/`([^`]+)`/g, '<code class="bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
    // 헤딩 ## (h2~h4)
    .replace(/^#### (.+)$/gm, '<h4 class="font-bold text-sm mt-3 mb-1">$1</h4>')
    .replace(/^### (.+)$/gm, '<h3 class="font-bold text-base mt-3 mb-1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-bold text-lg mt-4 mb-2">$1</h2>')
    // 볼드 + 이탤릭 ***text***
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="font-bold break-keep"><em>$1</em></strong>')
    // 볼드 **text**
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    // 이탤릭 *text*
    .replace(/\*([^*]+)\*/g, '<em class="italic break-keep flex flex-wrap my-2">$1</em>')
    // 인용구 > text
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-300 bg-blue-50 pl-3 pr-2 py-2 my-2 text-gray-700 rounded-r">$1</blockquote>')
    // 수평선 ---
    .replace(/^---$/gm, '<hr class="my-3 border-gray-300">')
    // 체크박스 리스트 - [ ] / - [x]
    .replace(/^- \[x\] (.+)$/gm, '<li class="flex items-start gap-2 ml-2"><span class="text-green-500">✓</span><span class="line-through text-gray-500">$1</span></li>')
    .replace(/^- \[ \] (.+)$/gm, '<li class="flex items-start gap-2 ml-2"><span class="text-gray-400">☐</span><span>$1</span></li>')
    // 리스트 - item
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 ml-2"><span class="text-blue-500">•</span><span>$1</span></li>')
    // 숫자 리스트 1. item
    .replace(/^(\d+)\. (.+)$/gm, '<li class="flex items-start gap-2 ml-2"><span class="text-blue-500 font-medium min-w-[1.5em]">$1.</span><span>$2</span></li>');

  // 테이블 파싱
  html = parseTable(html);

  // 줄바꿈
  html = html.replace(/\n/g, '<br>');

  // 연속된 <br> 정리
  html = html.replace(/(<br>){3,}/g, '<br><br>');

  return html;
}
