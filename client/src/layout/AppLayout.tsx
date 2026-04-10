import { NavLink, Outlet } from 'react-router-dom';
import { Avatar } from '../components/ui/Avatar';
import { cn } from '../lib/utils';

const navClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative pb-1 text-sm font-medium transition-colors',
    isActive ? 'text-brand-text' : 'text-brand-text-subtle hover:text-brand-text',
    isActive &&
      'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-brand-nav-active',
  );

export const AppLayout = () => (
  <div className="flex min-h-svh flex-col bg-brand-bg">
    <header className="border-b border-brand-border bg-brand-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <NavLink to="/" className="text-lg font-semibold text-brand-primary-muted">
          DevLink
        </NavLink>
        <nav className="flex flex-1 items-center justify-center gap-10">
          <NavLink to="/" className={navClass} end>
            Experts
          </NavLink>
          <NavLink to="/bookings" className={navClass}>
            My Bookings
          </NavLink>
        </nav>
        <Avatar src="https://dicebear.com/api/bottts/random.svg" alt="Your profile" size="sm" />
      </div>
    </header>
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-10 sm:px-6">
      <Outlet />
    </main>
  </div>
);
