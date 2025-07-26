"use client"
import { usePaginatedQuery } from 'convex/react'
import { useSearchParams } from '../../hooks/use-search-params'

import { api } from '../../../convex/_generated/api'
import {Navbar} from './Navbar'
import { TemplateGallery } from './TemplateGallery'
import { FullscreenLoader } from '@/components/Fullscreen-loader'
import { DocumentTable } from './documents-table'

// ✅ Change 'page' to 'Page' (capitalized)
const Page = () => {
  const [search] = useSearchParams();
  const {
          results,
          status,
          loadMore
  } = usePaginatedQuery(api.Documents.get, { search }, {initialNumItems: 5});

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='fixed top-0 right-0 left-0 z-10 bg-white h-16 p-4'>
        <Navbar />
      </div>
      <div className='mt-16 '>
        <TemplateGallery />
        <DocumentTable
            documents={results}
            status={status}
            loadMore={loadMore}
        />
      </div>
    </div>
  )
}

// ✅ Export the capitalized component
export default Page