import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string({ message: 'Kolom tidak boleh kosong!' }).min(3, { message: 'Kolom tidak boleh kosong!' }),
  userpassword: z.string({ message: 'Kolom tidak boleh kosong!' }).min(3, { message: 'Kolom tidak boleh kosong!' }),
})
export type loginSchema = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    institution_id: z.string({ message: 'Sekolah tidak boleh kosong' }),
    grouplevel_id: z.string({ message: 'lembaga tidak boleh kosong' }),
    level_id: z.string({ message: 'tingkatan tidak boleh kosong' }),
    student_name: z.string({ message: 'Nama calon siswa tidak boleh kosong' }).min(3, { message: 'nama calon siswa minimal tiga huruf' }),
    student_gender: z.string({ message: 'pilih jenis kelamin' }),
    student_email: z.string({ message: 'email tidak boleh kosong' }).email({ message: 'isi email dengan benar' }),
    student_mother_phonewa: z.string({ message: 'telp tidak boleh kosong' }).min(3, { message: 'isi telp dengan benar' }),
    student_father_phonewa: z.string({ message: 'telp tidak boleh kosong' }).min(3, { message: 'isi telp dengan benar' }),
    username: z.string({ message: 'username tidak boleh kosong' }).min(3, { message: 'username minimal tiga huruf' }),
    password: z.string({ message: 'password tidak boleh kosong' }).min(3, { message: 'password minimal tiga huruf' }),
    confirmpassword: z.string({ message: 'konfirmasi password tidak boleh kosong!' }).min(3, { message: 'konfirmasi password minimal tiga huruf' }),
  })
  .superRefine(({ confirmpassword, password }, ctx) => {
    if (confirmpassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmpassword'],
      })
    }
  })

export type registerSchema = z.infer<typeof registerSchema>
