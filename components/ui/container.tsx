// components/container.tsx
export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="px-10 max-w-7xl mx-auto">{children}</div>;
}
