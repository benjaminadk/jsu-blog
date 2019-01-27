import { format, formatDistance } from 'date-fns'

export const formatDate = date => format(new Date(date), 'PPP')

export const formatDateFromNow = date => formatDistance(new Date(date), new Date())
