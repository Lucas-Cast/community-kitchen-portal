export default function PageContainer({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div class="flex flex-col items-center justify-start w-full h-screen">
      <div className="w-full max-w-screen-2xl px-6 py-4">{children}</div>
    </div>
  )
}
