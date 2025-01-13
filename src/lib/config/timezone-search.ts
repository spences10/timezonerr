export const TIMEZONE_SEARCH_MAPPINGS = {
	// Asia/Pacific
	'Asia/Tokyo': [
		'japan',
		'tokyo',
		'osaka',
		'jst',
		'kyoto',
		'yokohama',
		'sapporo',
		'nagoya',
	],
	'Asia/Shanghai': [
		'china',
		'shanghai',
		'beijing',
		'cst',
		'guangzhou',
		'shenzhen',
		'hangzhou',
	],
	'Asia/Singapore': ['singapore', 'sgt', 'sg'],
	'Asia/Seoul': [
		'korea',
		'south korea',
		'seoul',
		'busan',
		'incheon',
		'kst',
	],
	'Asia/Hong_Kong': ['hong kong', 'hk', 'hkt'],
	'Asia/Bangkok': [
		'thailand',
		'bangkok',
		'ict',
		'phuket',
		'chiang mai',
	],
	'Asia/Jakarta': [
		'indonesia',
		'jakarta',
		'bali',
		'surabaya',
		'bandung',
		'wib',
	],
	'Asia/Kuala_Lumpur': ['malaysia', 'kuala lumpur', 'myt', 'penang'],
	'Asia/Manila': [
		'philippines',
		'philippine',
		'pilipinas',
		'pinoy',
		'manila',
		'cebu',
		'davao',
	],
	'Asia/Kolkata': [
		'india',
		'ist',
		'mumbai',
		'delhi',
		'bangalore',
		'hyderabad',
		'chennai',
	],
	'Asia/Dubai': [
		'uae',
		'united arab emirates',
		'dubai',
		'abu dhabi',
		'gst',
	],
	'Asia/Taipei': ['taiwan', 'taipei', 'kaohsiung', 'taichung'],

	// Europe
	'Europe/London': [
		'gmt',
		'bst',
		'uk',
		'united kingdom',
		'britain',
		'england',
		'scotland',
		'wales',
		'london',
		'manchester',
		'birmingham',
		'glasgow',
	],
	'Europe/Paris': [
		'france',
		'paris',
		'lyon',
		'marseille',
		'cet',
		'central european',
	],
	'Europe/Berlin': [
		'germany',
		'berlin',
		'munich',
		'hamburg',
		'frankfurt',
		'cologne',
	],
	'Europe/Rome': [
		'italy',
		'rome',
		'milan',
		'naples',
		'turin',
		'florence',
	],
	'Europe/Madrid': [
		'spain',
		'madrid',
		'barcelona',
		'valencia',
		'seville',
	],
	'Europe/Amsterdam': [
		'netherlands',
		'holland',
		'amsterdam',
		'rotterdam',
		'hague',
	],
	'Europe/Brussels': ['belgium', 'brussels', 'antwerp', 'ghent'],
	'Europe/Stockholm': ['sweden', 'stockholm', 'gothenburg', 'malmo'],
	'Europe/Oslo': ['norway', 'oslo', 'bergen'],
	'Europe/Copenhagen': ['denmark', 'copenhagen', 'aarhus'],
	'Europe/Dublin': ['ireland', 'dublin', 'cork', 'galway'],
	'Europe/Istanbul': [
		'turkey',
		'türkiye',
		'istanbul',
		'ankara',
		'izmir',
	],
	'Europe/Kiev': ['ukraine', 'kyiv', 'kharkiv', 'odesa', 'dnipro'],

	// Americas
	'America/New_York': [
		'est',
		'edt',
		'usa',
		'united states',
		'new york',
		'boston',
		'washington dc',
		'atlanta',
		'miami',
		'eastern',
	],
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
		'los angeles',
		'seattle',
		'portland',
	],
	'America/Chicago': [
		'cst',
		'cdt',
		'chicago',
		'houston',
		'dallas',
		'central',
		'austin',
		'san antonio',
	],
	'America/Toronto': [
		'canada',
		'toronto',
		'ontario',
		'ottawa',
		'montreal',
	],
	'America/Vancouver': ['vancouver', 'british columbia', 'victoria'],
	'America/Sao_Paulo': [
		'brazil',
		'brasil',
		'sao paulo',
		'rio de janeiro',
		'brasilia',
	],
	'America/Mexico_City': [
		'mexico',
		'mexico city',
		'guadalajara',
		'monterrey',
	],

	// Australia/NZ
	'Australia/Sydney': [
		'australia',
		'sydney',
		'melbourne',
		'brisbane',
		'aest',
		'aedt',
	],
	'Australia/Perth': ['perth', 'western australia', 'awst'],
	'Pacific/Auckland': [
		'new zealand',
		'nz',
		'auckland',
		'wellington',
		'nzst',
		'nzdt',
	],

	// Middle East & Africa
	'Asia/Jerusalem': ['israel', 'jerusalem', 'tel aviv', 'haifa'],
	'Asia/Gaza': ['palestine', 'palestinian', 'gaza'],
	'Asia/Hebron': ['palestine', 'palestinian', 'west bank', 'hebron'],
	'Africa/Cairo': ['egypt', 'cairo', 'alexandria'],
	'Africa/Johannesburg': [
		'south africa',
		'johannesburg',
		'cape town',
		'durban',
	],

	// Non-standard offset timezones
	'Asia/Colombo': ['sri lanka', 'colombo', 'kandy'], // UTC+5:30
	'Asia/Kathmandu': ['nepal', 'kathmandu', 'npt', 'pokhara'], // UTC+5:45
	'Asia/Tehran': ['iran', 'tehran', 'irst', 'mashhad', 'isfahan'], // UTC+3:30
	'Asia/Kabul': ['afghanistan', 'kabul'], // UTC+4:30
	'Asia/Yangon': [
		'myanmar',
		'burma',
		'rangoon',
		'yangon',
		'mandalay',
	], // UTC+6:30
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
