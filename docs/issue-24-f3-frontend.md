# Issue 24 — F3 frontend: XX OMRI

## Implementation

The `/register/:origen?` route now renders `RegisterLogin.vue`, preserving the optional referral code. The registration view loads the current edition from `GET /api/omri/edicion-actual` and does not fall back to a hard-coded course ID or dates. It shows admission close, training start, fee, payment deadline, and timezone from that response.

The edition is reloaded before email lookup and before saving step 2, so an open page cannot rely on an old admission flag. New accounts are blocked after admission closes; existing accounts can continue after close only when the lookup confirms an XX association through `omri_enrolled` and `course_id`. Step 3 creates/reuses the edition-specific charge through `POST /api/omri/inscripcion` with `{ user_id, course_id }`. The view trusts the charge response for paid status and requires its course, fee, and payment deadline to match the loaded edition. It never selects a charge from the legacy `response.cargos` collection. The `updateUser` response must include `access_token`; F3 installs it as Axios Bearer authorization before the inscription POST, and the header remains available for the later link-recovery GET. Both new and returning accounts reach this same update step before creating/recovering the charge. A missing token stops the flow with an actionable error. A missing payment URL triggers `GET /api/conekta/link?cargo_id=...`; the button recovers or resends the existing link rather than promising to create another. Link errors remain visible with a retry action. Pending participants may start training on the returned training date and pay through the returned payment deadline. Payment links and transfer instructions disappear after that deadline; the server remains the authority for whether a charge can be paid.

The form includes the school/grado state carried from the deployed registration UI. It retains the Meta tracking helpers from the registration foundation and emits ViewContent/CompleteRegistration without allowing storage or tracking failures to block enrollment. The minimal route change is included because the deployed registration view is `RegisterLogin.vue`, while the public `main` baseline routes `/register` to `Register.vue`.

The drawer dialogs reachable from `/register` also use current wording: the course dialog loads the training start from the edition endpoint and defers modality, session calendar, and academic contents to the current call; the cost dialog refers to XX without an unconfirmed national contest year; the requirements dialog preserves the fourth-semester cap and points to the current call for its reference period. Payment remains available through the final second encoded by the API close timestamp; the UI removes payment actions after that window.

## Integration base

- Branch prepared for integration: `codex/xx-omri-frontend-main-integration`
- Isolation: `/tmp/omri-xx-frontend-main-integration`
- Clean base: public `origin/main` `bca34a430211d842e054b6d59cd0a8dbd02d4fa3`
- Known GitHub `origin/main` base: `bca34a4`

The source implementation tree at `0fe0388` was reconstructed on the clean public base. Its required 21-file registration foundation is recorded in commit `127a20e`; the 13 #24 commits were replayed after it. The resulting tree is identical to the reviewed `0fe0388` tree, while its history starts at public `main` and does not carry the six local commits as ancestry. The public diff is 33 files because the enrollment form depends on the added dialogs, countdown styling, tracking helpers and visual assets. This branch is prepared for a draft PR; the backend dependency below still prevents merge.

## Validation

- `./node_modules/.bin/quasar build` on the stacked #24 + #25 tree — succeeded; the #24 tree is its exact ancestor.
- ESLint focused on the registration, profile, payload and school-selection files — exit code 0.
- `node scripts/verify-school-intake.js` on the stacked tree — passed; the helper is used by the new registration form and profile serializer.
- `git diff --check` — passed for the clean #24/#25 branches.

The build reports outdated `caniuse-lite` and Quasar's update check cannot write its user config; neither affected compilation or linting. Independent static review is documented in the control repo's issue #23/#24 verification report. The public backend `master` (`749c538`) still lacks `GET /api/omri/edicion-actual` and `POST /api/omri/inscripcion`; issue #23 remains open without a PR. Keep #24 in draft and do not merge or deploy until that backend dependency is integrated. No PHP/MySQL runtime or real provider call was performed.
