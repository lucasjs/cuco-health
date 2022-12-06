import React from 'react'
import { Tr, Td, Skeleton, SkeletonText } from '@chakra-ui/react'
import CH from 'src/types'

const TableSkeleton: React.FC<CH.ClientsLimit> = ({ quantity }) => {
  return (
    <>
      {[...Array(quantity)].map((_, index) => (
        <Tr key={index} bgColor="brand.shape">
          <Td border={0}>
            <Skeleton height={4} width={4} />
          </Td>
          <Td border={0}>
            <SkeletonText noOfLines={2} spacing={2} />
          </Td>
          <Td border={0}>
            <SkeletonText noOfLines={1} />
          </Td>
          <Td border={0}>
            <SkeletonText noOfLines={1} />
          </Td>
          <Td border={0} textAlign="right">
            <Skeleton height={10} width="75px" marginLeft="auto" />
          </Td>
        </Tr>
      ))}
    </>
  )
}

export default TableSkeleton
