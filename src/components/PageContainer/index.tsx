export default function PageContainer({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex justify-center flex-col items-center w-full h-full">{children}</div>
}
