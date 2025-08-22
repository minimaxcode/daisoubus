``` powershell
# 安装 ImageMagick（含 magick.exe）
winget install ImageMagick.ImageMagick

# 进入项目图片目录
Set-Location E:\workspace\projects\daisou-bus-website\public\images
```
``` powershell
$veh = @(
  'large-sized-bus-1.jpg','large-sized-bus-2.jpg','mid-size-coach.jpg',
  'microbus-vip-specification.jpg','microbus-coaster-2.jpg',
  'micro-bus-superlong-type.jpg','hiace.jpg'
)
foreach ($f in $veh) {
  foreach ($w in 640,1280) {
    magick "$f" -resize ${w}x -strip -colorspace sRGB `
      -define webp:method=6 -define webp:auto-filter=true `
      -quality 80 "$([IO.Path]::GetFileNameWithoutExtension($f))-$w.webp"
  }
}
```

``` powershell
foreach ($w in 1280,1600) {
  magick "japan-scenery.jpg" -resize ${w}x -strip -colorspace sRGB `
    -define webp:method=6 -quality 80 "japan-scenery-$w.webp"
}
```
``` powershell
$cards = @(
  'narita-airport.jpg','cherry-blossom.jpg','ad.jpg','spa.jpg',
  'jp-wedding.webp','exhibition.jpg','tour-guide.png'
)
foreach ($f in $cards) {
  foreach ($w in 420,840) {
    magick "$f" -resize ${w}x -strip -colorspace sRGB `
      -define webp:method=6 -quality 80 `
      "$([IO.Path]::GetFileNameWithoutExtension($f))-$w.webp"
  }
}
```

``` powershell
$all = $veh + @('japan-scenery.jpg') + $cards
$widths = @{
  default = @(420,840)        # 卡片
  vehicles = @(640,1280)      # 车辆
  hero = @(1280,1600)         # 首屏
}
foreach ($f in $veh) {
  foreach ($w in $widths.vehicles) {
    magick "$f" -resize ${w}x -strip -sampling-factor 4:2:0 -quality 82 `
      "$([IO.Path]::GetFileNameWithoutExtension($f))-$w.jpg"
  }
}
foreach ($w in $widths.hero) {
  magick "japan-scenery.jpg" -resize ${w}x -strip -sampling-factor 4:2:0 -quality 82 `
    "japan-scenery-$w.jpg"
}
foreach ($f in $cards) {
  foreach ($w in $widths.default) {
    magick "$f" -resize ${w}x -strip -sampling-factor 4:2:0 -quality 82 `
      "$([IO.Path]::GetFileNameWithoutExtension($f))-$w.jpg"
  }
}
```