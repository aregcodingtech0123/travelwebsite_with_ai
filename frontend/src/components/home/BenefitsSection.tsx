'use client'

const BENEFITS_TEXT = `Travel opens your mind, boosts creativity, and creates memories that last a lifetime. Whether you're exploring a new city or relaxing by the sea, every journey brings new perspectives and a sense of wonder. Let the world inspire you.`

export function BenefitsSection() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-16 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="relative flex-shrink-0 w-full lg:w-1/2 max-w-lg">
          <div
            className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl"
            style={{
              border: '4px solid rgb(0, 191, 165)',
              boxShadow: '0 0 0 2px rgb(0, 191, 165), 0 25px 50px -12px rgba(0,0,0,0.25)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
              alt="Travel benefits"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute -top-2 -left-2 w-16 h-16 border-l-4 border-t-4 rounded-tl-xl opacity-60"
              style={{ borderColor: 'rgb(0, 191, 165)' }}
            />
            <div
              className="absolute -bottom-2 -right-2 w-16 h-16 border-r-4 border-b-4 rounded-br-xl opacity-60"
              style={{ borderColor: 'rgb(0, 191, 165)' }}
            />
          </div>
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'rgb(0, 191, 165)' }}>
            Benefits of Travel
          </h2>
          <p
            className="text-xl md:text-2xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium"
            style={{ color: 'rgb(0, 191, 165)', fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            {BENEFITS_TEXT}
          </p>
        </div>
      </div>
    </section>
  )
}
