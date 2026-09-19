/**
 * Opens an external URL in a real new browser tab.
 * Inside embedded preview frames, a plain target="_blank" can be forced to
 * navigate the frame itself, which sites like LinkedIn refuse (ERR_BLOCKED_BY_RESPONSE).
 */
export function openExternal(url: string) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.top?.location.assign(url);
  };
}
