import { getProductImageByHash } from './productImage';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  fabric: string;
  color: string;
  availability: 'in_stock' | 'out_of_stock';
  collection?: string;
  description?: string;
}

const instaImg = (hash: string) => getProductImageByHash(hash);

const baseProducts: Product[] = [
  // ── Kurta Sets & Suit Sets ──────────────────────────────────────
  {
    id: '1',
    name: 'Blush Pink Mirror-Embellished Kurta Set with Dupatta',
    price: 3200,
    originalPrice: 4800,
    image: instaImg('49faf2cd234e3d788bf0f9d46ae15cdbb8f5773d30954f7f92265dc1c75372c8'),
    category: 'Kurta Sets',
    fabric: 'Embroidered Cotton',
    color: 'Blush Pink',
    availability: 'in_stock',
    collection: 'Festive Collection',
    description: 'A graceful blush-pink kurta elevated with delicate buti motifs and shimmering embellishment along the neckline and panel detailing. The coordinated dupatta completes the look with an elegant border finish—perfect for festive mornings, intimate gatherings, and celebratory dinners.'
  },
  {
    id: '2',
    name: 'Mint Green Mirror & Thread Embroidered Kurta Set with Dupatta',
    price: 3200,
    originalPrice: 4800,
    image: instaImg('f66f3bd1d626c270c668337ad7ee728a80a172fafc370d88ba318267627c4403'),
    category: 'Kurta Sets',
    fabric: 'Embroidered Cotton',
    color: 'Mint Green',
    availability: 'in_stock',
    collection: 'Festive Collection',
    description: 'Fresh and refined, this mint kurta features understated embroidery and mirror-style accents around the neckline for a subtle glow. Paired with a soft, coordinated dupatta—a polished choice for day events and family celebrations.'
  },
  // ── Sarees ──────────────────────────────────────────────────────
  {
    id: '4',
    name: 'Ivory Shimmer Net Saree with Fringe Pallu',
    price: 5000,
    originalPrice: 8000,
    image: instaImg('58c261d7b5b2a35e2cee8bcbff1812eb996427bdf0d134218f9d0abae29ee3da'),
    category: 'Party Wear Sarees',
    fabric: 'Net',
    color: 'Ivory',
    availability: 'in_stock',
    collection: 'Party Wear',
    description: 'Ethereal and statement-making, this ivory saree features an all-over shimmer effect with a dramatic net pallu finished with fringes. Ideal for receptions, cocktail evenings, and glamorous festivities.'
  },
  {
    id: '5',
    name: 'Net Embellished Saree with Intricate Border & Mirror Work',
    price: 8000,
    originalPrice: 12000,
    image: instaImg('46a257b9b9f758da7849f836bf71346d414778c4382aac9c626a44c1c91301b9'),
    category: 'Wedding Sarees',
    fabric: 'Net',
    color: 'Seafoam',
    availability: 'in_stock',
    collection: 'Wedding Collection',
    description: 'This seafoam saree blends softness with sparkle, featuring a detailed embroidered border and scattered sequin work for a refined shine. A sophisticated pick for weddings and evening celebrations.'
  },
  {
    id: '6',
    name: 'Rust Orange Crush Silk Saree with Metallic Pallu',
    price: 4500,
    originalPrice: 7000,
    image: instaImg('b9606fa353f07c69822a7f45e9dff88435ded645dc85564219b7027cf3b5ac5f'),
    category: 'Silk Sarees',
    fabric: 'Crush Silk',
    color: 'Rust Orange',
    availability: 'in_stock',
    collection: 'Festive Collection',
    description: 'A rich rust-orange saree featuring a bandhani-inspired pattern and a standout metallic pallu for a festive finish. Traditional in spirit yet bold in presence—perfect for cultural events and wedding functions.'
  },
  {
    id: '7',
    name: 'Cream Saree with Vibrant Pink Border & Traditional Motifs',
    price: 11000,
    originalPrice: 16000,
    image: instaImg('ba76809e38182a59fc059fd1b5ff8d54fbef1671671d7dc2d45e60da014280e0'),
    category: 'Wedding Sarees',
    fabric: 'Silk',
    color: 'Cream',
    availability: 'in_stock',
    collection: 'Wedding Collection',
    description: 'Classic cream base meets a striking pink border and ornate motif detailing for a heritage-inspired look. The contrast pallu adds celebration-ready flair—ideal for wedding rituals, pujas, and special family occasions.'
  },
  // ── More Kurta Sets ─────────────────────────────────────────────
  {
    id: '8',
    name: 'Mint Green Embroidered Kurta Set with Dupatta (Mirror & Thread Work)',
    price: 3200,
    originalPrice: 4800,
    image: instaImg('58c261d7b5b2a35e2cee8bcbff1812eb996427bdf0d134218f9d0abae29ee3da'),
    category: 'Kurta Sets',
    fabric: 'Embroidered Cotton',
    color: 'Mint Green',
    availability: 'in_stock',
    collection: 'Festive Collection',
    description: 'A chic mint kurta designed with a prominent embellished neckline and delicate motifs for a clean, elevated look. Finished with a coordinated dupatta, it\'s effortless for festive lunches and elegant daytime events.'
  },
  {
    id: '9',
    name: 'Ivory Floral Embroidered Kurta Set with Dupatta (Cotton)',
    price: 2200,
    originalPrice: 3500,
    image: instaImg('7e2a731cd4511deb5570e146d79835cc01042aa7230f8e8383c43c6bae58a690'),
    category: 'Kurta Sets',
    fabric: 'Cotton',
    color: 'Ivory',
    availability: 'in_stock',
    collection: 'Casual Collection',
    description: 'Soft ivory tones with pastel floral embroidery create an elegant, romantic look. The matching dupatta features a lace-style border for added finesse—perfect for daytime festivities.'
  },
  // ── More Sarees ──────────────────────────────────────────────────
  {
    id: '10',
    name: 'Navy Blue Sequin Lace Saree - Party Edit (Cut Danna Work)',
    price: 12000,
    originalPrice: 20000,
    image: instaImg('f97c788c153fcb26647e7ed1f91a161928fe7fbe720e992853654db25d644425'),
    category: 'Party Wear Sarees',
    fabric: 'Net',
    color: 'Navy Blue',
    availability: 'in_stock',
    collection: 'Party Wear',
    description: 'A head-turning navy saree with dense sequin work and a dramatic lace-style drape that adds depth and texture. Designed for evening glamour—pair with statement earrings for a complete party look.'
  },
  {
    id: '11',
    name: 'Pistachio Green Saree with Gold Brocade Pallu & Gota Pati Work (Cotton)',
    price: 3000,
    originalPrice: 5000,
    image: instaImg('cde29bd485ed32919ab8dcad18d98b1e4bfef3c66784dea02b1101d78c37a3cc'),
    category: 'Cotton Sarees',
    fabric: 'Cotton',
    color: 'Pistachio Green',
    availability: 'in_stock',
    collection: 'Traditional Collection',
    description: 'A sophisticated pistachio saree accented with a broad gold brocade-style pallu for a rich, traditional finish. The subtle floral touches add charm, making it a beautiful pick for weddings and formal celebrations.'
  },
  // ── Suit Sets ────────────────────────────────────────────────────
  {
    id: '12',
    name: 'Yellow–Turquoise Ombre Embroidered Suit Set with Dupatta (Gota Pati Work)',
    price: 4200,
    originalPrice: 6500,
    image: instaImg('ac3c658306090476652612f6355f19d23a23a920e525e21d7ebe708c2ae41a5a'),
    category: 'Suit Sets',
    fabric: 'Embroidered Cotton',
    color: 'Yellow-Turquoise',
    availability: 'in_stock',
    collection: 'Festive Collection',
    description: 'Bright, festive, and full of energy—this ombre suit set features intricate embroidery around the neckline and a richly detailed dupatta border. A standout choice for haldi functions and festive parties.'
  },
  // ── More Sarees ──────────────────────────────────────────────────
  {
    id: '13',
    name: 'Pastel Rainbow Stripe Saree with Soft Border (Chinese Chiffon)',
    price: 3200,
    originalPrice: 5000,
    image: instaImg('15ff321335eca96ad3ae10207dc3e64dc57578cc932fa81e1fe20de55de7de1d'),
    category: 'Chiffon Sarees',
    fabric: 'Chiffon',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Casual Collection',
    description: 'A modern pastel saree with gentle multicolor stripes and a delicate border for an airy, feminine finish. Ideal for brunch events, daytime celebrations, and summer festivities.'
  },
  {
    id: '14',
    name: 'Red Banarasi-Style Saree with Ornate Border & Mirror Work',
    price: 2500,
    originalPrice: 4000,
    image: instaImg('5186d35ab5d128cb025aef675d5ca51d8646f46f6c19651c8e009e11e5ffaff7'),
    category: 'Designer Sarees',
    fabric: 'Banarasi Silk',
    color: 'Red',
    availability: 'in_stock',
    collection: 'Wedding Collection',
    description: 'A classic red saree featuring rich woven-style motifs and an embellished border for a regal finish. Designed for weddings and grand festivities—an evergreen piece that photographs beautifully.'
  },
  // ── More Suit Sets ───────────────────────────────────────────────
  {
    id: '15',
    name: 'Red Printed Suit Set with Embroidered Yoke & Dupatta (Bandani, Gota Pati Work)',
    price: 2000,
    originalPrice: 3200,
    image: instaImg('dd4eba1c36b71bd8eab402da40cf9e2519b87100af9f60737cd0c08b350f8871'),
    category: 'Suit Sets',
    fabric: 'Cotton',
    color: 'Red',
    availability: 'in_stock',
    collection: 'Festive Collection',
    description: 'A vibrant red suit set with fine all-over print and a heavily embroidered yoke. Completed with a coordinated dupatta, it\'s a strong pick for festive days and family gatherings.'
  },
  {
    id: '16',
    name: 'Ivory & Mustard Floral Suit Set with Lace-Style Chiffon Dupatta (Cotton Bottom)',
    price: 3500,
    originalPrice: 5500,
    image: instaImg('dba7ab2b7885147d185fa3efa22f8fd264e979965723216678632c833d66f369'),
    category: 'Suit Sets',
    fabric: 'Cotton',
    color: 'Ivory-Mustard',
    availability: 'in_stock',
    collection: 'Festive Collection',
    description: 'A warm, elegant combination featuring a floral kurta paired with a rich mustard dupatta finished with a lace-style border. Ideal for festive lunches, pujas, and daytime functions.'
  },
  {
    id: '17',
    name: 'Fuchsia Kurta Set with Orange Ombre Dupatta (Gota Pati Work, Cotton)',
    price: 4200,
    originalPrice: 6500,
    image: instaImg('25a8a9a369d3e58e76f7f66cfd9e4fec57fc015dbb7048b2f0da89c6a71748eb'),
    category: 'Kurta Sets',
    fabric: 'Cotton',
    color: 'Fuchsia',
    availability: 'in_stock',
    collection: 'Festive Collection',
    description: 'A bold fuchsia kurta with intricate embroidery on the neckline and sleeves, paired with a striking orange ombre dupatta for a vibrant contrast. A festive showpiece for sangeet nights and wedding events.'
  },
  // ── Silk Sarees ──────────────────────────────────────────────────
  {
    id: '18',
    name: 'Tissue Silk Saree – Timeless Elegance',
    price: 4999,
    originalPrice: 8000,
    image: instaImg('33b3c5ac84e7f428324c6d67f6a7f0732598ee87e26a0b165e594c3932725ac9'),
    category: 'Silk Sarees',
    fabric: 'Tissue Silk',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Premium Collection',
    description: 'Step into timeless elegance with this luxurious Tissue Silk Saree, designed to offer a graceful silhouette with a subtle natural sheen. The lightweight fabric drapes beautifully—perfect for weddings, festive celebrations, and special occasions.'
  },
  // ── Ajrakh Modal Silk Suit Materials ────────────────────────────
  {
    id: '19',
    name: 'Ajrakh Modal Silk Suit Material (Unstitched)',
    price: 6999,
    originalPrice: 10000,
    image: instaImg('64485eabdeb13de6daba8b093e357b1a1f0603cb7f4a39bbfd3587b7913d2741'),
    category: 'Suit Materials',
    fabric: 'Modal Silk',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Ajrakh Collection',
    description: 'Experience the charm of traditional craftsmanship with this premium Ajrakh Modal Silk Suit Material. The intricate Ajrakh print reflects timeless artistry, perfect for festive gatherings and cultural events.'
  },
  {
    id: '20',
    name: 'Ajrakh Modal Silk Suit Material – Premium Unstitched',
    price: 6999,
    originalPrice: 10000,
    image: instaImg('a6b80fbaabbb3fa5d90ec2601a088608116fa805c10684f12977f17216ee88f4'),
    category: 'Suit Materials',
    fabric: 'Modal Silk',
    color: 'Indigo',
    availability: 'in_stock',
    collection: 'Ajrakh Collection',
    description: 'Discover timeless elegance with this premium Ajrakh Modal Silk Suit Material. Intricate Ajrakh-inspired patterns add depth and heritage charm, making it perfect for festive occasions and cultural gatherings.'
  },
  {
    id: '21',
    name: 'Ajrakh Modal Silk Suit Material – Heritage Edition',
    price: 6999,
    originalPrice: 10000,
    image: instaImg('8fa036bdb85a67bf51dad5e1d63a9272658812d5218ebf7adfade1f6d53885fd'),
    category: 'Suit Materials',
    fabric: 'Modal Silk',
    color: 'Earthy',
    availability: 'in_stock',
    collection: 'Ajrakh Collection',
    description: 'Elevate your ethnic wardrobe with this beautifully crafted Ajrakh Modal Silk Suit Material. Adorned with intricate Ajrakh patterns and detailed borders—perfect for festive celebrations and cultural events.'
  },
  {
    id: '22',
    name: 'Ajrakh Modal Silk Suit Material – Indigo & Earthy Tones (Unstitched)',
    price: 7000,
    originalPrice: 11000,
    image: instaImg('b3132156e9bee35cba7089e02179cde7b3d80b4b20c05322f3db2f41997cba74'),
    category: 'Suit Materials',
    fabric: 'Modal Silk',
    color: 'Indigo',
    availability: 'in_stock',
    collection: 'Ajrakh Collection',
    description: 'Featuring intricate Ajrakh-inspired motifs in rich indigo and earthy tones. Premium modal silk with soft, breathable texture and graceful drape. Package includes Top + Bottom + Dupatta.'
  },
  {
    id: '23',
    name: 'Elegant Printed Ethnic Set with Dupatta',
    price: 6999,
    originalPrice: 10000,
    image: instaImg('f951397db4e9308c0c127fc53ac3172a59996d1f5ad195c2584da3d47948bfcb'),
    category: 'Suit Sets',
    fabric: 'Printed Fabric',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Ethnic Collection',
    description: 'A graceful ethnic outfit featuring intricate floral and geometric prints with a beautifully bordered dupatta. Designed for comfort and style—perfect for festive wear, office wear, and special occasions.'
  },
  {
    id: '24',
    name: 'Ajrakh Cream Suit Material with Traditional Motifs',
    price: 6999,
    originalPrice: 10000,
    image: instaImg('262563f39f9602f32bfd2734c98ca219dd03242e8006cd79dd0852bd50e41a3d'),
    category: 'Suit Materials',
    fabric: 'Premium Fabric',
    color: 'Cream',
    availability: 'in_stock',
    collection: 'Ajrakh Collection',
    description: 'Elegant Ajrakh-inspired printed suit material featuring traditional motifs and rich borders. A perfect blend of heritage design and modern grace, ideal for festive and ethnic occasions.'
  },
  {
    id: '25',
    name: 'Ajrakh Crepe Suit Material with Matching Dupatta',
    price: 4999,
    originalPrice: 7500,
    image: instaImg('d80f7285cd6d5b4a4277c1ecf5a1a4370a71c16678678447a4664efd6c3bd107'),
    category: 'Suit Materials',
    fabric: 'Crepe',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Ajrakh Collection',
    description: 'Elegant Ajrakh-inspired crepe suit material featuring intricate traditional motifs with a beautifully coordinated dupatta. A perfect blend of heritage craftsmanship and modern sophistication.'
  },
  {
    id: '26',
    name: 'Unstitched Cotton Suit Material with Matching Dupatta',
    price: 1799,
    originalPrice: 2800,
    image: instaImg('56bd6f7e0be41344784afb00fac8076c97ee0fc887ebcef7b8d6fa88ed861595'),
    category: 'Suit Materials',
    fabric: 'Cotton',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Casual Collection',
    description: 'Elegant unstitched cotton suit material featuring intricate traditional prints with a beautifully coordinated dupatta. Comfortable, breathable, and perfect for everyday elegance or festive styling.'
  },
  {
    id: '27',
    name: 'Graceful Unstitched Cotton Suit Material – Traditional Print',
    price: 1799,
    originalPrice: 2800,
    image: instaImg('d925e5242236c1d8261194f501b44accb8202fa5818289493f62e1baa8d0af95'),
    category: 'Suit Materials',
    fabric: 'Cotton',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Casual Collection',
    description: 'Graceful unstitched cotton suit material featuring elegant traditional prints with a beautifully coordinated dupatta. Perfect for festive, casual, and ethnic wear.'
  },
  {
    id: '28',
    name: 'Indigo Handblock Cotton Suit Set (Unstitched) – Timeless Ethnic Charm',
    price: 1799,
    originalPrice: 2800,
    image: instaImg('6212ba7c59c32452d84db35bedb9ef3e2a531548a80431f31ae1e59e9b25efce'),
    category: 'Suit Materials',
    fabric: 'Pure Cotton',
    color: 'Indigo',
    availability: 'in_stock',
    collection: 'Casual Collection',
    description: 'Designed with intricate traditional handblock-inspired prints in rich indigo tones. Breathable cotton fabric ensures all-day ease—ideal for casual wear, office attire, or festive gatherings. Includes kurta, pant, and dupatta fabric.'
  },
  {
    id: '29',
    name: 'Elegant Black Floral Cotton Unstitched Suit Material',
    price: 1799,
    originalPrice: 2800,
    image: instaImg('d0cb1614c38144291d7b7f2f1ef44e505a80b0103188c6e471a384ad504ac73e'),
    category: 'Suit Materials',
    fabric: 'Pure Cotton',
    color: 'Black',
    availability: 'in_stock',
    collection: 'Casual Collection',
    description: 'Premium pure cotton fabric with a refined floral ethnic print. Soft, breathable fabric for daily wear, office looks, and small occasions. Set includes coordinated top, bottom, and dupatta in rich black tone.'
  },
  {
    id: '30',
    name: 'Olive Green Cotton Unstitched Suit Material – Subtle & Sophisticated',
    price: 1799,
    originalPrice: 2800,
    image: instaImg('92e8a4e68aaef26e48f50db8e4edab71518355f9607282a1d63d48938b0b648e'),
    category: 'Suit Materials',
    fabric: 'Pure Cotton',
    color: 'Olive Green',
    availability: 'in_stock',
    collection: 'Casual Collection',
    description: 'Crafted from premium pure cotton fabric featuring delicate ethnic motifs and a beautifully detailed dupatta. Perfect balance of comfort and elegance for daily wear, office styling, and small occasions.'
  },
  // ── Premium Sarees ───────────────────────────────────────────────
  {
    id: '31',
    name: 'Pearl Work Net Saree – Timeless Grace',
    price: 12000,
    originalPrice: 18000,
    image: instaImg('b412ff6e2520e71391d64b0560de436686b29db2cb76bd68e417bbda70211003'),
    category: 'Wedding Sarees',
    fabric: 'Net',
    color: 'Ivory',
    availability: 'in_stock',
    collection: 'Premium Collection',
    description: 'Elegant net saree adorned with delicate pearl work and intricate embroidery, designed to add timeless grace to your festive and wedding look. Lightweight yet luxurious. Saree Length: 5.5m + 0.8m blouse.'
  },
  {
    id: '32',
    name: 'Premium Cotton Saree with Contrast Border',
    price: 2500,
    originalPrice: 4000,
    image: instaImg('3876d6356902934f89c32ff17a01069cbecd69a3f5ed463a3e3d2cf989ee847d'),
    category: 'Cotton Sarees',
    fabric: 'Pure Cotton',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Casual Collection',
    description: 'Elegant cotton saree featuring a graceful contrast border and rich pallu design. Soft, breathable, and perfect for everyday elegance or festive occasions. Saree Length: 5.5m + 0.8m blouse.'
  },
  {
    id: '33',
    name: 'Printed Cotton Saree with Floral Motifs',
    price: 2500,
    originalPrice: 4000,
    image: instaImg('a625e75d53e05d671353dc654c404548f58b4b440a3dbbe9273fea3db6010c8b'),
    category: 'Cotton Sarees',
    fabric: 'Pure Cotton',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Casual Collection',
    description: 'Beautiful printed cotton saree featuring elegant floral motifs and a subtle contrast border. Lightweight, breathable, and perfect for daily wear or casual occasions. Saree Length: 5.5m + 0.8m blouse.'
  },
  {
    id: '34',
    name: 'Ajrakh Print Saree with Rich Contrast Border',
    price: 2500,
    originalPrice: 4000,
    image: instaImg('d8332bf3602f8e73088c89a4e8898a7b56662409af932157dee89c8a97e6ece8'),
    category: 'Designer Sarees',
    fabric: 'Cotton',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Ajrakh Collection',
    description: 'Elegant Ajrakh print saree featuring traditional motifs with a rich contrast border and detailed pallu. Perfect for adding a touch of heritage charm to your ethnic collection. Saree Length: 5.5m + 0.8m blouse.'
  },
  {
    id: '35',
    name: 'Stone Work Net Saree – Luxurious Sparkle',
    price: 11000,
    originalPrice: 16000,
    image: instaImg('8f984c7487be2c119a063599ec22580bfdb5b1a3476cd89793531fe8ddc9c3a6'),
    category: 'Wedding Sarees',
    fabric: 'Net',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Premium Collection',
    description: 'Graceful net saree adorned with intricate stone work and elegant detailing. Designed to add a luxurious sparkle, perfect for weddings, receptions, and special occasions. Saree Length: 5.5m + 0.8m blouse.'
  },
  {
    id: '36',
    name: 'Elegant Tissue Thread Work Saree – Floral Motifs',
    price: 4500,
    originalPrice: 7000,
    image: instaImg('a8873565af396d4c051d0dcdcfcd112fe4e43008361dabe2dcdcf5e0d39814e5'),
    category: 'Designer Sarees',
    fabric: 'Tissue',
    color: 'Beige',
    availability: 'in_stock',
    collection: 'Festive Collection',
    description: 'Grace meets sophistication in this beautiful beige tissue saree adorned with delicate thread work and floral motifs. The lightweight fabric drapes effortlessly while the subtle sheen adds elegance—perfect for festive occasions.'
  },
  {
    id: '37',
    name: 'Green Woven Designer Saree with Zari Border',
    price: 2500,
    originalPrice: 4000,
    image: instaImg('1e8e23aeb8d70b9213ae15ac20175c0d35e88cbdadc93b8ed8d86ffd02ef8a8a'),
    category: 'Designer Sarees',
    fabric: 'Woven Fabric',
    color: 'Green',
    availability: 'in_stock',
    collection: 'Wedding Collection',
    description: 'Graceful green saree featuring rich woven motifs with intricate zari-style border detailing. Crafted to give a luxurious and elegant look—perfect for weddings, festive occasions, and special celebrations.'
  },
  {
    id: '38',
    name: 'Elegant Designer Saree Collection – Beige, Blush Pink & Navy Blue',
    price: 6000,
    originalPrice: 9000,
    image: instaImg('5cc317d0105e936b6b2fa225210e55064f5cf16bd6c0137a4572165ee7c27d15'),
    category: 'Designer Sarees',
    fabric: 'Premium Fabric',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Party Wear',
    description: 'A stunning collection of three graceful sarees in beige, blush pink, and navy blue, each adorned with delicate embellishments and refined border detailing. Perfect for parties, weddings, and festive occasions.'
  },
  {
    id: '39',
    name: 'Elegant Ready-to-Drape Saree – Chic & Effortless Glam',
    price: 5000,
    originalPrice: 8000,
    image: instaImg('b72f9f7d372c0c5c8c90ba446023ae36c2eadcee4d0bb3b3e9ab0474b15d1866'),
    category: 'Party Wear Sarees',
    fabric: 'Flowy Fabric',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Party Wear',
    description: 'This stunning ready-to-drape saree features a pre-stitched silhouette that gives you a perfectly pleated look within minutes. Available in muted, pink, and purple shades—ideal for parties, receptions, and special occasions.'
  },
  {
    id: '40',
    name: 'Patola Silk Saree – Rich Traditional Elegance',
    price: 6000,
    originalPrice: 10000,
    image: instaImg('d572b2ddeebc5c37c8eb4c63deb69e10c3543589c62374ec45558d4217058267'),
    category: 'Silk Sarees',
    fabric: 'Patola Silk',
    color: 'Red-Gold',
    availability: 'in_stock',
    collection: 'Wedding Collection',
    description: 'This stunning Patola silk saree showcases intricate traditional patterns with a vibrant red base and contrasting golden border—timeless ethnic charm perfect for weddings, festive occasions, and cultural celebrations.'
  },
  {
    id: '41',
    name: 'Soft Tissue Silk Saree with Thread & Sequin Work – Elegant Festive Glow',
    price: 4500,
    originalPrice: 7000,
    image: instaImg('59faa94e5e6422d3d7e99a492e212774569ccc6fe656c8d961b1a24c46a99e51'),
    category: 'Silk Sarees',
    fabric: 'Tissue Silk',
    color: 'Pink',
    availability: 'in_stock',
    collection: 'Festive Collection',
    description: 'This beautiful pink saree is adorned with delicate embroidery and intricate border detailing. Lightweight fabric drapes effortlessly with a scalloped border and fine embroidery—perfect for festive occasions and celebrations.'
  },
];

type ProductSheetOverride = {
  name: string;
  description: string;
  category: 'Sarees' | 'Suit';
  subCategory: string;
  price: number;
  hash: string;
};

const sheetOverrides: Record<string, ProductSheetOverride> = {
  '1': { name: 'Blush Pink Mirror-Embellished Kurta Set with Dupatta Crape Material ', description: 'A graceful blush-pink kurta elevated with delicate buti motifs and shimmering embellishment along the neckline and panel detailing. The coordinated dupatta completes the look with an elegant border finish-perfect for festive mornings, intimate gatherings, and celebratory dinners.', category: 'Suit', subCategory: 'Suit', price: 2, hash: '49faf2cd234e3d788bf0f9d46ae15cdbb8f5773d30954f7f92265dc1c75372c8' },
  '2': { name: 'Mint Green Mirror & Thread Embroidered Kurta Set with Dupatta', description: 'Fresh and refined mint kurta featuring understated embroidery and mirror-style accents around the neckline paired with a coordinated dupatta.', category: 'Suit', subCategory: 'Suit', price: 3200, hash: 'f66f3bd1d626c270c668337ad7ee728a80a172fafc370d88ba318267627c4403' },
  '4': { name: 'Ivory Shimmer Net Saree with Fringe Pallu', description: 'Ivory saree featuring all-over shimmer with dramatic net pallu and fringe finish.', category: 'Sarees', subCategory: 'Net Sarees', price: 5000, hash: 'b4cca86a4ab2a3f245718b45cc80f953c5f5b165c04735d66ed497463b25dd5f' },
  '5': { name: 'Net Embellished Saree with Intricate Border', description: 'Seafoam saree with embroidered border and sequin detailing.', category: 'Sarees', subCategory: 'Net Sarees', price: 8000, hash: '46a257b9b9f758da7849f836bf71346d414778c4382aac9c626a44c1c91301b9' },
  '6': { name: 'Rust Orange Crush Silk Saree with Metallic Pallu', description: 'Rust-orange saree featuring bandhani-inspired pattern and metallic pallu.', category: 'Sarees', subCategory: 'Silk Sarees', price: 4500, hash: 'b9606fa353f07c69822a7f45e9dff88435ded645dc85564219b7027cf3b5ac5f' },
  '7': { name: 'Ghat Cholla Saree with Vibrant Pink Border & Motifs', description: 'Cream saree with contrast pink border and ornate motif detailing.', category: 'Sarees', subCategory: 'Silk Sarees', price: 11000, hash: 'ba76809e38182a59fc059fd1b5ff8d54fbef1671671d7dc2d45e60da014280e0' },
  '8': { name: 'Mint Green Embroidered Kurta Set', description: 'Mint kurta with embellished neckline and coordinated dupatta.', category: 'Suit', subCategory: 'Suit', price: 3200, hash: '58c261d7b5b2a35e2cee8bcbff1812eb996427bdf0d134218f9d0abae29ee3da' },
  '9': { name: 'Ivory Floral Embroidered Kurta Set', description: 'Ivory kurta set with pastel floral embroidery and dupatta.', category: 'Suit', subCategory: 'Suit', price: 2200, hash: '7e2a731cd4511deb5570e146d79835cc01042aa7230f8e8383c43c6bae58a690' },
  '10': { name: 'Navy Blue Net Saree with Crystal Lace & Cut Dana Work', description: 'Navy saree with dense sequin work and lace drape effect.', category: 'Sarees', subCategory: 'Net Sarees', price: 12000, hash: 'f97c788c153fcb26647e7ed1f91a161928fe7fbe720e992853654db25d644425' },
  '11': { name: 'Pistachio Green Saree with Gold Brocade Pallu and Gotta Pati Work', description: 'Pistachio saree with broad gold brocade-style pallu.', category: 'Sarees', subCategory: 'Cotton Sarees', price: 3000, hash: 'cde29bd485ed32919ab8dcad18d98b1e4bfef3c66784dea02b1101d78c37a3cc' },
  '12': { name: 'Yellow-Turquoise Ombre Embroidered Suit Set', description: 'Ombre embroidered suit set with decorated dupatta border.', category: 'Suit', subCategory: 'Suit', price: 4200, hash: 'ac3c658306090476652612f6355f19d23a23a920e525e21d7ebe708c2ae41a5a' },
  '13': { name: 'Pastel Rainbow Stripe Saree Chinese Silk with Cut Danna Work', description: 'Pastel multicolor stripe saree with soft border.', category: 'Sarees', subCategory: 'Silk Sarees', price: 3200, hash: '15ff321335eca96ad3ae10207dc3e64dc57578cc932fa81e1fe20de55de7de1d' },
  '14': { name: 'Red Banarasi Style Saree', description: 'Red saree with woven motifs and embellished border.', category: 'Sarees', subCategory: 'Silk Sarees', price: 2500, hash: '5186d35ab5d128cb025aef675d5ca51d8646f46f6c19651c8e009e11e5ffaff7' },
  '15': { name: 'Red Printed Suit Set with Embroidered Yoke', description: 'Bandhani printed suit set with embroidered yoke and dupatta.', category: 'Suit', subCategory: 'Suit', price: 2000, hash: 'dd4eba1c36b71bd8eab402da40cf9e2519b87100af9f60737cd0c08b350f8871' },
  '16': { name: 'Ivory & Mustard Floral Suit Set', description: 'Floral kurta paired with mustard dupatta with lace border.', category: 'Suit', subCategory: 'Suit', price: 3500, hash: 'dba7ab2b7885147d185fa3efa22f8fd264e979965723216678632c833d66f369' },
  '17': { name: 'Fuchsia Kurta Set with Orange Ombre Dupatta', description: 'Fuchsia kurta with embroidery paired with contrast dupatta.', category: 'Suit', subCategory: 'Suit', price: 4200, hash: '25a8a9a369d3e58e76f7f66cfd9e4fec57fc015dbb7048b2f0da89c6a71748eb' },
  '18': { name: 'Tissue Silk Saree', description: 'Elegant lightweight tissue silk saree with natural sheen.', category: 'Sarees', subCategory: 'Silk Sarees', price: 4999, hash: '33b3c5ac84e7f428324c6d67f6a7f0732598ee87e26a0b165e594c3932725ac9' },
  '19': { name: 'Ajrakh Modal Silk Suit Material', description: 'Premium modal silk Ajrakh suit material.', category: 'Suit', subCategory: 'Suit', price: 6999, hash: '64485eabdeb13de6daba8b093e357b1a1f0603cb7f4a39bbfd3587b7913d2741' },
  '20': { name: 'Ajrakh Modal Silk Suit Material Variant 2', description: 'Premium Ajrakh modal silk suit material.', category: 'Suit', subCategory: 'Suit', price: 6999, hash: 'a6b80fbaabbb3fa5d90ec2601a088608116fa805c10684f12977f17216ee88f4' },
  '21': { name: 'Ajrakh Modal Silk Suit Material Variant 3', description: 'Ajrakh modal silk unstitched suit material.', category: 'Suit', subCategory: 'Suit', price: 6999, hash: '8fa036bdb85a67bf51dad5e1d63a9272658812d5218ebf7adfade1f6d53885fd' },
  '22': { name: 'Ajrakh Modal Silk Suit Material Premium', description: 'Ajrakh modal silk suit material with dupatta.', category: 'Suit', subCategory: 'Suit', price: 7000, hash: 'b3132156e9bee35cba7089e02179cde7b3d80b4b20c05322f3db2f41997cba74' },
  '23': { name: 'Elegant Ajrakh Silk Suit Printed Ethnic Set with Dupatta', description: 'Printed ethnic outfit with bordered dupatta.', category: 'Suit', subCategory: 'Suit', price: 6999, hash: 'f951397db4e9308c0c127fc53ac3172a59996d1f5ad195c2584da3d47948bfcb' },
  '24': { name: 'Ajrakh Cream Suit Material', description: 'Ajrakh printed cream suit material.', category: 'Suit', subCategory: 'Suit', price: 6999, hash: '262563f39f9602f32bfd2734c98ca219dd03242e8006cd79dd0852bd50e41a3d' },
  '25': { name: 'Ajrakh Crepe Suit Material', description: 'Ajrakh print crepe suit material with dupatta.', category: 'Suit', subCategory: 'Suit', price: 4999, hash: 'd80f7285cd6d5b4a4277c1ecf5a1a4370a71c16678678447a4664efd6c3bd107' },
  '26': { name: 'Unstitched Cotton Suit Material', description: 'Cotton printed suit material with dupatta.', category: 'Suit', subCategory: 'Suit', price: 1799, hash: '56bd6f7e0be41344784afb00fac8076c97ee0fc887ebcef7b8d6fa88ed861595' },
  '27': { name: 'Unstitched Cotton Suit Material Variant', description: 'Cotton traditional printed suit material.', category: 'Suit', subCategory: 'Suit', price: 1799, hash: 'd925e5242236c1d8261194f501b44accb8202fa5818289493f62e1baa8d0af95' },
  '28': { name: 'Indigo Handblock Cotton Suit Set', description: 'Indigo cotton handblock unstitched suit set.', category: 'Suit', subCategory: 'Suit', price: 1799, hash: '6212ba7c59c32452d84db35bedb9ef3e2a531548a80431f31ae1e59e9b25efce' },
  '29': { name: 'Black Floral Cotton Unstitched Suit Material', description: 'Black floral cotton suit material.', category: 'Suit', subCategory: 'Suit', price: 1799, hash: 'd0cb1614c38144291d7b7f2f1ef44e505a80b0103188c6e471a384ad504ac73e' },
  '30': { name: 'Olive Green Cotton Unstitched Suit Material', description: 'Olive green cotton suit material.', category: 'Suit', subCategory: 'Suit', price: 1799, hash: '92e8a4e68aaef26e48f50db8e4edab71518355f9607282a1d63d48938b0b648e' },
  '31': { name: 'Pearl Work Net Saree', description: 'Net saree with pearl handwork.', category: 'Sarees', subCategory: 'Net Sarees', price: 12000, hash: 'b412ff6e2520e71391d64b0560de436686b29db2cb76bd68e417bbda70211003' },
  '32': { name: 'Premium Cotton Saree', description: 'Cotton saree with contrast border.', category: 'Sarees', subCategory: 'Cotton Sarees', price: 2500, hash: '3876d6356902934f89c32ff17a01069cbecd69a3f5ed463a3e3d2cf989ee847d' },
  '33': { name: 'Printed Cotton Saree', description: 'Floral printed cotton saree.', category: 'Sarees', subCategory: 'Cotton Sarees', price: 2500, hash: 'a625e75d53e05d671353dc654c404548f58b4b440a3dbbe9273fea3db6010c8b' },
  '34': { name: 'Ajrakh Print Saree', description: 'Ajrakh print saree with contrast border.', category: 'Sarees', subCategory: 'Cotton Sarees', price: 2500, hash: 'd8332bf3602f8e73088c89a4e8898a7b56662409af932157dee89c8a97e6ece8' },
  '35': { name: 'Stone Work Net Saree', description: 'Net saree with heavy stone work.', category: 'Sarees', subCategory: 'Net Sarees', price: 11000, hash: '8f984c7487be2c119a063599ec22580bfdb5b1a3476cd89793531fe8ddc9c3a6' },
  '36': { name: 'Tissue Thread Work Saree', description: 'Beige tissue saree with floral thread work.', category: 'Sarees', subCategory: 'Silk Sarees', price: 4500, hash: 'a8873565af396d4c051d0dcdcfcd112fe4e43008361dabe2dcdcf5e0d39814e5' },
  '37': { name: 'Green Woven Silk Saree', description: 'Green saree with woven motifs and zari border.', category: 'Sarees', subCategory: 'Silk Sarees', price: 2500, hash: '1e8e23aeb8d70b9213ae15ac20175c0d35e88cbdadc93b8ed8d86ffd02ef8a8a' },
  '38': { name: 'Designer Drape Saree Collection', description: 'Collection of beige, blush pink and navy sarees.', category: 'Sarees', subCategory: 'Designer Sarees', price: 6000, hash: '5cc317d0105e936b6b2fa225210e55064f5cf16bd6c0137a4572165ee7c27d15' },
  '39': { name: 'Ready to Drape Saree', description: 'Pre-stitched saree with modern silhouette.', category: 'Sarees', subCategory: 'Designer Sarees', price: 5000, hash: 'b72f9f7d372c0c5c8c90ba446023ae36c2eadcee4d0bb3b3e9ab0474b15d1866' },
  '40': { name: 'Patola Silk Saree', description: 'Traditional Patola silk saree with motifs.', category: 'Sarees', subCategory: 'Silk Sarees', price: 6000, hash: 'd572b2ddeebc5c37c8eb4c63deb69e10c3543589c62374ec45558d4217058267' },
  '41': { name: 'Soft Tissue Silk Saree with Sequin Work', description: 'Pink saree with embroidery and sequin border.', category: 'Sarees', subCategory: 'Silk Sarees', price: 4500, hash: '59faa94e5e6422d3d7e99a492e212774569ccc6fe656c8d961b1a24c46a99e51' },
  '42': { name: 'Pistachio Yellow Saree with Gold Brocade Pallu and Gotta Pati Work', description: 'Pistachio saree with broad gold brocade-style pallu.', category: 'Sarees', subCategory: 'Cotton Sarees', price: 3000, hash: '99b897073a1de279d53b0fcbbe86a332f7f39512ff4ce991a971ab3bc6f16ada' },
  '43': { name: 'Designer Drape Saree with Belt', description: 'Stylish ready-to-drape saree paired with an elegant belt for a modern and sophisticated look. Perfect for parties, receptions, and special occasions.', category: 'Sarees', subCategory: 'Designer Sarees', price: 6999, hash: '80e7565da17614679d2692fa51522b34655a1f199c3261dae7c50fe1a866bf5c' },
  '44': { name: 'Designer Drape Saree with Belt', description: 'Elegant ready-to-drape saree paired with a stylish belt, designed for a modern and glamorous look. Perfect for parties, receptions, and special occasions.', category: 'Sarees', subCategory: 'Designer Sarees', price: 3999, hash: '6a80753ef9c993d26fe71435e556bb46ff4a773d1a872107ea651beaa6408478' },
  '45': { name: 'Designer Drape Saree with Belt', description: 'Stylish ready-to-drape saree designed for a modern and elegant look. Comes with a fashionable waist belt (design may vary slightly from image), perfect for parties and special occasions.', category: 'Sarees', subCategory: 'Designer Sarees', price: 3999, hash: '4707c2a83d3a603efae7c5ce53c3d7fcf7e3af58a5f35903db3305daf0e2e676' },
  '46': { name: 'Designer Drape Saree with Cut Dana Work & Belt', description: 'Elegant ready-to-drape saree featuring beautiful cut dana work and a stylish waist belt for a modern, glamorous look. Perfect for parties, weddings, and special occasions.', category: 'Sarees', subCategory: 'Designer Sarees', price: 4999, hash: 'b28d4b2350c7a5c4b536e47a6eae917261e8a6817c6ac7ba49791841eacb5873' },
  '47': { name: 'Tissue Silk Saree with Mirror Work Blouse', description: 'Elegant tissue silk saree paired with a stunning mirror work blouse, designed to add a rich and graceful touch to your festive and wedding look.', category: 'Sarees', subCategory: 'Silk Sarees', price: 4999, hash: '0ed429197315f353718198447e25e4ca6d9a0d983458f45e97a7cb8f9e5d1a72' },
  '48': { name: 'Move Colour Drape Saree with Belt & Cut Dana Work', description: 'Elegant ready-to-drape saree featuring beautiful cut dana work and a stylish waist belt for a modern, glamorous look. Perfect for parties, weddings, and special occasions.', category: 'Sarees', subCategory: 'Designer Sarees', price: 6999, hash: '8cdccfde2a167d487c3205b689ee2076a769c083ef4c6dee1146c91e3abd4d94' },
};

const deriveFabricFromCategory = (category: string) => {
  const value = category.toLowerCase();
  if (value.includes('silk')) return 'Silk';
  if (value.includes('cotton')) return 'Cotton';
  if (value.includes('net')) return 'Net';
  if (value.includes('designer')) return 'Premium Fabric';
  return 'Cotton';
};

const buildProductFromSheet = (id: string, item: ProductSheetOverride): Product => ({
  id,
  name: item.name,
  price: item.price,
  image: instaImg(item.hash),
  category: item.category === 'Suit' ? 'Suit' : item.subCategory,
  fabric: deriveFabricFromCategory(item.subCategory),
  color: 'Multi',
  availability: 'in_stock',
  collection: item.category === 'Suit' ? 'Suit Collection' : 'Saree Collection',
  description: item.description,
});

const overriddenProducts = baseProducts.map((product) => {
  const override = sheetOverrides[product.id];
  if (!override) return product;
  return {
    ...product,
    name: override.name,
    description: override.description,
    price: override.price,
    image: instaImg(override.hash),
    category: override.category === 'Suit' ? 'Suit' : override.subCategory,
  };
});

const existingIds = new Set(overriddenProducts.map((product) => product.id));
const appendedSheetProducts = Object.entries(sheetOverrides)
  .filter(([id]) => !existingIds.has(id))
  .map(([id, item]) => buildProductFromSheet(id, item));

export const products: Product[] = [...overriddenProducts, ...appendedSheetProducts];

// ── Filter Helpers ────────────────────────────────────────────────

export const getProductsByCategory = (category: string): Product[] =>
  products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));

export const getProductsByFabric = (fabric: string): Product[] =>
  products.filter(p => p.fabric.toLowerCase().includes(fabric.toLowerCase()));

export const getProductsByColor = (color: string): Product[] =>
  products.filter(p => p.color.toLowerCase() === color.toLowerCase());

export const getProductsByPriceRange = (min: number, max: number): Product[] =>
  products.filter(p => p.price >= min && p.price <= max);

export const getProductsByAvailability = (available: boolean): Product[] =>
  products.filter(p => available ? p.availability === 'in_stock' : p.availability === 'out_of_stock');

export const getUniqueColors = (): string[] =>
  [...new Set(products.map(p => p.color))].sort();

export const getUniqueCategories = (): string[] =>
  [...new Set(products.map(p => p.category))].sort();

export const getUniqueFabrics = (): string[] =>
  [...new Set(products.map(p => p.fabric))].sort();

export const getUniqueCollections = (): string[] =>
  [...new Set(products.map(p => p.collection).filter(Boolean) as string[])].sort();
