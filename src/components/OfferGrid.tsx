'use client';

import OfferCard from './ui/OfferCard';
import { useState } from 'react';
import OfferSidePanel from './OfferSidePanel';

interface OfferItem {
	id: string;
	title: string;
	description?: string;
	location?: any;
	contact?: string;
}

export default function OfferGrid({ items }: { items?: OfferItem[] }) {
	const sample = [
		{
			id: '1',
			title: 'Búsqueda: Consultor en manejo de aguas',
			description: 'Se busca consultor con experiencia en riego y gestión hídrica.',
			location: { country: 'Chile', city: 'Santiago' },
			contact: 'test@example.com'
		},
		{
			id: '2',
			title: 'Consultor en restauración ecológica',
			description: 'Proyecto de restauración de cuencas.',
			location: { country: 'Perú', city: 'Lima' },
			contact: 'lima@example.com'
		}
	];

	const offers = items && items.length ? items : sample;

	const [selected, setSelected] = useState<string | null>(null);
	const selectedOffer = offers.find(c => c.id === selected) || null;

	return (
		<section className="py-12 px-4 max-w-6xl mx-auto">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{offers.map(offer => (
					<div key={offer.id} onClick={() => setSelected(offer.id)}>
						<OfferCard {...(offer as any)} />
					</div>
				))}
			</div>

			<OfferSidePanel offer={selectedOffer as any} onClose={() => setSelected(null)} />
		</section>
	);
}
