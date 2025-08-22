# 生成 1080p MP4（H.264）
ffmpeg -i HINO-SELEGA.mp4 -an -vf "scale=-2:1080,fps=30" -c:v libx264 -profile:v main -preset slow `
-b:v 3M -maxrate 3.5M -bufsize 6M -movflags +faststart ./hero-1080.mp4

# 生成 720p MP4
ffmpeg -i HINO-SELEGA.mp4 -an -vf "scale=-2:720,fps=30" -c:v libx264 -preset slow `
-b:v 1.6M -maxrate 2M -bufsize 3M -movflags +faststart ./hero-720.mp4

# 生成 1080p WebM（VP9）
ffmpeg -i HINO-SELEGA.mp4 -an -vf "scale=-2:1080,fps=30" -c:v libvpx-vp9 -b:v 2.2M -deadline good -row-mt 1 `
./hero-1080.webm

# 生成 720p WebM
ffmpeg -i HINO-SELEGA.mp4 -an -vf "scale=-2:720,fps=30" -c:v libvpx-vp9 -b:v 1.2M -deadline good -row-mt 1 `
./hero-720.webm

# 生成海报图
ffmpeg -ss 1 -i HINO-SELEGA.mp4 -frames:v 1 -vf "scale=-2:1280" ./japan-scenery-1280.webp