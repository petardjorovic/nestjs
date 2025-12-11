import { z } from 'zod';

export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number({ message: 'Age must be type of number' }),
    breed: z.string(),
  })
  .required();

export type CreateCatType = z.infer<typeof createCatSchema>;
