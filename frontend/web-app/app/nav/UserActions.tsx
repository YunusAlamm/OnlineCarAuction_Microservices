'use client'

import { useParamsStore } from '@/hooks/useParamsStore'
import { Dropdown, DropdownDivider, DropdownItem } from 'flowbite-react'
import { ExtendedUser } from '@/types'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from 'react-icons/ai'
import { HiCog, HiUser } from 'react-icons/hi'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  user: ExtendedUser
}

export default function UserActions({ user }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const setParams = useParamsStore(state => state.setParams);

  function setWinner(){
    if (user.username) {
      setParams({winner: user.username, seller: undefined})
      if (pathname !== '/') router.push('/' );
    }
  }

  function setSeller(){
    if (user.username) {
      setParams({seller: user.username, winner: undefined});
      if (pathname !== '/') router.push('/');
    }
  }

  return (
    <Dropdown inline label={`Welcome ${user.name}`} className='cursor-pointer'>
      <DropdownItem icon={HiUser} onClick={setSeller}>
        My Auctions
      </DropdownItem>
      <DropdownItem icon={AiFillTrophy} onClick={setWinner}>
        Auctions Won
      </DropdownItem>
      <DropdownItem icon={AiFillCar}>
        <Link href="/auctions/create">
        Sell my car
        </Link>
      </DropdownItem>
      <DropdownItem icon={HiCog}>
        <Link href="/session">
          Session (dev only!)
        </Link>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem icon={AiOutlineLogout} onClick={() => signOut({ callbackUrl: '/' })}>
        Sign out
      </DropdownItem>

    </Dropdown>

  )
}
