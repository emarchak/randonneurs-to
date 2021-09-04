import React from 'react'
import { Button } from 'src/components/Buttons'

type SubmitButtonProps = React.PropsWithChildren<{
  handleSubmit: (evt: any) => Promise<void>
  loading?: boolean
  disabled?: boolean
}>

export const SubmitButton = ({ handleSubmit, ...props }: SubmitButtonProps) => (
  <Button
    primary
    type='submit'
    handleClick={handleSubmit}
    {...props}
    />
)
