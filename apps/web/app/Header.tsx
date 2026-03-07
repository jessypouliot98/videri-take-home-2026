import Link from 'next/link';

const MENU = [
  {
    path: '/',
    label: 'Home',
  },
] satisfies { path: string; label: string }[]

export function Header() {
  return (
    <header className="p-2 border-b border-neutral-200">
      <nav className="max-w-7xl mx-auto">
        <menu>
          {MENU.map((item) => (
            <li key={item.path}>
              <Link href={item.path}>
                {item.label}
              </Link>
            </li>
          ))}
        </menu>
      </nav>
    </header>
  )
}