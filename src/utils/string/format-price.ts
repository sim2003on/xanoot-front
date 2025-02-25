export function formatPrice(price: number) {
	return price.toLocaleString('ru-RU', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0
	})
}
