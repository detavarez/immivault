# Adding a form to ImmiVault

1. Put the blank fillable PDF in the repo root (decrypted, no XFA).
2. Create `forms/<id>.js` that calls `registerForm({id,name,short,edition,pdf,OPT,PARTS,...})`. Copy `forms/n400.js` as the template.
3. Add `<script src="forms/<id>.js"></script>` in `index.html` and the current `ImmiVault-Ver###.html`, just before `<script>boot();</script>`.
4. Bump the version (new `ImmiVault-Ver###.html`, copy to `index.html`).
