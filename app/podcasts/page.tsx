import { Metadata } from 'next'
import { db } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Podcasts & Video Insights | Dr. Dheeraj Dubay',
  description: 'Watch educational videos and podcast episodes by Dr. Dheeraj Dubay about joint replacement surgery, patient care, robotic surgery, and orthopaedic health.',
}

export const revalidate = 3600

// Query the YouTube model directly via Prisma. We previously fetched
// admin.drdubay.in/api/youtube but that endpoint is behind NextAuth
// middleware and returned an HTML sign-in page, leaving the page empty.
async function getVideos() {
  try {
    const rows = await db.youTube.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return rows.map((r) => ({
      id: r.id,
      link: r.link,
      createdAt: r.createdAt.toISOString(),
    }))
  } catch {
    return []
  }
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/)
  return match ? match[1] : null
}

export default async function PodcastsPage() {
  const videos = await getVideos()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-purple-700 bg-purple-50 rounded-full uppercase">
            Watch & Learn
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Podcasts & Video Insights
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Educational content by Dr. Dheeraj Dubay on joint replacement, patient recovery, and orthopaedic health
          </p>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-500">Podcast episodes coming soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((v: any) => {
              // DB stores the URL on `link` (admin schema); a couple of older
              // rows might use `url` — accept either so nothing falls through.
              const url: string = v.link || v.url || ''
              const videoId = getYouTubeId(url)
              return (
                <article key={v.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                  {videoId ? (
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={v.title || 'Dr. Dheeraj Dubay podcast episode'}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">Video unavailable</span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Episode
                      </span>
                    </div>
                    {v.title && (
                      <h2 className="font-bold text-gray-900 mb-1">{v.title}</h2>
                    )}
                    {v.description && (
                      <p className="text-sm text-gray-500 line-clamp-2">{v.description}</p>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
