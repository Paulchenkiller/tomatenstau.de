export interface AppRouteMeta {
  titleKey: string;
  descriptionKey: string;
  breadcrumbKey: string;
  schemaType?: 'profile' | 'article';
}

interface RouteLike {
  data?: { meta?: AppRouteMeta };
  routeConfig?: {
    path?: string;
    data?: { meta?: AppRouteMeta };
  } | null;
  firstChild?: RouteLike | null;
}

export interface ActiveRouteMeta {
  meta: AppRouteMeta;
  path: string;
  url: string;
}

export function normalizeAppPath(url: string): string {
  const normalized = url.split('#')[0]?.split('?')[0];
  if (!normalized || normalized === '/') {
    return '/';
  }

  let result = normalized.startsWith('/') ? normalized : `/${normalized}`;
  if (result.length > 1 && result.endsWith('/')) {
    result = result.slice(0, -1);
  }
  return result;
}

export function getActiveRouteMetaChain(
  root: RouteLike | null | undefined,
  currentUrl: string,
): ActiveRouteMeta[] {
  const chain: ActiveRouteMeta[] = [];
  const normalizedCurrentUrl = normalizeAppPath(currentUrl);

  let route = root;
  let currentPath = '';
  while (route) {
    const path = route.routeConfig?.path ?? '';
    const meta = route.data?.meta ?? route.routeConfig?.data?.meta;

    if (path && path !== '**') {
      currentPath = `${currentPath}/${path}`.replace(/\/+/g, '/');
    }

    if (meta) {
      chain.push({
        meta,
        path,
        url: path === '**' ? normalizedCurrentUrl : currentPath || '/',
      });
    }

    route = route.firstChild ?? null;
  }

  return chain;
}

export function getDeepestRouteMeta(
  root: RouteLike | null | undefined,
  currentUrl: string,
): ActiveRouteMeta | undefined {
  const chain = getActiveRouteMetaChain(root, currentUrl);
  return chain[chain.length - 1];
}
