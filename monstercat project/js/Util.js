class Util{
    static searchAlbum(){
        let searchedstring = searchbox.value;
        load(searchedstring);
        searchbox.value = ""
    }
    static formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
    static updateProgressBar() {
        if (currentAudio && currentAudio.duration) {
            currentDuration.forEach(element => {
                element.textContent = Util.formatDuration(Math.round(currentAudio.currentTime))
            })
            endDuration.forEach(element => {
                element.textContent = Util.formatDuration(Math.round(currentAudio.duration))
            })
            const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
            progressBar.forEach(element => {
                element.style.width = `${progress}%`;
            })
        }
    }
}
class HandleColor{
    constructor(_obj){
        this.obj = _obj
    }
    applyBackground(imageUrl) {
        const img = new Image();
        img.crossOrigin = "Anonymous"; 
        img.src = imageUrl;
    
        img.onload = () => {
            Vibrant.from(img).getPalette().then(palette => {
                const vibrantColor = palette.Vibrant.hex; 
                const mutedColor = palette.Muted.hex; 
                themecolor = this.pumpSaturation(mutedColor, 30)
                document.documentElement.style.setProperty("--theme-color", themecolor);
            });
        };
    }
     hexToRgb(hex) {
        hex = hex.replace(/^#/, "");
        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        return { r, g, b };
    }
    
     rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
    
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
    
        return { h: h * 360, s: s * 100, l: l * 100 };
    }
    
     hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
    
        let r, g, b;
    
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const hueToRgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
    
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
    
            r =  hueToRgb(p, q, h + 1 / 3);
            g =  hueToRgb(p, q, h);
            b =  hueToRgb(p, q, h - 1 / 3);
        }
    
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255),
        };
    }
    
     rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }
    
     pumpSaturation(hex, increaseBy) {
        const rgb = this.hexToRgb(hex);
    
        const hsl =  this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    
        hsl.s = Math.min(hsl.s + increaseBy, 100);
    
        const newRgb =  this.hslToRgb(hsl.h, hsl.s, hsl.l);
    
        return  this.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    }
}
