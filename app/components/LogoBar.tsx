import Image from 'next/image';

export default function LogoBar() {
  return (
    <section className="logo-bar py-5 my-5">
      <div className="container">
        <div className="row">
          <div className="logo-content d-flex flex-wrap justify-content-between">
            <Image src="/images/logo1.png" alt="logo" className="logo-image img-fluid" width={120} height={60} style={{ width: 'auto', height: 'auto' }} />
            <Image src="/images/logo2.png" alt="logo" className="logo-image img-fluid" width={120} height={60} style={{ width: 'auto', height: 'auto' }} />
            <Image src="/images/logo3.png" alt="logo" className="logo-image img-fluid" width={120} height={60} style={{ width: 'auto', height: 'auto' }} />
            <Image src="/images/logo4.png" alt="logo" className="logo-image img-fluid" width={120} height={60} style={{ width: 'auto', height: 'auto' }} />
            <Image src="/images/logo5.png" alt="logo" className="logo-image img-fluid" width={120} height={60} style={{ width: 'auto', height: 'auto' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
