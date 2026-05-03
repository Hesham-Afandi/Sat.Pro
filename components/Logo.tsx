"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  href?: string; // خاصية اختيارية للرابط
}

export default function Logo({ className = "w-16 h-16", href }: LogoProps) {
  const content = (
    <>
      <Image 
        src="/logo.png" 
        alt="SAT PRO Logo" 
        width={64}
        height={64}
        className={className}
        priority
      />
      <span className="font-bold text-xl hidden md:block text-gray-800">SAT PRO</span>
    </>
  );

  // لو تم تمرير href، اعرضه كرابط
  if (href) {
    return (
      <Link href={href} className="flex items-center gap-2 hover:opacity-80 transition">
        {content}
      </Link>
    );
  }

  // لو مفيش href، اعرضه كـ div عادي (عشان نمنع تداخل الروابط)
  return (
    <div className="flex items-center gap-2">
      {content}
    </div>
  );
}