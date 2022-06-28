import type { NextPage } from 'next'
import { Box } from '@chakra-ui/react'
import { db } from '@/lib/firebase'
import { TagForm } from '@/components/TagForm'
import Layout from '@/components/Layout'
import { useFetchTags } from '@/hooks/useTags'

const AdminPage: NextPage = () => {
  const fetchTags = useFetchTags(db)
  const tags = fetchTags()

  return (
    <Layout>
      <Box>
        {tags && (
          <Box m={2}>
            <TagForm tagsMaster={tags} />
          </Box>
        )}
      </Box>
    </Layout>
  )
}

export default AdminPage
