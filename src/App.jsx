import { useState, useEffect, useContext, createContext, useReducer } from "react";
import { ShoppingCart, Star, Search, Trash2, Plus, Minus, ChevronRight, CreditCard, MapPin, User, CheckCircle, ArrowLeft, Heart, Zap, Shield, Truck, RotateCcw } from "lucide-react";

/* ─── Rupee Formatter ─────────────────────── */
const INR = price => "₹" + Math.round(price * 83).toLocaleString("en-IN");

/* ─── Cart Context ────────────────────────── */
const CartContext = createContext();
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const ex = state.find(i => i.id === action.payload.id);
      return ex ? state.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i)
                : [...state, { ...action.payload, qty: 1 }];
    }
    case "REMOVE": return state.filter(i => i.id !== action.payload);
    case "UPDATE": return state.map(i => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i).filter(i => i.qty > 0);
    case "CLEAR": return [];
    default: return state;
  }
};
function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const add    = item      => dispatch({ type: "ADD",    payload: item });
  const remove = id        => dispatch({ type: "REMOVE", payload: id });
  const update = (id, qty) => dispatch({ type: "UPDATE", payload: { id, qty } });
  const clear  = ()        => dispatch({ type: "CLEAR" });
  const total  = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count  = cart.reduce((s, i) => s + i.qty, 0);
  return <CartContext.Provider value={{ cart, add, remove, update, clear, total, count }}>{children}</CartContext.Provider>;
}

/* ─── Design Tokens ───────────────────────── */
const G  = "linear-gradient(135deg,#ff6b35,#f7931e)";
const GD = "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)";

/* ─── Global CSS ──────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'DM Sans',sans-serif;background:#f9f7f4;color:#1a1a2e;}
  .app{min-height:100vh;display:flex;flex-direction:column;}
  .btn{background:linear-gradient(135deg,#ff6b35,#f7931e);color:#fff;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:600;border-radius:50px;transition:all .22s;}
  .btn:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(255,107,53,.38);}
  .btn-o{background:transparent;border:2px solid #e0dcd8;color:#1a1a2e;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:600;border-radius:50px;transition:all .22s;}
  .btn-o:hover{border-color:#ff6b35;color:#ff6b35;}
  .card{background:#fff;border-radius:20px;box-shadow:0 3px 20px rgba(0,0,0,.07);border:1px solid #f0ede8;transition:all .28s;}
  .card:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(0,0,0,.12);}
  .tag{display:inline-block;background:#fff3ee;color:#ff6b35;font-size:10px;font-weight:700;padding:3px 9px;border-radius:20px;text-transform:uppercase;letter-spacing:.4px;}
  .clamp{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  .fade{animation:fi .35s ease;}
  @keyframes fi{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  .pulse{animation:pl .38s ease;}
  @keyframes pl{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
  .skel{background:linear-gradient(90deg,#ede9e4 25%,#e4e0db 50%,#ede9e4 75%);background-size:200% 100%;animation:sk 1.4s infinite;border-radius:18px;}
  @keyframes sk{0%{background-position:200% 0}100%{background-position:-200% 0}}
  input,select{font-family:'DM Sans',sans-serif;outline:none;}
  input:focus,select:focus{border-color:#ff6b35!important;box-shadow:0 0 0 3px rgba(255,107,53,.1);}
  ::-webkit-scrollbar{width:5px;height:5px;}
  ::-webkit-scrollbar-thumb{background:#ccc;border-radius:3px;}
`;

/* ─── Unsplash Photos by category ────────── */
const PHOTOS = {
  "electronics": [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e736b2c8ac?w=400&q=80",
    "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400&q=80",
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80",
  ],
  "men's clothing": [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80",
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&q=80",
  ],
  "women's clothing": [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80",
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80",
  ],
  "jewelery": [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
  ],
  "default": [
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",
  ]
};
const getPhoto = (cat, id) => {
  const key  = cat?.toLowerCase();
  const list = PHOTOS[key] || PHOTOS["default"];
  return list[id % list.length];
};

/* ─── Fallback Products ───────────────────── */
const FALLBACK = [
  { id:1,  title:"Noise-Cancelling Headphones",   price:59.99, category:"electronics",     description:"Premium 30hr battery, deep bass, crystal-clear highs.",      rating:{rate:4.5,count:320} },
  { id:2,  title:"Smart Fitness Watch",            price:44.99, category:"electronics",     description:"Track steps, heart rate, sleep. Water-resistant.",            rating:{rate:4.2,count:210} },
  { id:3,  title:"Portable Bluetooth Speaker",     price:29.99, category:"electronics",     description:"360 surround sound, 12hr playtime, waterproof.",              rating:{rate:4.3,count:180} },
  { id:4,  title:"4K Action Camera",               price:74.99, category:"electronics",     description:"4K60fps, wide-angle lens, waterproof up to 30m.",             rating:{rate:4.6,count:410} },
  { id:5,  title:"Wireless Charging Pad",          price:19.99, category:"electronics",     description:"15W fast wireless charging, compatible with all Qi devices.", rating:{rate:4.1,count:155} },
  { id:6,  title:"Classic Slim Fit Shirt",         price:24.99, category:"men's clothing",  description:"Premium cotton blend, wrinkle-resistant.",                    rating:{rate:4.1,count:150} },
  { id:7,  title:"Men's Running Sneakers",         price:54.99, category:"men's clothing",  description:"Lightweight mesh upper, responsive cushioning.",              rating:{rate:4.4,count:290} },
  { id:8,  title:"Men's Puffer Jacket",            price:69.99, category:"men's clothing",  description:"Lightweight water-resistant puffer, warm down fill.",         rating:{rate:4.4,count:230} },
  { id:9,  title:"Men's Chino Trousers",           price:32.99, category:"men's clothing",  description:"Stretch cotton chinos with modern slim fit.",                 rating:{rate:4.0,count:140} },
  { id:10, title:"Women's Floral Summer Dress",    price:36.99, category:"women's clothing",description:"Breezy floral print, midi length, perfect for warm weather.", rating:{rate:4.6,count:400} },
  { id:11, title:"Women's Leather Tote Bag",       price:49.99, category:"women's clothing",description:"Spacious genuine leather tote with interior pockets.",        rating:{rate:4.3,count:175} },
  { id:12, title:"Women's Yoga Leggings",          price:26.99, category:"women's clothing",description:"High-waist, squat-proof, 4-way stretch fabric.",              rating:{rate:4.5,count:480} },
  { id:13, title:"Women's Knit Sweater",           price:39.99, category:"women's clothing",description:"Soft ribbed knit, relaxed fit, available in 6 colours.",      rating:{rate:4.2,count:220} },
  { id:14, title:"Gold Hoop Earrings Set",         price:17.99, category:"jewelery",        description:"Set of 3 pairs, hypoallergenic gold-plated.",                 rating:{rate:4.7,count:530} },
  { id:15, title:"Crystal Pendant Necklace",       price:22.99, category:"jewelery",        description:"Swarovski crystal pendant on 18k gold-plated chain.",         rating:{rate:4.5,count:310} },
  { id:16, title:"Diamond Tennis Bracelet",        price:84.99, category:"jewelery",        description:"Cubic zirconia stones in classic tennis bracelet setting.",    rating:{rate:4.8,count:620} },
].map(p => ({ ...p, image: getPhoto(p.category, p.id) }));

/* ─── Stars ───────────────────────────────── */
function Stars({ rating }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:2 }}>
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={11} color={s<=Math.round(rating)?"#fbbf24":"#ddd"} fill={s<=Math.round(rating)?"#fbbf24":"none"}/>
      ))}
      <span style={{ fontSize:11, color:"#aaa", marginLeft:3 }}>{rating?.toFixed(1)}</span>
    </div>
  );
}

/* ─── Navbar ──────────────────────────────── */
function Navbar({ page, setPage }) {
  const { count } = useContext(CartContext);
  return (
    <nav style={{ background:"#fff", borderBottom:"1px solid #f0ede8", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 14px rgba(0,0,0,.04)" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", height:62, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div onClick={() => setPage({ name:"home" })} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ background:G, width:34, height:34, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center" }}><Zap size={17} color="#fff"/></div>
          <span style={{ fontFamily:"Syne", fontWeight:800, fontSize:19, letterSpacing:"-0.5px" }}>Shop<span style={{ color:"#ff6b35" }}>Hub</span></span>
        </div>
        <div style={{ display:"flex", gap:28, alignItems:"center" }}>
          {[["home","Home"],["products","Products"]].map(([n,l]) => (
            <button key={n} onClick={() => setPage({ name:n })} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"DM Sans", fontWeight:600, fontSize:14, color:page.name===n?"#ff6b35":"#666", borderBottom:page.name===n?"2px solid #ff6b35":"2px solid transparent", paddingBottom:2, transition:"color .2s" }}>{l}</button>
          ))}
        </div>
        <button onClick={() => setPage({ name:"cart" })} style={{ position:"relative", background:count>0?"#fff3ee":"none", border:"none", cursor:"pointer", padding:8, borderRadius:10 }}>
          <ShoppingCart size={21} color={count>0?"#ff6b35":"#1a1a2e"}/>
          {count > 0 && <span style={{ position:"absolute", top:0, right:0, background:G, color:"#fff", fontSize:9, fontWeight:800, borderRadius:"50%", width:17, height:17, display:"flex", alignItems:"center", justifyContent:"center" }}>{count}</span>}
        </button>
      </div>
    </nav>
  );
}

/* ─── Footer ──────────────────────────────── */
function Footer({ setPage }) {
  return (
    <footer style={{ background:"#1a1a2e", color:"#7a7a9a", marginTop:"auto", padding:"44px 24px 20px" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:28 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
            <div style={{ background:G, width:30, height:30, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}><Zap size={15} color="#fff"/></div>
            <span style={{ fontFamily:"Syne", fontWeight:800, color:"#fff", fontSize:17 }}>Shop<span style={{ color:"#ff6b35" }}>Hub</span></span>
          </div>
          <p style={{ fontSize:13, lineHeight:1.6 }}>Your modern Indian marketplace.</p>
        </div>
        <div>
          <p style={{ color:"#fff", fontWeight:700, marginBottom:10, fontSize:13 }}>Navigate</p>
          {[["home","Home"],["products","Products"],["cart","Cart"]].map(([n,l]) => (
            <button key={n} onClick={() => setPage({ name:n })} style={{ display:"block", background:"none", border:"none", cursor:"pointer", color:"#7a7a9a", fontSize:13, padding:"3px 0", fontFamily:"DM Sans" }} onMouseEnter={e=>e.target.style.color="#ff6b35"} onMouseLeave={e=>e.target.style.color="#7a7a9a"}>{l}</button>
          ))}
        </div>
        <div>
          <p style={{ color:"#fff", fontWeight:700, marginBottom:10, fontSize:13 }}>Support</p>
          {["support@shophub.in","+91 98765 43210","Mon-Sat, 9am-7pm IST"].map(t=><p key={t} style={{ fontSize:13, padding:"3px 0" }}>{t}</p>)}
        </div>
        <div>
          <p style={{ color:"#fff", fontWeight:700, marginBottom:10, fontSize:13 }}>Payment</p>
          {["UPI / GPay","Debit / Credit Card","Cash on Delivery"].map(t=><p key={t} style={{ fontSize:13, padding:"3px 0" }}>{t}</p>)}
        </div>
      </div>
      <div style={{ maxWidth:1280, margin:"28px auto 0", borderTop:"1px solid #2d2d4e", paddingTop:18, textAlign:"center", fontSize:12 }}>
        2024 ShopHub India. All rights reserved.
      </div>
    </footer>
  );
}

/* ─── Product Card ────────────────────────── */
function ProductCard({ product, setPage }) {
  const { add } = useContext(CartContext);
  const [flash, setFlash] = useState(false);
  const handleAdd = e => { e.stopPropagation(); add(product); setFlash(true); setTimeout(()=>setFlash(false),1200); };
  return (
    <div className="card" onClick={() => setPage({ name:"product", id:product.id })} style={{ cursor:"pointer", overflow:"hidden", display:"flex", flexDirection:"column" }}>
      <div style={{ position:"relative", height:200, overflow:"hidden", background:"#faf8f5" }}>
        <img src={product.image} alt={product.title}
          style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .35s" }}
          onMouseEnter={e=>e.target.style.transform="scale(1.07)"} onMouseLeave={e=>e.target.style.transform="scale(1)"}
          onError={e=>{ e.target.src=getPhoto(product.category, product.id); }}/>
        {product.rating?.count > 300 && <span style={{ position:"absolute", top:9, left:9, background:"#ff6b35", color:"#fff", fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:20 }}>HOT</span>}
        <button onClick={e=>e.stopPropagation()} style={{ position:"absolute", top:9, right:9, background:"rgba(255,255,255,.9)", border:"none", borderRadius:"50%", width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><Heart size={13} color="#ccc"/></button>
      </div>
      <div style={{ padding:"14px 16px 16px", flex:1, display:"flex", flexDirection:"column", gap:6 }}>
        <span className="tag">{product.category}</span>
        <p className="clamp" style={{ fontSize:13, fontWeight:600, color:"#1a1a2e", lineHeight:1.45 }}>{product.title}</p>
        <Stars rating={product.rating?.rate}/>
        <div style={{ marginTop:"auto", display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:8 }}>
          <div>
            <span style={{ fontFamily:"Syne", fontWeight:800, fontSize:17, color:"#1a1a2e" }}>{INR(product.price)}</span>
            <span style={{ fontSize:10, color:"#aaa", marginLeft:5 }}>incl. GST</span>
          </div>
          <button className={`btn${flash?" pulse":""}`} onClick={handleAdd}
            style={{ padding:"7px 13px", fontSize:12, background:flash?"linear-gradient(135deg,#22c55e,#16a34a)":G, display:"flex", alignItems:"center", gap:4 }}>
            {flash?<><CheckCircle size={12}/>Added!</>:<><Plus size={12}/>Add</>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Home Page ───────────────────────────── */
function HomePage({ setPage, products, loading }) {
  const cats = [...new Set(products.map(p => p.category))];
  const catMeta = { "electronics":{icon:"",color:"#3b82f6",bg:"#eff6ff"}, "jewelery":{icon:"",color:"#a855f7",bg:"#faf5ff"}, "men's clothing":{icon:"",color:"#0ea5e9",bg:"#f0f9ff"}, "women's clothing":{icon:"",color:"#ec4899",bg:"#fdf2f8"} };
  return (
    <div className="fade">
      {/* Hero */}
      <div style={{ background:GD, padding:"72px 24px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 20% 50%,rgba(255,107,53,.15) 0%,transparent 50%)" }}/>
        <div style={{ maxWidth:660, margin:"0 auto", position:"relative" }}>
          <div style={{ display:"inline-block", background:"rgba(255,107,53,.15)", border:"1px solid rgba(255,107,53,.3)", color:"#ff6b35", padding:"5px 14px", borderRadius:20, fontSize:11, fontWeight:700, letterSpacing:1, marginBottom:18, textTransform:"uppercase" }}>
            Free Delivery across India
          </div>
          <h1 style={{ fontFamily:"Syne", fontWeight:800, fontSize:"clamp(2rem,6vw,3.6rem)", color:"#fff", lineHeight:1.1, marginBottom:18, letterSpacing:"-1px" }}>
            Shop Smart,<br/><span style={{ WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", background:G, backgroundClip:"text" }}>Save More</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,.6)", fontSize:16, marginBottom:32, lineHeight:1.65 }}>
            Electronics, Fashion, Jewellery and more.<br/>All prices in Indian Rupees.
          </p>
          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
            <button className="btn" onClick={() => setPage({ name:"products" })} style={{ padding:"13px 30px", fontSize:14 }}>Shop Now</button>
            <button onClick={() => setPage({ name:"products" })} style={{ padding:"13px 30px", fontSize:14, cursor:"pointer", background:"transparent", border:"2px solid rgba(255,255,255,.2)", color:"#fff", borderRadius:50, fontFamily:"DM Sans", fontWeight:600 }}>View All</button>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div style={{ background:"#fff", borderBottom:"1px solid #f0ede8" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"18px 24px", display:"flex", justifyContent:"center", gap:"clamp(20px,4vw,60px)", flexWrap:"wrap" }}>
          {[[Truck,"Free Shipping","On orders Rs 2000+"],[Shield,"Secure Payment","100% protected"],[RotateCcw,"Easy Returns","7-day policy"],[Zap,"Fast Delivery","2-4 business days"]].map(([Icon,t,s])=>(
            <div key={t} style={{ display:"flex", alignItems:"center", gap:9 }}>
              <div style={{ background:"#fff3ee", borderRadius:9, width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon size={15} color="#ff6b35"/></div>
              <div><p style={{ fontSize:12, fontWeight:700, color:"#1a1a2e" }}>{t}</p><p style={{ fontSize:11, color:"#aaa" }}>{s}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"52px 24px 0" }}>
        <h2 style={{ fontFamily:"Syne", fontWeight:800, fontSize:"clamp(1.3rem,3vw,1.9rem)", marginBottom:20 }}>Shop by Category</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:14 }}>
          {cats.map(cat => {
            const m = catMeta[cat] || { icon:"", color:"#ff6b35", bg:"#fff3ee" };
            const icons = { "electronics":"⚡", "jewelery":"💎", "men's clothing":"👔", "women's clothing":"🌸" };
            return (
              <div key={cat} className="card" onClick={() => setPage({ name:"products", category:cat })}
                style={{ padding:"24px 16px", textAlign:"center", cursor:"pointer", background:m.bg, border:`1px solid ${m.color}22` }}>
                <div style={{ fontSize:32, marginBottom:8 }}>{icons[cat]||"🛍️"}</div>
                <p style={{ fontWeight:700, fontSize:13, color:m.color, textTransform:"capitalize" }}>{cat}</p>
                <p style={{ fontSize:11, color:"#aaa", marginTop:3 }}>{products.filter(p=>p.category===cat).length} items</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured */}
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"52px 24px" }}>
        <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:20 }}>
          <h2 style={{ fontFamily:"Syne", fontWeight:800, fontSize:"clamp(1.3rem,3vw,1.9rem)" }}>Featured Products</h2>
          <button onClick={() => setPage({ name:"products" })} style={{ background:"none", border:"none", cursor:"pointer", color:"#ff6b35", fontWeight:700, fontSize:13, display:"flex", alignItems:"center", gap:4, fontFamily:"DM Sans" }}>View All <ChevronRight size={13}/></button>
        </div>
        {loading
          ? <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:18 }}>{[...Array(8)].map((_,i)=><div key={i} className="skel" style={{ height:300 }}/>)}</div>
          : <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:18 }}>{products.slice(0,8).map(p=><ProductCard key={p.id} product={p} setPage={setPage}/>)}</div>}
      </div>
    </div>
  );
}

/* ─── Products Page ───────────────────────── */
function ProductsPage({ setPage, products, loading }) {
  const [search,setSearch]=useState(""); const [cat,setCat]=useState("all"); const [sort,setSort]=useState("default");
  const cats = ["all",...new Set(products.map(p=>p.category))];
  let list = products.filter(p=>p.title.toLowerCase().includes(search.toLowerCase())&&(cat==="all"||p.category===cat));
  if(sort==="low") list=[...list].sort((a,b)=>a.price-b.price);
  if(sort==="high") list=[...list].sort((a,b)=>b.price-a.price);
  if(sort==="rating") list=[...list].sort((a,b)=>b.rating?.rate-a.rating?.rate);
  return (
    <div style={{ maxWidth:1280, margin:"0 auto", padding:"36px 24px" }} className="fade">
      <h1 style={{ fontFamily:"Syne", fontWeight:800, fontSize:"clamp(1.5rem,3vw,2rem)", marginBottom:6 }}>All Products</h1>
      <p style={{ color:"#aaa", marginBottom:24, fontSize:14 }}>{list.length} products found</p>
      <div style={{ display:"flex", gap:10, marginBottom:28, flexWrap:"wrap", background:"#fff", padding:14, borderRadius:14, border:"1px solid #f0ede8" }}>
        <div style={{ position:"relative", flex:"1 1 180px" }}>
          <Search size={14} style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", color:"#bbb" }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." style={{ width:"100%", paddingLeft:32, paddingRight:12, paddingTop:9, paddingBottom:9, border:"1.5px solid #e0dcd8", borderRadius:9, fontSize:13, color:"#1a1a2e" }}/>
        </div>
        <select value={cat} onChange={e=>setCat(e.target.value)} style={{ padding:"9px 12px", border:"1.5px solid #e0dcd8", borderRadius:9, fontSize:13, background:"#fff", cursor:"pointer", textTransform:"capitalize" }}>
          {cats.map(c=><option key={c} value={c} style={{ textTransform:"capitalize" }}>{c==="all"?"All Categories":c}</option>)}
        </select>
        <select value={sort} onChange={e=>setSort(e.target.value)} style={{ padding:"9px 12px", border:"1.5px solid #e0dcd8", borderRadius:9, fontSize:13, background:"#fff", cursor:"pointer" }}>
          <option value="default">Sort: Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
      {loading ? <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:18 }}>{[...Array(12)].map((_,i)=><div key={i} className="skel" style={{ height:300 }}/>)}</div>
        : list.length===0 ? <div style={{ textAlign:"center", padding:"70px 0" }}><div style={{ fontSize:56, marginBottom:14 }}>🔍</div><p style={{ color:"#aaa", fontSize:17, fontWeight:600 }}>No products found</p><button onClick={()=>{setSearch("");setCat("all");}} className="btn" style={{ marginTop:18, padding:"10px 22px", fontSize:13 }}>Clear Filters</button></div>
        : <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:18 }}>{list.map(p=><ProductCard key={p.id} product={p} setPage={setPage}/>)}</div>}
    </div>
  );
}

/* ─── Product Detail ──────────────────────── */
function ProductDetailPage({ productId, products, setPage }) {
  const { add } = useContext(CartContext);
  const [qty,setQty]=useState(1); const [flash,setFlash]=useState(false);
  const product = products.find(p=>p.id===productId);
  if(!product) return <div style={{ textAlign:"center", padding:80, color:"#aaa" }}>Product not found</div>;
  const related = products.filter(p=>p.category===product.category&&p.id!==product.id).slice(0,4);
  const handleAdd=()=>{ for(let i=0;i<qty;i++) add(product); setFlash(true); setTimeout(()=>setFlash(false),1500); };
  return (
    <div style={{ maxWidth:1280, margin:"0 auto", padding:"36px 24px" }} className="fade">
      <button onClick={() => setPage({ name:"products" })} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:5, color:"#aaa", fontSize:13, fontFamily:"DM Sans", marginBottom:28, fontWeight:500 }}>
        <ArrowLeft size={14}/> Back to Products
      </button>
      <div className="card" style={{ padding:28, display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))", gap:36, marginBottom:36 }}>
        <div style={{ background:"#faf8f5", borderRadius:16, overflow:"hidden", minHeight:300, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <img src={product.image} alt={product.title} onError={e=>{ e.target.src=getPhoto(product.category,product.id); }} style={{ width:"100%", height:340, objectFit:"cover" }}/>
        </div>
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", gap:14 }}>
          <div>
            <span className="tag">{product.category}</span>
            <h1 style={{ fontFamily:"Syne", fontWeight:800, fontSize:"clamp(1.3rem,3vw,1.7rem)", color:"#1a1a2e", marginTop:10, lineHeight:1.25 }}>{product.title}</h1>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}><Stars rating={product.rating?.rate}/><span style={{ fontSize:12, color:"#bbb" }}>({product.rating?.count} reviews)</span></div>
          <p style={{ color:"#666", fontSize:14, lineHeight:1.7 }}>{product.description}</p>
          <div>
            <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:34, color:"#1a1a2e" }}>{INR(product.price)}</div>
            <p style={{ fontSize:11, color:"#aaa", marginTop:2 }}>Inclusive of GST. Free delivery on Rs 2000+</p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <span style={{ fontWeight:600, fontSize:13, color:"#555" }}>Qty:</span>
            <div style={{ display:"flex", alignItems:"center", border:"1.5px solid #e0dcd8", borderRadius:10, overflow:"hidden" }}>
              <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{ background:"none", border:"none", cursor:"pointer", padding:"7px 13px" }}><Minus size={13}/></button>
              <span style={{ padding:"7px 14px", fontWeight:700, borderLeft:"1.5px solid #e0dcd8", borderRight:"1.5px solid #e0dcd8" }}>{qty}</span>
              <button onClick={()=>setQty(q=>q+1)} style={{ background:"none", border:"none", cursor:"pointer", padding:"7px 13px" }}><Plus size={13}/></button>
            </div>
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <button className="btn" onClick={handleAdd} style={{ flex:1, padding:"13px 18px", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", gap:7, background:flash?"linear-gradient(135deg,#22c55e,#16a34a)":G, minWidth:150 }}>
              {flash?<><CheckCircle size={15}/>Added!</>:<><ShoppingCart size={15}/>Add to Cart</>}
            </button>
            <button className="btn-o" onClick={()=>{ handleAdd(); setPage({ name:"cart" }); }} style={{ padding:"13px 18px", fontSize:13 }}>Buy Now</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
            {[["Free Ship"],["Secure Pay"],["Easy Return"]].map(([l])=>(
              <div key={l} style={{ background:"#faf8f5", borderRadius:10, padding:"9px 7px", textAlign:"center" }}>
                <p style={{ fontSize:11, color:"#777", fontWeight:600 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {related.length>0&&<div><h2 style={{ fontFamily:"Syne", fontWeight:800, fontSize:"1.3rem", marginBottom:18 }}>Related Products</h2><div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:18 }}>{related.map(p=><ProductCard key={p.id} product={p} setPage={setPage}/>)}</div></div>}
    </div>
  );
}

/* ─── Cart Page ───────────────────────────── */
function CartPage({ setPage }) {
  const { cart, remove, update, total, clear } = useContext(CartContext);
  const inrTotal = total * 83;
  const shipping = inrTotal > 2000 ? 0 : 99;
  const tax      = inrTotal * 0.18;
  const grand    = Math.round(inrTotal + shipping + tax);
  if(!cart.length) return (
    <div style={{ maxWidth:520, margin:"0 auto", textAlign:"center", padding:"72px 24px" }} className="fade">
      <div style={{ fontSize:72, marginBottom:16 }}>🛒</div>
      <h2 style={{ fontFamily:"Syne", fontWeight:800, fontSize:"1.7rem", marginBottom:8 }}>Your cart is empty</h2>
      <p style={{ color:"#aaa", marginBottom:24, fontSize:15 }}>Add some products to get started!</p>
      <button className="btn" onClick={() => setPage({ name:"products" })} style={{ padding:"13px 30px", fontSize:14 }}>Start Shopping</button>
    </div>
  );
  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"36px 24px" }} className="fade">
      <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:24 }}>
        <h1 style={{ fontFamily:"Syne", fontWeight:800, fontSize:"clamp(1.4rem,3vw,2rem)" }}>Cart <span style={{ color:"#bbb", fontWeight:400, fontSize:"0.65em" }}>({cart.length} items)</span></h1>
        <button onClick={clear} style={{ background:"none", border:"none", cursor:"pointer", color:"#ff4444", fontSize:12, fontFamily:"DM Sans", display:"flex", alignItems:"center", gap:4, fontWeight:600 }}><Trash2 size={12}/> Clear All</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr min(340px,38%)", gap:20, alignItems:"start" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {cart.map(item=>(
            <div key={item.id} className="card" style={{ padding:"14px 18px", display:"flex", gap:14, alignItems:"center" }}>
              <div style={{ width:64, height:64, borderRadius:10, overflow:"hidden", flexShrink:0, background:"#faf8f5" }}>
                <img src={item.image} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>{ e.target.src=getPhoto(item.category,item.id); }}/>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:13, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.title}</p>
                <span className="tag" style={{ marginTop:3 }}>{item.category}</span>
                <p style={{ fontFamily:"Syne", fontWeight:700, fontSize:15, color:"#ff6b35", marginTop:5 }}>{INR(item.price*item.qty)}</p>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:7, flexShrink:0 }}>
                <div style={{ display:"flex", alignItems:"center", border:"1.5px solid #e0dcd8", borderRadius:9, overflow:"hidden" }}>
                  <button onClick={()=>update(item.id,item.qty-1)} style={{ background:"none", border:"none", cursor:"pointer", padding:"5px 9px" }}><Minus size={11}/></button>
                  <span style={{ padding:"5px 11px", fontSize:13, fontWeight:700, borderLeft:"1.5px solid #e0dcd8", borderRight:"1.5px solid #e0dcd8" }}>{item.qty}</span>
                  <button onClick={()=>update(item.id,item.qty+1)} style={{ background:"none", border:"none", cursor:"pointer", padding:"5px 9px" }}><Plus size={11}/></button>
                </div>
                <button onClick={()=>remove(item.id)} style={{ background:"#fff0f0", border:"none", cursor:"pointer", borderRadius:7, padding:6 }}><Trash2 size={14} color="#ff4444"/></button>
              </div>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding:22, position:"sticky", top:76 }}>
          <h3 style={{ fontFamily:"Syne", fontWeight:800, fontSize:"1.05rem", marginBottom:18 }}>Order Summary</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:9, fontSize:13, color:"#666", marginBottom:14 }}>
            {[["Subtotal","Rs "+Math.round(inrTotal).toLocaleString("en-IN")],["Delivery",shipping===0?"Free!":"Rs "+shipping],["GST 18%","Rs "+Math.round(tax).toLocaleString("en-IN")]].map(([k,v])=>(
              <div key={k} style={{ display:"flex", justifyContent:"space-between" }}><span>{k}</span><span style={{ fontWeight:600, color:k==="Delivery"&&shipping===0?"#22c55e":"#1a1a2e" }}>{v}</span></div>
            ))}
          </div>
          <div style={{ borderTop:"1.5px solid #f0ede8", paddingTop:14, marginBottom:18, display:"flex", justifyContent:"space-between" }}>
            <span style={{ fontWeight:800, fontFamily:"Syne", fontSize:16 }}>Total</span>
            <span style={{ fontWeight:800, fontFamily:"Syne", fontSize:19, color:"#ff6b35" }}>Rs {grand.toLocaleString("en-IN")}</span>
          </div>
          {shipping>0&&<p style={{ fontSize:11, color:"#aaa", textAlign:"center", marginBottom:12, background:"#faf8f5", padding:"7px 10px", borderRadius:7 }}>Add Rs {(2000-Math.round(inrTotal)).toLocaleString("en-IN")} more for free delivery!</p>}
          <button className="btn" onClick={() => setPage({ name:"checkout" })} style={{ width:"100%", padding:"13px", fontSize:14 }}>Proceed to Checkout</button>
          <button onClick={() => setPage({ name:"products" })} style={{ width:"100%", background:"none", border:"none", cursor:"pointer", color:"#aaa", fontSize:12, marginTop:10, fontFamily:"DM Sans" }}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Checkout Page ───────────────────────── */
function CheckoutPage({ setPage }) {
  const { cart, total, clear } = useContext(CartContext);
  const [form,setForm]=useState({ name:"",email:"",address:"",city:"",phone:"",payment:"upi" });
  const [errors,setErrors]=useState({});
  const [busy,setBusy]=useState(false);
  const [done,setDone]=useState(false);
  const validate=()=>{ const e={}; if(!form.name.trim()) e.name="Required"; if(!form.email.includes("@")) e.email="Valid email"; if(!form.address.trim()) e.address="Required"; if(!form.city.trim()) e.city="Required"; if(form.phone.length<10) e.phone="10 digit number"; return e; };
  const submit=()=>{ const e=validate(); if(Object.keys(e).length){ setErrors(e); return; } setBusy(true); setTimeout(()=>{ setBusy(false); setDone(true); clear(); },2200); };
  const inrTotal=total*83; const shipping=inrTotal>2000?0:99; const grand=Math.round(inrTotal+shipping+inrTotal*0.18);
  const Field=({k,placeholder,type="text"})=>(
    <div>
      <input value={form[k]} onChange={e=>{ setForm({...form,[k]:e.target.value}); setErrors({...errors,[k]:""}); }} placeholder={placeholder} type={type}
        style={{ width:"100%", padding:"10px 13px", border:`1.5px solid ${errors[k]?"#ff4444":"#e0dcd8"}`, borderRadius:9, fontSize:13, background:"#faf8f5", color:"#1a1a2e" }}/>
      {errors[k]&&<p style={{ color:"#ff4444", fontSize:11, marginTop:3 }}>{errors[k]}</p>}
    </div>
  );
  if(done) return (
    <div style={{ maxWidth:480, margin:"0 auto", textAlign:"center", padding:"72px 24px" }} className="fade">
      <div style={{ width:76, height:76, borderRadius:"50%", background:"linear-gradient(135deg,#22c55e,#16a34a)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}><CheckCircle size={38} color="#fff"/></div>
      <h2 style={{ fontFamily:"Syne", fontWeight:800, fontSize:"1.9rem", marginBottom:8 }}>Order Placed!</h2>
      <p style={{ color:"#666", fontSize:15, marginBottom:5 }}>Thank you, <strong>{form.name}</strong>!</p>
      <p style={{ color:"#aaa", marginBottom:28, fontSize:13 }}>Confirmation sent to <strong>{form.email}</strong></p>
      <button className="btn" onClick={() => setPage({ name:"home" })} style={{ padding:"13px 30px", fontSize:14 }}>Back to Home</button>
    </div>
  );
  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"36px 24px" }} className="fade">
      <button onClick={() => setPage({ name:"cart" })} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:5, color:"#aaa", fontSize:13, fontFamily:"DM Sans", marginBottom:24, fontWeight:500 }}><ArrowLeft size={14}/> Back to Cart</button>
      <h1 style={{ fontFamily:"Syne", fontWeight:800, fontSize:"clamp(1.4rem,3vw,2rem)", marginBottom:24 }}>Checkout</h1>
      <div style={{ display:"grid", gridTemplateColumns:"1fr min(340px,38%)", gap:20, alignItems:"start" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div className="card" style={{ padding:22 }}>
            <h3 style={{ fontFamily:"Syne", fontWeight:700, fontSize:"0.95rem", marginBottom:14, display:"flex", alignItems:"center", gap:7 }}><User size={15} color="#ff6b35"/> Personal Information</h3>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}><Field k="name" placeholder="Full Name"/><Field k="email" placeholder="Email Address" type="email"/></div>
          </div>
          <div className="card" style={{ padding:22 }}>
            <h3 style={{ fontFamily:"Syne", fontWeight:700, fontSize:"0.95rem", marginBottom:14, display:"flex", alignItems:"center", gap:7 }}><MapPin size={15} color="#ff6b35"/> Delivery Address</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <Field k="address" placeholder="Flat / Street / Area"/>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}><Field k="city" placeholder="City, State, PIN"/><Field k="phone" placeholder="Mobile Number" type="tel"/></div>
            </div>
          </div>
          <div className="card" style={{ padding:22 }}>
            <h3 style={{ fontFamily:"Syne", fontWeight:700, fontSize:"0.95rem", marginBottom:14, display:"flex", alignItems:"center", gap:7 }}><CreditCard size={15} color="#ff6b35"/> Payment Method</h3>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:9, marginBottom:14 }}>
              {[["upi","UPI / GPay"],["card","Debit/Credit"],["cod","Cash on Delivery"]].map(([v,l])=>(
                <div key={v} onClick={()=>setForm({...form,payment:v})} style={{ border:`2px solid ${form.payment===v?"#ff6b35":"#e0dcd8"}`, borderRadius:11, padding:"11px 7px", textAlign:"center", cursor:"pointer", background:form.payment===v?"#fff3ee":"#faf8f5", transition:"all .18s" }}>
                  <p style={{ fontSize:12, fontWeight:700, color:form.payment===v?"#ff6b35":"#666" }}>{l}</p>
                </div>
              ))}
            </div>
            {form.payment==="card"&&<div style={{ display:"flex", flexDirection:"column", gap:9 }}><input placeholder="Card Number" style={{ padding:"10px 13px", border:"1.5px solid #e0dcd8", borderRadius:9, fontSize:13, background:"#faf8f5", width:"100%", fontFamily:"DM Sans" }}/><div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}><input placeholder="MM / YY" style={{ padding:"10px 13px", border:"1.5px solid #e0dcd8", borderRadius:9, fontSize:13, background:"#faf8f5", fontFamily:"DM Sans" }}/><input placeholder="CVV" style={{ padding:"10px 13px", border:"1.5px solid #e0dcd8", borderRadius:9, fontSize:13, background:"#faf8f5", fontFamily:"DM Sans" }}/></div></div>}
            {form.payment==="upi"&&<input placeholder="yourname@upi" style={{ padding:"10px 13px", border:"1.5px solid #e0dcd8", borderRadius:9, fontSize:13, background:"#faf8f5", width:"100%", fontFamily:"DM Sans" }}/>}
          </div>
        </div>
        <div className="card" style={{ padding:22, position:"sticky", top:76 }}>
          <h3 style={{ fontFamily:"Syne", fontWeight:800, fontSize:"1.05rem", marginBottom:14 }}>Your Order</h3>
          <div style={{ maxHeight:170, overflowY:"auto", display:"flex", flexDirection:"column", gap:7, marginBottom:14 }}>
            {cart.map(item=>(
              <div key={item.id} style={{ display:"flex", gap:9, alignItems:"center" }}>
                <img src={item.image} style={{ width:34, height:34, objectFit:"cover", background:"#faf8f5", borderRadius:7, flexShrink:0 }} onError={e=>{ e.target.src=getPhoto(item.category,item.id); }}/>
                <p style={{ flex:1, fontSize:12, color:"#555", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.title} x{item.qty}</p>
                <span style={{ fontSize:12, fontWeight:700, flexShrink:0 }}>{INR(item.price*item.qty)}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1.5px solid #f0ede8", paddingTop:12, display:"flex", flexDirection:"column", gap:7, fontSize:12, color:"#666", marginBottom:12 }}>
            {[["Subtotal","Rs "+Math.round(inrTotal).toLocaleString("en-IN")],["Delivery",shipping===0?"Free":"Rs "+shipping],["GST","Rs "+Math.round(inrTotal*.18).toLocaleString("en-IN")]].map(([k,v])=>(
              <div key={k} style={{ display:"flex", justifyContent:"space-between" }}><span>{k}</span><span style={{ fontWeight:600 }}>{v}</span></div>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", paddingTop:10, borderTop:"1.5px solid #f0ede8", marginBottom:18 }}>
            <span style={{ fontFamily:"Syne", fontWeight:800, fontSize:15 }}>Total</span>
            <span style={{ fontFamily:"Syne", fontWeight:800, fontSize:18, color:"#ff6b35" }}>Rs {grand.toLocaleString("en-IN")}</span>
          </div>
          <button className="btn" onClick={submit} disabled={busy} style={{ width:"100%", padding:"13px", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", gap:7, opacity:busy?.8:1 }}>
            {busy?"Processing...":"Place Order"}
          </button>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:5, marginTop:12 }}><Shield size={11} color="#bbb"/><p style={{ fontSize:11, color:"#bbb" }}>Secured with SSL</p></div>
        </div>
      </div>
    </div>
  );
}

/* ─── Root App ────────────────────────────── */
export default function App() {
  const [page,setPage]=useState({ name:"home" });
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    fetch("https://dummyjson.com/products?limit=20&select=id,title,price,category,thumbnail,description,rating,stock")
      .then(r=>r.json())
      .then(d=>{
        const mapped=d.products.map(p=>({
          id:p.id, title:p.title, price:p.price, category:p.category, description:p.description,
          image: getPhoto(p.category, p.id),
          rating:{ rate:p.rating, count:(p.stock||20)*12 }
        }));
        setProducts(mapped); setLoading(false);
      })
      .catch(()=>{
        fetch("https://fakestoreapi.com/products")
          .then(r=>r.json())
          .then(d=>{ setProducts(d.map(p=>({...p,image:getPhoto(p.category,p.id)}))); setLoading(false); })
          .catch(()=>{ setProducts(FALLBACK); setLoading(false); });
      });
  },[]);

  const display = page.category ? products.filter(p=>p.category===page.category) : products;
  const render = ()=>{
    switch(page.name){
      case "home":     return <HomePage          setPage={setPage} products={products} loading={loading}/>;
      case "products": return <ProductsPage      setPage={setPage} products={display}  loading={loading}/>;
      case "product":  return <ProductDetailPage setPage={setPage} productId={page.id} products={products}/>;
      case "cart":     return <CartPage          setPage={setPage}/>;
      case "checkout": return <CheckoutPage      setPage={setPage}/>;
      default:         return <HomePage          setPage={setPage} products={products} loading={loading}/>;
    }
  };
  return (
    <CartProvider>
      <style>{css}</style>
      <div className="app">
        <Navbar page={page} setPage={setPage}/>
        <main style={{ flex:1 }}>{render()}</main>
        <Footer setPage={setPage}/>
      </div>
    </CartProvider>
  );
}