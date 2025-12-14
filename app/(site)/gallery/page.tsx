export default function GalleryPage() {
  return (
    <div className="site-section">
      <div className="page-header">
        <h1>Gallery</h1>
        <p>A selection of completed commission work</p>
      </div>

      {/* Placeholder grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-muted text-muted-foreground flex aspect-square items-center justify-center rounded-lg"
          >
            Image {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
