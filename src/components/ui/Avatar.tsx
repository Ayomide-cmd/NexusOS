import { getUser } from '@/data/users';

type Size = 'sm' | 'md' | 'lg';

const sizes: Record<Size, string> = {
  sm: 'w-5 h-5 text-[9px]',
  md: 'w-7 h-7 text-[10px]',
  lg: 'w-9 h-9 text-[13px]',
};

export function Avatar({ userId, size = 'md' }: { userId: string; size?: Size }) {
  const user = getUser(userId);
  if (!user) return null;
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white shrink-0`}
      style={{ background: user.color }}
      title={user.name}
    >
      {user.initials}
    </div>
  );
}
