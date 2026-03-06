import { LucideProps, icons, CircleHelp } from 'lucide-react'

interface Props extends LucideProps {
  name?: string
}

const Icon = ({ name, ...props }: Props) => {
  const LucideIcon = name && icons[name as keyof typeof icons] || CircleHelp

  return <LucideIcon {...props} />
}

export default Icon
