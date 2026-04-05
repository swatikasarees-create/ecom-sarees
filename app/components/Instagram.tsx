type InstaMedia = { kind: 'video'; src: string };

export default function Instagram() {
  const instaMedia: InstaMedia[] = [
    { kind: 'video', src: '/videos/instavideo1.mp4' },
    { kind: 'video', src: '/videos/instavideo2.mp4' },
    { kind: 'video', src: '/videos/instavideo3.mp4' },
    { kind: 'video', src: '/videos/instavideo4.mp4' },
  ];

  return (
    <section className="instagram py-4 py-md-5" style={{ background: '#fff' }}>
      <div className="container" style={{ maxWidth: 1320 }}>
        <div
          className="d-flex flex-nowrap gap-3 gap-md-4 justify-content-md-center overflow-auto pb-2"
          style={{ scrollbarWidth: 'thin' }}
        >
        {instaMedia.map((media, index) => (
          <div key={index} style={{ flex: '0 0 clamp(215px, 24vw, 300px)' }}>
            <div
              className="insta-item"
              style={{
                background: '#fff',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 2px 15px rgba(124, 123, 123, 0.08)',
              }}
            >
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <div
                  className="position-relative"
                  style={{ height: 'clamp(360px, 50vw, 460px)', overflow: 'hidden' }}
                >
                  <video
                    src={media.src}
                    className="insta-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="Instagram video"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      display: 'block',
                      background: '#fff',
                    }}
                  />
                </div>
              </a>
            </div>
          </div>
        ))}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <a href="https://www.instagram.com/" className="btn btn-dark px-4 px-md-5">
            Follow us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
