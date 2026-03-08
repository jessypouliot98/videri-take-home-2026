'use client'
import Link from 'next/link';
import { usePathname } from 'next/dist/client/components/navigation';
import clsx from 'clsx';

const MENU = [
  {
    path: '/',
    label: 'Home',
    checkedRegex: /^\/$/,
  },
  {
    path: '/alerts',
    label: 'Alerts',
    checkedRegex: /^\/alerts/,
  },
] satisfies {
  path: string;
  label: string;
  // There are better ways to do this, but this is the simplest for now.
  checkedRegex: RegExp;
}[]

export function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b border-neutral-200">
      <nav className="max-w-7xl px-4 2xl:px-0 mx-auto">
        <menu role="menu" className="flex gap-4">
          {MENU.map((item) => (
            <li
              key={item.path}
              role="menuitemradio"
              className="group"
              aria-checked={item.checkedRegex.test(pathname)}
            >
              <Link
                className={clsx(
                  "block font-semibold border-b-2 border-transparent px-4 py-2",
                  "bg-white hover:border-blue-100",
                  "group-aria-checked:border-blue-500!",
                )}
                role="menuitem"
                href={item.path}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </menu>
      </nav>
    </header>
  )
}