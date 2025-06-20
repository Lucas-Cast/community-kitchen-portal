export default function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center flex-col items-center w-full h-full min-h-screen sm:items-center sm:max-h-screen sm:pt-[10px] sm:m-0 sm:w-screen">
      {children}
    </div>
  )
}
