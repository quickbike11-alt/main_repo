export const formatPrice = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
