import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <div>
      <Link href="/documents/123" className='text-xl font-bold underline text-blue-500'>click here</Link>
    </div>
  )
}

export default page
