'use client'

import * as z from 'zod'
import { Category, Companion } from '@prisma/client'

interface CompanionFormProps {
  initialData: Companion | null
  categories: Category[]
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  instructions: z
    .string()
    .min(200, { message: 'Instructions require at least 200 characters.' }),
  seed: z
    .string()
    .min(200, { message: 'Seed require at least 200 characters.' }),
  src: z.string().min(200, { message: 'Image is required.' }),
  categoryId: z.string().min(1, { message: 'Category is required.' }),
})

const CompanionForm = ({ initialData, categories }: CompanionFormProps) => {
  return <div>CompanionForm</div>
}

export default CompanionForm
