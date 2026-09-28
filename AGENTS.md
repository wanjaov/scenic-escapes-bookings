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

- Keep the public stay search in a dedicated component and pass validated URL search fields to the existing stays listing; this keeps search state shareable without changing the original offer catalogue.
- Keep account entry on a public `/auth` route using Lovable Cloud's generated browser client; no protected loader is needed for sign-in and registration.
