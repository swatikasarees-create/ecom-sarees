import Image from 'next/image';
import Link from 'next/link';

export default function Blog() {
  const posts = [
    {
      id: 1,
      image: '/images/post-image1.jpg',
      category: 'Fashion',
      date: 'jul 11, 2022',
      title: 'How to look outstanding in pastel',
      excerpt: 'Dignissim lacus,turpis ut suspendisse vel tellus.Turpis purus,gravida orci,fringilla...',
    },
    {
      id: 2,
      image: '/images/post-image2.jpg',
      category: 'Fashion',
      date: 'jul 11, 2022',
      title: 'Top 10 fashion trend for summer',
      excerpt: 'Turpis purus, gravida orci, fringilla dignissim lacus, turpis ut suspendisse vel tellus...',
    },
    {
      id: 3,
      image: '/images/post-image3.jpg',
      category: 'Fashion',
      date: 'jul 11, 2022',
      title: 'Crazy fashion with unique moment',
      excerpt: 'Turpis purus, gravida orci, fringilla dignissim lacus, turpis ut suspendisse vel tellus...',
    },
  ];

  return (
    <section className="blog py-5">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
          <h4 className="text-uppercase">Read Blog Posts</h4>
          <Link href="/" className="btn-link">View All</Link>
        </div>
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-md-4">
              <article className="post-item">
                <div className="post-image">
                  <Link href="/">
                    <Image 
                      src={post.image} 
                      alt="image" 
                      className="post-grid-image img-fluid" 
                      width={500} 
                      height={350}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </Link>
                </div>
                <div className="post-content d-flex flex-wrap gap-2 my-3">
                  <div className="post-meta text-uppercase fs-6 text-secondary">
                    <span className="post-category">{post.category} /</span>
                    <span className="meta-day"> {post.date}</span>
                  </div>
                  <h5 className="post-title text-uppercase">
                    <Link href="/">{post.title}</Link>
                  </h5>
                  <p>{post.excerpt}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
