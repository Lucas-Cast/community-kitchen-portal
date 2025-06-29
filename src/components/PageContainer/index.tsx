export default function PageContainer({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex justify-center flex-col items-center w-full h-full">
      <div className="w-full max-w-screen-2xl px-6 py-4">{children}</div>
    </div>
  )
}
