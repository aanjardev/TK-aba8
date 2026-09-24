import type { ReactNode } from 'react'

function inline(text: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g
  return text.split(pattern).filter(Boolean).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const safe = /^(https?:\/\/|mailto:|\/)/i.test(link[2])
      return safe ? <a key={index} href={link[2]} rel="noreferrer" target={link[2].startsWith('/') ? undefined : '_blank'}>{link[1]}</a> : link[1]
    }
    return part
  })
}

export default function MarkdownContent({ content }: { content: string }) {
  const lines = content.replace(/\r/g, '').split('\n')
  const nodes: ReactNode[] = []
  let list: string[] = []
  const flushList = () => {
    if (!list.length) return
    nodes.push(<ul key={`list-${nodes.length}`}>{list.map((item, i) => <li key={i}>{inline(item)}</li>)}</ul>)
    list = []
  }
  lines.forEach((raw, index) => {
    const line = raw.trim()
    if (line.startsWith('- ')) { list.push(line.slice(2)); return }
    flushList()
    if (!line) return
    if (line.startsWith('### ')) nodes.push(<h3 key={index}>{inline(line.slice(4))}</h3>)
    else if (line.startsWith('## ')) nodes.push(<h2 key={index}>{inline(line.slice(3))}</h2>)
    else if (line.startsWith('# ')) nodes.push(<h2 key={index}>{inline(line.slice(2))}</h2>)
    else if (line.startsWith('> ')) nodes.push(<blockquote key={index}>{inline(line.slice(2))}</blockquote>)
    else nodes.push(<p key={index}>{inline(line)}</p>)
  })
  flushList()
  return <div className="news-content">{nodes}</div>
}
