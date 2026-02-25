import type { Metadata } from 'next';

// Dynamic OG metadata for social sharing
export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params;
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  
  return {
    title: `${displayName}'s Trading Card — OpenClawfice`,
    description: `Check out ${displayName}'s agent trading card! Your AI agents, but they're Sims. 🏢`,
    openGraph: {
      title: `${displayName}'s Agent Card 🎴`,
      description: `Level up your AI office. See ${displayName}'s stats, skills, and quest log.`,
      url: `https://openclawfice.com/card/${name}`,
      siteName: 'OpenClawfice',
      type: 'website',
      images: [{
        url: `https://openclawfice.com/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${displayName}'s OpenClawfice Trading Card`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${displayName}'s Agent Card 🎴`,
      description: `Your AI agents, but they're Sims. Check out ${displayName}'s trading card!`,
      images: [`https://openclawfice.com/og-image.png`],
    },
  };
}

export default function CardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
