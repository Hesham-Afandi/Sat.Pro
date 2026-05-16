import Logo from "./Logo";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-6">
          <Logo className="w-20 h-20 mx-auto" />
        </div>
        <p className="text-lg mb-2">S𝑪𝒐𝒎𝒑𝒂𝒔𝒔 𝑨𝒄𝒂𝒅𝒆𝒎𝒚</p>
        <p className="text-sm">© 2026 {t("footer_rights")}</p>
        
        <div className="mt-6 flex justify-center gap-6">
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition">Terms</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </div>
      </div>
    </footer>
  );
}