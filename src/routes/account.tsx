import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Heart, Package, Settings, ShoppingBag, User, ChevronRight, Clock, MapPin, CreditCard, Gift, LogOut, ArrowLeft, Plus, X, Edit3, Check } from "lucide-react";
import { useState } from "react";
import { formatNaira, mockOrders } from "@/lib/data";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — SOTA HAIR" }] }),
  component: Account,
});

function Account() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState({
    name: "Adaeze Okonkwo",
    email: "adaeze@email.com",
    phone: "+234 812 345 6789",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);
  const [addresses, setAddresses] = useState([
    { id: 1, type: "Home", address: "15 Admiralty Way, Lekki Phase 1, Lagos", isDefault: true },
    { id: 2, type: "Office", address: "5th Floor, Heritage Place, 21 Lugard Ave, Ikoyi, Lagos", isDefault: false },
  ]);
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "visa", last4: "4242", expiry: "12/28", isDefault: true },
    { id: 2, type: "mastercard", last4: "8888", expiry: "06/27", isDefault: false },
  ]);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    promotions: true,
    orderUpdates: true,
  });
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ type: "Home", address: "" });
  const [showNewCard, setShowNewCard] = useState(false);
  const [newCard, setNewCard] = useState({ number: "", name: "", expiry: "", cvv: "" });

  const formatCardNumber = (num: string) => {
    const cleaned = num.replace(/\D/g, "").slice(0, 16);
    const parts = cleaned.match(/.{1,4}/g);
    return parts ? parts.join(" ") : cleaned;
  };

  const getCardType = (num: string) => {
    const cleaned = num.replace(/\D/g, "");
    if (cleaned.startsWith("4")) return "visa";
    if (cleaned.startsWith("5") && +cleaned[1] >= 1 && +cleaned[1] <= 5) return "mastercard";
    if (cleaned.startsWith("3")) return "amex";
    return null;
  };

  const cardColors: Record<string, { bg: string; text: string; logo: string }> = {
    visa: { bg: "bg-[#1A1F71]", text: "text-white", logo: "VISA" },
    mastercard: { bg: "bg-[#1A1A1A]", text: "text-white", logo: "MC" },
    amex: { bg: "bg-[#2E6CB5]", text: "text-white", logo: "AMEX" },
    default: { bg: "bg-[#2C2C2E]", text: "text-white", logo: "CARD" },
  };

  const stats = [
    { icon: Package, label: "Orders", value: mockOrders.length.toString(), href: "#orders" },
    { icon: Heart, label: "Saved Items", value: "12", href: "/wishlist" },
    { icon: ShoppingBag, label: "Total Spent", value: formatNaira(1520000), href: "#orders" },
    { icon: Gift, label: "Loyalty Points", value: "2,340", href: "#loyalty" },
  ];

  const handleLogout = () => {
    setActiveSection(null);
    navigate({ to: "/" });
  };

  const handleSaveProfile = () => {
    setUserProfile(editForm);
    setIsEditing(false);
    setActiveSection(null);
  };

  const handleAddAddress = () => {
    if (newAddress.address.trim()) {
      setAddresses([...addresses, { ...newAddress, id: Date.now(), isDefault: false }]);
      setNewAddress({ type: "Home", address: "" });
      setShowNewAddress(false);
    }
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const handleSetDefaultAddress = (id: number) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
  };

  const handleAddCard = () => {
    if (newCard.number && newCard.name && newCard.expiry) {
      const type = getCardType(newCard.number) || "default";
      setPaymentMethods([
        ...paymentMethods,
        {
          id: Date.now(),
          type,
          last4: newCard.number.replace(/\D/g, "").slice(-4),
          expiry: newCard.expiry,
          isDefault: false,
        },
      ]);
      setNewCard({ number: "", name: "", expiry: "", cvv: "" });
      setShowNewCard(false);
    }
  };

  const handleDeleteCard = (id: number) => {
    setPaymentMethods(paymentMethods.filter(c => c.id !== id));
  };

  const handleSetDefaultCard = (id: number) => {
    setPaymentMethods(paymentMethods.map(c => ({ ...c, isDefault: c.id === id })));
  };

  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (activeSection === "profile") {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-8 md:px-8 md:py-14">
          <button
            onClick={() => { setActiveSection(null); setIsEditing(false); }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Account
          </button>

          <h1 className="font-serif text-3xl font-bold mb-8">Profile & Password</h1>

          {!isEditing ? (
            <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                      <User className="h-7 w-7 text-gold" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{userProfile.name}</p>
                      <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setIsEditing(true); setEditForm(userProfile); }}
                    className="flex items-center gap-2 rounded-lg border border-border/60 px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </button>
                </div>
                <div className="grid gap-4 pt-4 border-t border-border/40">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</p>
                    <p className="mt-1 text-sm">{userProfile.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Phone</p>
                    <p className="mt-1 text-sm">{userProfile.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Password</p>
                    <p className="mt-1 text-sm">••••••••</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border/60 bg-card p-6">
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="mt-2 w-full h-11 rounded-lg border border-border/60 bg-background px-4 text-sm focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/10"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="mt-2 w-full h-11 rounded-lg border border-border/60 bg-background px-4 text-sm focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/10"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="mt-2 w-full h-11 rounded-lg border border-border/60 bg-background px-4 text-sm focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/10"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => { setIsEditing(false); setEditForm(userProfile); }}
                    className="flex-1 rounded-lg border border-border/60 px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-white hover:bg-gold/90 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === "addresses") {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-8 md:px-8 md:py-14">
          <button
            onClick={() => { setActiveSection(null); setShowNewAddress(false); }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Account
          </button>

          <div className="flex items-center justify-between mb-8">
            <h1 className="font-serif text-3xl font-bold">Addresses</h1>
            <button
              onClick={() => setShowNewAddress(true)}
              className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-medium text-white hover:bg-gold/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add New
            </button>
          </div>

          {showNewAddress && (
            <div className="mb-6 rounded-xl border border-gold/30 bg-card p-5">
              <h3 className="font-semibold mb-4">New Address</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Address Type</label>
                  <select
                    value={newAddress.type}
                    onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                    className="mt-2 w-full h-11 rounded-lg border border-border/60 bg-background px-4 text-sm focus:border-gold/40 focus:outline-none"
                  >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <input
                    type="text"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    placeholder="Enter full address"
                    className="mt-2 w-full h-11 rounded-lg border border-border/60 bg-background px-4 text-sm focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/10"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowNewAddress(false)}
                    className="flex-1 rounded-lg border border-border/60 px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddAddress}
                    className="flex-1 rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-white hover:bg-gold/90 transition-colors"
                  >
                    Save Address
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {addresses.map((addr) => (
              <div key={addr.id} className="rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-gold/20">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{addr.type}</p>
                      {addr.isDefault && (
                        <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-bold uppercase text-gold">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{addr.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!addr.isDefault && (
                      <button
                        onClick={() => handleSetDefaultAddress(addr.id)}
                        className="text-xs text-gold hover:text-gold/80 font-medium"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="p-1.5 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Payment Methods
  if (activeSection === "payments") {
    const cardType = getCardType(newCard.number);
    const colors = cardColors[cardType || "default"];
    const displayNumber = formatCardNumber(newCard.number) || "•••• •••• •••• ••••";
    
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-8 md:px-8 md:py-14">
          <button
            onClick={() => { setActiveSection(null); setShowNewCard(false); }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Account
          </button>

          <div className="flex items-center justify-between mb-8">
            <h1 className="font-serif text-3xl font-bold">Payment Methods</h1>
          </div>

          {/* Existing Cards */}
          {paymentMethods.length > 0 && (
            <div className="space-y-3 mb-8">
              {paymentMethods.map((card) => {
                const c = cardColors[card.type] || cardColors.default;
                return (
                  <div key={card.id} className={`relative rounded-2xl ${c.bg} p-5 shadow-lg`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {/* Chip */}
                        <div className="h-7 w-9 rounded-md bg-[#FFD700]/80 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-[#DAA520] to-[#B8860B]" />
                          <div className="absolute inset-[2px] rounded-sm border border-[#8B6914]/30" />
                          <div className="absolute left-1.5 right-1.5 top-1/2 h-[1px] bg-[#8B6914]/30" />
                        </div>
                        {/* Contactless */}
                        <svg className="h-5 w-5 text-white/60" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" opacity="0.6"/>
                        </svg>
                      </div>
                      <span className={`text-xs font-bold tracking-[0.15em] ${c.text}/70`}>
                        {card.type === "visa" ? "VISA" : card.type === "mastercard" ? "MASTERCARD" : card.type === "amex" ? "AMEX" : "CARD"}
                      </span>
                    </div>
                    <p className={`text-lg font-mono tracking-[0.12em] ${c.text} mb-4`}>
                      •••• •••• •••• {card.last4}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-white/40">Expires</p>
                        <p className={`text-xs font-medium ${c.text}/80`}>{card.expiry}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {card.isDefault ? (
                          <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                            Default
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSetDefaultCard(card.id)}
                            className="text-[10px] font-medium text-white/60 hover:text-white/90 transition-colors"
                          >
                            Set as default
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteCard(card.id)}
                          className="p-1 rounded-full hover:bg-white/10 transition-colors"
                        >
                          <X className="h-3.5 w-3.5 text-white/50 hover:text-white/80" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add New Card Button (always visible) */}
          {!showNewCard && (
            <button
              onClick={() => setShowNewCard(true)}
              className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/60 p-5 text-sm font-medium text-muted-foreground hover:border-gold/40 hover:text-gold transition-all hover:bg-gold/5"
            >
              <Plus className="h-4 w-4" />
              Add New Card
            </button>
          )}

          {/* Live Card Preview */}
          {showNewCard && (
            <div className="mb-6">
              <div className={`relative rounded-2xl ${colors.bg} p-5 shadow-xl transition-all duration-300`}>
                {/* Card texture */}
                <div className="absolute inset-0 rounded-2xl opacity-[0.03] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4),transparent_50%)]" />
                
                <div className="relative">
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      {/* Chip */}
                      <div className="h-7 w-9 rounded-md bg-[#FFD700]/80 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-[#DAA520] to-[#B8860B]" />
                        <div className="absolute inset-[2px] rounded-sm border border-[#8B6914]/30" />
                        <div className="absolute left-1.5 right-1.5 top-1/2 h-[1px] bg-[#8B6914]/30" />
                      </div>
                      {/* Contactless */}
                      <svg className="h-5 w-5 text-white/50" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" opacity="0.6"/>
                      </svg>
                    </div>
                    <span className={`text-xs font-bold tracking-[0.15em] ${colors.text}/70`}>
                      {cardType === "visa" ? "VISA" : cardType === "mastercard" ? "MASTERCARD" : cardType === "amex" ? "AMEX" : "CARD"}
                    </span>
                  </div>

                  {/* Card Number */}
                  <p className={`text-lg sm:text-xl font-mono tracking-[0.12em] ${colors.text} mb-5`}>
                    {displayNumber}
                  </p>

                  {/* Bottom row */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-white/40 mb-0.5">Card Holder</p>
                      <p className={`text-xs font-medium ${colors.text}/80 uppercase tracking-wider`}>
                        {newCard.name || "YOUR NAME"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase tracking-wider text-white/40 mb-0.5">Expires</p>
                      <p className={`text-xs font-medium ${colors.text}/80`}>
                        {newCard.expiry || "MM/YY"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Card Form */}
          {showNewCard && (
            <div className="rounded-xl border border-border/60 bg-card p-6">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-5">Card Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Card Number</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={newCard.number}
                    onChange={(e) => setNewCard({ ...newCard, number: e.target.value.replace(/\D/g, "") })}
                    placeholder="0000 0000 0000 0000"
                    maxLength={16}
                    className="mt-2 w-full h-11 rounded-lg border border-border/60 bg-background px-4 text-sm font-mono tracking-wider focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/10 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Cardholder Name</label>
                  <input
                    type="text"
                    value={newCard.name}
                    onChange={(e) => setNewCard({ ...newCard, name: e.target.value.toUpperCase() })}
                    placeholder="JOHN DOE"
                    className="mt-2 w-full h-11 rounded-lg border border-border/60 bg-background px-4 text-sm uppercase tracking-wider focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/10 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Expiry Date</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={newCard.expiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, "");
                        if (val.length >= 2) val = val.slice(0, 2) + "/" + val.slice(2, 4);
                        setNewCard({ ...newCard, expiry: val.slice(0, 5) });
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="mt-2 w-full h-11 rounded-lg border border-border/60 bg-background px-4 text-sm focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CVV</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={newCard.cvv}
                      onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })}
                      placeholder="•••"
                      maxLength={3}
                      className="mt-2 w-full h-11 rounded-lg border border-border/60 bg-background px-4 text-sm font-mono tracking-widest focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/10 transition-all"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => { setShowNewCard(false); setNewCard({ number: "", name: "", expiry: "", cvv: "" }); }}
                    className="flex-1 rounded-lg border border-border/60 px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCard}
                    disabled={!newCard.number || newCard.number.length < 13 || !newCard.name || !newCard.expiry}
                    className="flex-1 rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-white hover:bg-gold/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Save Card
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === "notifications") {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-8 md:px-8 md:py-14">
          <button
            onClick={() => setActiveSection(null)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Account
          </button>

          <h1 className="font-serif text-3xl font-bold mb-8">Notification Settings</h1>

          <div className="rounded-xl border border-border/60 bg-card overflow-hidden divide-y divide-border/40">
            {[
              { key: "email" as const, label: "Email Notifications", desc: "Receive updates and offers via email" },
              { key: "sms" as const, label: "SMS Notifications", desc: "Get order updates via text message" },
              { key: "promotions" as const, label: "Promotional Emails", desc: "Be the first to know about sales and new arrivals" },
              { key: "orderUpdates" as const, label: "Order Updates", desc: "Real-time updates on your order status" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleToggleNotification(item.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications[item.key] ? "bg-gold" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                      notifications[item.key] ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main Account Page
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-8 md:py-14">
        <div className="mb-10">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
              <User className="h-6 w-6 text-gold" />
            </div>
            <div>
              <div className="text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
                Welcome Back
              </div>
              <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
                Hello, Adaeze
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your orders, wishlist, and account settings
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              to={stat.href}
              className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-4 sm:p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="absolute right-3 top-3 opacity-5 transition-opacity group-hover:opacity-10 sm:right-4 sm:top-4">
                <stat.icon className="h-12 w-12 sm:h-16 sm:w-16" />
              </div>
              <div className="relative">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 sm:h-10 sm:w-10">
                  <stat.icon className="h-4 w-4 text-gold sm:h-5 sm:w-5" />
                </div>
                <p className="mt-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:mt-4 sm:text-xs">
                  {stat.label}
                </p>
                <p className="mt-0.5 font-serif text-lg font-bold tracking-tight sm:mt-1 sm:text-2xl">
                  {stat.value}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div id="orders">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-serif text-2xl font-bold">Recent Orders</h2>
                <p className="mt-1 text-sm text-muted-foreground">Your latest purchases and their status</p>
              </div>
              <Link
                to="/shop"
                className="group flex items-center gap-1 text-sm font-medium text-gold hover:text-gold/80 transition-colors"
              >
                Continue Shopping
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
              <div className="hidden border-b border-border/40 bg-muted/30 px-6 py-3 md:grid md:grid-cols-[1fr_100px_120px_120px]">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Order</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Items</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Status</span>
              </div>

              <div className="divide-y divide-border/40">
                {mockOrders.slice(0, 4).map((order) => (
                  <button
                    key={order.id}
                    onClick={() => navigate({ to: "/account" })}
                    className="w-full text-left group px-4 py-4 transition-colors hover:bg-muted/20 sm:px-6 md:grid md:grid-cols-[1fr_100px_120px_120px] md:items-center block"
                  >
                    <div>
                      <p className="text-sm font-semibold">{order.id}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {order.date}
                      </p>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground md:mt-0">
                      {order.items} item{order.items !== 1 ? "s" : ""}
                    </div>
                    <div className="mt-1 flex items-center justify-between md:mt-0">
                      <span className="text-sm font-medium text-gold md:hidden">Total:</span>
                      <span className="text-sm font-medium text-gold">{formatNaira(order.total)}</span>
                    </div>
                    <div className="mt-2 md:mt-0 md:text-right">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${statusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </button>
                ))}
                {mockOrders.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Package className="h-12 w-12 text-muted-foreground/40" />
                    <p className="mt-4 text-sm font-medium text-muted-foreground">No orders yet</p>
                    <Link to="/shop" className="mt-2 text-sm font-medium text-gold hover:text-gold/80 transition-colors">
                      Start shopping
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
              <div className="border-b border-border/40 px-6 py-4">
                <h3 className="font-serif text-lg font-bold">Account Settings</h3>
              </div>
              <div className="divide-y divide-border/40">
                {[
                  { icon: User, label: "Profile & Password", desc: "Manage your personal details", section: "profile" },
                  { icon: MapPin, label: "Addresses", desc: "Shipping & billing addresses", section: "addresses" },
                  { icon: CreditCard, label: "Payment Methods", desc: "Manage saved cards", section: "payments" },
                  { icon: Settings, label: "Notifications", desc: "Email & SMS preferences", section: "notifications" },
                ].map((link) => (
                  <button
                    key={link.label}
                    onClick={() => setActiveSection(link.section)}
                    className="group flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-muted/20"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/5 transition-colors group-hover:bg-gold/10">
                      <link.icon className="h-4 w-4 text-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{link.label}</p>
                      <p className="text-xs text-muted-foreground">{link.desc}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </button>
                ))}
              </div>
            </div>

            <div id="loyalty" className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gold/20 via-gold/10 to-background border border-gold/30 p-6">
              <div className="absolute right-4 top-4 text-4xl opacity-20">✨</div>
              <div className="relative">
                <Gift className="h-6 w-6 text-gold" />
                <p className="mt-3 font-serif text-lg font-bold">Royalty Rewards</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  You have <span className="font-bold text-gold">2,340 points</span>
                </p>
                <div className="mt-3 h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-gold to-amber-400" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  760 points until your next reward
                </p>
                <Link
                  to="/shop"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gold hover:text-gold/80 transition-colors"
                >
                  Shop & Earn More
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <Link
              to="/shop"
              className="w-full rounded-xl border border-border/60 bg-card p-6 text-left transition-all hover:border-gold/30 hover:bg-muted/10 block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
                  <Gift className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Gift Cards</p>
                  <p className="text-xs text-muted-foreground">Purchase or redeem gift cards</p>
                </div>
              </div>
            </Link>

            <button 
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl border border-border/60 bg-card px-6 py-4 text-sm font-medium text-muted-foreground transition-all hover:border-destructive/30 hover:text-destructive hover:bg-destructive/5"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function statusColor(s: string) {
  return {
    Delivered: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
    Shipped: "bg-sky-500/10 text-sky-600 border border-sky-500/20",
    Processing: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
    Pending: "bg-muted text-muted-foreground border border-border",
    Cancelled: "bg-destructive/10 text-destructive border border-destructive/20",
  }[s] || "bg-muted text-muted-foreground border border-border";
}