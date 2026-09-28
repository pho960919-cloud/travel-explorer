"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, CircleHelp, Heart, MapPin, Plane, Sparkles, Users, Wallet } from "lucide-react";

const companions = [
  { id: "solo", label: "혼자", icon: "🧳", desc: "가볍게 내 취향대로" },
  { id: "mom", label: "엄마", icon: "🌷", desc: "엄마와 편안하게" },
  { id: "dad", label: "아빠", icon: "🧢", desc: "아빠와 함께" },
  { id: "parents", label: "부모님", icon: "🏡", desc: "부모님과 여유롭게" },
  { id: "friends", label: "친구", icon: "🥂", desc: "친구들과 신나게" },
  { id: "partner", label: "연인", icon: "💛", desc: "둘만의 여행" },
];

const styles = [
  ["hot-spring", "온천", "♨️"], ["relax", "휴양", "🌴"], ["sightseeing", "관광", "🏛️"],
  ["food", "맛집", "🍜"], ["shopping", "쇼핑", "🛍️"], ["nature", "자연", "🌿"],
  ["culture", "문화", "🎨"], ["activity", "액티비티", "🏄"],
];

const destinations = [
  { id:"kusatsu", name:"쿠사츠", country:"일본", region:"일본", image:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=85", tags:["hot-spring","relax","nature"], companion:["solo","mom","dad","parents","partner"], days:[2,3,4,5], baseBudget:115, flight:35, bestMonths:[1,2,3,4,5,10,11,12], vibe:"온천마을에서 느긋하게 쉬고, 작은 마을을 천천히 걷는 여행", transit:"도쿄 경유 후 이동" },
  { id:"beppu", name:"벳푸", country:"일본", region:"일본", image:"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=85", tags:["hot-spring","relax","food"], companion:["solo","mom","dad","parents","friends","partner"], days:[3,4,5,6], baseBudget:105, flight:32, bestMonths:[1,2,3,4,5,10,11,12], vibe:"온천과 먹거리를 함께 즐기기 좋은 규슈 여행", transit:"후쿠오카 경유 또는 국내선" },
  { id:"kyoto", name:"교토", country:"일본", region:"일본", image:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85", tags:["sightseeing","culture","food"], companion:["solo","mom","dad","parents","friends","partner"], days:[2,3,4,5], baseBudget:125, flight:32, bestMonths:[3,4,5,10,11], vibe:"사찰·골목·맛집을 묶어 걷기 좋은 클래식 일본 여행", transit:"오사카 경유 또는 간사이 직항" },
  { id:"taipei", name:"타이베이", country:"대만", region:"동아시아", image:"https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=1200&q=85", tags:["food","shopping","sightseeing","culture"], companion:["solo","mom","dad","parents","friends","partner"], days:[2,3,4,5], baseBudget:95, flight:28, bestMonths:[2,3,4,5,10,11,12], vibe:"짧은 일정에도 먹거리·야시장·도시 관광을 알차게 즐기는 여행", transit:"인천 직항" },
  { id:"danang", name:"다낭", country:"베트남", region:"동남아", image:"https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=85", tags:["relax","food","nature"], companion:["solo","mom","parents","friends","partner"], days:[3,4,5,6], baseBudget:90, flight:30, bestMonths:[2,3,4,5,6,12], vibe:"리조트에서 쉬면서 맛있는 음식과 바다를 즐기는 휴양 여행", transit:"인천 직항" },
  { id:"budapest", name:"부다페스트", country:"헝가리", region:"동유럽", image:"https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1200&q=85", tags:["sightseeing","hot-spring","culture","food"], companion:["solo","friends","partner"], days:[4,5,6,7], baseBudget:190, flight:80, bestMonths:[4,5,6,9,10], vibe:"유럽 도시 풍경과 온천을 한 번에 경험하는 여행", transit:"유럽 경유" },
  { id:"vienna", name:"비엔나", country:"오스트리아", region:"동유럽", image:"https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=85", tags:["culture","sightseeing","food"], companion:["solo","friends","partner","parents"], days:[4,5,6,7], baseBudget:205, flight:85, bestMonths:[4,5,6,9,10], vibe:"클래식과 건축, 카페 문화를 천천히 즐기는 도시 여행", transit:"유럽 경유" },
  { id:"osaka", name:"오사카", country:"일본", region:"일본", image:"https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1200&q=85", tags:["food","shopping","sightseeing"], companion:["solo","mom","dad","parents","friends","partner"], days:[2,3,4,5], baseBudget:105, flight:30, bestMonths:[1,2,3,4,5,10,11,12], vibe:"먹고 쇼핑하고 주변 도시까지 연결하기 좋은 실용적인 여행", transit:"인천 직항" },
  { id:"sapporo", name:"삿포로", country:"일본", region:"일본", image:"https://images.unsplash.com/photo-1542931287-023b922fa89b?auto=format&fit=crop&w=1200&q=85", tags:["food","nature","sightseeing"], companion:["solo","mom","dad","parents","friends","partner"], days:[3,4,5,6], baseBudget:130, flight:38, bestMonths:[1,2,6,7,8,9,12], vibe:"맛있는 음식과 시원한 날씨, 근교 자연을 함께 즐기는 여행", transit:"인천 직항" },
  { id:"jeju", name:"제주", country:"대한민국", region:"한국", image:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85", tags:["nature","relax","food","sightseeing"], companion:["solo","mom","dad","parents","friends","partner"], days:[2,3,4,5], baseBudget:55, flight:8, bestMonths:[3,4,5,6,9,10,11], vibe:"짧은 휴가에도 자연·맛집·휴식을 모두 챙기기 좋은 국내 여행", transit:"김포/청주 등 국내선" },
];

const months = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];

function scoreDestination(d, f) {
  let score = 50;
  const reasons = [];
  const matchedStyles = f.styles.filter(s => d.tags.includes(s));
  score += Math.min(24, matchedStyles.length * 8);
  if (matchedStyles.length) reasons.push(`${matchedStyles.slice(0,2).map(id => styles.find(x => x[0]===id)?.[1]).join(" + ")} 여행에 잘 맞아요`);
  if (d.companion.includes(f.companion)) { score += 14; reasons.push(`${companions.find(c=>c.id===f.companion)?.label}와 함께하기 좋은 여행지예요`); }
  if (f.days && d.days.includes(Number(f.days))) { score += 7; reasons.push(`${f.days}박 일정으로 동선을 만들기 좋아요`); }
  const monthIndex = Number(f.month);
  if (monthIndex && d.bestMonths.includes(monthIndex)) { score += 7; reasons.push(`${months[monthIndex-1]} 여행 시즌과 잘 맞아요`); }
  const estimated = d.baseBudget + d.flight;
  if (f.budget >= estimated) { score += 10; reasons.push(`1인 약 ${estimated}만원부터 예산 범위에 들어와요`); }
  else if (f.budget >= estimated * .82) { score += 4; reasons.push(`예산을 조금 조정하면 충분히 검토할 수 있어요`); }
  else score -= 8;
  if (f.companion === "parents" || f.companion === "mom" || f.companion === "dad") {
    if (["kusatsu","beppu","danang","jeju","kyoto"].includes(d.id)) { score += 4; reasons.push("무리한 일정 대신 휴식과 이동 밸런스를 잡기 좋아요"); }
  }
  return { ...d, score: Math.max(55, Math.min(98, score)), reasons: reasons.slice(0,3), matchedStyles };
}

function buildSkyLink(destination, month, days) {
  const monthText = month ? months[month-1] : "여행 일정";
  const q = encodeURIComponent(`${destination.name} ${monthText} ${days ? days+"박" : ""}`.trim());
  return `https://www.skyscanner.co.kr/transport/flights/?q=${q}`;
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [filters, setFilters] = useState({ companion:"mom", month:"5", days:"3", budget:150, styles:["hot-spring","relax"] });
  const [saved, setSaved] = useState([]);
  const [search, setSearch] = useState("");

  const results = useMemo(() => destinations.map(d => scoreDestination(d, filters)).sort((a,b)=>b.score-a.score).slice(0,7), [filters]);
  const visibleDestinations = search ? destinations.filter(d => `${d.name} ${d.country} ${d.region}`.toLowerCase().includes(search.toLowerCase())) : destinations;

  const toggleStyle = (id) => setFilters(f => ({...f, styles:f.styles.includes(id) ? f.styles.filter(x=>x!==id) : [...f.styles,id]}));
  const toggleSave = (id) => setSaved(s => s.includes(id) ? s.filter(x=>x!==id) : [...s,id]);

  if (step === 0) return <Landing search={search} setSearch={setSearch} onStart={()=>setStep(1)} visibleDestinations={visibleDestinations} saved={saved} toggleSave={toggleSave} />;
  if (step === 1) return <Wizard filters={filters} setFilters={setFilters} toggleStyle={toggleStyle} onBack={()=>setStep(0)} onNext={()=>setStep(2)} />;
  return <Results filters={filters} results={results} saved={saved} toggleSave={toggleSave} onBack={()=>setStep(1)} onReset={()=>setStep(0)} />;
}

function Header({ savedCount, onHome }) {
  return <header className="nav"><button className="brand" onClick={onHome}><span className="brandMark">✦</span>Trip Atlas</button><span className="navTag">내 조건에 맞는 여행 찾기</span>{savedCount !== undefined && <button className="savedBtn"><Heart size={16} fill={savedCount ? "currentColor" : "none"}/> 저장 {savedCount}</button>}</header>;
}

function Landing({search,setSearch,onStart,visibleDestinations,saved,toggleSave}) {
  return <><Header savedCount={saved.length} onHome={()=>window.scrollTo({top:0,behavior:"smooth"})}/><main>
    <section className="hero"><div className="heroInner"><div className="eyebrow"><Sparkles size={15}/> TRAVEL DISCOVERY</div><h1>지금 나에게<br/><span>갈 수 있는 여행</span>은 어디일까요?</h1><p>동행자, 일정, 예산, 하고 싶은 일을 알려주면<br className="desktop"/> 지금 조건에 맞는 여행지를 찾아드려요.</p><button className="primary large" onClick={onStart}>내 여행 조건으로 찾아보기 <ArrowRight size={18}/></button><div className="quickSearch"><MapPin size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="혹시 생각해둔 여행지가 있나요?"/><span>검색</span></div></div></section>
    <section className="content"><div className="sectionTitle"><div><span className="step">01</span><h2>직접 둘러봐도 좋아요</h2><p>나라보다 먼저, 여행의 분위기로 발견해보세요.</p></div></div><div className="miniGrid">{visibleDestinations.slice(0,6).map(d=><article className="miniCard" key={d.id}><img src={d.image}/><div><small>{d.country} · {d.region}</small><h3>{d.name}</h3><button onClick={()=>toggleSave(d.id)} className="miniHeart"><Heart size={16} fill={saved.includes(d.id)?"currentColor":"none"}/></button></div></article>)}</div></section>
    <section className="content prompt"><div className="promptBox"><div><span>✨</span><strong>“어디가 좋을지 모르겠어요.”</strong><p>그럴 땐 여행지부터 고르지 않아도 돼요.<br/>내 상황부터 알려주면 우리가 찾아볼게요.</p></div><button className="primary" onClick={onStart}>추천 받기 <ArrowRight size={17}/></button></div></section>
  </main></>;
}

function Wizard({filters,setFilters,toggleStyle,onBack,onNext}) {
  const [localStep,setLocalStep]=useState(0);
  const canNext = localStep===0 ? !!filters.companion : localStep===1 ? !!filters.month && !!filters.days : filters.budget>0 && filters.styles.length>0;
  const next=()=>localStep<2?setLocalStep(x=>x+1):onNext();
  return <><Header onHome={onBack}/><main className="wizardPage"><div className="wizardTop"><button className="backBtn" onClick={localStep===0?onBack:()=>setLocalStep(x=>x-1)}><ChevronLeft size={18}/> 이전</button><div className="progress"><span className="active"></span><span className={localStep>0?"active":""}></span><span className={localStep>1?"active":""}></span></div><span>{localStep+1} / 3</span></div>
    <div className="wizardCard"><div className="wizardCopy">{localStep===0 && <><span className="eyebrow">STEP 1</span><h1>누구와 떠나나요?</h1><p>동행자에 따라 추천하는 여행지가 달라져요.</p></>}{localStep===1 && <><span className="eyebrow">STEP 2</span><h1>언제, 며칠 떠날까요?</h1><p>정확한 날짜가 아니어도 괜찮아요. 여행하기 좋은 시기도 함께 볼게요.</p></>}{localStep===2 && <><span className="eyebrow">STEP 3</span><h1>얼마를 쓰고, 뭘 하고 싶나요?</h1><p>1인 기준 예산을 입력하고 원하는 여행 스타일을 여러 개 골라주세요.</p></>}</div>
    {localStep===0 && <div className="choiceGrid companionChoices">{companions.map(c=><button key={c.id} className={`choice ${filters.companion===c.id?"selected":""}`} onClick={()=>setFilters({...filters,companion:c.id})}><span>{c.icon}</span><strong>{c.label}</strong><small>{c.desc}</small></button>)}</div>}
    {localStep===1 && <div className="datePanel"><label>여행 월</label><div className="monthGrid">{months.map((m,i)=><button key={m} className={`month ${filters.month===String(i+1)?"selected":""}`} onClick={()=>setFilters({...filters,month:String(i+1)})}>{m}</button>)}</div><label className="subLabel">여행 기간</label><div className="daysGrid">{[2,3,4,5,6,7].map(d=><button key={d} className={`day ${filters.days===String(d)?"selected":""}`} onClick={()=>setFilters({...filters,days:String(d)})}>{d}박 {d+1}일</button>)}</div><div className="hint"><CalendarDays size={16}/> 정확한 날짜를 알고 있다면 다음 버전에서 항공권 가격까지 비교할 수 있어요.</div></div>}
    {localStep===2 && <div className="budgetPanel"><div className="budgetInput"><Wallet size={20}/><input type="number" min="10" value={filters.budget} onChange={e=>setFilters({...filters,budget:Number(e.target.value)})}/><span>만원 / 1인</span></div><div className="budgetQuick">{[80,100,150,200,300].map(v=><button key={v} onClick={()=>setFilters({...filters,budget:v})} className={filters.budget===v?"active":""}>{v}만원</button>)}</div><label className="subLabel">이번 여행에서 하고 싶은 것 <b>복수 선택</b></label><div className="styleGrid">{styles.map(([id,label,icon])=><button key={id} onClick={()=>toggleStyle(id)} className={`styleChoice ${filters.styles.includes(id)?"selected":""}`}><span>{icon}</span>{label}</button>)}</div></div>}
    <div className="wizardActions"><button className="primary full" disabled={!canNext} onClick={next}>{localStep===2?"나에게 맞는 여행지 보기":"다음"}<ArrowRight size={18}/></button></div></div></main></>;
}

function Results({filters,results,saved,toggleSave,onBack,onReset}) {
  const [showDates,setShowDates]=useState(false);
  return <><Header savedCount={saved.length} onHome={onReset}/><main className="resultsPage"><div className="resultsHero"><button className="backBtn" onClick={onBack}><ChevronLeft size={18}/> 조건 다시 선택</button><div className="resultEyebrow"><Sparkles size={16}/> YOUR TRAVEL MATCH</div><h1>지금 조건이라면,<br/><span>이런 여행이 잘 맞아요.</span></h1><p>{companions.find(c=>c.id===filters.companion)?.label} · {filters.month?months[Number(filters.month)-1]:"여행 월 미정"} · {filters.days}박 · 1인 {filters.budget}만원 · {filters.styles.map(s=>styles.find(x=>x[0]===s)?.[1]).join(" · ")}</p></div>
    <section className="resultsContent"><div className="resultsToolbar"><div><strong>{results.length}곳</strong>을 찾았어요 <small>조건에 맞는 순서로 정렬했어요</small></div><button className="dateToggle" onClick={()=>setShowDates(!showDates)}><CalendarDays size={16}/>{showDates?"날짜 비교 닫기":"주변 날짜도 확인하기"}</button></div>
    {showDates && <div className="dateCompare"><div><b>선택한 날짜</b><span>5/10 — 5/13</span></div><div className="datePrice"><span>5/8</span><strong>₩310,000</strong></div><div className="datePrice best"><span>5/9</span><strong>₩268,000</strong><em>추천</em></div><div className="datePrice"><span>5/10</span><strong>₩295,000</strong></div><div className="datePrice"><span>5/11</span><strong>₩249,000</strong></div><p>※ 현재는 데모 가격입니다. 실제 항공권 가격 연동은 API/제휴 연동 후 제공됩니다.</p></div>}
    <div className="resultList">{results.map((d,i)=><article className="resultCard" key={d.id}><div className="resultImage"><img src={d.image}/><div className="rank">{i+1}</div><button className="heart big" onClick={()=>toggleSave(d.id)}><Heart size={19} fill={saved.includes(d.id)?"currentColor":"none"}/></button></div><div className="resultBody"><div className="resultTop"><div><small><MapPin size={13}/>{d.country} · {d.region}</small><h2>{d.name}</h2></div><div className="score"><b>{d.score}</b><span>match</span></div></div><p className="vibe">{d.vibe}</p><div className="tags">{d.matchedStyles.map(s=><span key={s}>{styles.find(x=>x[0]===s)?.[2]} {styles.find(x=>x[0]===s)?.[1]}</span>)}</div><div className="reasons">{d.reasons.map((r,j)=><div key={j}><Sparkles size={14}/>{r}</div>)}</div><div className="resultMeta"><span><Wallet size={14}/> 예상 1인 {d.baseBudget+d.flight}만원+</span><span><Plane size={14}/>{d.transit}</span></div><div className="resultActions"><a className="skyBtn" href={buildSkyLink(d,filters.month,filters.days)} target="_blank" rel="noreferrer"><Plane size={16}/> 항공권 확인</a><button className="detailBtn">여행지 자세히 보기 <ArrowRight size={15}/></button></div></div></article>)}</div></section></main></>;
}
