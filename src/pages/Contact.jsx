import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import PixelCard from '../components/PixelCard';
import LoadingPixel from '../components/LoadingPixel';
import {
  IconEmail,
  IconGithub,
  IconLinkedin,
  IconInstagram,
  IconWhatsApp,
  IconShuttlecock,
  IconPlayer,
  IconStar,
  IconCheck,
  IconTrophy,
} from '../components/PixelIcons';

/* ============================================
   DATA SOSIAL MEDIA
   ============================================ */
const SOCIALS = [
  {
    id: 'email',
    label: 'EMAIL',
    Icon: IconEmail,
    color: 'bg-pixel-sky-dark',
    link: 'mailto:fadli.ramadhan.alfarizki@gmail.com',
    display: 'fadli.ramadhan.alfarizki@gmail.com',
    hint: 'Klik untuk kirim email',
    action: 'email',
  },
  {
    id: 'github',
    label: 'GITHUB',
    Icon: IconGithub,
    color: 'bg-pixel-night',
    link: 'https://github.com/FadliRam07',
    display: '@FadliRam07',
    hint: 'Klik untuk buka profil GitHub',
    action: 'open',
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    Icon: IconLinkedin,
    color: 'bg-pixel-sky-dark',
    link: 'https://linkedin.com/in/fadli-ramadhan07',
    display: 'in/fadli-ramadhan07',
    hint: 'Klik untuk buka profil LinkedIn',
    action: 'open',
  },
  {
    id: 'instagram',
    label: 'INSTAGRAM',
    Icon: IconInstagram,
    color: 'bg-pixel-red',
    link: 'https://instagram.com/fadrmdhn07',
    display: '@fadrmdhn07',
    hint: 'Klik untuk buka profil Instagram',
    action: 'open',
  },
  {
    id: 'whatsapp',
    label: 'WHATSAPP',
    Icon: IconWhatsApp,
    color: 'bg-pixel-grass',
    link: 'https://wa.me/6281221522051',
    display: '+62 812-2152-2051',
    hint: 'Klik untuk chat WhatsApp',
    action: 'open',
  },
];

/* ============================================
   HALAMAN CONTACT / GUEST BOOK
   ============================================ */
export default function Contact() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);
  const [socialPopup, setSocialPopup] = useState(null);
  const [copied, setCopied] = useState(false);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (!error) setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && setSocialPopup(null);
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', text: '' });

    if (!form.name.trim() || !form.message.trim()) {
      setStatus({ type: 'error', text: '⚠️ Nama dan pesan wajib diisi!' });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase
      .from('messages')
      .insert([{ name: form.name.trim(), message: form.message.trim() }]);

    if (error) {
      setStatus({ type: 'error', text: '❌ Gagal kirim: ' + error.message });
    } else {
      setStatus({ type: 'success', text: '✅ Pesan terkirim! Terima kasih.' });
      setForm({ name: '', message: '' });
      fetchMessages();
    }
    setSubmitting(false);
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const closePopup = () => {
    setSocialPopup(null);
    setCopied(false);
  };

  return (
    <div className="animate-slideUp">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-3 sm:px-5 md:px-8 pt-6 sm:pt-10 md:pt-12 pb-4 sm:pb-6 md:pb-8">
        <header className="text-center">
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-3">
            <IconShuttlecock size={20} className="text-pixel-cream sm:w-6 sm:h-6 md:w-7 md:h-7" />
            <h1 className="font-pixel text-xs sm:text-base md:text-2xl text-pixel-accent drop-shadow-[2px_2px_0_#000] sm:drop-shadow-[3px_3px_0_#000]">
              GUEST BOOK
            </h1>
            <IconShuttlecock size={20} className="text-pixel-cream sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </div>
          <p className="font-mono text-pixel-cream text-sm sm:text-lg md:text-xl mt-2 px-2">
            Tinggalkan jejakmu di papan skor!
          </p>
        </header>
      </div>

      {/* MAIN CONTENT — 2 KOLOM */}
      <div className="max-w-6xl mx-auto px-3 sm:px-5 md:px-8 pb-8 sm:pb-12 md:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-7 items-start">

          {/* KOLOM KIRI — FORM */}
          <PixelCard color="grass">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <IconEmail size={18} className="sm:w-5 sm:h-5 text-pixel-accent" />
              <h2 className="font-pixel text-[10px] sm:text-xs md:text-sm text-pixel-accent">
                SEND MESSAGE
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div>
                <label className="font-pixel text-[9px] sm:text-[10px] text-pixel-cream block mb-1.5 sm:mb-2">
                  NAMA
                </label>
                <input
                  type="text"
                  maxLength={50}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Player name..."
                  className="w-full bg-pixel-night text-pixel-cream font-mono text-base sm:text-lg px-3 py-2.5 sm:py-3 border-4 border-black outline-none focus:border-pixel-accent transition-colors"
                />
              </div>

              <div>
                <label className="font-pixel text-[9px] sm:text-[10px] text-pixel-cream block mb-1.5 sm:mb-2">
                  PESAN
                </label>
                <textarea
                  rows={5}
                  maxLength={300}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tulis pesanmu..."
                  className="w-full bg-pixel-night text-pixel-cream font-mono text-base sm:text-lg px-3 py-2.5 sm:py-3 border-4 border-black outline-none focus:border-pixel-accent resize-none transition-colors"
                />
                <p className="font-mono text-xs sm:text-sm text-pixel-cream/70 text-right mt-1">
                  {form.message.length}/300
                </p>
              </div>

              {status.text && (
                <div
                  className={`font-mono text-sm sm:text-base px-3 py-2.5 border-4 border-black flex items-center gap-2 ${
                    status.type === 'error'
                      ? 'bg-pixel-red text-pixel-cream'
                      : 'bg-pixel-accent text-pixel-night'
                  }`}
                >
                  {status.type === 'error' ? (
                    <IconStar size={14} />
                  ) : (
                    <IconCheck size={14} />
                  )}
                  <span>{status.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full font-pixel text-[9px] sm:text-[10px] uppercase tracking-wider px-4 py-3 sm:py-3.5 border-4 border-black bg-pixel-accent text-pixel-night shadow-pixel hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'SENDING...' : '▶ KIRIM PESAN'}
              </button>
            </form>

            {/* SOCIAL LINKS */}
            <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t-4 border-black/30">
              <p className="font-pixel text-[9px] sm:text-[10px] text-pixel-cream mb-2.5 sm:mb-3">
                ATAU HUBUNGI LANGSUNG:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
                {SOCIALS.map((s) => {
                  const SIcon = s.Icon;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSocialPopup(s)}
                      className={`font-pixel text-[8px] sm:text-[9px] md:text-[10px] px-2 py-2 sm:py-2.5 border-4 border-black ${s.color} text-pixel-cream shadow-pixel-sm hover:-translate-y-0.5 hover:shadow-pixel transition-all inline-flex flex-col items-center gap-1`}
                    >
                      <SIcon size={14} className="sm:w-4 sm:h-4" />
                      <span>{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </PixelCard>

          {/* KOLOM KANAN — LIST PESAN */}
          <PixelCard color="sky">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <IconPlayer size={18} className="sm:w-5 sm:h-5 text-pixel-accent" />
              <h2 className="font-pixel text-[10px] sm:text-xs md:text-sm text-pixel-accent">
                LATEST MESSAGES ({messages.length})
              </h2>
            </div>

            {loading ? (
              <LoadingPixel text="MEMUAT PESAN" />
            ) : messages.length === 0 ? (
              <div className="text-center py-8 sm:py-10">
                <IconTrophy size={36} className="mx-auto mb-3 sm:mb-4 sm:w-12 sm:h-12 opacity-60" />
                <p className="font-pixel text-[9px] sm:text-[10px] md:text-xs text-pixel-accent mb-2">
                  NO MESSAGES YET
                </p>
                <p className="font-mono text-sm sm:text-base md:text-lg text-pixel-cream">
                  Jadilah yang pertama meninggalkan pesan!
                </p>
              </div>
            ) : (
              <ul className="space-y-2.5 sm:space-y-3 max-h-[400px] sm:max-h-[520px] overflow-y-auto pr-1">
                {messages.map((m) => (
                  <li
                    key={m.id}
                    className="border-4 border-black bg-pixel-night/50 p-2.5 sm:p-3 md:p-4 hover:bg-pixel-night/70 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2 flex-wrap">
                      <span className="font-pixel text-[8px] sm:text-[9px] md:text-[10px] text-pixel-accent break-all">
                        👤 {m.name}
                      </span>
                      <span className="font-mono text-[10px] sm:text-xs md:text-sm text-pixel-sky">
                        {formatDate(m.created_at)}
                      </span>
                    </div>
                    <p className="font-mono text-sm sm:text-base md:text-lg text-pixel-cream break-words leading-relaxed">
                      {m.message}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </PixelCard>
        </div>
      </div>

      {/* SOCIAL POPUP MODAL */}
      {socialPopup && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-3 sm:p-4 animate-slideUp"
          onClick={closePopup}
        >
          <div
            className="relative w-full max-w-sm border-4 border-pixel-accent bg-pixel-night shadow-pixel-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between border-b-4 border-pixel-accent px-2.5 sm:px-3 py-2 sm:py-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <socialPopup.Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                <p className="font-pixel text-[9px] sm:text-[10px] md:text-xs text-pixel-accent truncate">
                  {socialPopup.label}
                </p>
              </div>
              <button
                onClick={closePopup}
                aria-label="Close"
                className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 border-2 border-black bg-pixel-red text-pixel-cream font-pixel text-[10px] sm:text-xs hover:-translate-y-0.5 transition-all ml-2"
              >
                X
              </button>
            </div>

            {/* BODY */}
            <div className="p-3.5 sm:p-4 md:p-5 space-y-3.5 sm:space-y-4">
              <div
                className={`mx-auto w-14 h-14 sm:w-16 sm:h-16 border-4 border-black ${socialPopup.color} flex items-center justify-center shadow-pixel-sm`}
              >
                <socialPopup.Icon size={28} className="sm:w-8 sm:h-8" />
              </div>

              <p className="font-mono text-pixel-cream/80 text-center text-sm sm:text-base">
                {socialPopup.hint}
              </p>

              <div className="border-4 border-black bg-pixel-cream p-2.5 sm:p-3 text-center">
                <p className="font-pixel text-[7px] sm:text-[8px] text-pixel-night/60 mb-1">
                  {socialPopup.action === 'email'
                    ? 'ALAMAT EMAIL'
                    : socialPopup.id === 'whatsapp'
                      ? 'NOMOR WHATSAPP'
                      : 'USERNAME'}
                </p>
                <p className="font-mono text-sm sm:text-base md:text-lg text-pixel-night break-all font-bold">
                  {socialPopup.display}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleCopy(socialPopup.display)}
                  className={`w-full font-pixel text-[9px] sm:text-[10px] uppercase tracking-wider px-3 py-2.5 sm:py-3 border-4 border-black shadow-pixel hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 ${
                    copied
                      ? 'bg-pixel-grass text-pixel-cream'
                      : 'bg-pixel-sky-dark text-pixel-cream'
                  }`}
                >
                  {copied ? (
                    <>
                      <IconCheck size={14} />
                      <span>TERCOPY!</span>
                    </>
                  ) : (
                    <>
                      <IconStar size={14} />
                      <span>SALIN</span>
                    </>
                  )}
                </button>

                <a
                  href={socialPopup.link}
                  target={socialPopup.action === 'email' ? '_self' : '_blank'}
                  rel="noreferrer"
                  className="w-full font-pixel text-[9px] sm:text-[10px] uppercase tracking-wider px-3 py-2.5 sm:py-3 border-4 border-black bg-pixel-accent text-pixel-night shadow-pixel hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  <socialPopup.Icon size={14} />
                  <span>
                    {socialPopup.action === 'email'
                      ? 'KIRIM EMAIL'
                      : socialPopup.id === 'whatsapp'
                        ? 'CHAT WA'
                        : 'BUKA PROFIL'}
                  </span>
                </a>
              </div>
            </div>

            <div className="border-t-4 border-pixel-accent px-3 py-2 text-center">
              <p className="font-mono text-pixel-cream text-xs opacity-70">
                Tekan{' '}
                <span className="text-pixel-accent font-pixel text-[10px]">
                  ESC
                </span>{' '}
                untuk menutup
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}