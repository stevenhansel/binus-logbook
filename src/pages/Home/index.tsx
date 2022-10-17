import { useEffect, useMemo, useState, ReactNode } from 'react'
import { Box, Button, Container, Center, Loader, Select, Text } from '@mantine/core'

import useMeQuery from '../../hooks/useMeQuery'

import { Enrichment } from '../../types/domain'

const initialSelectedEnrichment = ''

const Home = (): ReactNode => {
  const [selectedEnrichment, setSelectedEnrichment] = useState<string | null>(initialSelectedEnrichment)
  const { data, isLoading, error, refetch } = useMeQuery()

  const enrichmentMapping: Record<string, Enrichment> = useMemo(() => {
    if ((data?.enrichments) != null) {
      return data.enrichments.reduce((acc, cur) => ({
        [cur.semesterName]: cur,
        ...acc
      }), {})
    }
    return {}
  }, [data?.enrichments])

  useEffect(() => {
    const enrichmentKeyArr = Object.keys(enrichmentMapping)
    if (enrichmentKeyArr.length <= 0) {
      setSelectedEnrichment('')
    } else if (enrichmentKeyArr.length > 0 && selectedEnrichment === initialSelectedEnrichment) {
      setSelectedEnrichment(enrichmentKeyArr[0])
    }
  }, [data?.enrichments])

  const isShowSkeleton = selectedEnrichment === '' || selectedEnrichment === null

  return (
    <Container size="xs" px="xs" py="xl">
      {isLoading && (
        <Box>
          <Loader size={125} />
        </Box>
      )}
      {!isLoading && !!error && (
        <Box>
          <Text>Pls try again</Text>
          <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={refetch}>
            <Text>
              Refresh
            </Text>
          </Button>
        </Box>
      )}
      {!isLoading && !error && (data != null) && (
        <>
          <Center py="xl">
            <Text size="xl" weight="bold">{data.name}</Text>
          </Center>
          <Center>
            <Text size="xl">{data.email}</Text>
          </Center>
          <Center py="xl">
            <Select
              label="Enrichment period"
              placeholder="Pick one"
              value={selectedEnrichment}
              onChange={setSelectedEnrichment}
              data={data.enrichments.map((enrichment) => ({
                value: enrichment.semesterName,
                label: enrichment.semesterName
              }))}
            />
          </Center>
          <Container>
            <Text>{!isShowSkeleton ? enrichmentMapping?.[selectedEnrichment]?.companyPartner : '-'}</Text>
            <Text>{!isShowSkeleton ? enrichmentMapping?.[selectedEnrichment]?.facultySupervisor : '-'}</Text>
            <Text>{!isShowSkeleton ? enrichmentMapping?.[selectedEnrichment]?.location : '-'}</Text>
            <Text>{!isShowSkeleton ? enrichmentMapping?.[selectedEnrichment]?.officePhoneNumber : '-'}</Text>
            <Text>{!isShowSkeleton ? enrichmentMapping?.[selectedEnrichment]?.position : '-'}</Text>
            <Text>{!isShowSkeleton ? enrichmentMapping?.[selectedEnrichment]?.semesterName : '-'}</Text>
            <Text>{!isShowSkeleton ? enrichmentMapping?.[selectedEnrichment]?.siteSupervisorEmail : '-'}</Text>
            <Text>{!isShowSkeleton ? enrichmentMapping?.[selectedEnrichment]?.siteSupervisorName : '-'}</Text>
            <Text>{!isShowSkeleton ? enrichmentMapping?.[selectedEnrichment]?.siteSupervisorPhoneNumber : '-'}</Text>
            <Text>{!isShowSkeleton ? enrichmentMapping?.[selectedEnrichment]?.track : '-'}</Text>
            <Text>{!isShowSkeleton ? enrichmentMapping?.[selectedEnrichment]?.workingOfficeHours : '-'}</Text>
          </Container>
        </>
      )}
    </Container>
  )
}

export default Home
