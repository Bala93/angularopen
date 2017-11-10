npm run build --prod --build-optimizer --base-href=/viewer2/mouse/
if [ $? -eq 0 ]
then
	sudo cp -r dist/* /var/www/html/viewer2/mouse/
	echo "posted"
fi
