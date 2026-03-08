import Link from 'next/link'
import { destinations } from '@/src/data/destinations'

export default function DestinationsPage() {
  return (
    <div className="min-h-[60vh] px-4 py-16 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-12" style={{ color: 'rgb(0, 191, 165)' }}>
        Destinations
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((d) => (
          <Link
            key={d.id}
            href={`/destinations/${d.slug}`}
            className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div
              className="aspect-[4/3] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url(${d.image})` }}
            />
            <div className="p-6 bg-white dark:bg-slate-900">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{d.name}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{d.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
