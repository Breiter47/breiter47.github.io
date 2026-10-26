import { assetUrl } from "@/content/asset-url";
import Link from "next/link";
import { profile, research, publications, projects } from "@/content/profile";
import { EmptyState, SectionTitle } from "@/components/ui";
import EngineeringScene from "@/components/engineering-scene";

export default function Home() {
  return <>
    <section className="hero">
      <EngineeringScene />
      <div className="hero-copy">
        <p className="eyebrow"><span className="signal-dot" aria-hidden="true" />Yanshan University / Mechatronic Engineering</p>
        <h1>{profile.name}<span>{profile.englishName}</span></h1>
        <p className="hero-role">{profile.role}<span>燕山大学 · 机械工程学院</span></p>
        <p className="hero-description">{profile.bio}</p>
        <div className="research-tags" aria-label="研究关键词"><span>无人机</span><span>视觉巡检</span><span>桥梁工程</span></div>
        <div className="actions">
          <Link className="button primary" href="/cv">查看个人简历 <span aria-hidden="true">↗</span></Link>
          <Link className="button" href="/research">了解我的研究 <span aria-hidden="true">→</span></Link>
        </div>
        <div className="contact-list"><a className="text-link" href={`mailto:${profile.email}`}>{profile.email} ↗</a></div>
      </div>
      <aside className="profile-panel">
        <p className="eyebrow">ACADEMIC RECORD <span aria-hidden="true">✦</span></p>
        <div className="portrait-orbit"><img className="portrait" src={assetUrl("/portrait.jpg")} alt="周广越个人照片" width={2535} height={3380} /></div>
        <div className="panel-details">
          <div><span>INSTITUTION / 院校</span><strong>燕山大学</strong></div>
          <div><span>DISCIPLINE / 学科</span><strong>机械电子工程</strong></div>
        </div>
        <div className="panel-bottom">MECHANICAL ENGINEERING <span>01</span></div>
      </aside>
      <a className="scroll-cue" href="#research"><span aria-hidden="true">↓</span> EXPLORE THE RESEARCH</a>
    </section>
    <section id="research" className="home-section">
      <SectionTitle english="01 / Research" title="研究方向" href="/research" />
      <div className="research-grid">{research.map((item, i) => <article className="research-item" key={item.title}>
        <span className="item-number">0{i + 1}</span><p className="small-label">{item.label}</p><h3>{item.title}</h3><p>{item.description}</p>
      </article>)}</div>
    </section>
    <div className="two-column home-section">
      <section>
        <SectionTitle english="02 / Publications" title="科研成果" href="/publications" />
        {publications.length ? publications.slice(0, 3).map(item => <article className="record" key={item.title}>
          <small>{item.kind}{item.year ? ` · ${item.year}` : ""}</small><h3>{item.title}</h3><p>{item.venue}</p>
          {item.url && <a href={assetUrl(item.url)}>查看 DOI ↗</a>}
        </article>) : <EmptyState title="成果列表待补充" description="将在这里展示已公开的论文、专利及其他科研成果。" />}
      </section>
      <section>
        <SectionTitle english="03 / Projects" title="项目实践" href="/projects" />
        {projects.length ? projects.slice(0, 3).map(item => <article className="record" key={item.title}>
          <h3>{item.title}</h3><p>{item.summary}</p>
        </article>) : <EmptyState title="项目记录待补充" description="将在这里介绍项目背景、个人贡献、系统方案与成果。" />}
      </section>
    </div>
    <section className="document-banner">
      <div><p className="eyebrow">04 / Documents</p><h2>公开资料，集中整理。</h2><p>个人简历、学术报告与可分享的研究文档。</p></div>
      <Link className="button" href="/documents">浏览文档 <span aria-hidden="true">↗</span></Link>
    </section>
  </>;
}
