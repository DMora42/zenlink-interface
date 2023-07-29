import type { ButtonProps } from '@grass-protocol/ui'
import type { ReactNode } from 'react'

export interface CheckerButton extends ButtonProps<'button'> {
  children: ReactNode
}
