import { authenticate } from '../lib/actions'
import styles from '@/app/ui/login/login.module.css'

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <form  className={styles.form} action={authenticate}>
        <h1>Login</h1>
        <input type='text' autoCapitalize='off'
         autoComplete='off' autoCorrect='off'
         placeholder='username' name='name'/>
        <input type='password' placeholder='password' name='password'/>
        <button>Login</button>
      </form>
    </div>
  )
}
export default LoginPage

