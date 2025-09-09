# Project Log

- Initialized project and created log.md
- Cloned `yihong0618/running_page` repository
- Created Python virtual environment
- Installed Python dependencies
- Linked and pushed to user's GitHub repository
- Modified `get_garmin_secret.py` to use `config.yaml`
- Refactored `garmin_sync.py` to handle login and sync
- Synced Garmin data
- Installed frontend dependencies
- Configured Mapbox token to use environment variable
- Updated `IS_CHINESE` to `false` for English display
- Updated site logo to user's GitHub avatar (`https://github.com/djfan.png`)
- Disabled year-based filtering for heatmap display - now shows all runs regardless of year selection
- Modified UI to always show RunTable instead of SVGStat component
- Implemented "Total" filter to show all activities without year filtering
- Fixed JSON syntax error in activities.json (Chinese comma to English comma)
- Disabled SVG generation in GitHub Actions to skip unnecessary processing
- Configured GitHub Pages deployment as recommended solution over Vercel

## SVG Generation Command Reference

```bash
python run_page/gen_svg.py --from-db --title "Run 2025" --type grid --athlete "Dongjie"  --output assets/grid.svg --min-distance 5.0 --special-color yellow --special-color2 red --special-distance 7 --special-distance2 10 --use-localtime
```
