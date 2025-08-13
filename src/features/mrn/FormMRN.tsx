// features/mrn/FormMRN.tsx
import { FormEvent, useState } from 'react'
import Input from '../../ui/Input'
import Label from '../../ui/Label'
import { MRNType } from '../../interfaces'
// import { useLogout } from '../authenticaton/useLogout'
// import { BiLogOut } from 'react-icons/bi'
import SpinnerMini from '../../ui/SpinnerMini'
import { religions, states } from '../station/data/stationData'
import { useCreateFile } from './useCreateFile'
import Select from '../../ui/Select'
import { FileUpload } from '../../ui/FileUpload'
import { useLockRoute } from './useLockRoute'

const defaultForm: Partial<MRNType> = {
  firstName: '',
  middleName: '',
  lastName: '',
  familyName: '',
  stateOfOrigin: '',
  dateOfBirth: '', // YYYY-MM-DD
  religion: '',
  nationality: '',
  ethnicGroup: '',
  address: '',
  residentialAddress: '',
  phone: '',
  bvn: '',
  nin: '',
  politicalParty: '',
  relativePhone: '',
  assistanceOfficerRN: '',
}

const FormMRN = () => {
  const [formData, setFormData] = useState<Partial<MRNType>>({ ...defaultForm })
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [fileError, setFileError] = useState('')
  const [fileResetKey, setFileResetKey] = useState(0)

  const [showResult, setShowResult] = useState(false)
  const [resultMRN, setResultMRN] = useState<string>('')
  const [resultFileNumber, setResultFileNumber] = useState<string>('')

  const { create, isPending } = useCreateFile()
  // const { logout, isPending: isLoggingOut } = useLogout()

  // Lock the page while the form is shown
  useLockRoute(true)

  const handleInputChange = (
    field: keyof MRNType,
    value: string | string[] | number
  ) => {
    if (field === 'politicalParty' && typeof value === 'string') {
      value = value.toUpperCase()
    }
    setFormData((prev) => ({ ...prev, [field]: value as any }))

    if (errors[field]) {
      setErrors((prev) => {
        const { [field]: _, ...rest } = prev
        return rest
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.middleName) newErrors.middleName = 'Middle name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.stateOfOrigin)
      newErrors.stateOfOrigin = 'State of origin is required'

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required'
    } else {
      const d = new Date(formData.dateOfBirth as string)
      const validDate = d instanceof Date && !isNaN(d.getTime())
      if (!validDate) newErrors.dateOfBirth = 'Invalid date'
      else {
        const today = new Date()
        if (d > today) newErrors.dateOfBirth = 'Date cannot be in the future'
        const age = (Date.now() - d.getTime()) / (365.25 * 24 * 3600 * 1000)
        if (age >= 130) newErrors.dateOfBirth = 'Date of birth is out of range'
      }
    }

    if (!formData.nationality) newErrors.nationality = 'Nationality is required'
    if (!formData.religion) newErrors.religion = 'Religion is required'
    if (!formData.ethnicGroup)
      newErrors.ethnicGroup = 'Ethnic group is required'

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{11}$/.test(String(formData.phone))) {
      newErrors.phone = 'Phone number must be 11 digits'
    }

    if (formData.bvn && !/^\d{11}$/.test(String(formData.bvn))) {
      newErrors.bvn = 'BVN must be 11 digits'
    }
    if (formData.nin && !/^\d{11}$/.test(String(formData.nin))) {
      newErrors.nin = 'NIN must be 11 digits'
    }
    if (
      formData.relativePhone &&
      !/^\d{7,15}$/.test(String(formData.relativePhone))
    ) {
      newErrors.relativePhone = 'Relative number must be 7–15 digits'
    }

    setErrors(newErrors)

    if (selectedFiles.length < 1) {
      setFileError('At least one file is required')
      return false
    } else {
      setFileError('')
    }

    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setFormData({ ...defaultForm })
    setSelectedFiles([])
    setErrors({})
    setFileError('')
    setFileResetKey((k) => k + 1)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    create(
      { data: formData, files: selectedFiles },
      {
        onSuccess: (resp: any) => {
          // handleResponse format usually { status, message, data }
          const payload = resp?.data ?? resp?.payload ?? resp ?? {}

          setResultMRN(payload.mrn || '')
          setResultFileNumber(payload.fileNumber || '')

          setShowResult(true)
          resetForm()
        },
      }
    )
  }

  // const handleLogout = async () => {
  //   logout()
  // }

  return (
    <>
      <div
        className='flex flex-col h-screen text-white bg-blue-500 overflow-y-scroll md:px-4 pt-8 pb-16'
        style={{ fontFamily: 'Roboto', letterSpacing: '0.8px' }}
      >
        {/* <div className='ml-2 md:ml-0'>
          {isLoggingOut ? (
            <SpinnerMini />
          ) : (
            <button
              className='flex items-center justify-center gap-2 mt-auto mb-0 text-gray-800 bg-gray-50 p-2 rounded hover:bg-gray-800 hover:text-gray-50 transition-colors duration-200'
              onClick={handleLogout}
              type='button'
            >
              <BiLogOut />
              Log out
            </button>
          )}
        </div> */}

        <div className='py-10 flex flex-col items-center justify-center'>
          <div className='mb-4 flex flex-col items-center gap-2'>
            <h1 className='text-sm md:text-lg font-extrabold'>
              ISLAMIC GUIDANCE ACADAMY STATION
            </h1>
            <p>File Generator</p>
          </div>

          <div className='w-full md:w-[400px] flex items-center justify-center gap-2'>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col w-full gap-2'
            >
              <div className='flex flex-col w-full gap-4 sm:gap-6 md:gap-8 lg:gap-10 bg-white bg-opacity-90 p-6 rounded-md shadow-xl backdrop-blur-lg mx-4 md:mx-0'>
                <div className='flex flex-col w-full gap-4'>
                  <div>
                    <Label htmlFor='firstName'>First Name</Label>
                    <Input
                      id='firstName'
                      type='text'
                      className='w-full px-2 rounded-lg py-2 text-gray-700'
                      placeholder='Enter your first name'
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange('firstName', e.target.value)
                      }
                      required
                    />
                    {errors.firstName && (
                      <p className='text-red-500 text-sm'>{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='middleName'>Middle Name</Label>
                    <Input
                      id='middleName'
                      type='text'
                      placeholder='Enter your middle name'
                      className='w-full px-2 rounded-lg py-2 text-gray-700'
                      value={formData.middleName}
                      onChange={(e) =>
                        handleInputChange('middleName', e.target.value)
                      }
                      required
                    />
                    {errors.middleName && (
                      <p className='text-red-500 text-sm'>
                        {errors.middleName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='lastName'>Last Name</Label>
                    <Input
                      id='lastName'
                      type='text'
                      placeholder='Enter your last name'
                      className='w-full px-2 rounded-lg py-2 text-gray-700'
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange('lastName', e.target.value)
                      }
                      required
                    />
                    {errors.lastName && (
                      <p className='text-red-500 text-sm'>{errors.lastName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='familyName'>Family Name</Label>
                    <Input
                      id='familyName'
                      type='text'
                      placeholder='Enter your family name'
                      className='w-full px-2 rounded-lg py-2 text-gray-700'
                      value={formData.familyName || ''}
                      onChange={(e) =>
                        handleInputChange('familyName', e.target.value)
                      }
                    />
                    {errors.familyName && (
                      <p className='text-red-500 text-sm'>
                        {errors.familyName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='stateOfOrigin'>State Of Origin</Label>
                    <Select
                      clearable
                      filterable
                      id='stateOfOrigin'
                      customLabel='Select A State'
                      className='w-full rounded-lg py-2 text-gray-700'
                      value={formData.stateOfOrigin || ''}
                      onChange={(value) =>
                        handleInputChange('stateOfOrigin', value)
                      }
                      options={
                        states
                          ? states
                              .filter((s) => s.id)
                              .map((s) => ({ id: s.id, name: s.name }))
                          : []
                      }
                      required
                    />
                    {errors.stateOfOrigin && (
                      <p className='text-red-500 text-sm'>
                        {errors.stateOfOrigin}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='dateOfBirth'>Date of birth</Label>
                    <Input
                      id='dateOfBirth'
                      type='date'
                      placeholder='YYYY-MM-DD'
                      className='w-full px-2 rounded-lg py-2 text-gray-700'
                      value={formData.dateOfBirth || ''}
                      onChange={(e) =>
                        handleInputChange('dateOfBirth', e.target.value)
                      }
                      required
                    />
                    {errors.dateOfBirth && (
                      <p className='text-red-500 text-sm'>
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='nationality'>Nationality</Label>
                    <Input
                      id='nationality'
                      type='text'
                      placeholder='Enter your nationality'
                      className='w-full px-2 rounded-lg py-2 text-gray-700'
                      value={formData.nationality || ''}
                      onChange={(e) =>
                        handleInputChange('nationality', e.target.value)
                      }
                      required
                    />
                    {errors.nationality && (
                      <p className='text-red-500 text-sm'>
                        {errors.nationality}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='religion'>Religion</Label>
                    <Select
                      clearable
                      id='religion'
                      customLabel='Select Religion'
                      className='w-full rounded-lg py-2 text-gray-700'
                      value={formData.religion || ''}
                      onChange={(value) => handleInputChange('religion', value)}
                      options={
                        religions
                          ? religions
                              .filter((r) => r.id)
                              .map((r) => ({ id: r.id, name: r.name }))
                          : []
                      }
                      required
                    />
                    {errors.religion && (
                      <p className='text-red-500 text-sm'>{errors.religion}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='ethnicGroup'>Ethnic Group</Label>
                    <Input
                      id='ethnicGroup'
                      type='text'
                      placeholder='Enter your Ethnic Group'
                      className='w-full px-2 rounded-lg py-2 text-gray-700'
                      value={formData.ethnicGroup || ''}
                      onChange={(e) =>
                        handleInputChange('ethnicGroup', e.target.value)
                      }
                      required
                    />
                    {errors.ethnicGroup && (
                      <p className='text-red-500 text-sm'>
                        {errors.ethnicGroup}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='address'>Address</Label>
                    <Input
                      id='address'
                      type='text'
                      placeholder='Enter address'
                      className='w-full px-2 rounded-lg py-2 text-gray-700'
                      value={formData.address || ''}
                      onChange={(e) =>
                        handleInputChange('address', e.target.value)
                      }
                    />
                    {errors.address && (
                      <p className='text-red-500 text-sm'>{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='residentialAddress'>
                      Residential Address
                    </Label>
                    <Input
                      id='residentialAddress'
                      type='text'
                      placeholder='Enter residential address'
                      className='w-full px-2 rounded-lg py-2 text-gray-700'
                      value={formData.residentialAddress || ''}
                      onChange={(e) =>
                        handleInputChange('residentialAddress', e.target.value)
                      }
                    />
                    {errors.residentialAddress && (
                      <p className='text-red-500 text-sm'>
                        {errors.residentialAddress}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='phone'>Phone</Label>
                    <Input
                      id='phone'
                      type='tel'
                      placeholder='Enter your phone number'
                      className='w-full px-2 rounded-lg py-2 text-gray-700'
                      value={formData.phone || ''}
                      pattern='^[0-9]{11}$'
                      maxLength={11}
                      onChange={(e) =>
                        handleInputChange(
                          'phone',
                          e.target.value.replace(/\D/g, '')
                        )
                      }
                      required
                    />
                    {errors.phone && (
                      <p className='text-red-500 text-sm'>{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='bvn'>BVN (11 digits)</Label>
                    <Input
                      id='bvn'
                      type='text'
                      placeholder='Enter BVN'
                      className='w-full px-2 rounded-lg py-2 text-gray-700'
                      value={formData.bvn || ''}
                      pattern='^[0-9]{11}$'
                      maxLength={11}
                      onChange={(e) =>
                        handleInputChange(
                          'bvn',
                          e.target.value.replace(/\D/g, '')
                        )
                      }
                    />
                    {errors.bvn && (
                      <p className='text-red-500 text-sm'>{errors.bvn}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='nin'>NIN (11 digits)</Label>
                    <Input
                      id='nin'
                      type='text'
                      placeholder='Enter NIN'
                      className='w-full px-2 rounded-lg py-2 text-gray-700'
                      value={formData.nin || ''}
                      pattern='^[0-9]{11}$'
                      maxLength={11}
                      onChange={(e) =>
                        handleInputChange(
                          'nin',
                          e.target.value.replace(/\D/g, '')
                        )
                      }
                    />
                    {errors.nin && (
                      <p className='text-red-500 text-sm'>{errors.nin}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='politicalParty'>Political Party</Label>
                    <Input
                      id='politicalParty'
                      type='text'
                      placeholder='e.g., APC, PDP'
                      className='w-full px-2 rounded-lg py-2 text-gray-700'
                      value={formData.politicalParty || ''}
                      onChange={(e) =>
                        handleInputChange('politicalParty', e.target.value)
                      }
                    />
                    {errors.politicalParty && (
                      <p className='text-red-500 text-sm'>
                        {errors.politicalParty}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='relativePhone'>Relative Number</Label>
                    <Input
                      id='relativePhone'
                      type='tel'
                      placeholder="Enter relative's phone"
                      className='w-full px-2 rounded-lg py-2 text-gray-700'
                      value={formData.relativePhone || ''}
                      pattern='^[0-9]{7,15}$'
                      maxLength={15}
                      onChange={(e) =>
                        handleInputChange(
                          'relativePhone',
                          e.target.value.replace(/\D/g, '')
                        )
                      }
                    />
                    {errors.relativePhone && (
                      <p className='text-red-500 text-sm'>
                        {errors.relativePhone}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='assistanceOfficerRN'>
                      Assistance Officer RN
                    </Label>
                    <Input
                      id='assistanceOfficerRN'
                      type='text'
                      placeholder='Enter officer reference'
                      className='w-full px-2 rounded-lg py-2 text-gray-700'
                      value={formData.assistanceOfficerRN || ''}
                      onChange={(e) =>
                        handleInputChange('assistanceOfficerRN', e.target.value)
                      }
                    />
                    {errors.assistanceOfficerRN && (
                      <p className='text-red-500 text-sm'>
                        {errors.assistanceOfficerRN}
                      </p>
                    )}
                  </div>
                </div>

                <FileUpload
                  key={fileResetKey}
                  selectedFiles={selectedFiles}
                  setSelectedFiles={setSelectedFiles}
                  accept='.jpg,.png,.pdf,.xlsx,.docx'
                  multiple
                />
                {fileError && (
                  <p className='text-red-500 text-sm'>{fileError}</p>
                )}

                <button
                  type='submit'
                  className='w-full h-8 md:h-10 flex justify-center items-center bg-gray-800 text-white rounded-md shadow-md disabled:opacity-50'
                  disabled={isPending}
                >
                  {isPending ? <SpinnerMini /> : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showResult && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
          <div className='w-full max-w-sm rounded-lg bg-white p-6 shadow-xl'>
            <h2 className='text-lg font-semibold text-gray-900 mb-2'>
              File Created
            </h2>
            <p className='text-sm text-gray-600 mb-4'>
              Save these details. You can also find them in the records.
            </p>

            <div className='space-y-3'>
              <div className='rounded border p-3'>
                <div className='text-xs text-gray-500'>MRN</div>
                <div className='font-mono text-sm'>{resultMRN || '—'}</div>
              </div>
              <div className='rounded border p-3'>
                <div className='text-xs text-gray-500'>File Number</div>
                <div className='font-mono text-sm'>
                  {resultFileNumber || '—'}
                </div>
              </div>
            </div>

            <div className='mt-6 flex items-center justify-end gap-2'>
              <button
                type='button'
                onClick={() =>
                  navigator.clipboard.writeText(
                    `MRN: ${resultMRN}\nFile Number: ${resultFileNumber}`
                  )
                }
                className='px-3 py-2 text-sm rounded bg-gray-100 text-gray-800 hover:bg-gray-200'
              >
                Copy
              </button>
              <button
                type='button'
                onClick={() => setShowResult(false)}
                className='px-3 py-2 text-sm rounded bg-gray-800 text-white hover:bg-gray-900'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FormMRN
