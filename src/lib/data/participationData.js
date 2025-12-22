// 팀 참여 현황 데이터
import mockUsers from './mockUsers.json';

// 스쿼드별 구성원 참여 현황
export function getSquadParticipation() {
  const squads = {};
  const memberSquadCount = {};

  mockUsers.results.forEach(user => {
    if (user.is_resigned) return;

    // 사용자가 참여한 스쿼드 개수 카운트
    const userSquads = user.squads || [];
    memberSquadCount[user.id] = userSquads.length;

    userSquads.forEach(squad => {
      const squadName = squad.korean_name;

      if (!squads[squadName]) {
        squads[squadName] = {
          name: squadName,
          initial: squad.initial,
          leaders: [],
          members: [],
          totalCount: 0
        };
      }

      const memberInfo = {
        id: user.id,
        name: user.nickname_korean,
        image: user.image_small,
        division: squad.division,
        squadCount: userSquads.length,
        chapter: user.chapters?.korean_name || null,
        isOverloaded: userSquads.length >= 3 // 3개 이상 스쿼드 참여 시 과부하
      };

      if (squad.division === 'LEADER') {
        squads[squadName].leaders.push(memberInfo);
      } else {
        squads[squadName].members.push(memberInfo);
      }
      squads[squadName].totalCount++;
    });
  });

  return {
    squads: Object.values(squads),
    memberSquadCount
  };
}

// 네트워크 그래프 데이터 생성
export function getNetworkGraphData() {
  const nodes = [];
  const links = [];
  const nodeMap = new Map();

  // 스쿼드 노드 생성
  const squadSet = new Set();
  mockUsers.results.forEach(user => {
    if (user.is_resigned) return;

    (user.squads || []).forEach(squad => {
      squadSet.add(squad.korean_name);
    });
  });

  let nodeId = 0;

  // 스쿼드를 노드로 추가
  squadSet.forEach(squadName => {
    const id = `squad-${nodeId++}`;
    nodeMap.set(squadName, id);
    nodes.push({
      id,
      label: squadName,
      type: 'squad',
      size: 30,
      color: '#3B82F6'
    });
  });

  // 멤버를 노드로 추가하고 링크 생성
  mockUsers.results.forEach(user => {
    if (user.is_resigned) return;

    const userSquads = user.squads || [];
    if (userSquads.length === 0) return;

    const userId = `user-${nodeId++}`;
    const isOverloaded = userSquads.length >= 3;

    nodes.push({
      id: userId,
      label: user.nickname_korean,
      type: 'member',
      size: 15 + (userSquads.length * 3),
      color: isOverloaded ? '#EF4444' : userSquads.length > 1 ? '#F59E0B' : '#10B981',
      image: user.image_small,
      squadCount: userSquads.length,
      chapter: user.chapters?.korean_name || null,
      isOverloaded
    });

    // 사용자와 스쿼드 간 링크 생성
    userSquads.forEach(squad => {
      const squadId = nodeMap.get(squad.korean_name);
      if (squadId) {
        links.push({
          source: userId,
          target: squadId,
          isLeader: squad.division === 'LEADER',
          strength: squad.division === 'LEADER' ? 2 : 1
        });
      }
    });
  });

  return { nodes, links };
}

// 과부하 멤버 분석
export function getOverloadedMembers() {
  const overloaded = [];
  const multiSquad = [];
  const singleSquad = [];

  mockUsers.results.forEach(user => {
    if (user.is_resigned) return;

    const squadCount = (user.squads || []).length;

    const memberInfo = {
      id: user.id,
      name: user.nickname_korean,
      image: user.image_small,
      squadCount,
      squads: (user.squads || []).map(s => s.korean_name),
      chapter: user.chapters?.korean_name || null,
      leaderOf: (user.squads || []).filter(s => s.division === 'LEADER').map(s => s.korean_name)
    };

    if (squadCount >= 3) {
      overloaded.push(memberInfo);
    } else if (squadCount === 2) {
      multiSquad.push(memberInfo);
    } else if (squadCount === 1) {
      singleSquad.push(memberInfo);
    }
  });

  return {
    overloaded: overloaded.sort((a, b) => b.squadCount - a.squadCount),
    multiSquad: multiSquad.sort((a, b) => b.squadCount - a.squadCount),
    singleSquad,
    stats: {
      total: mockUsers.results.filter(u => !u.is_resigned).length,
      overloaded: overloaded.length,
      multiSquad: multiSquad.length,
      singleSquad: singleSquad.length,
      noSquad: mockUsers.results.filter(u => !u.is_resigned && (!u.squads || u.squads.length === 0)).length
    }
  };
}

// 스쿼드별 리더/멤버 분포
export function getSquadDistribution() {
  const distribution = {};

  mockUsers.results.forEach(user => {
    if (user.is_resigned) return;

    (user.squads || []).forEach(squad => {
      const squadName = squad.korean_name;

      if (!distribution[squadName]) {
        distribution[squadName] = {
          name: squadName,
          leaders: 0,
          members: 0,
          total: 0
        };
      }

      if (squad.division === 'LEADER') {
        distribution[squadName].leaders++;
      } else {
        distribution[squadName].members++;
      }
      distribution[squadName].total++;
    });
  });

  return Object.values(distribution).sort((a, b) => b.total - a.total);
}

// 챕터별 스쿼드 참여 현황
export function getChapterSquadParticipation() {
  const chapterSquads = {};

  mockUsers.results.forEach(user => {
    if (user.is_resigned) return;

    const chapterName = user.chapters?.korean_name || '미배정';

    if (!chapterSquads[chapterName]) {
      chapterSquads[chapterName] = {
        name: chapterName,
        members: 0,
        squadParticipation: {},
        avgSquadCount: 0
      };
    }

    chapterSquads[chapterName].members++;

    const squadCount = (user.squads || []).length;
    chapterSquads[chapterName].avgSquadCount += squadCount;

    (user.squads || []).forEach(squad => {
      const squadName = squad.korean_name;
      chapterSquads[chapterName].squadParticipation[squadName] =
        (chapterSquads[chapterName].squadParticipation[squadName] || 0) + 1;
    });
  });

  // 평균 계산
  Object.values(chapterSquads).forEach(chapter => {
    if (chapter.members > 0) {
      chapter.avgSquadCount = (chapter.avgSquadCount / chapter.members).toFixed(1);
    }
  });

  return Object.values(chapterSquads);
}
