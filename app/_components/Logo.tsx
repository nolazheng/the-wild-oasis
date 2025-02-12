import Image from 'next/image';
import Link from 'next/link';

import LogoImg from '@/public/logo.png';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={LogoImg}
        priority
        height="60"
        width="60"
        alt="The Wild Oasis logo"
        placeholder="blur"
        blurDataURL="/logo.png"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
