# Issue 24 — F3 frontend: XX OMRI

## Implementation

The `/register/:origen?` route now renders `RegisterLogin.vue`, preserving the optional referral code. The registration view loads the current edition from `GET /api/omri/edicion-actual` and does not fall back to a hard-coded course ID or dates. It shows admission close, training start, fee, payment deadline, and timezone from that response.

The edition is reloaded before email lookup and before saving step 2, so an open page cannot rely on an old admission flag. New accounts are blocked after admission closes; existing accounts can continue after close only when the lookup confirms an XX association through `omri_enrolled` and `course_id`. Step 3 creates/reuses the edition-specific charge through `POST /api/omri/inscripcion` with `{ user_id, course_id }`. The view trusts the charge response for paid status and requires its course, fee, and payment deadline to match the loaded edition. It never selects a charge from the legacy `response.cargos` collection. A missing payment URL triggers `GET /api/conekta/link?cargo_id=...`; link errors remain visible with a retry action. Pending participants may start training on the returned training date and pay through the returned payment deadline. Payment links and transfer instructions disappear after that deadline; the server remains the authority for whether a charge can be paid.

The form includes the school/grado state carried from the deployed registration UI. The source checkout's unrelated Meta tracking edits were not copied. The minimal route change is included because the deployed registration view is `RegisterLogin.vue`, while the branch baseline routes `/register` to `Register.vue`.

The drawer dialogs reachable from `/register` also use current wording: the course dialog loads the training start from the edition endpoint and defers modality, session calendar, and academic contents to the current call; the cost dialog refers to XX without an unconfirmed national contest year; the requirements dialog preserves the fourth-semester cap and points to the current call for its reference period. Payment remains available through the final second encoded by the API close timestamp; the UI removes payment actions after that window.

## Integration base

- Branch: `codex/xx-omri-frontend`
- Isolation: `/tmp/omri-xx-frontend`
- Implementation base: `b8045dc4939ff45a06a96796a015fd5981f1e389`
- Known GitHub `origin/main` base: `bca34a4`

The implementation base is six commits ahead of `origin/main` (`git rev-list --left-right --count bca34a4...b8045dc` returned `0 6`). Those commits are part of the deployed local baseline confirmed for this work. The F3 implementation and correction commits are on top, so the current branch is eight commits ahead of GitHub `main` (`git rev-list --left-right --count bca34a4...HEAD` returned `0 8`). A pull request from this branch would include all eight commits; integration must first reconcile the baseline or apply the F3 patch relative to `b8045dc`. No pull request was opened.

## Validation

- `./node_modules/.bin/quasar build` — succeeded; SPA output was written under this isolation's `dist/spa`.
- ESLint on all six modified source files — exit code 0.
- `git diff --check` — passed.

The build reported that `caniuse-lite` is outdated and Quasar's update check could not write its user config; neither affected compilation or linting. Backend integration and cross-verification remain pending F2/F4.
