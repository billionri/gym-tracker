import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Check, Plus, Trash2, Star, ShieldCheck, 
  Sparkles, ExternalLink, Copy, CheckCheck, Tag, ArrowRight,
  Flame, Dumbbell, Percent, Truck
} from 'lucide-react';
import { SHOPPING_CATALOG, ShoppingItem } from '../data/shoppingData';

type CategoryFilter = 'All' | 'Dumbbells' | 'Gear' | 'Supplements' | 'Groceries';

export const ShoppingSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [shoppingCart, setShoppingCart] = useState<ShoppingItem[]>(() => {
    try {
      const saved = localStorage.getItem('gymforge_shopping_cart');
      return saved ? JSON.parse(saved) : [SHOPPING_CATALOG[0], SHOPPING_CATALOG[1]];
    } catch {
      return [SHOPPING_CATALOG[0], SHOPPING_CATALOG[1]];
    }
  });
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [isCopied, setIsCopied] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const saveCart = (items: ShoppingItem[]) => {
    setShoppingCart(items);
    localStorage.setItem('gymforge_shopping_cart', JSON.stringify(items));
  };

  const toggleCartItem = (item: ShoppingItem) => {
    const exists = shoppingCart.some((i) => i.id === item.id);
    if (exists) {
      saveCart(shoppingCart.filter((i) => i.id !== item.id));
    } else {
      saveCart([...shoppingCart, item]);
    }
  };

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addAllDumbbellDeals = () => {
    const dumbbellDeals = SHOPPING_CATALOG.filter((i) => i.id.startsWith('db-'));
    const newItems = [...shoppingCart];
    dumbbellDeals.forEach((item) => {
      if (!newItems.some((i) => i.id === item.id)) {
        newItems.push(item);
      }
    });
    saveCart(newItems);
  };

  const copyChecklist = () => {
    const text = shoppingCart
      .map((item, idx) => `${idx + 1}. [${checkedIds[item.id] ? 'X' : ' '}] ${item.name} (${item.currency}${item.price.toLocaleString('en-IN')})`)
      .join('\n');
    navigator.clipboard.writeText(`GymForge Shopping List:\n\n${text}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const filteredItems = SHOPPING_CATALOG.filter((item) => {
    if (selectedCategory === 'Dumbbells') {
      if (!item.id.startsWith('db-') && !item.name.toLowerCase().includes('dumbbell')) return false;
    } else if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const cartTotal = shoppingCart.reduce((sum, item) => sum + item.price, 0);
  const dumbbellDeals = SHOPPING_CATALOG.filter((i) => i.id.startsWith('db-'));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/40 border border-zinc-800 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <ShoppingBag className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold tracking-wider text-amber-400 uppercase font-mono">
                GymForge Official Store & Checklist • All Prices in ₹ (INR)
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Iron Gear, Supplements & Groceries</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ₹ Best Rates
              </span>
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Equip your home gym with affordable heavy-duty dumbbells starting from only <strong className="text-amber-400 font-semibold">₹399</strong>, plus top-tier lifting straps, whey isolate, and bulk meal prep staples.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDrawer(true)}
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shopping List ({shoppingCart.length})</span>
              {shoppingCart.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-zinc-950 animate-ping absolute -top-1 -right-1" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* SPECIAL FEATURED SPOTLIGHT: LOW PRICE DUMBBELL DEALS */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-zinc-900 to-zinc-900 p-5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500 text-zinc-950 shadow-md">
              <Flame className="w-5 h-5 fill-zinc-950 stroke-[2.5]" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white uppercase tracking-tight">
                  ⚡ Low Price Dumbbell Specials
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-black uppercase tracking-wider">
                  Up to 67% OFF
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Heavy-duty home gym dumbbells at factory-direct discounted prices in Rupees (₹).
              </p>
            </div>
          </div>

          <button
            onClick={addAllDumbbellDeals}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-amber-500/20 hover:border-amber-500/40 text-amber-400 border border-zinc-700 text-xs font-bold transition-all self-start sm:self-auto cursor-pointer"
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Add All Dumbbells to List</span>
          </button>
        </div>

        {/* 4 Dumbbells Quick Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {dumbbellDeals.map((db) => {
            const inCart = shoppingCart.some((i) => i.id === db.id);
            return (
              <div
                key={db.id}
                className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 flex flex-col justify-between hover:border-amber-500/40 transition-all group"
              >
                <div>
                  <div className="relative h-28 w-full rounded-lg overflow-hidden bg-zinc-900 mb-2.5">
                    <img
                      src={db.imageUrl}
                      alt={db.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-red-600 text-white font-mono font-black text-[9px]">
                      {db.discountPercent}% OFF
                    </span>
                    <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-zinc-950/90 text-amber-400 font-mono font-black text-xs border border-zinc-800">
                      ₹{db.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-xs line-clamp-2 leading-snug">
                    {db.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-base font-black text-white font-mono">
                      ₹{db.price.toLocaleString('en-IN')}
                    </span>
                    {db.originalPrice && (
                      <span className="text-xs text-zinc-500 line-through font-mono">
                        ₹{db.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => toggleCartItem(db)}
                  className={`mt-3 w-full py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    inCart
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black'
                  }`}
                >
                  {inCart ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add (₹{db.price})</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {([
            { id: 'All', label: 'All Products' },
            { id: 'Dumbbells', label: '🏋️ Dumbbells (Low Price)' },
            { id: 'Gear', label: 'Gear & Straps' },
            { id: 'Supplements', label: 'Supplements' },
            { id: 'Groceries', label: 'Groceries' },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as CategoryFilter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-amber-500 text-zinc-950 shadow-md font-black'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search dumbbell, whey, straps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => {
          const inCart = shoppingCart.some((i) => i.id === item.id);
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-zinc-800/80 bg-zinc-900/90 hover:border-amber-500/50 transition-all overflow-hidden flex flex-col justify-between group shadow-sm"
            >
              {/* Product Image */}
              <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[10px] font-mono font-bold text-amber-400 uppercase">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="px-1.5 py-0.5 rounded-md bg-amber-500 text-zinc-950 text-[10px] font-black uppercase tracking-wider">
                      ★ TOP VALUE
                    </span>
                  )}
                  {item.discountPercent && (
                    <span className="px-1.5 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-mono font-black uppercase">
                      {item.discountPercent}% OFF
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-zinc-950/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-zinc-800">
                  <span className="text-white font-mono font-black text-sm">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  {item.originalPrice && (
                    <span className="text-zinc-500 font-mono text-xs line-through">
                      ₹{item.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span className="font-semibold text-zinc-500 uppercase tracking-wider text-[10px]">
                      {item.brand}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 font-mono text-[11px]">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                      <span className="text-zinc-600">({item.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Benefit chips */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {item.benefits.map((b, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800/80"
                      >
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Add to List Button */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400">
                    <Truck className="w-3.5 h-3.5" />
                    <span>In Stock (Rs. {item.price})</span>
                  </div>

                  <button
                    onClick={() => toggleCartItem(item)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      inCart
                        ? 'bg-emerald-500 text-zinc-950'
                        : 'bg-zinc-800 hover:bg-amber-500 text-zinc-200 hover:text-zinc-950'
                    }`}
                  >
                    {inCart ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>In Checklist</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to List</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-over / Modal Shopping Checklist Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="bg-zinc-900 border-l border-zinc-800 w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <span>My Fitness Shopping List</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  {shoppingCart.length} item{shoppingCart.length === 1 ? '' : 's'} • Tick off items as you buy
                </p>
              </div>

              <button
                onClick={() => setShowDrawer(false)}
                className="text-zinc-400 hover:text-white p-1 cursor-pointer text-lg"
              >
                ✕
              </button>
            </div>

            {/* Checklist Items */}
            <div className="p-5 flex-1 overflow-y-auto divide-y divide-zinc-800/60">
              {shoppingCart.length === 0 ? (
                <div className="text-center py-12 text-zinc-500">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-semibold">Your shopping list is empty</p>
                  <p className="text-xs mt-1">Add budget dumbbells, lifting straps, whey, or oats from the store.</p>
                </div>
              ) : (
                shoppingCart.map((item) => {
                  const isChecked = !!checkedIds[item.id];
                  return (
                    <div
                      key={item.id}
                      className={`py-3 flex items-start justify-between gap-3 transition-colors ${
                        isChecked ? 'opacity-50 line-through' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <button
                          type="button"
                          onClick={() => toggleCheck(item.id)}
                          className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center border transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-emerald-500 border-emerald-500 text-zinc-950'
                              : 'bg-zinc-950 border-zinc-700 text-transparent hover:border-amber-400'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </button>

                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">
                            {item.name}
                          </h4>
                          <span className="text-[10px] font-mono text-zinc-400">
                            {item.category} • ₹{item.price.toLocaleString('en-IN')}
                            {item.discountPercent && (
                              <span className="ml-1.5 text-red-400 font-bold">({item.discountPercent}% OFF)</span>
                            )}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleCartItem(item)}
                        className="text-zinc-600 hover:text-red-400 p-1 flex-shrink-0 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer */}
            {shoppingCart.length > 0 && (
              <div className="p-5 border-t border-zinc-800 bg-zinc-950/70 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400 font-medium">Estimated Total:</span>
                  <span className="font-mono text-xl font-black text-amber-400">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={copyChecklist}
                    className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border border-zinc-700 transition-colors cursor-pointer"
                  >
                    {isCopied ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{isCopied ? 'Checklist Copied!' : 'Copy Checklist'}</span>
                  </button>
                  <button
                    onClick={() => saveCart([])}
                    className="px-3 py-2.5 rounded-xl bg-zinc-900 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 text-xs border border-zinc-800 transition-colors cursor-pointer"
                    title="Clear list"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

