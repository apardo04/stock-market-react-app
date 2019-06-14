import { useState } from 'react'
import Link from 'next/link'

export default function Nav({ user }) {
  const [signInModal, toggleSignInModal] = useState(false)
  return(
    <nav>
      <ul>
        <li className="lg:w-40 md:w-24">
          <a href="/"><img src="/static/assets/images/logo.png"></img></a>
        </li>
        <li className="logo-text green text-6xl leading-none sm:hidden">Stock Portfolio</li>
        <li>
          {user && (
            <>
              <Link href="/logout">
                <a className="hover:underline hover:cursor-pointer green">Log Out</a>
              </Link>
            </>
          )}
          {!user && (
            <Link href="/login">
              <a className="hover:underline hover:cursor-pointer green">Log In | Register</a>
            </Link>
          )}
        </li>
      </ul>

      <style jsx>{`
        nav {
          text-align: center;
        }
        ul {
          display: flex;
          justify-content: space-between;
        }
        nav > ul {
          padding: 4px 16px;
        }
        li {
          display: flex;
          padding: 6px 8px;
        }
        .logo-text{
          font-family: 'Cinzel', serif;
        }
      `}</style>
    </nav>
  )
}

