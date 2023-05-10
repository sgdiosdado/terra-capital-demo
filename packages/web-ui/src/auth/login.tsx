import classes from './login.module.css'
import { useAuth } from './auth-context'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../shared/button'
import { Field, Label, Input } from '../shared/forms'

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export function Login() {
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = data => {
    login(data)
  }

  return (
    <div className={classes.background}>
      <form
        className={classes.login}
        onSubmit={handleSubmit(onSubmit, e => console.log(e))}
      >
        <Field>
          <Label htmlFor="username">Email</Label>
          <Input
            type="email"
            {...register('username')}
            placeholder="user@email.com"
          />
        </Field>

        <Field>
          <Label htmlFor="password">Password</Label>
          <Input type="password" {...register('password')} />
        </Field>

        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}
