import { GalleryCarousel } from './GalleryCarousel'

export function Gallery() {
  return (
    <section aria-label="גלריית עבודות" className="bg-creme px-3 pb-8 sm:px-5 sm:pb-10">
      <div className="mx-auto max-w-md md:max-w-lg">
        <GalleryCarousel />
      </div>
    </section>
  )
}
