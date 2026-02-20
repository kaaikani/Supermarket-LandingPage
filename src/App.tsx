import { Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { Award, Banknote, CheckCircle2, Clock3, CreditCard, Gift, Mail, Package, Phone, QrCode, ShoppingCart, Star, Truck, User } from "lucide-react";
import "./App.css";

const bubbleApple = "/ai-generated/bubble-apple.svg";
const bubbleBanana = "/ai-generated/bubble-banana.svg";
const bubbleTomato = "/ai-generated/bubble-tomato.svg";
const bubbleCarrot = "/ai-generated/bubble-carrot.svg";
const bubbleBroccoli = "/ai-generated/bubble-broccoli.svg";
const bubbleOnion = "/ai-generated/bubble-onion.svg";
const bubbleGrapes = "/ai-generated/bubble-grapes.svg";
const bubbleOrange = "/ai-generated/bubble-orange.svg";
const bannerImage = "/banner.jpg";
const bannerOffersSvg = "/ai-generated/banner-offers.svg";
const bannerDiscountSvg = "/ai-generated/banner-discount.svg";
const bannerFreshSvg = "/ai-generated/banner-fresh.svg";

type ProductCategory = "Fruits & Vegetables" | "Rice & Grains" | "Oils & Ghee" | "Dairy Products" | "Grocery & Essentials" | "Beverages";

type Product = { id: number; name: string; category: ProductCategory; unit: string; price: number; sku: string; stock: "In Stock" | "Low Stock"; images: string[]; };
type Review = { name: string; orderId: string; rating: number; comment: string; date: string; };

type BaseProduct = Omit<Product, "images">;
const baseProductCatalog: BaseProduct[] = [
  { id: 1, name: "Apple", category: "Fruits & Vegetables", unit: "1 kg", price: 180, sku: "FVG-001", stock: "In Stock" },
  { id: 2, name: "Banana", category: "Fruits & Vegetables", unit: "1 dozen", price: 65, sku: "FVG-002", stock: "In Stock" },
  { id: 3, name: "Orange", category: "Fruits & Vegetables", unit: "1 kg", price: 120, sku: "FVG-003", stock: "In Stock" },
  { id: 4, name: "Mango", category: "Fruits & Vegetables", unit: "1 kg", price: 190, sku: "FVG-004", stock: "Low Stock" },
  { id: 5, name: "Tomato", category: "Fruits & Vegetables", unit: "1 kg", price: 55, sku: "FVG-005", stock: "In Stock" },
  { id: 6, name: "Potato", category: "Fruits & Vegetables", unit: "1 kg", price: 42, sku: "FVG-006", stock: "In Stock" },
  { id: 7, name: "Onion", category: "Fruits & Vegetables", unit: "1 kg", price: 48, sku: "FVG-007", stock: "In Stock" },
  { id: 8, name: "Carrot", category: "Fruits & Vegetables", unit: "500 g", price: 44, sku: "FVG-008", stock: "In Stock" },
  { id: 9, name: "Spinach", category: "Fruits & Vegetables", unit: "250 g", price: 28, sku: "FVG-009", stock: "Low Stock" },
  { id: 10, name: "Basmati Rice", category: "Rice & Grains", unit: "5 kg", price: 899, sku: "RIG-001", stock: "In Stock" },
  { id: 11, name: "Ponni Rice", category: "Rice & Grains", unit: "5 kg", price: 640, sku: "RIG-002", stock: "In Stock" },
  { id: 12, name: "Brown Rice", category: "Rice & Grains", unit: "2 kg", price: 420, sku: "RIG-003", stock: "In Stock" },
  { id: 13, name: "Wheat Flour", category: "Rice & Grains", unit: "1 kg", price: 62, sku: "RIG-004", stock: "In Stock" },
  { id: 14, name: "Ragi Flour", category: "Rice & Grains", unit: "1 kg", price: 78, sku: "RIG-005", stock: "Low Stock" },
  { id: 15, name: "Sunflower Oil", category: "Oils & Ghee", unit: "1 L", price: 180, sku: "OIG-001", stock: "In Stock" },
  { id: 16, name: "Groundnut Oil", category: "Oils & Ghee", unit: "1 L", price: 210, sku: "OIG-002", stock: "In Stock" },
  { id: 17, name: "Coconut Oil", category: "Oils & Ghee", unit: "500 ml", price: 165, sku: "OIG-003", stock: "In Stock" },
  { id: 18, name: "Ghee", category: "Oils & Ghee", unit: "500 ml", price: 330, sku: "OIG-004", stock: "Low Stock" },
  { id: 19, name: "Milk", category: "Dairy Products", unit: "1 L", price: 62, sku: "DAR-001", stock: "In Stock" },
  { id: 20, name: "Butter", category: "Dairy Products", unit: "200 g", price: 120, sku: "DAR-002", stock: "In Stock" },
  { id: 21, name: "Cheese", category: "Dairy Products", unit: "200 g", price: 155, sku: "DAR-003", stock: "In Stock" },
  { id: 22, name: "Curd", category: "Dairy Products", unit: "500 g", price: 48, sku: "DAR-004", stock: "In Stock" },
  { id: 23, name: "Paneer", category: "Dairy Products", unit: "200 g", price: 110, sku: "DAR-005", stock: "Low Stock" },
  { id: 24, name: "Sugar", category: "Grocery & Essentials", unit: "1 kg", price: 52, sku: "GES-001", stock: "In Stock" },
  { id: 25, name: "Salt", category: "Grocery & Essentials", unit: "1 kg", price: 24, sku: "GES-002", stock: "In Stock" },
  { id: 26, name: "Turmeric Powder", category: "Grocery & Essentials", unit: "200 g", price: 48, sku: "GES-003", stock: "In Stock" },
  { id: 27, name: "Chilli Powder", category: "Grocery & Essentials", unit: "200 g", price: 62, sku: "GES-004", stock: "Low Stock" },
  { id: 28, name: "Toor Dal", category: "Grocery & Essentials", unit: "1 kg", price: 170, sku: "GES-005", stock: "In Stock" },
  { id: 29, name: "Moong Dal", category: "Grocery & Essentials", unit: "1 kg", price: 155, sku: "GES-006", stock: "In Stock" },
  { id: 30, name: "Tea", category: "Beverages", unit: "500 g", price: 240, sku: "BEV-001", stock: "In Stock" },
  { id: 31, name: "Coffee", category: "Beverages", unit: "250 g", price: 190, sku: "BEV-002", stock: "In Stock" },
  { id: 32, name: "Fruit Juice", category: "Beverages", unit: "1 L", price: 95, sku: "BEV-003", stock: "In Stock" },
  { id: 33, name: "Soft Drinks", category: "Beverages", unit: "750 ml", price: 52, sku: "BEV-004", stock: "In Stock" },
];

const buildProductImages = (name: string) => {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return [
    `/products-generated/${slug}-1.svg`,
    `/products-generated/${slug}-2.svg`,
    `/products-generated/${slug}-3.svg`,
  ];
};

const productCatalog: Product[] = baseProductCatalog.map((item) => ({
  ...item,
  images: buildProductImages(item.name),
}));
const categories = ["All", "Fruits & Vegetables", "Rice & Grains", "Oils & Ghee", "Dairy Products", "Grocery & Essentials", "Beverages"] as const;
const heroSlides = [
  { accent: "Offers", title1: "Fresh Quality,", title2: "Every Day", text: "Weekly deal bundles on fresh essentials and groceries.", image: bannerOffersSvg, background: bannerImage, cta1: "Shop Offers", cta2: "Contact Us" },
  { accent: "Discount Sale", title1: "Big Discount,", title2: "Smart Shopping", text: "Limited-time savings on rice, oils, groceries, and more.", image: bannerDiscountSvg, background: bannerImage, cta1: "View Discounts", cta2: "Learn More" },
  { accent: "Fresh Arrivals", title1: "Fresh Arrivals,", title2: "Daily Picks", text: "Newly stocked items delivered quickly with live updates.", image: bannerFreshSvg, background: bannerImage, cta1: "See New Items", cta2: "Contact Us" },
];
const promoOffers = ["Free delivery above Rs. 499", "10% discount for first order", "Buy 1 Get 1 Free on selected items"];
const aboutHighlights = ["Daily quality checks for all fresh and packed products", "Transparent pricing and weekly value deals", "Fast doorstep delivery with live status updates", "Dedicated support for order and payment assistance", "Carefully curated essentials from trusted brands", "Hygienic storage and handling standards"];
const orderSamples = [
  { id: "FM-1051", placed: "Feb 18, 2026", status: "Out for Delivery", amount: "Rs. 1,460", items: "8 items" },
  { id: "FM-1048", placed: "Feb 16, 2026", status: "Delivered", amount: "Rs. 920", items: "5 items" },
  { id: "FM-1042", placed: "Feb 15, 2026", status: "Delivered", amount: "Rs. 1,280", items: "7 items" },
  { id: "FM-1039", placed: "Feb 14, 2026", status: "Shipped", amount: "Rs. 710", items: "4 items" },
];
const initialReviews: Review[] = [
  { name: "Anitha R.", orderId: "FM-1048", rating: 5, comment: "Delivery was on time and all items were packed very neatly.", date: "Feb 16, 2026" },
  { name: "Rahul K.", orderId: "FM-1042", rating: 4, comment: "Good app experience. Easy to track and rider called before arrival.", date: "Feb 15, 2026" },
  { name: "Sana M.", orderId: "FM-1039", rating: 5, comment: "Fresh groceries and professional delivery every time.", date: "Feb 14, 2026" },
];
const deliverySteps = ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

function FloatingBubbles() {
    const bubbleItems = [
    { key: "apple", image: bubbleApple },
    { key: "banana", image: bubbleBanana },
    { key: "tomato", image: bubbleTomato },
    { key: "carrot", image: bubbleCarrot },
    { key: "broccoli", image: bubbleBroccoli },
    { key: "onion", image: bubbleOnion },
    { key: "grapes", image: bubbleGrapes },
    { key: "orange", image: bubbleOrange },
  ];

  return (
    <div className="bubble-field" aria-hidden>
      {bubbleItems.map((item, index) => (
        <span
          key={item.key}
          className="bubble"
          style={
            {
              "--size": `${76 + (index % 4) * 16}px`,
              "--left": `${(index * 11) % 88 + 3}%`,
              "--delay": `${index * -2.5}s`,
              "--duration": `${24 + (index % 5) * 4}s`,
            } as CSSProperties
          }
        >
          <img src={item.image} alt="" />
        </span>
      ))}
    </div>
  );
}

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(12, 41, 20, 0.82) 0%, rgba(20, 56, 28, 0.68) 55%, rgba(45, 98, 50, 0.58) 100%), url(${heroSlides[activeSlide].background})`,
        }}
      >
        <div className="hero-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {heroSlides.map((slide, index) => (
            <article className="hero-slide" key={slide.accent}>
              <div className="hero-content">
                <p className="hero-badge">{slide.accent}</p>
                <h1>
                  {slide.title1}
                  <br />
                  <span>{slide.title2}</span>
                </h1>
                <p>{slide.text}</p>
                <div className="buttons">
                  <button className="learn">{slide.cta1}</button>
                  <button className="contact">{slide.cta2}</button>
                </div>
              </div>
              <div className="hero-image">
                <img src={slide.image} alt={`FreshMart ${slide.accent}`} loading={index === 0 ? "eager" : "lazy"} />
              </div>
            </article>
          ))}
        </div>
        <div className="hero-dots">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.accent}
              className={activeSlide === index ? "active-dot" : ""}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to ${slide.accent} banner`}
            />
          ))}
        </div>
      </section>

      <section className="offer-strip">
        {promoOffers.map((offer) => (
          <div className="offer-item" key={offer}>
            <Gift size={16} />
            <span>{offer}</span>
          </div>
        ))}
      </section>

      <section className="why">
        <h2>Why Choose FreshMart?</h2>
        <p className="subtitle">We are committed to safe products, smart pricing, and dependable service</p>
        <div className="features">
          <div className="feature-card">
            <div className="icon">Open</div>
            <h3>Open 7 Days</h3>
            <p>Extended store and delivery timings for your convenience</p>
          </div>
          <div className="feature-card">
            <div className="icon">Fast</div>
            <h3>Quick Delivery</h3>
            <p>Faster order fulfillment with live tracking updates</p>
          </div>
          <div className="feature-card">
            <div className="icon">Best</div>
            <h3>Trusted Quality</h3>
            <p>Freshness checks and quality assurance on every order</p>
          </div>
        </div>
      </section>
    </>
  );
}

function Products() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [activeSlides, setActiveSlides] = useState<Record<number, number>>({});
  const [zoomView, setZoomView] = useState<{ product: Product; imageIndex: number } | null>(null);

  const filteredProducts = useMemo(
    () => (category === "All" ? productCatalog : productCatalog.filter((product) => product.category === category)),
    [category],
  );
  const shiftCardSlide = (id: number, total: number, direction: 1 | -1) => {
    setActiveSlides((prev) => ({ ...prev, [id]: ((prev[id] ?? 0) + direction + total) % total }));
  };

  return (
    <>
      <section className="products">
        <div className="products-header">
          <div>
            <h1>Our Products</h1>
            <p>Complete supermarket essentials across fresh produce, grains, oils, dairy, grocery, and beverages</p>
          </div>
          <button className="cart-btn">
            <ShoppingCart size={18} />
            Cart
          </button>
        </div>

        <div className="categories">
          {categories.map((cat) => (
            <button key={cat} className={category === cat ? "active-category" : ""} onClick={() => setCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>

        <p className="show-count">Showing {filteredProducts.length} products</p>

        <div className="product-grid">
          {filteredProducts.map((item) => {
            const index = activeSlides[item.id] ?? 0;
            return (
              <article className="product-card" key={item.id}>
                <div className="product-media">
                  <button
                    className="media-image-btn"
                    onClick={() => setZoomView({ product: item, imageIndex: index })}
                    aria-label={`Open ${item.name} image gallery`}
                  >
                    <img src={item.images[index]} alt={item.name} loading="lazy" />
                  </button>
                  <button className="media-nav prev" onClick={() => shiftCardSlide(item.id, item.images.length, -1)} aria-label={`Previous image for ${item.name}`}>
                    &#10094;
                  </button>
                  <button className="media-nav next" onClick={() => shiftCardSlide(item.id, item.images.length, 1)} aria-label={`Next image for ${item.name}`}>
                    &#10095;
                  </button>
                  <div className="media-dots">
                    {item.images.map((_, dot) => (
                      <button
                        key={dot}
                        className={dot === index ? "active-media-dot" : ""}
                        onClick={() => setActiveSlides((prev) => ({ ...prev, [item.id]: dot }))}
                        aria-label={`Show image ${dot + 1} for ${item.name}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="product-body">
                  <div className="product-topline">
                    <p className="product-category">{item.category}</p>
                    <p className={`stock ${item.stock === "Low Stock" ? "low" : "in"}`}>{item.stock}</p>
                  </div>
                  <h3>{item.name}</h3>
                  <p className="product-meta">SKU: {item.sku}</p>
                  <div className="product-bottom">
                    <div>
                      <p className="price">Rs. {item.price}</p>
                      <p className="unit">{item.unit}</p>
                    </div>
                    <button className="add-btn">Add</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {zoomView && (
        <div className="zoom-modal" onClick={() => setZoomView(null)}>
          <div className="zoom-card" onClick={(event) => event.stopPropagation()}>
            <button className="zoom-close" onClick={() => setZoomView(null)} aria-label="Close product image view">
              &times;
            </button>
            <img src={zoomView.product.images[zoomView.imageIndex]} alt={zoomView.product.name} />
            <div className="zoom-footer">
              <h3>{zoomView.product.name}</h3>
              <div className="zoom-controls">
                <button
                  onClick={() =>
                    setZoomView((prev) =>
                      prev
                        ? {
                            ...prev,
                            imageIndex: (prev.imageIndex - 1 + prev.product.images.length) % prev.product.images.length,
                          }
                        : prev,
                    )
                  }
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setZoomView((prev) =>
                      prev ? { ...prev, imageIndex: (prev.imageIndex + 1) % prev.product.images.length } : prev,
                    )
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function About() {
  return (
    <section className="info-page">
      <div className="info-wrap">
        <div className="page-head">
          <h1>About FreshMart</h1>
          <p>A modern neighborhood supermarket built for convenience, quality, and trust.</p>
        </div>

        <div className="about-grid">
          <div className="info-card info-card-lg">
            <h2>Our Story</h2>
            <p>
              FreshMart began with a simple vision: make daily shopping easier with dependable quality, fair pricing,
              and friendly service. From staples to specialty products, our shelves are curated to cover everything a
              family needs.
            </p>
            <p>
              We combine in-store standards with digital convenience, so customers can shop confidently from home or in
              person with the same reliable FreshMart experience.
            </p>
          </div>

          <div className="info-card">
            <h2>Quick Facts</h2>
            <div className="stats-list">
              <div className="stat-item">
                <Award size={18} />
                <span>30+ years of trusted service</span>
              </div>
              <div className="stat-item">
                <CheckCircle2 size={18} />
                <span>50+ daily essentials always in stock</span>
              </div>
              <div className="stat-item">
                <Truck size={18} />
                <span>Same-day delivery for eligible areas</span>
              </div>
              <div className="stat-item">
                <User size={18} />
                <span>Dedicated customer support team</span>
              </div>
            </div>
          </div>
        </div>

        <div className="info-card about-image-card">
          <h2>Freshness You Can Trust</h2>
          <div className="about-image-wrap">
            <img src={bannerImage} alt="Freshness You Can Trust" loading="lazy" />
            <div className="about-image-overlay">
              <p>Fresh selections, trusted quality, and warm service for every family.</p>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h2>What Makes Us Different</h2>
          <div className="highlight-grid">
            {aboutHighlights.map((item) => (
              <div className="highlight-item" key={item}>
                <CheckCircle2 size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="info-page">
      <div className="info-wrap">
        <div className="page-head"><h1>Contact FreshMart</h1><p>Need help with a product, delivery, or payment? Our team is ready to assist.</p></div>
        <div className="contact-layout">
          <div className="info-card"><h2>Send a Message</h2><div className="contact-form-grid"><label>Full Name</label><input type="text" placeholder="Enter your full name" /><label>Email Address</label><input type="email" placeholder="Enter your email" /><label>Phone Number</label><input type="text" placeholder="Enter your phone number" /><label>Message</label><textarea rows={5} placeholder="Tell us how we can help" /><button className="action-btn" type="button">Submit Query</button></div></div>
          <div className="info-card"><h2>Store Information</h2><div className="contact-meta"><div className="meta-row"><Package size={20} /><span>FreshMart, 123 Market Street, Springfield, ST 12345</span></div><div className="meta-row"><Phone size={20} /><span>(555) 123-4567</span></div><div className="meta-row"><Mail size={20} /><span>support@freshmart.com</span></div><div className="meta-row"><Clock3 size={20} /><span>Mon-Sat: 7:00 AM-10:00 PM, Sun: 8:00 AM-9:00 PM</span></div></div></div>
        </div>
      </div>
    </section>
  );
}

function Delivery() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const handleSubmitReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!orderId || !comment.trim() || rating === 0) return;
    const next: Review = { name: name.trim() || "Customer", orderId, rating, comment: comment.trim(), date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) };
    setReviews((p) => [next, ...p]);
    setOrderId(""); setComment(""); setName(""); setRating(0); setHoverRating(0);
  };

  return (
    <section className="info-page"><div className="info-wrap"><div className="page-head"><h1>Delivery & Service Feedback</h1><p>Track deliveries, find our location, and share your shopping experience.</p></div>
      <div className="promo-banner">{promoOffers.map((o) => <span key={o}>{o}</span>)}</div>
      <div className="delivery-layout"><div className="info-card"><h2>Live Order Tracking</h2><div className="timeline">{deliverySteps.map((step, i) => { const cls = i < 3 ? "done" : i === 3 ? "active" : "pending"; return <div className="timeline-row" key={step}><div className={`timeline-dot ${cls}`}>{i < 3 ? <CheckCircle2 size={16} /> : <Truck size={16} />}</div><div className="timeline-content"><h3>{step}</h3><p>{i === 0 ? "Order confirmed and queued for processing." : i === 1 ? "Items are quality checked and securely packed." : i === 2 ? "Package has left the store and is in transit." : i === 3 ? "Delivery partner is on the way to your address." : "Order delivered successfully to your doorstep."}</p></div></div>; })}</div></div>
      <div className="info-card"><h2>Delivery Location Map</h2><div className="map-box"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841374555896!2d-73.98823492346618!3d40.75797097138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1707825600000!5m2!1sen!2sus" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="FreshMart Location" allowFullScreen /></div><p className="map-caption">Visit us for in-store offers and fresh arrivals.</p></div></div>
      <div className="reviews-section"><div className="info-card"><h2>Rate Our Service</h2><form className="review-form" onSubmit={handleSubmitReview}><label>Your Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Optional" /><label>Order ID (after purchase)</label><select value={orderId} onChange={(e) => setOrderId(e.target.value)}><option value="">Select an order</option><option value="FM-1051">FM-1051</option><option value="FM-1048">FM-1048</option><option value="FM-1042">FM-1042</option><option value="FM-1039">FM-1039</option></select><label>Star Rating</label><div className="star-row">{[1,2,3,4,5].map((v) => <button key={v} type="button" className="star-btn" onMouseEnter={() => setHoverRating(v)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(v)} aria-label={`Rate ${v} stars`}><Star size={24} fill={(hoverRating || rating) >= v ? "currentColor" : "none"} /></button>)}</div><label>Feedback</label><textarea rows={4} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your delivery and service experience" /><button className="action-btn" type="submit">Submit Review</button></form></div>
      <div className="info-card"><h2>Customer App Reviews</h2><div className="review-list">{reviews.map((r, i) => <article className="review-card" key={`${r.orderId}-${i}`}><div className="review-top"><div><h3>{r.name}</h3><p>{r.orderId} • {r.date}</p></div><div className="review-stars">{Array.from({ length: r.rating }).map((_, si) => <Star key={si} size={16} fill="currentColor" />)}</div></div><p>{r.comment}</p></article>)}</div></div></div>
    </div></section>
  );
}
function Orders() {
  const subtotal = 1460; const deliveryCharge = 40; const discount = 150; const finalTotal = subtotal + deliveryCharge - discount;
  return (
    <section className="info-page"><div className="info-wrap"><div className="page-head"><h1>My Orders</h1><p>Track your latest orders, delivery status, and purchase summaries.</p></div>
      <div className="promo-banner">{promoOffers.map((o) => <span key={o}>{o}</span>)}</div>
      <div className="order-grid">{orderSamples.map((o) => <div className="order-card" key={o.id}><div className="order-head"><div><h3>{o.id}</h3><p>Placed on {o.placed}</p></div><span className={`status-pill ${o.status.toLowerCase().replace(/\s+/g, "-")}`}>{o.status}</span></div><div className="order-meta"><p><Package size={16} /> {o.items}</p><p><Truck size={16} /> {o.status}</p></div><div className="order-amount">{o.amount}</div></div>)}</div>
      <div className="payment-layout"><div className="info-card"><h2>Payment Methods</h2><div className="payment-list"><div className="payment-item"><QrCode size={18} /><span>UPI</span></div><div className="payment-item"><CreditCard size={18} /><span>Debit Card</span></div><div className="payment-item"><CreditCard size={18} /><span>Credit Card</span></div><div className="payment-item"><Banknote size={18} /><span>Cash on Delivery</span></div></div></div>
      <div className="info-card"><h2>Order Summary</h2><div className="summary-list"><p><span>Subtotal</span><strong>Rs. {subtotal}</strong></p><p><span>Delivery charge</span><strong>Rs. {deliveryCharge}</strong></p><p><span>Discount</span><strong>- Rs. {discount}</strong></p><p className="total-row"><span>Final Total</span><strong>Rs. {finalTotal}</strong></p></div></div></div>
      <div className="info-card order-help"><h2>Need Help With an Order?</h2><p>If your order is delayed or an item is missing, contact us within 24 hours. Our support team will quickly resolve replacements or refunds.</p><div className="help-row"><span><Phone size={16} /> (555) 123-4567</span><span><Mail size={16} /> support@freshmart.com</span></div></div>
    </div></section>
  );
}

function App() {
  return (
    <div className="app">
      <FloatingBubbles />
      <nav className="navbar"><div className="logo">FreshMart</div><ul className="menu"><li><NavLink to="/" end>Home</NavLink></li><li><NavLink to="/products">Products</NavLink></li><li><NavLink to="/about">About Us</NavLink></li><li><NavLink to="/contact">Contact Us</NavLink></li><li><NavLink to="/delivery">Delivery</NavLink></li><li><NavLink to="/orders">Orders</NavLink></li></ul></nav>
      <main className="page-content"><Routes><Route path="/" element={<Home />} /><Route path="/products" element={<Products />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="/delivery" element={<Delivery />} /><Route path="/orders" element={<Orders />} /></Routes></main>
      <footer className="footer"><div className="footer-container"><div className="footer-column"><h3>FreshMart</h3><p>Your neighborhood supermarket for fresh produce, quality groceries, and everyday essentials.</p></div><div className="footer-column"><h3>Quick Links</h3><ul><li>Home</li><li>About Us</li><li>Products</li><li>Contact Us</li></ul></div><div className="footer-column"><h3>Store Hours</h3><p>Monday - Saturday: 7:00 AM - 10:00 PM</p><p>Sunday: 8:00 AM - 9:00 PM</p></div></div></footer>
    </div>
  );
}

export default App;



















