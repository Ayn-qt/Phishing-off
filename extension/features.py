import re

def extract_features(url):
    try:
        return [
            len(url),
            1 if re.search(r'(\d{1,3}\.){3}\d{1,3}', url) else 0,
            sum(url.count(c) for c in ['-', '_', '?', '=', '&', '%', '@']),
            1 if url.startswith("https") else 0,
            1 if "www" in url else 0,
            1 if ".com" in url else 0,
            sum(c.isdigit() for c in url),
            url.count('.'),
            url.count('-'),
            1 if any(k in url.lower() for k in ["login","verify","secure","update","confirm","account","bank"]) else 0,
            1 if any(url.lower().endswith(t) for t in [".xyz",".top",".win",".support",".club",".info"]) else 0,
            1 if any(s in url.lower() for s in ["bit.ly","goo.gl","tinyurl","t.co","ow.ly"]) else 0,
            len(set(url)) / len(url) if len(url) > 0 else 0,
            1 if '@' in url else 0,
            1 if url.count('//') > 1 else 0
        ]
    except:
        return [0]*15