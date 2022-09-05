// https://docs.sendgrid.com/api-reference/custom-fields/get-all-field-definitions
export type CustomFieldName = 'chapter' | 'gender' | 'last_schedid' | 'start_time'
export type CustomFieldType = {
  id: string
  name: CustomFieldName
  field_type: 'Text' | 'Number' | 'Date'
}

const customFields: CustomFieldType[] = [
  { id: 'e1_T', name: 'chapter', field_type: 'Text' },
  { id: 'e3_N', name: 'last_schedid', field_type: 'Number' },
  { id: 'e4_T', name: 'start_time', field_type: 'Text' }
]

const reservedFields = [
  { id: '_rf0_T', name: 'first_name', field_type: 'Text' },
  { id: '_rf1_T', name: 'last_name', field_type: 'Text' },
  { id: '_rf2_T', name: 'email', field_type: 'Text' },
  { id: '_rf3_T', name: 'alternate_emails', field_type: 'Text' },
  { id: '_rf4_T', name: 'address_line_1', field_type: 'Text' },
  { id: '_rf5_T', name: 'address_line_2', field_type: 'Text' },
  { id: '_rf6_T', name: 'city', field_type: 'Text' },
  { id: '_rf7_T', name: 'state_province_region', field_type: 'Text' },
  { id: '_rf8_T', name: 'postal_code', field_type: 'Text' },
  { id: '_rf9_T', name: 'country', field_type: 'Text' },
  { id: '_rf10_T', name: 'phone_number', field_type: 'Text' },
  { id: '_rf11_T', name: 'whatsapp', field_type: 'Text' },
  { id: '_rf12_T', name: 'line', field_type: 'Text' },
  { id: '_rf13_T', name: 'facebook', field_type: 'Text' },
  { id: '_rf14_T', name: 'unique_name', field_type: 'Text' },
  { id: '_rf15_T', name: 'email_domains', field_type: 'Text', read_only: true },
  { id: '_rf16_D', name: 'last_clicked', field_type: 'Date', read_only: true },
  { id: '_rf17_D', name: 'last_opened', field_type: 'Date', read_only: true },
  { id: '_rf18_D', name: 'last_emailed', field_type: 'Date', read_only: true },
  { id: '_rf19_T', name: 'singlesend_id', field_type: 'Text', read_only: true },
  { id: '_rf20_T', name: 'automation_id', field_type: 'Text', read_only: true },
  { id: '_rf21_D', name: 'created_at', field_type: 'Date', read_only: true },
  { id: '_rf22_D', name: 'updated_at', field_type: 'Date', read_only: true },
  { id: '_rf23_T', name: 'contact_id', field_type: 'Text', read_only: true }
]

export default customFields
