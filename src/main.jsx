import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const navItems = [
  ['首页', '#hero'],
  ['经历', '#profile'],
  ['项目', '#works'],
  ['优势', '#strengths'],
  ['联系', '#contact'],
];

const stats = [
  ['6+', '年品牌视觉设计经验'],
  ['10+', '主导视觉与品牌项目'],
  ['90%', '视觉统一与效率提升目标'],
  ['∞', 'AI 工作流持续迭代'],
];

const projects = [
  {
    title: '优时颜医美直播板块设计',
    tag: 'Visual System / Campaign',
    year: '2023 — Now',
    copy: '直播间视觉、主图体系与活动页面，以统一模板和高转化节奏提升品牌内容效率。',
    className: 'project-one',
  },
  {
    title: '优时颜五周年庆典视觉',
    tag: 'Brand Campaign',
    year: '2025',
    copy: '围绕“喜悦、喜说、喜逢”构建年度庆典视觉资产，覆盖 KV、海报、门店与社媒触点。',
    className: 'project-two',
  },
  {
    title: 'WINK HOTEL 品牌设计',
    tag: 'Brand Identity',
    year: '2024',
    copy: '为轻奢酒店打造品牌调性、视觉识别、字体材质与空间延展应用。',
    className: 'project-three',
  },
  {
    title: '杨先生糕点 LOGO 设计',
    tag: 'Logo / Typography',
    year: '2023',
    copy: '从手写字体、传统元素与品牌气质出发，完成中式糕点品牌标识升级。',
    className: 'project-four',
  },
];

const strengths = [
  ['品牌视觉系统', '从品牌定位、视觉调性到主视觉延展，建立可复制、可落地的设计秩序。'],
  ['AI 商业图像', '结合 AI 生图、修图与人工审美判断，快速探索产品大片与场景视觉。'],
  ['电商与活动设计', '熟悉美妆、消费品、电商运营节奏，能把视觉表现转化为商业触点。'],
  ['字体与版式控制', '关注标题字、留白、层级与视觉重心，让画面保持克制但有记忆点。'],
];

function App() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#hero">DCL.DESIGN</a>
        <nav aria-label="主导航">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="nav-cta" href="#contact">联系我</a>
      </header>

      <main>
        <section id="hero" className="hero section-full">
          <div className="hero-video" aria-hidden="true">
            <div className="orb orb-a" />
            <div className="orb orb-b" />
            <div className="scanline" />
          </div>
          <div className="hero-content container-wide">
            <p className="eyebrow">VISUAL DESIGNER / AI DESIGNER / BRAND DESIGNER</p>
            <h1>董春雷<br />视觉系统与 AI 商业图像设计</h1>
            <p className="hero-desc">以克制的暗色美学、清晰的品牌秩序和 AI 图像工作流，为品牌、产品与活动建立更高级的第一印象。</p>
            <div className="hero-actions">
              <a href="#works" className="button primary">查看精选项目</a>
              <a href="tel:15617539079" className="button ghost">156-1753-9079</a>
            </div>
          </div>
          <div className="hero-index">PORTFOLIO 2026 · SHANGHAI</div>
        </section>

        <section id="profile" className="profile section-pad container-wide">
          <div className="section-label">01 / PROFILE</div>
          <div className="portrait-card">
            <div className="portrait-glow" />
            <div className="portrait">
              <span>董<br />春雷</span>
            </div>
          </div>
          <div className="profile-copy">
            <h2>拥有品牌、电商与 AI 视觉经验的复合型设计师。</h2>
            <p>毕业于河南财经政法大学视觉传达设计专业，曾服务于美妆、品牌、包装、活动视觉与酒店品牌设计项目。擅长从商业目标出发，搭建设计规范、主视觉系统和可持续复用的内容资产。</p>
            <div className="contact-strip">
              <span>Shanghai</span>
              <a href="tel:15617539079">156-1753-9079（VX）</a>
              <a href="mailto:hello@dcl.design">hello@dcl.design</a>
            </div>
            <div className="stats-grid">
              {stats.map(([value, label]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}
            </div>
          </div>
        </section>

        <section id="works" className="works section-pad container-wide">
          <div className="section-heading">
            <span className="section-label">02 / SELECTED WORKS</span>
            <h2>用大画面承载项目气质，让作品先被感知，再被阅读。</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className={`project-image ${project.className}`} />
                <div className="project-info">
                  <span>{project.tag}</span>
                  <span>{project.year}</span>
                  <h3>{project.title}</h3>
                  <p>{project.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="strengths" className="strengths section-pad container-wide">
          <div className="section-heading narrow">
            <span className="section-label">03 / STRENGTHS</span>
            <h2>能力不是罗列工具，而是把审美判断变成稳定输出。</h2>
          </div>
          <div className="strength-grid">
            {strengths.map(([title, copy], index) => (
              <article className="strength-card" key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact section-full">
          <div className="container-wide contact-inner">
            <p className="eyebrow">AVAILABLE FOR BRAND / AI IMAGE / CAMPAIGN DESIGN</p>
            <h2>让我们一起建立一个更有价值感的视觉系统。</h2>
            <div className="contact-bottom">
              <a href="tel:15617539079">156-1753-9079</a>
              <a href="mailto:hello@dcl.design">hello@dcl.design</a>
              <span>WeChat 同手机号</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
