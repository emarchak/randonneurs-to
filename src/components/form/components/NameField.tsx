import React, { ChangeEvent, useEffect, useState } from 'react'
import { InputField } from 'src/components/form/components'
import { Link } from 'src/components/Link'
import { useRider } from 'src/data/riders'
import { MembershipType } from 'src/graphql.gql'

const NameHelp = ({isMissingMembership}: {isMissingMembership: boolean}) => (
  isMissingMembership
      ? <>
          <strong>We can't find your name in our list of members. It must match what you used to register with the OCA.</strong><br />
          You must be an <Link href="http://randonneursontario.ca/who/how.html">active member of Randonneurs Ontario and the OCA</Link> to ride with us. You can still submit this form, but you can't ride until we can confirm you're a member.
      </>
      : <>Must match what you used to register with the OCA</>
)

type NameFieldProps = {
  label: string
  value?: string
  onChange: (name: string, membership: MembershipType | 'missing') => void
}

export const NameField = ({ label, value = '', onChange }: NameFieldProps) => {
  const [fieldValue, setFieldValue] = useState<string>(value)
  const [nameValue, setNameValue] = useState<string | null>(null)
  const { data , isLoading } = useRider({ riderName: nameValue })

  const isMissingMembership = isLoading || !nameValue ? false : !!!data?.type

  useEffect(() => {
    isLoading ? null : onChange(nameValue, data?.type || 'missing')
  }, [nameValue, isLoading])

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
      const { value = '' } = evt.currentTarget
      setFieldValue(value)
  }

  const handleNameBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value = '' } = evt.currentTarget
    setNameValue(value)
  }

  return <InputField
    label={label}
    name='name'
    value={fieldValue}
    onChange={handleInputChange}
    onBlur={handleNameBlur}
    help={<NameHelp isMissingMembership={isMissingMembership} />}
  />
}
