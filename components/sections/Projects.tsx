"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

const MotionButton = motion(Button);

const projects = [
  {
    title: "Poultry IoT Dashboard",
    image: "/projects/poultry1.png",
    description: "Dashboard berbasis IoT untuk memantau suhu dan kelembapan kandang ayam secara real-time serta mengontrol kipas dan lampu secara otomatis maupun manual. Sistem terintegrasi dengan NodeMCU ESP8266, sensor DHT22, relay 2 channel, LCD, kipas, dan lampu untuk menciptakan lingkungan kandang yang lebih optimal.",
    tags: ["React", "MQTT", "Node.js", "WebSocket"],
    background: "Dashboard berbasis IoT untuk memantau suhu dan kelembapan kandang ayam secara real-time serta mengontrol kipas dan lampu secara otomatis maupun manual. Sistem terintegrasi dengan NodeMCU ESP8266, sensor DHT22, relay 2 channel, LCD, kipas, dan lampu untuk menciptakan lingkungan kandang yang lebih optimal.",
    howItWorks: "1. Sensor DHT22 membaca suhu dan kelembapan kandang. 2. NodeMCU ESP8266 mengirim data ke server melalui MQTT. 3. Backend meneruskan data ke dashboard menggunakan WebSocket. 4. Dashboard menampilkan data secara real-time. 5. Sistem mengaktifkan kipas atau lampu secara otomatis, atau sesuai kontrol manual dari pengguna.",
    features: ["Monitoring suhu dan kelembapan secara real-time", "Kontrol kipas dan lampu (Auto & Manual)", "Pengaturan batas suhu (threshold)", "Deteksi sensor offline", "Grafik historis data sensor", "Dashboard responsif"],
    gallery: ["/projects/kandang1.png", "/projects/kandang2.png"],
    github: "https://github.com/NajibAnanda/kandang-ayam-iot.git",
  },
  {
    title: "Sistem Inventory & POS",
    image: "/projects/invento1.png",
    description: "Invento adalah aplikasi web inventory dan Point of Sale (POS) untuk membantu toko kecil hingga menengah mengelola produk, stok barang, supplier, transaksi penjualan, laporan bisnis, dan pengguna berdasarkan role. Aplikasi ini dibuat dengan konsep dashboard admin modern yang ringan, rapi, dan mudah digunakan untuk operasional toko sehari-hari.",
    tags: ["Laravel", "React", "MySQL", "Tailwind CSS"],
    background: "Invento adalah aplikasi web inventory dan Point of Sale (POS) untuk membantu toko kecil hingga menengah mengelola produk, stok barang, supplier, transaksi penjualan, laporan bisnis, dan pengguna berdasarkan role. Aplikasi ini dibuat dengan konsep dashboard admin modern yang ringan, rapi, dan mudah digunakan untuk operasional toko sehari-hari.",
    howItWorks: "1. Login sesuai role pengguna. 2. Akses dashboard berdasarkan hak akses. 3. Kelola produk, kategori, dan supplier. 4. Input barang masuk untuk menambah stok. 5. Sistem mencatat seluruh pergerakan stok. 6. Kasir mencari produk melalui POS. 7. Produk ditambahkan ke cart dengan validasi stok. 8. Proses pembayaran dan hitung kembalian. 9. Transaksi disimpan dan stok diperbarui. 10. Lihat riwayat dan detail transaksi. 11. Analisis laporan penjualan dan produk terlaris. 12. Kelola pengguna, role, dan status akun.",
    features: ["Dashboard Penjualan & Stok","Manajemen Produk, Kategori & Supplier","Manajemen dan Riwayat Stok","POS dengan Validasi Stok","Riwayat Transaksi","Laporan & Analisis Penjualan","Manajemen Pengguna & Role","Autentikasi API","Role-Based Access Control"],
    gallery: ["/projects/invento1.png", "/projects/invento2.png", "/projects/invento3.png", "/projects/invento4.png", "/projects/invento5.png", "/projects/invento6.png"],
    github: "https://github.com/NajibAnanda/invento.git",
  },
  {
    title: "Sistem Informasi Koperasi",
    image: "/projects/koperasi1.png",
    description: "Sistem informasi koperasi simpan pinjam berbasis web yang memudahkan anggota dalam mengelola simpanan, mengajukan pinjaman, memantau angsuran, dan melihat riwayat transaksi secara transparan. Aplikasi ini juga menyediakan panel admin untuk memverifikasi transaksi, mengelola anggota, serta mencetak laporan.",
    tags: ["PHP", "MySQL", "Bootstrap", "CSS", "JavaScript"],
    background: "Sistem informasi koperasi simpan pinjam berbasis web yang memudahkan anggota dalam mengelola simpanan, mengajukan pinjaman, memantau angsuran, dan melihat riwayat transaksi secara transparan. Aplikasi ini juga menyediakan panel admin untuk memverifikasi transaksi, mengelola anggota, serta mencetak laporan.",
    howItWorks: " 1. Anggota mendaftar dan login ke akun. 2.Anggota menambahkan simpanan atau mengajukan pinjaman. 3.Admin memeriksa dan menyetujui atau menolak pengajuan. 4. Pinjaman yang disetujui menghasilkan jadwal angsuran otomatis. 5. Anggota membayar angsuran dan mengunggah bukti transfer. 6. Admin memverifikasi pembayaran 7. Anggota memantau saldo, progres pinjaman, dan riwayat transaksi melalui dashboard.8. Admin dapat melihat data koperasi dan mencetak laporan.",
    features: ["Registrasi dan autentikasi anggota", "Pengelolaan simpanan dan pinjaman", "Pengelolaan angsuran serta denda", "Verifikasi transaksi oleh admin", "Laporan keuangan dan riwayat transaksi"],
    gallery: ["/projects/koperasi1.png", "/projects/koperasi2.png", "/projects/koperasi3.png", "/projects/koperasi4.png", "/projects/koperasi5.png", "/projects/koperasi6.png"],
    github: "https://github.com/NajibAnanda/koperasi-indonesia.git",
  },
  {
    title: "Sistem Manajemen Laundry",
    image: "/projects/laundry2.png",
    description: "Aplikasi desktop Point of Sale (POS) dan manajemen operasional laundry yang dibangun menggunakan arsitektur MVC. Sistem ini memudahkan proses transaksi, pengelolaan layanan, pelacakan status cucian, serta pembuatan laporan keuangan dan struk PDF secara otomatis.",
    tags: ["Python", "Tkinter", "JSON Database", "MVC"],
    background: "Aplikasi desktop Point of Sale (POS) dan manajemen operasional laundry yang dibangun menggunakan arsitektur MVC. Sistem ini memudahkan proses transaksi, pengelolaan layanan, pelacakan status cucian, serta pembuatan laporan keuangan dan struk PDF secara otomatis.",
    howItWorks: " 1. Pengguna login sebagai Admin atau Kasir. 2.Masukkan data pelanggan dan pilih layanan. 3.Sistem memvalidasi input serta menghitung total biaya. 4. Data transaksi disimpan ke database JSON. 5. Struk transaksi dapat langsung dibuat dalam format PDF. 6. Status cucian diperbarui dari Diterima → Dicuci → Siap Diambil → Selesai. 7. Admin dapat melihat data transaksi dan mencetak laporan.",
    features: ["Registrasi dan autentikasi anggota", "Pengelolaan simpanan dan pinjaman", "Pengelolaan angsuran serta denda", "Verifikasi transaksi oleh admin", "Laporan keuangan dan riwayat transaksi"],
    gallery: ["/projects/laundry2.png", "/projects/laundry3.png", "/projects/laundry4.png"],
    github: "https://github.com/NajibAnanda/Sistem_Manajemen_Laundry.git",
  },
  {
    title: "Sistem Booking Hotel",
    image: "/projects/hotel1.png",
    description: "Aplikasi web pemesanan kamar hotel interaktif yang memfasilitasi pencarian dan reservasi kamar bagi tamu, serta menyediakan dashboard manajemen operasional dan validasi pembayaran real-time bagi administrator.",
    tags: ["CSS", "Bootstrap", "JavaScript", "PHP", "MySQL"],
    background: "Aplikasi web pemesanan kamar hotel interaktif yang memfasilitasi pencarian dan reservasi kamar bagi tamu, serta menyediakan dashboard manajemen operasional dan validasi pembayaran real-time bagi administrator.",
    howItWorks: " 1. Cari jadwal (check-in/check-out & jumlah tamu) 2.Pilih kamar yang tersedia 3.Isi data pemesan 4. Konfirmasi pesanan & total biaya 5. Pilih metode pembayaran 6. Proses pembayaran (Virtual Account) 7.Cetak atau unduh e-receipt",
    features: ["Multi-step booking dengan validasi bertahap", "Sistem anti-overbooking berdasarkan ketersediaan kamar", "Registrasi & login untuk tamu dan admin", "Dashboard admin untuk manajemen kamar, tamu, dan transaksi", "Desain responsif"],
    gallery: ["/projects/hotel1.png", "/projects/hotel2.png", "/projects/hotel3.png", "/projects/hotel4.png", "/projects/hotel5.png"],
    github: "https://github.com/NajibAnanda/hotel_reservation_phpNative.git",
  },
  {
    title: "Sistem Kasir Petshop",
    image: "/projects/petshop2.jpeg",
    description: "Petshop Cashier adalah aplikasi kasir berbasis web untuk membantu operasional toko petshop, mulai dari pengelolaan produk, pencatatan transaksi penjualan, pengurangan stok otomatis, riwayat transaksi, hingga cetak struk. Aplikasi ini dibuat dengan Laravel dan memiliki dashboard admin yang menampilkan ringkasan produk, transaksi, pendapatan, serta produk dengan stok menipis.",
    tags: ["Laravel", "MySQL", "CSS", "Bootstrap", "JavaScript"],
    background: "Petshop Cashier adalah aplikasi kasir berbasis web untuk membantu operasional toko petshop, mulai dari pengelolaan produk, pencatatan transaksi penjualan, pengurangan stok otomatis, riwayat transaksi, hingga cetak struk. Aplikasi ini dibuat dengan Laravel dan memiliki dashboard admin yang menampilkan ringkasan produk, transaksi, pendapatan, serta produk dengan stok menipis.",
    howItWorks: " 1. Admin login ke sistem. 2.Mengelola data produk dan stok. 3.Memilih produk untuk transaksi. 4. Sistem menghitung total belanja otomatis. 5. Memproses pembayaran dan menghitung kembalian. 6. Menyimpan transaksi serta memperbarui stok. 7.Melihat riwayat transaksi dan mencetak struk.",
    features: ["Login & autentikasi admin", "Dashboard ringkasan produk, transaksi, dan pendapatan", "CRUD produk dengan pencarian", "Validasi stok dan kode produk", "Kasir interaktif dengan keranjang belanja","Pengurangan stok otomatis setelah transaksi","Riwayat transaksi dan cetak struk"],
    gallery: ["/projects/petshop2.jpeg", "/projects/petshop3.jpeg", "/projects/petshop4.jpeg", "/projects/petshop5.jpeg"],
    github: "https://github.com/priambodogigieh-afk/KASIR-PETSHOP",
  },
];
type Project = (typeof projects)[number];

function getWorkflowSteps(text: string) {
  if (/^\s*1\.\s*/.test(text)) {
    return text
      .split(/\s*\d+\.\s*/)
      .map((step) => step.trim())
      .filter(Boolean);
  }

  return text
    .split("→")
    .map((step) => step.trim())
    .filter(Boolean);
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.96c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .28.18.6.69.5A10.2 10.2 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}
function ProjectImage({
  project,
  image = project.gallery?.[0] ?? project.image,
  label = project.title,
  className = "",
  titleClassName = "text-xl md:text-2xl",
}: {
  project: Project;
  image?: string;
  label?: string;
  className?: string;
  titleClassName?: string;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`group/image relative overflow-hidden rounded-[1.15rem] bg-[var(--background)] ${className}`}>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--primary)_24%,transparent),transparent_56%),linear-gradient(135deg,var(--card),var(--background))]" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--border)_55%,transparent)_1px,transparent_1px),linear-gradient(0deg,color-mix(in_srgb,var(--border)_55%,transparent)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />

      <div className="relative z-10 flex aspect-[1919/876] items-center justify-center">
        {!imageError ? (
          <img
            src={image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="block h-full w-full rounded-[1.15rem] object-fill"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="p-5 text-center">
            <p className={`font-semibold tracking-[-0.06em] text-[var(--foreground)] ${titleClassName}`}>{label}</p>
          </div>
        )}
      </div>
    </div>
  );
}
function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <article className="group flex h-full flex-col rounded-[1.55rem] border border-[var(--border)] bg-[var(--card)]/80 p-3 backdrop-blur-xl transition-colors duration-300 hover:border-[var(--primary)]">
      <ProjectImage project={project} />
      <div className="flex flex-1 flex-col px-1 pb-1 pt-3.5">
        <div>
          <h3 className="text-xl font-semibold tracking-[-0.05em] text-[var(--foreground)] md:text-2xl">{project.title}</h3>
          <p
            className="mt-2.5 min-h-12 overflow-hidden text-sm leading-6 text-[var(--muted-foreground)]"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {project.description}
          </p>
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--border)] bg-[var(--muted)] px-2.5 py-1 text-[11px] text-[var(--muted-foreground)]">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-auto flex flex-wrap justify-end gap-2.5 pt-6">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-3.5 py-2.5 text-xs font-bold text-[var(--background)] transition-colors hover:bg-[#7c5fe6]"
          >
            Lihat Detail
            <ArrowUpRight className="size-4" strokeWidth={2.2} />
          </button>
          {"github" in project && project.github ? (
            <a
              href={project.github}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)]/70 px-3.5 py-2.5 text-xs font-bold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              GitHub
              <GitHubIcon className="size-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
function CarouselImage({
  image,
  label,
}: {
  image: string;
  label: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className="relative w-full shrink-0 snap-start overflow-hidden bg-[var(--muted)] flex items-center justify-center" style={{ minHeight: "10rem" }}>
      {!error ? (
        <img
          src={image}
          alt={label}
          loading="lazy"
          className={`w-full h-auto block transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      ) : null}
      {/* Fallback Grid & Label if error or no image */}
      {error && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--primary)_24%,transparent),transparent_56%),linear-gradient(135deg,var(--card),var(--background))]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--border)_55%,transparent)_1px,transparent_1px),linear-gradient(0deg,color-mix(in_srgb,var(--border)_55%,transparent)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center p-5">
            <p className="font-semibold text-center tracking-[-0.06em] text-[var(--foreground)] text-lg md:text-xl px-4">{label}</p>
          </div>
        </>
      )}
    </div>
  );
}
function ProjectCarousel({ project }: { project: Project }) {
  const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    if (clientWidth === 0) return;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };
  const scrollToImage = (index: number) => {
    if (!scrollContainerRef.current) return;
    const { clientWidth } = scrollContainerRef.current;
    scrollContainerRef.current.scrollTo({
      left: index * clientWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };
  const nextSlide = () => {
    if (activeIndex < images.length - 1) {
      scrollToImage(activeIndex + 1);
    } else {
      scrollToImage(0);
    }
  };
  const prevSlide = () => {
    if (activeIndex > 0) {
      scrollToImage(activeIndex - 1);
    } else {
      scrollToImage(images.length - 1);
    }
  };
  return (
    <div className="w-full mb-4 md:mb-5">
      {/* Image Carousel Container */}
      <div className="relative group/carousel w-full overflow-hidden bg-[var(--muted)] rounded-xl border border-[var(--border)]">
        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none"
        >
          {images.map((image, index) => (
            <CarouselImage
              key={image}
              image={image}
              label={`${project.title} Preview ${index + 1}`}
            />
          ))}
        </div>
        {/* Navigation Buttons (Desktop only, visible on carousel hover) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 size-9 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--background)] border border-[var(--primary)] opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:brightness-110 hover:scale-105 hidden md:flex shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" strokeWidth={2.4} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 size-9 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--background)] border border-[var(--primary)] opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:brightness-110 hover:scale-105 hidden md:flex shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" strokeWidth={2.4} />
            </button>
          </>
        )}
      </div>
      {/* Instagram-style Dot Indicators (below the image) */}
      {images.length > 1 && (
        <div className="mt-3 flex justify-center items-center h-3">
          {images.map((_, index) => {
            const isActive = activeIndex === index;
            const distance = Math.abs(index - activeIndex);
            
            let dotClass = "";
            
            if (images.length <= 5) {
              // Standard behavior for 5 or fewer images
              dotClass = isActive
                ? "w-2 h-2 mx-0.5 bg-[var(--primary)] opacity-100"
                : "w-1.5 h-1.5 mx-0.5 bg-[var(--muted-foreground)] opacity-40 hover:opacity-70";
            } else {
              // Shrinking/shifting behavior for more than 5 images
              if (distance === 0) {
                dotClass = "w-2 h-2 mx-0.5 bg-[var(--primary)] opacity-100";
              } else if (distance === 1) {
                dotClass = "w-1.5 h-1.5 mx-0.5 bg-[var(--muted-foreground)] opacity-40 hover:opacity-70";
              } else if (distance === 2) {
                dotClass = "w-1 h-1 mx-0.5 bg-[var(--muted-foreground)] opacity-20";
              } else {
                dotClass = "w-0 h-0 mx-0 opacity-0 pointer-events-none overflow-hidden";
              }
            }
            return (
              <button
                key={index}
                type="button"
                onClick={() => scrollToImage(index)}
                className={`rounded-full transition-all duration-300 ease-in-out ${dotClass}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
function ProjectModal({ project }: { project: Project | null }) {
  if (!project) return null;
  return (
    <DialogContent className="relative flex max-h-[80vh] sm:max-h-[85vh] w-[92vw] sm:w-full sm:max-w-md flex-col p-0 overflow-hidden">
      {/* Sticky Header - does NOT scroll */}
      <div className="shrink-0 px-4 pt-4 pb-2 md:px-5 md:pt-5 md:pb-2.5 flex items-center justify-between">
        <DialogTitle>
          {project.title}
        </DialogTitle>
        <DialogClose className="rounded-md p-1.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          <span className="sr-only">Close</span>
        </DialogClose>
      </div>
      {/* Scrollable Body Container */}
      <div data-lenis-prevent className="flex-1 overflow-y-auto px-4 pt-1 pb-3 md:px-5 md:pt-1.5 md:pb-4 scrollbar-none" style={{ WebkitOverflowScrolling: "touch" }}>
        {/* Project Image / Carousel at the top */}
        <ProjectCarousel project={project} />
        {/* Details, Features & Stack */}
        <div className="space-y-4 md:space-y-5 pb-4 md:pb-6">
          {/* Deskripsi */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--foreground)] mb-2">Deskripsi</h4>
            <DialogDescription className="text-[13px] leading-relaxed text-[var(--muted-foreground)]">
              {project.background}
            </DialogDescription>
          </div>
          {/* Alur Kerja */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--foreground)] mb-2">Alur Kerja</h4>
            <ol className="space-y-2 text-[13px] leading-relaxed text-[var(--muted-foreground)]">
              {getWorkflowSteps(project.howItWorks).map((step, index) => (
                <li key={`${step}-${index}`} className="grid grid-cols-[1.1rem_1fr] gap-2">
                  <span className="shrink-0 text-left font-medium text-[var(--foreground)]">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          {/* Fitur Utama */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--foreground)] mb-2">Fitur Utama</h4>
            <ul className="space-y-2 text-[13px] leading-relaxed text-[var(--muted-foreground)]">
              {project.features.map((feature) => (
                <li key={feature} className="grid grid-cols-[1.1rem_1fr] gap-2">
                  <span className="mt-[0.55rem] size-1.5 justify-self-start rounded-full bg-[var(--foreground)]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Stack */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--foreground)] mb-2">Stack</h4>
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[var(--border)] bg-[var(--muted)] px-2.5 py-0.5 text-[11px] text-[var(--accent-foreground)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {/* GitHub Link inside Content */}
          {"github" in project && project.github ? (
            <div className="pt-1">
              <a
                href={project.github}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)]/70 px-3.5 py-2.5 text-xs font-bold text-[var(--foreground)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_8%,transparent)]"
              >
                Repository GitHub
                <GitHubIcon className="size-4" />
              </a>
            </div>
          ) : null}
        </div>
      </div>
      {/* Dialog Footer - sticky at the bottom */}
      <DialogFooter className="shrink-0 flex items-center justify-end border-t border-[var(--border)] bg-[var(--muted)] px-4 py-2.5 md:px-5 md:py-3">
        <DialogClose asChild>
          <Button variant="default" className="px-3.5 py-2 text-xs font-bold inline-flex items-center gap-1.5">
            Tutup Detail
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-3.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const displayedProjects = showAll ? projects : projects.slice(0, 3);
  const handleToggleShow = () => {
    if (showAll) {
      setShowAll(false);
      const lenis = (window as Window & { __portfolioLenis?: { scrollTo: (target: HTMLElement | string) => void } }).__portfolioLenis;
      if (lenis) {
        lenis.scrollTo("#projects");
      } else {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      setShowAll(true);
    }
  };
  return (
    <section id="projects" ref={sectionRef} className="section-shell scroll-mt-24 pb-14 pt-4 md:scroll-mt-28 md:pb-16 md:pt-6">
      <SectionHeading title="PROJECTS." className="mb-12" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-60px" }}
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence initial={false}>
          {displayedProjects.map((project, index) => {
            const isNew = index >= 3;
            return (
              <motion.div
                key={project.title}
                variants={itemVariants}
                exit={{ opacity: 0, y: 15, scale: 0.98, transition: { duration: 0.25 } }}
                className={showAll && isNew ? "animate-fade-in-up" : ""}
                style={{
                  animationDelay: showAll && isNew ? `${(index - 3) * 100}ms` : undefined,
                  animationFillMode: "both",
                }}
              >
                <ProjectCard
                  project={project}
                  onOpen={(proj) => {
                    setSelectedProject(proj);
                    setActiveProject(proj);
                  }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
      {projects.length > 3 && (
        <div className="mt-10 flex justify-center">
          <MotionButton
            layout
            variant="outline"
            onClick={handleToggleShow}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{
              opacity: { duration: 0.4 },
              y: { duration: 0.4 },
              layout: { type: "spring", stiffness: 260, damping: 30 },
            }}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            {showAll ? "Lihat Lebih Sedikit" : "Lihat Semua Proyek"}
            {showAll ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </MotionButton>
        </div>
      )}
      <Dialog open={Boolean(selectedProject)} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <ProjectModal project={activeProject} />
      </Dialog>
    </section>
  );
}
