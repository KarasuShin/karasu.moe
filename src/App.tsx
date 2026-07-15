import { Mail, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import { SiGithub, SiX } from 'react-icons/si'

type Theme = 'light' | 'dark'

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('karasu-theme')

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return 'dark'
}

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
          <span className="brand__name">鸦巢</span>
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
            <div className="hero-visual hero-visual--mobile">
              <img
                src="/assets/raven.png"
                alt="黑白墨线风格的乌鸦侧影"
                width={1254}
                height={1254}
              />
            </div>
            <p className="hero__slogan">TECH OTAKUS SAVE THE WORLD</p>
            <h1>
              你好，我是 <span className="hero__name">Karasu</span>。
            </h1>
            <p className="hero__intro">
              一个兴趣使然的开发者，喜欢折腾一些能让生活更轻松的小工具。这里放着我正在研究的东西，还有偶尔闪过的念头。
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
                href="https://telegram.me/karasushin"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                title="Telegram"
              >
                <FaTelegramPlane aria-hidden="true" />
              </a>
            </nav>
          </div>

          <div className="hero-visual hero-visual--desktop" data-reveal>
            <img src="/assets/raven.png" alt="黑白墨线风格的乌鸦侧影" width={1254} height={1254} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
