export const TIMEZONE_SEARCH_MAPPINGS = {
	// Common timezone abbreviations
	'Europe/London': [
		'gmt',
		'bst',
		'uk',
		'united kingdom',
		'britain',
		'england',
	],
	'America/New_York': ['est', 'edt', 'usa', 'united states'],
	'America/Los_Angeles': [
		'pst',
		'pdt',
		'california',
		'san francisco',
		'sf',
		'san diego',
		'sd',
		'west coast',
		'pacific',
	],
	'America/Chicago': ['cst', 'cdt'],

	// Country/Region specific
	'Europe/Istanbul': ['turkey', 'türkiye'],
	'Europe/Kiev': ['ukraine', 'kyiv'],
	'Asia/Gaza': ['palestine', 'palestinian'],
	'Asia/Hebron': ['palestine', 'palestinian'],
	'Asia/Manila': ['philippines', 'philippine', 'pilipinas', 'pinoy'],

	// Non-standard offset timezones
	'Asia/Kolkata': ['india', 'ist', 'mumbai', 'delhi', 'bangalore'], // UTC+5:30
	'Asia/Colombo': ['sri lanka', 'colombo'], // UTC+5:30
	'Asia/Kathmandu': ['nepal', 'kathmandu', 'npt'], // UTC+5:45
	'Asia/Tehran': ['iran', 'tehran', 'irst'], // UTC+3:30
	'Asia/Kabul': ['afghanistan', 'kabul'], // UTC+4:30
	'Asia/Yangon': ['myanmar', 'burma', 'rangoon', 'yangon'], // UTC+6:30
} as const;

export const get_search_terms = (timezone: string): string[] => {
	// Get direct mappings
	const direct_terms =
		TIMEZONE_SEARCH_MAPPINGS[
			timezone as keyof typeof TIMEZONE_SEARCH_MAPPINGS
		] || [];

	// For any timezone, also include these generic search terms
	return [
		...direct_terms,
		timezone.toLowerCase(),
		timezone.split('/').join(' ').toLowerCase(),
	];
};
