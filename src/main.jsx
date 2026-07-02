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

const h = React.createElement;

function App() {
  return h(React.Fragment, null,
    h('header', { className: 'site-header' },
      h('a', { className: 'brand', href: '#hero' }, 'DCL.DESIGN'),
      h('nav', { 'aria-label': '主导航' }, navItems.map(([label, href]) => h('a', { key: href, href }, label))),
      h('a', { className: 'nav-cta', href: '#contact' }, '联系我')
    ),
    h('main', null,
      h('section', { id: 'hero', className: 'hero section-full' },
        h('div', { className: 'hero-video', 'aria-hidden': 'true' },
          h('div', { className: 'orb orb-a' }),
          h('div', { className: 'orb orb-b' }),
          h('div', { className: 'scanline' })
        ),
        h('div', { className: 'hero-content container-wide' },
          h('p', { className: 'eyebrow' }, 'VISUAL DESIGNER / AI DESIGNER / BRAND DESIGNER'),
          h('h1', null, '董春雷', h('br'), '视觉系统与 AI 商业图像设计'),
          h('p', { className: 'hero-desc' }, '以克制的暗色美学、清晰的品牌秩序和 AI 图像工作流，为品牌、产品与活动建立更高级的第一印象。'),
          h('div', { className: 'hero-actions' },
            h('a', { href: '#works', className: 'button primary' }, '查看精选项目'),
            h('a', { href: 'tel:15617539079', className: 'button ghost' }, '156-1753-9079')
          )
        ),
        h('div', { className: 'hero-index' }, 'PORTFOLIO 2026 · SHANGHAI')
      ),
      h('section', { id: 'profile', className: 'profile section-pad container-wide' },
        h('div', { className: 'section-label' }, '01 / PROFILE'),
        h('div', { className: 'portrait-card' },
          h('div', { className: 'portrait-glow' }),
          h('div', { className: 'portrait' }, h('span', null, '董', h('br'), '春雷'))
        ),
        h('div', { className: 'profile-copy' },
          h('h2', null, '拥有品牌、电商与 AI 视觉经验的复合型设计师。'),
          h('p', null, '毕业于河南财经政法大学视觉传达设计专业，曾服务于美妆、品牌、包装、活动视觉与酒店品牌设计项目。擅长从商业目标出发，搭建设计规范、主视觉系统和可持续复用的内容资产。'),
          h('div', { className: 'contact-strip' },
            h('span', null, 'Shanghai'),
            h('a', { href: 'tel:15617539079' }, '156-1753-9079（VX）'),
            h('a', { href: 'mailto:hello@dcl.design' }, 'hello@dcl.design')
          ),
          h('div', { className: 'stats-grid' }, stats.map(([value, label]) => h('div', { className: 'stat', key: label }, h('strong', null, value), h('span', null, label))))
        )
      ),
      h('section', { id: 'works', className: 'works section-pad container-wide' },
        h('div', { className: 'section-heading' },
          h('span', { className: 'section-label' }, '02 / SELECTED WORKS'),
          h('h2', null, '用大画面承载项目气质，让作品先被感知，再被阅读。')
        ),
        h('div', { className: 'project-grid' }, projects.map((project) => h('article', { className: 'project-card', key: project.title },
          h('div', { className: `project-image ${project.className}` }),
          h('div', { className: 'project-info' },
            h('span', null, project.tag),
            h('span', null, project.year),
            h('h3', null, project.title),
            h('p', null, project.copy)
          )
        )))
      ),
      h('section', { id: 'strengths', className: 'strengths section-pad container-wide' },
        h('div', { className: 'section-heading narrow' },
          h('span', { className: 'section-label' }, '03 / STRENGTHS'),
          h('h2', null, '能力不是罗列工具，而是把审美判断变成稳定输出。')
        ),
        h('div', { className: 'strength-grid' }, strengths.map(([title, copy], index) => h('article', { className: 'strength-card', key: title },
          h('span', null, String(index + 1).padStart(2, '0')),
          h('h3', null, title),
          h('p', null, copy)
        )))
      ),
      h('section', { id: 'contact', className: 'contact section-full' },
        h('div', { className: 'container-wide contact-inner' },
          h('p', { className: 'eyebrow' }, 'AVAILABLE FOR BRAND / AI IMAGE / CAMPAIGN DESIGN'),
          h('h2', null, '让我们一起建立一个更有价值感的视觉系统。'),
          h('div', { className: 'contact-bottom' },
            h('a', { href: 'tel:15617539079' }, '156-1753-9079'),
            h('a', { href: 'mailto:hello@dcl.design' }, 'hello@dcl.design'),
            h('span', null, 'WeChat 同手机号')
          )
        )
      )
    )
  );
}

createRoot(document.getElementById('root')).render(h(App));
