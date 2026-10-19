import type { MetadataRoute } from 'next';
import { getAllPostSlugs } from '@/lib/markdown';
export default function sitemap(): MetadataRoute.Sitemap {
 return ['', '/blog/', '/essays/', '/projects/', '/resume/', ...getAllPostSlugs().map(p=>`/blog/${p.slug}/`)].map(path=>({url:`https://maxge.dev${path}`,changeFrequency:'monthly',priority:path===''?1:0.7}));
}
