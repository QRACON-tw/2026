const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const basePrefix = basePath ? `${basePath}/` : '/';

// This edition's permanent home. The domain-root deploy (ASTRO_BASE_PATH=/) is a mirror that
// switches to next year's site, so canonical URLs always point here. Keep in step with astro.config.mjs.
const canonicalBasePath = '/2026';

const isExternal = (path: string) => /^(?:[a-z][a-z\d+.-]*:|\/\/|#|\?)/i.test(path);

/** Prefix an internal URL with the deployment path while preserving external URLs. */
export function sitePath(path: string): string {
  if (isExternal(path)) return path;

  const match = path.match(/^([^?#]*)(.*)$/);
  const pathname = match?.[1] ?? path;
  const suffix = match?.[2] ?? '';
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;

  if (!basePath) return `${normalizedPath}${suffix}`;
  if (normalizedPath === basePath || normalizedPath.startsWith(`${basePath}/`)) {
    return `${normalizedPath}${suffix}`;
  }

  if (normalizedPath === '/') return `${basePrefix}${suffix}`;
  return `${basePrefix}${normalizedPath.slice(1)}${suffix}`;
}

/** Like `sitePath`, but under the permanent annual path whatever base this build was deployed at. */
export function canonicalSitePath(path: string): string {
  if (isExternal(path)) return path;

  const deployed = sitePath(path);
  const local = basePath ? deployed.slice(basePath.length) : deployed;
  return `${canonicalBasePath}${local.startsWith('/') ? local : `/${local}`}`;
}
