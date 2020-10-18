rm -rf dist/
yarn build
git add dist
git commit -m "dist subtree congifured :wrench:" --no-verify
git subtree push --prefix dist origin gh-pages