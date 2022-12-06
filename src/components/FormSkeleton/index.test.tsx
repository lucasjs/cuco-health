import React from 'react'
import { render, screen } from '@testing-library/react'

import FormSkeleton, {
  TESTID_FORM_SKELETON,
  TESTID_FORM_SKELETON_INPUT
} from '../FormSkeleton'

describe('FormSkeleton', () => {
  test('should render correctly', () => {
    const { container } = render(<FormSkeleton quantity={1} />)

    expect(container).toMatchSnapshot()
  })

  test('when pass quantity 4', () => {
    render(<FormSkeleton quantity={4} />)

    expect(screen.getByTestId(TESTID_FORM_SKELETON)).toBeInTheDocument()
    expect(screen.getAllByTestId(TESTID_FORM_SKELETON_INPUT)[0]).toBeVisible()
    expect(screen.getAllByTestId(TESTID_FORM_SKELETON_INPUT)).toHaveLength(4)
  })
})
