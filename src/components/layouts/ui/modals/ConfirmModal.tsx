import { PropsWithChildren } from 'react'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '../AlertDialog'

interface ConfirmModalProps {
	handleClick: () => void
}

export function ConfirmModal({
	children,
	handleClick
}: PropsWithChildren<ConfirmModalProps>) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Close</AlertDialogCancel>
					<AlertDialogAction
						className='bg-blue-500 hover:bg-blue-500/90'
						onClick={() => handleClick()}
					>
						Confirm
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
