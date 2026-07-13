import { Mail, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SiGithub, SiTelegram, SiX } from 'react-icons/si'

type Theme = 'light' | 'dark'

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('karasu-theme')

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return 'dark'
}

const Mark = () => (
  <span className="mark" aria-hidden="true">
    <svg viewBox="0 0 48 48" role="img">
      <path d="M7 7h8v14.3L31.8 7H43L24.5 22.6 44 41H32.2L15 24.7V41H7V7Z" />
      <path className="mark__cut" d="m31 10 10 4-8 3-2-7Z" />
    </svg>
  </span>
)

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('karasu-theme', theme)

    const metaTheme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    metaTheme?.setAttribute('content', theme === 'dark' ? '#121312' : '#f0ede4')
  }, [theme])

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((target) => target.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  const nextTheme = theme === 'light' ? 'dark' : 'light'

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        跳到正文
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="鸦巢首页">
          <Mark />
          <span className="brand__name">鸦巢</span>
          <span className="brand__domain">KARASU.MOE</span>
        </a>

        <div className="header-actions">
          <button
            className="icon-button"
            type="button"
            onClick={() => setTheme(nextTheme)}
            aria-label={`切换到${nextTheme === 'dark' ? '深色' : '浅色'}模式`}
            title={`切换到${nextTheme === 'dark' ? '深色' : '浅色'}模式`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero__copy" data-reveal>
            <h1>
              TECH OTAKUS
              <span>SAVE THE WORLD</span>
            </h1>
            <p className="hero__intro">
              你好，我是
              Karasu，一个兴趣使然的开发者。写代码，也折腾漫画、终端与信息流工具。这里放着我正在研究的东西，以及偶尔闪过的念头。
            </p>
            <nav className="hero__socials" aria-label="联系方式">
              <a href="mailto:karasu.shing@gmail.com" aria-label="发送邮件" title="Email">
                <Mail aria-hidden="true" />
              </a>
              <a
                href="https://github.com/KarasuShin"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <SiGithub aria-hidden="true" />
              </a>
              <a
                href="https://x.com/karasu_shin"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                title="X"
              >
                <SiX aria-hidden="true" />
              </a>
              <a
                href="https://t.me/karasushin"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                title="Telegram"
              >
                <SiTelegram aria-hidden="true" />
              </a>
            </nav>
          </div>

          <div className="hero-visual" data-reveal>
            <img src="/assets/raven.png" alt="黑白墨线风格的乌鸦侧影" />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
