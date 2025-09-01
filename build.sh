
# Clean the project
rm -fr build/

# Build the project
npm run build

if [ $? -eq 0 ]; then
    echo "Build completed successfully."
else
    echo "Build failed."
    exit 1
fi

# Make temporary directory in current folder
toZip=./tozip
mkdir -p "$toZip/simple-promo-slider"

# Copy necessary files
cp simple-promo-slider.php "$toZip/simple-promo-slider"
cp -r build "$toZip/simple-promo-slider"

# Get plugin version from simple-promo-slider.php
# Format: * Version:           1.0.0
plugin_version=$(grep Version simple-promo-slider.php | tr -d ' ' | cut -d':' -f2)
echo "Plugin version: $plugin_version"

# Make ZIP archive, exclude prefix
cd "$toZip"
zipfile="../simple-promo-slider-$plugin_version.zip"
if [ -f "$zipfile" ]; then
    rm "$zipfile"
fi

cd "$toZip"

zip -r "$zipfile" "./"

# Clean up temporary files
rm -rf "$toZip"