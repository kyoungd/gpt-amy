echo 'start git pull..'
git status
git reset --hard HEAD
git pull

# sleep for 5 seconeds to complete the git pull.
sleep 5

echo 'git pull done..  start the site..'
npm run build
serve -s build -l 3000
