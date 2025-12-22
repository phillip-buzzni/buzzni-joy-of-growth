// 라우트 설정
import FeedbackList from "$lib/components/FeedbackList.svelte";
import GrowthDashboard from "$lib/components/GrowthDashboard.svelte";
import JobMatrix from "$lib/components/JobMatrix.svelte";
import MeetingList from "$lib/components/MeetingList.svelte";
import OKRDetailPage from "$lib/components/OKRDetailPage.svelte";
import OKRList from "$lib/components/OKRList.svelte";
import Principles from "$lib/components/Principles.svelte";
import PrinciplesPresentation from "$lib/components/PrinciplesPresentation.svelte";
import TalentProfile from "$lib/components/TalentProfile.svelte";
import TeamDashboard from "$lib/components/TeamDashboard.svelte";
import UserList from "$lib/components/UserList.svelte";

export const routes = {
  "/": PrinciplesPresentation,
  "/users": UserList,
  "/talent": TalentProfile,
  "/principles": Principles,
  "/presentation": PrinciplesPresentation,
  "/levels": JobMatrix,
  "/okr": OKRList,
  "/okr/:id": OKRDetailPage,
  "/feedback": FeedbackList,
  "/dashboard": GrowthDashboard,
  "/meetings": MeetingList,
  "/team": TeamDashboard,
};

// 네비게이션 메뉴 설정
export const navItems = [
  // { path: '/users', label: '구성원', icon: '👥' },
  { path: "/talent", label: "리더십 원칙", icon: "🌟" },
  { path: "/presentation", label: "리더십 원칙 프리젠테이션", icon: "🎬" },
  // { path: "/principles", label: "원칙 상세", icon: "📋" },
  // { path: "/levels", label: "레벨", icon: "📊" },
  // { path: "/okr", label: "OKR", icon: "🎯" },
  // { path: "/feedback", label: "360도 피드백", icon: "💬" },
  // { path: "/dashboard", label: "내 성장", icon: "📈" },
  // { path: "/meetings", label: "1:1 미팅", icon: "☕" },
  // { path: "/team", label: "팀 현황", icon: "📊" },
];
