import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { CreateColor } from './CreateColor'

export const metadata: Metadata = {
	title: 'Creating Color',
	...NO_INDEX_PAGE
}

export default function CreateColorPage() {
	return <CreateColor />
}
