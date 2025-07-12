export default function PageContainer({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col items-center justify-start w-full min-dvh-screen">
      <div className="w-full max-w-screen-2xl px-6 py-4">{children}</div>
    </div>
  )
}
