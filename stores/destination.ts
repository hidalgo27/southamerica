import { defineStore } from 'pinia';

export const useDestinationStore = defineStore('destination', () => {
	const destinations = ref([
		{
			title: 'Africa',
			description: 'Whether you’re heading on safari or exploring some of the continent’s welcoming cultures, Africa has an adventure in store for you.',
			image: 'https://picsum.photos/300/300',
			url: 'africa',
			countries: [
				{ title: 'Kenya', image: 'https://picsum.photos/400/300' },
				{ title: 'Morocco', image: 'https://picsum.photos/400/300' },
				{ title: 'South Africa', image: 'https://picsum.photos/400/300' },
				{ title: 'Tanzania', image: 'https://picsum.photos/400/300' },
				{ title: 'Zimbabwe', image: 'https://picsum.photos/400/300' }
			]
		},
		{
			title: 'Asia',
			description: 'From the Great Wall of China to the beaches of Thailand, Asia is a continent of contrasts and adventure.',
			image: 'https://picsum.photos/500/300',
			url: 'asia',
			countries: [
				{ title: 'China', image: 'https://picsum.photos/400/300' },
				{ title: 'India', image: 'https://picsum.photos/400/300' },
				{ title: 'Japan', image: 'https://picsum.photos/400/300' },
				{ title: 'Thailand', image: 'https://picsum.photos/400/300' }
			]
		},
		{
			title: 'Europe',
			description: 'From the beaches of Greece to the mountains of Switzerland, Europe is a continent of history and adventure.',
			image: 'https://picsum.photos/400/400',
			url: 'europe',
			countries: [
				{ title: 'France', image: 'https://picsum.photos/400/300' },
				{ title: 'Italy', image: 'https://picsum.photos/400/300' },
				{ title: 'Spain', image: 'https://picsum.photos/400/300' },
				{ title: 'United Kingdom', image: 'https://picsum.photos/400/300' }
			]
		},
		{
			title: 'North America',
			description: 'From the beaches of Mexico to the mountains of Canada, North America is a continent of adventure and natural beauty.',
			image: 'https://picsum.photos/700/300',
			url: 'north-america',
			countries: [
				{ title: 'Canada', image: 'https://picsum.photos/400/300' },
				{ title: 'Mexico', image: 'https://picsum.photos/400/300' },
				{ title: 'United States', image: 'https://picsum.photos/400/300' }
			]
		},
		{
			title: 'Oceania',
			description: 'Oceania is a continent of islands, beaches, and adventure. Explore the Great Barrier Reef, the beaches of Fiji, and the mountains of New Zealand.',
			image: 'https://picsum.photos/400/700',
			url: 'oceania',
			countries: [
				{ title: 'Australia', image: 'https://picsum.photos/400/300' },
				{ title: 'Fiji', image: 'https://picsum.photos/400/300' },
				{ title: 'New Zealand', image: 'https://picsum.photos/400/300' }
			]
		},
		{
			title: 'South America',
			description: 'South America is a continent of adventure, culture, and natural beauty. Explore the Amazon Rainforest, the Andes Mountains, and the beaches of Brazil.',
			image: 'https://picsum.photos/400/300',
			url: 'south-america',
			countries: [
				{ title: 'Argentina', image: 'https://picsum.photos/400/300' },
				{ title: 'Brazil', image: 'https://picsum.photos/400/300' },
				{ title: 'Chile', image: 'https://picsum.photos/400/300' },
				{ title: 'Peru', image: 'https://picsum.photos/400/300' }
			]
		}
	]);

	return {
		destinations,
	}
}, { persist: true, });
