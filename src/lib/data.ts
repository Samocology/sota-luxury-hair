import prodBoneStraight from "@/assets/prod-bone-straight.jpg";
import prodDeepWave from "@/assets/prod-deep-wave.jpg";
import prodCurly from "@/assets/prod-curly.jpg";
import prodWaterWave from "@/assets/prod-water-wave.jpg";
import prodBob from "@/assets/prod-bob.jpg";
import prodKinky from "@/assets/prod-kinky.jpg";
import prodBlonde from "@/assets/prod-blonde.jpg";
import prodBurmese from "@/assets/prod-burmese.jpg";
import prodPixie from "@/assets/prod-pixie.jpg";
import prodBodyWave from "@/assets/prod-body-wave.jpg";
import prodYaki from "@/assets/prod-yaki.jpg";
import prodLooseWave from "@/assets/prod-loose-wave.jpg";

import colBoneStraight from "@/assets/col-bone-straight.jpg";
import colCurly from "@/assets/col-curly.jpg";
import colWaterWave from "@/assets/col-water-wave.jpg";
import colDeepWave from "@/assets/col-deep-wave.jpg";
import colBob from "@/assets/col-bob.jpg";
import colPixie from "@/assets/col-pixie.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  compareAt?: number;
  image: string;
  collection: string;
  density: string;
  lace: string;
  length: string;
  rating: number;
  reviews: number;
  badge?: "BESTSELLER" | "NEW" | "SALE" | "LIMITED" | "TRENDING";
  stock: number;
};

export const collections = [
  { slug: "bone-straight", name: "Bone Straight", image: colBoneStraight, count: 18 },
  { slug: "curly", name: "Curly", image: colCurly, count: 12 },
  { slug: "water-wave", name: "Water Wave", image: colWaterWave, count: 15 },
  { slug: "deep-wave", name: "Deep Wave", image: colDeepWave, count: 14 },
  { slug: "bob-wigs", name: "Bob Wigs", image: colBob, count: 9 },
  { slug: "pixie-cut", name: "Pixie Cut", image: colPixie, count: 6 },
];

export const products: Product[] = [
  { id: "hd-bone-straight", name: "HD Glueless Bone Straight", price: 185000, image: prodBoneStraight, collection: "bone-straight", density: "180%", lace: "13x4 HD", length: "26\"", rating: 4.9, reviews: 312, badge: "BESTSELLER", stock: 24 },
  { id: "deep-wave-frontal", name: "Deep Wave Frontal Wig", price: 210000, image: prodDeepWave, collection: "deep-wave", density: "200%", lace: "13x6 HD", length: "28\"", rating: 4.8, reviews: 188, badge: "NEW", stock: 18 },
  { id: "raw-vietnamese-curly", name: "Raw Vietnamese Curly", price: 240000, compareAt: 280000, image: prodCurly, collection: "curly", density: "150%", lace: "Full Lace", length: "22\"", rating: 4.9, reviews: 97, badge: "SALE", stock: 9 },
  { id: "sleek-bob-front", name: "Sleek Bob Lace Front", price: 145000, image: prodBob, collection: "bob-wigs", density: "180%", lace: "13x4 HD", length: "14\"", rating: 4.7, reviews: 74, stock: 32 },
  { id: "water-wave-closure", name: "Water Wave Closure Wig", price: 160000, image: prodWaterWave, collection: "water-wave", density: "180%", lace: "4x4 Closure", length: "24\"", rating: 4.8, reviews: 201, stock: 20 },
  { id: "loose-body-wave", name: "Loose Body Wave Wig", price: 175000, image: prodLooseWave, collection: "water-wave", density: "150%", lace: "13x4 HD", length: "30\"", rating: 4.9, reviews: 143, badge: "TRENDING", stock: 15 },
  { id: "natural-yaki-straight", name: "Natural Yaki Straight", price: 155000, image: prodYaki, collection: "bone-straight", density: "130%", lace: "5x5 Closure", length: "20\"", rating: 4.6, reviews: 58, stock: 22 },
  { id: "afro-kinky-curly", name: "Afro Kinky Curly Wig", price: 195000, compareAt: 220000, image: prodKinky, collection: "curly", density: "200%", lace: "13x6 HD", length: "18\"", rating: 4.8, reviews: 86, badge: "SALE", stock: 11 },
  { id: "highlight-blonde-wave", name: "Highlight Blonde Wave", price: 230000, image: prodBlonde, collection: "water-wave", density: "180%", lace: "Full Lace", length: "26\"", rating: 4.9, reviews: 44, badge: "LIMITED", stock: 6 },
  { id: "raw-burmese-straight", name: "Raw Burmese Straight", price: 260000, image: prodBurmese, collection: "bone-straight", density: "150%", lace: "13x4 HD", length: "28\"", rating: 4.9, reviews: 113, stock: 8 },
  { id: "pixie-cut-hd", name: "Pixie Cut HD Lace", price: 120000, image: prodPixie, collection: "pixie-cut", density: "130%", lace: "13x4 HD", length: "10\"", rating: 4.7, reviews: 67, stock: 27 },
  { id: "bouncy-kinky-body", name: "Bouncy Kinky Body Wave", price: 190000, image: prodBodyWave, collection: "water-wave", density: "200%", lace: "13x6 HD", length: "24\"", rating: 4.8, reviews: 129, badge: "NEW", stock: 14 },
];

export const services = [
  { id: "wig-revamp", name: "Wig Revamp", desc: "Refresh, restyle & revive your existing wig — like new.", price: 25000, icon: "sparkles" },
  { id: "hair-styling", name: "Hair Styling", desc: "Professional cutting, blow-out & custom color work.", price: 18000, icon: "scissors" },
  { id: "wig-install", name: "Wig Installation", desc: "Seamless, undetectable install by our expert stylists.", price: 30000, icon: "crown" },
];

export const testimonials = [
  { name: "Adaeze O.", handle: "Lagos, NG", quote: "The HD lace is truly undetectable. I've had 5 wigs from SOTA and every single one has been perfection.", rating: 5 },
  { name: "Fatima A.", handle: "Long-time Queen", quote: "Best hair I've ever purchased. Softest quality — no shedding, no tangling after 12 months.", rating: 5 },
  { name: "Chioma R.", handle: "Verified Buyer", quote: "The install service was worth every naira. My stylist was patient and it looked flawless.", rating: 5 },
  { name: "Yemi F.", handle: "Loyalty Member", quote: "SOTA has ruined every other brand for me. Nothing else compares to this quality.", rating: 5 },
];

export const formatNaira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export const productBySlug = (id: string) => products.find((p) => p.id === id);
export const productsByCollection = (slug: string) => products.filter((p) => p.collection === slug);

// Mock admin data
export const mockOrders = [
  { id: "ORD-10248", customer: "Adaeze Okafor", email: "adaeze@email.com", total: 395000, status: "Delivered", date: "2026-07-01", items: 2 },
  { id: "ORD-10247", customer: "Fatima Ahmed", email: "fatima@email.com", total: 210000, status: "Shipped", date: "2026-07-02", items: 1 },
  { id: "ORD-10246", customer: "Chioma Rex", email: "chioma@email.com", total: 460000, status: "Processing", date: "2026-07-03", items: 3 },
  { id: "ORD-10245", customer: "Yemi Fola", email: "yemi@email.com", total: 145000, status: "Pending", date: "2026-07-04", items: 1 },
  { id: "ORD-10244", customer: "Kemi Bello", email: "kemi@email.com", total: 260000, status: "Delivered", date: "2026-07-05", items: 1 },
  { id: "ORD-10243", customer: "Ngozi V.", email: "ngozi@email.com", total: 175000, status: "Cancelled", date: "2026-07-05", items: 1 },
];

export const mockBookings = [
  { id: "BK-3021", customer: "Aisha J.", service: "Wig Installation", date: "2026-07-08", time: "10:00 AM", status: "Confirmed", price: 30000 },
  { id: "BK-3020", customer: "Tolu M.", service: "Hair Styling", date: "2026-07-08", time: "01:00 PM", status: "Confirmed", price: 18000 },
  { id: "BK-3019", customer: "Bisi K.", service: "Wig Revamp", date: "2026-07-09", time: "11:00 AM", status: "Pending", price: 25000 },
  { id: "BK-3018", customer: "Rita O.", service: "Wig Installation", date: "2026-07-10", time: "03:00 PM", status: "Confirmed", price: 30000 },
];

export const mockCustomers = [
  { id: "C-1024", name: "Adaeze Okafor", email: "adaeze@email.com", orders: 8, spent: 1520000, joined: "2024-03-14" },
  { id: "C-1023", name: "Fatima Ahmed", email: "fatima@email.com", orders: 5, spent: 890000, joined: "2024-06-02" },
  { id: "C-1022", name: "Chioma Rex", email: "chioma@email.com", orders: 12, spent: 2340000, joined: "2023-11-20" },
  { id: "C-1021", name: "Yemi Fola", email: "yemi@email.com", orders: 3, spent: 445000, joined: "2025-01-18" },
  { id: "C-1020", name: "Kemi Bello", email: "kemi@email.com", orders: 6, spent: 1010000, joined: "2024-09-05" },
];

export const revenueSeries = [
  { m: "Jan", v: 4200000 }, { m: "Feb", v: 3800000 }, { m: "Mar", v: 5100000 },
  { m: "Apr", v: 4700000 }, { m: "May", v: 6200000 }, { m: "Jun", v: 7100000 },
  { m: "Jul", v: 8300000 },
];