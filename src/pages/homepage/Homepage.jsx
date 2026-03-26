import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

const weekEntries = [
  {
    week: "Week 1",
    title: "從函式拆解認識設計模式",
    path: "/week1",
    accent: "資料渲染",
    summary:
      "從靜態商品資料切入，練習元件狀態切換與條件渲染，建立產品列表與單一商品細節的互動。",
    highlights: ["useState", "map 渲染", "條件顯示"],
  },
  {
    week: "Week 2",
    title: "RESTful API 串接",
    path: "/week2",
    accent: "API",
    summary:
      "加入登入流程、Token 儲存與 API 取資料，完成遠端產品列表與細節檢視的基礎串接。",
    highlights: ["axios", "useEffect", "Token 驗證"],
  },
  {
    week: "Week 3",
    title: "串接產品 API 管理",
    path: "/week3",
    accent: "CRUD + Modal",
    summary:
      "搭配 Bootstrap Modal，實作新增、編輯與刪除商品，並處理表單欄位與多圖資料更新。",
    highlights: ["useRef", "Bootstrap Modal", "CRUD"],
  },
  {
    week: "Week 4",
    title: "元件拆分與分頁",
    path: "/week4",
    accent: "元件化",
    summary: "把產品 Modal 及分頁抽成共用元件，建立較完整的頁面切分。",
    highlights: ["元件拆分", "狀態管理"],
  },
  {
    week: "Week 5",
    title: "前台路由與購物流程",
    path: "/week5",
    accent: "糖嶼前台",
    summary:
      "建立品牌首頁（糖嶼）與前台路由，串起商品列表、商品頁與購物車，形成完整的電商瀏覽體驗。",
    highlights: ["React Router", "前台導覽", "購物車"],
  },
  {
    week: "Week 6",
    title: "表單驗證與前後台整合",
    path: "/week6",
    accent: "前後台串接",
    summary:
      "外部套件(react-loader-spinner)優化loading畫面、新增管理員登入管理、表單驗證與訂單流程。",
    highlights: ["react-hook-form", "訂單流程", "管理介面"],
  },
  {
    week: "Week 7",
    title: "Redux 訊息狀態整合",
    path: "/week7",
    accent: "全域狀態",
    summary:
      "導入 Redux Toolkit 管理全域訊息提示，將操作回饋集中處理，並保留購物車 context 進行跨頁資料共享。",
    highlights: ["Redux Toolkit", "Slice", "全域訊息管理"],
  },
];

function Homepage() {
  return (
    <main className={styles.homepage}>
      <section className={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1514477917009-389c76a86b68?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreXxlbnwwfHwwfHx8MA%3D%3D"
          alt="首頁首圖"
          className={styles.heroImage}
        />
        <div className={styles.heroBackdrop} />
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.eyebrow}>六角2025 React Weekly Homework</span>
          <h1 className={styles.heroTitle}>React 每週任務作品集</h1>
          <p className={styles.heroText}>
            從基礎狀態管理、API串接，到前台電商與 Redux 整合。
          </p>
        </div>
      </section>

      <section className={`container ${styles.cardSection}`}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionLabel}>Weekly Entries</p>
            <h2 className={styles.sectionTitle}>各週作業入口</h2>
          </div>
        </div>

        <div className={styles.grid}>
          {weekEntries.map((entry) => (
            <article key={entry.week} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.weekBadge}>{entry.week}</span>
                <span className={styles.accentBadge}>{entry.accent}</span>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{entry.title}</h3>
                <p className={styles.cardSummary}>{entry.summary}</p>

                <div className={styles.highlightBlock}>
                  <p className={styles.highlightTitle}>程式碼重點</p>
                  <ul className={styles.highlightList}>
                    {entry.highlights.map((highlight) => (
                      <li key={highlight} className={styles.highlightItem}>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link to={entry.path} className={styles.cardLink}>
                進入 {entry.week}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Homepage;
