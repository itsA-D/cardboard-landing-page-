<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the single-page marketing experience at the index route; external product destinations stay on Cardboard's site to avoid fake local screens.
- Mount the plain Three.js silk scene once and share a mutable theme/burst reference with the dock; this preserves scene state during theme transitions.
- Define visual roles in the global semantic design system and expose pill button variants through the shared Button component for consistent theming.
- Store imported marketing media as asset pointers and keep theme preference browser-only to avoid SSR hydration mismatches.
- Keep the live headline, floating hero media, and three-step illustrations in focused presentation components; animations use stable layout bounds and respect reduced motion.
- Keep the reference footer in a dedicated presentation component using existing external link data and global theme tokens, so its layout can evolve without changing destinations.
- Keep the category showcase scroll state in its own browser-safe presentation component; passive scroll updates and direct category selection share one progress model.
- Store category-specific original-site preview pointers in a separate media mapping, so scroll presentation remains independent of asset sources.
