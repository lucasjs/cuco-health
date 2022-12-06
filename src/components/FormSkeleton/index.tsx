import React from 'react'
import { Skeleton, SimpleGrid } from '@chakra-ui/react'
import CH from 'src/types'

const TESTID_FORM_SKELETON = 'ch-form-skeleton'
const TESTID_FORM_SKELETON_INPUT = 'ch-form-skeleton-input'

const FormSkeleton: React.FC<CH.ClientsLimit> = ({ quantity }) => {
  return (
    <SimpleGrid
      columns={[1, null, 2]}
      spacingX={8}
      spacingY={6}
      data-testid={TESTID_FORM_SKELETON}
    >
      {[...Array(quantity)].map((_, index) => (
        <Skeleton
          height={12}
          key={index}
          data-testid={TESTID_FORM_SKELETON_INPUT}
        />
      ))}
    </SimpleGrid>
  )
}

export default FormSkeleton
export { TESTID_FORM_SKELETON, TESTID_FORM_SKELETON_INPUT }
