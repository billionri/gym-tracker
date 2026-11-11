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
      {/* Header Banner - Orange Div with Green Button */}
      <div className="relative overflow-hidden rounded-2xl bg-orange-50 border-2 border-orange-300 p-6 shadow-sm text-zinc-900">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-lg bg-orange-200 border border-orange-300 text-orange-800">
                <ShoppingBag className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold tracking-wider text-orange-800 uppercase font-mono">
                GymForge Official Store & Checklist • All Prices in ₹ (INR)
              </span>
            </div>
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
              <span>Iron Gear, Supplements & Groceries</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                ₹ Best Rates
              </span>
            </h2>
            <p className="text-sm text-zinc-600 mt-1 max-w-xl">
              Equip your home gym with affordable heavy-duty dumbbells starting from only <strong className="text-orange-700 font-bold">₹399</strong>, plus top-tier lifting straps, whey isolate, and bulk meal prep staples.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDrawer(true)}
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shopping List ({shoppingCart.length})</span>
              {shoppingCart.length > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-orange-400 border border-white animate-ping absolute -top-1 -right-1" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* SPECIAL FEATURED SPOTLIGHT: LOW PRICE DUMBBELL DEALS - Orange Div with Green Buttons */}
      <div className="rounded-2xl border-2 border-orange-300 bg-orange-100/70 p-5 shadow-sm relative overflow-hidden text-zinc-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-orange-500 text-white shadow-md">
              <Flame className="w-5 h-5 fill-white stroke-[2.5]" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight">
                  ⚡ Low Price Dumbbell Specials
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-700 border border-red-300 text-[10px] font-black uppercase tracking-wider">
                  Up to 67% OFF
                </span>
              </div>
              <p className="text-xs text-zinc-600 mt-0.5">
                Heavy-duty home gym dumbbells at factory-direct discounted prices in Rupees (₹).
              </p>
            </div>
          </div>

          <button
            onClick={addAllDumbbellDeals}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all self-start sm:self-auto cursor-pointer"
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Add All Dumbbells to List</span>
          </button>
        </div>

        {/* 4 Dumbbells Quick Grid - Orange Cards with Green Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {dumbbellDeals.map((db) => {
            const inCart = shoppingCart.some((i) => i.id === db.id);
            return (
              <div
                key={db.id}
                className="rounded-xl border-2 border-orange-200 bg-white p-3 flex flex-col justify-between hover:border-orange-400 transition-all group shadow-2xs"
              >
                <div>
                  <div className="relative h-28 w-full rounded-lg overflow-hidden bg-zinc-100 mb-2.5">
                    <img
                      src={db.imageUrl}
                      alt={db.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-red-600 text-white font-mono font-black text-[9px]">
                      {db.discountPercent}% OFF
                    </span>
                    <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-white/95 text-orange-900 font-mono font-black text-xs border border-orange-200 shadow-2xs">
                      ₹{db.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <h4 className="font-bold text-zinc-900 text-xs line-clamp-2 leading-snug">
                    {db.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-base font-black text-zinc-900 font-mono">
                      ₹{db.price.toLocaleString('en-IN')}
                    </span>
                    {db.originalPrice && (
                      <span className="text-xs text-zinc-400 line-through font-mono">
                        ₹{db.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => toggleCartItem(db)}
                  className={`mt-3 w-full py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    inCart
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-400 font-black'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white font-black shadow-xs'
                  }`}
                >
                  {inCart ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added to List</span>
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
                  ? 'bg-emerald-600 text-white shadow-sm font-black'
                  : 'bg-orange-50 text-orange-950 hover:bg-orange-100 border border-orange-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-orange-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search dumbbell, whey, straps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-orange-200 rounded-xl pl-10 pr-3.5 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Product Catalog Grid - Orange Divs with Green Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => {
          const inCart = shoppingCart.some((i) => i.id === item.id);
          return (
            <div
              key={item.id}
              className="rounded-2xl border-2 border-orange-200 bg-orange-50/70 hover:border-orange-400 transition-all overflow-hidden flex flex-col justify-between group shadow-2xs text-zinc-900"
            >
              {/* Product Image */}
              <div className="relative h-48 w-full overflow-hidden bg-white border-b border-orange-200">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs border border-orange-300 text-[10px] font-mono font-bold text-orange-900 uppercase">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="px-1.5 py-0.5 rounded-md bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider">
                      ★ TOP VALUE
                    </span>
                  )}
                  {item.discountPercent && (
                    <span className="px-1.5 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-mono font-black uppercase">
                      {item.discountPercent}% OFF
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-orange-300 shadow-xs">
                  <span className="text-zinc-900 font-mono font-black text-sm">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  {item.originalPrice && (
                    <span className="text-zinc-400 font-mono text-xs line-through">
                      ₹{item.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                    <span className="font-semibold text-orange-800 uppercase tracking-wider text-[10px]">
                      {item.brand}
                    </span>
                    <div className="flex items-center gap-1 text-orange-600 font-mono text-[11px] font-bold">
                      <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                      <span>{item.rating}</span>
                      <span className="text-zinc-400">({item.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-zinc-900 text-base group-hover:text-orange-700 transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Benefit chips */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {item.benefits.map((b, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-white text-orange-900 border border-orange-200 font-medium"
                      >
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Add to List Button - Green Button */}
                <div className="mt-4 pt-3 border-t border-orange-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-700">
                    <Truck className="w-3.5 h-3.5" />
                    <span>In Stock (Rs. {item.price})</span>
                  </div>

                  <button
                    onClick={() => toggleCartItem(item)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      inCart
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-400 font-black'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white font-black shadow-xs'
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white border-l-2 border-orange-300 w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200 text-zinc-900">
            {/* Drawer Header - Orange Div */}
            <div className="p-5 border-b border-orange-200 bg-orange-50 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-zinc-900 text-lg flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-orange-600" />
                  <span>My Fitness Shopping List</span>
                </h3>
                <p className="text-xs text-zinc-500">
                  {shoppingCart.length} item{shoppingCart.length === 1 ? '' : 's'} • Tick off items as you buy
                </p>
              </div>

              <button
                onClick={() => setShowDrawer(false)}
                className="text-zinc-500 hover:text-zinc-900 p-1 cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Checklist Items */}
            <div className="p-5 flex-1 overflow-y-auto divide-y divide-orange-100">
              {shoppingCart.length === 0 ? (
                <div className="text-center py-12 text-zinc-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-40 text-orange-500" />
                  <p className="text-sm font-semibold text-zinc-700">Your shopping list is empty</p>
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
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'bg-white border-orange-300 text-transparent hover:border-emerald-500'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </button>

                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-zinc-900 truncate">
                            {item.name}
                          </h4>
                          <span className="text-[10px] font-mono text-zinc-500">
                            {item.category} • ₹{item.price.toLocaleString('en-IN')}
                            {item.discountPercent && (
                              <span className="ml-1.5 text-red-600 font-bold">({item.discountPercent}% OFF)</span>
                            )}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleCartItem(item)}
                        className="text-zinc-400 hover:text-red-500 p-1 flex-shrink-0 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer - Orange Div with Green Button */}
            {shoppingCart.length > 0 && (
              <div className="p-5 border-t border-orange-200 bg-orange-50 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 font-medium">Estimated Total:</span>
                  <span className="font-mono text-xl font-black text-orange-700">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={copyChecklist}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    {isCopied ? <CheckCheck className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                    <span>{isCopied ? 'Checklist Copied!' : 'Copy Checklist'}</span>
                  </button>
                  <button
                    onClick={() => saveCart([])}
                    className="px-3 py-2.5 rounded-xl bg-white hover:bg-red-50 text-zinc-500 hover:text-red-600 text-xs border border-orange-200 transition-colors cursor-pointer"
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
