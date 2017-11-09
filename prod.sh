npm run build --prod --build-optimizer
if [ $? -eq 0 ]
then
	sudo cp -r dist/* /var/www/html/viewer2/mouse/
	echo "posted"
fi
