import { type SomeForm } from '@/actions/handleAction';
import {z} from 'zod'

const EntryValidator = z.object({
    systemValue: z.string().min(0).max(10),
    text: z.string().min(1).max(50).optional(),
    amount:z.number().min(1).int(),
    status: z.literal('on'),
    goaway: z.literal('0').or(z.literal('1'))
  });

  export default EntryValidator