#!/usr/bin/env python3
"""
Build 4 static language versions of the Promspecbud site from the data-i18n
templates, with hreflang + canonical links and a link-based language switcher.

  uk -> site root
  ru -> /ru/
  en -> /en/
  pl -> /pl/

Internal links, assets and the language switcher use RELATIVE paths so the site
also renders correctly when opened locally (file://) or from a subdirectory.
Only `canonical` / `hreflang` <link> tags use absolute URLs (required by SEO).

Usage:  python3 tools/build.py
"""
import json
import os
import re
import shutil

from bs4 import BeautifulSoup, NavigableString, Tag

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = open(os.path.join(ROOT, 'CNAME')).read().strip()
BASE = 'https://' + DOMAIN

PAGES = [
    'index.html', 'vidy-robit.html', 'tehnika.html', 'proekty.html',
    'galereya.html', 'video.html', 'licenzii.html', 'kontakty.html',
    'golovnyy-bukhhalter.html'
]
LANGS = ['uk', 'ru', 'en', 'pl']
LANG_DIR = {'uk': '', 'ru': 'ru', 'en': 'en', 'pl': 'pl'}
NATIVE = {'uk': 'Українська', 'ru': 'Русский', 'en': 'English', 'pl': 'Polski'}
CODES = {'uk': 'UA', 'ru': 'RU', 'en': 'EN', 'pl': 'PL'}

translations = json.load(open(os.path.join(ROOT, 'tools', 'translations.json')))
SHARED = translations['shared']
PAGE_DICTS = translations['pages']


def merged(page, lang):
    m = {}
    m.update(SHARED.get('uk', {}))
    m.update(PAGE_DICTS[page].get('uk', {}))
    if lang != 'uk':
        m.update(SHARED.get(lang, {}))
        m.update(PAGE_DICTS[page].get(lang, {}))
    return m


# ---- URL helpers -----------------------------------------------------------

def clean_page_path(lang, page):
    """Absolute URL path for SEO links (index.html -> clean '/')."""
    prefix = '' if lang == 'uk' else '/' + lang
    if page == 'index.html':
        return '/' if not prefix else prefix + '/'
    return prefix + '/' + page


def abs_url(lang, page):
    return BASE + clean_page_path(lang, page)


def rel_dir(from_lang, to_lang):
    """Relative directory prefix when navigating from one language dir to another."""
    if from_lang == to_lang:
        return ''
    if from_lang == 'uk':
        return to_lang + '/'
    if to_lang == 'uk':
        return '../'
    return '../' + to_lang + '/'


def asset_prefix(lang):
    return '../' if lang != 'uk' else ''


def rewrite_url(value, lang):
    """Rewrite a local href/src to a RELATIVE path that works in the language dir."""
    if not value:
        return value
    if value.startswith(('#', 'http', '//', 'data:', 'mailto:', 'tel:', 'javascript:')):
        return value
    m = re.match(r'^([A-Za-z0-9_-]+\.html)(#.*)?$', value)
    if m:
        # same-language internal page link (nav, logo, footer, anchors)
        return m.group(1) + (m.group(2) or '')
    # local asset -> root-relative-up
    return asset_prefix(lang) + value


# ---- baking helpers --------------------------------------------------------

def set_text_preserving(el, text):
    strings = [c for c in el.contents if isinstance(c, NavigableString)]
    if strings:
        strings[0].replace_with(NavigableString(text))
        for s in strings[1:]:
            s.extract()
    else:
        el.insert(0, NavigableString(text))


def set_html(el, html_str):
    el.clear()
    frag = BeautifulSoup(html_str, 'html.parser')
    container = frag.body if frag.body else frag
    for child in list(container.contents):
        el.append(child.extract())


def rebuild_lang_switch(soup, page, lang):
    switch = soup.select_one('.lang-switch')
    if switch is None:
        return
    switch.clear()
    switch['role'] = 'group'
    switch['aria-label'] = merged(page, lang).get('nav.lang', 'Language')
    for attr in ('data-i18n', 'data-i18n-attr', 'data-i18n-html'):
        switch.attrs.pop(attr, None)
    for l in LANGS:
        a = soup.new_tag('a')
        a['class'] = ['lang-btn'] + (['active'] if l == lang else [])
        a['href'] = rel_dir(lang, l) + page
        a['hreflang'] = l
        a['lang'] = l
        a['aria-label'] = NATIVE[l]
        a.string = CODES[l]
        switch.append(a)


def inject_head_links(soup, page, lang):
    head = soup.head
    if head is None:
        return
    for t in list(head.find_all('link', rel=lambda v: v and (v == 'canonical' or 'alternate' in v))):
        t.decompose()
    head.append(soup.new_tag('link', rel='canonical', href=abs_url(lang, page)))
    for l in LANGS:
        head.append(soup.new_tag('link', rel='alternate', hreflang=l, href=abs_url(l, page)))
    head.append(soup.new_tag('link', rel='alternate', hreflang='x-default', href=abs_url('uk', page)))


def inject_form_script(soup, page, lang):
    d = merged(page, lang)
    form_keys = ['form.required', 'form.sending', 'form.success',
                 'form.successAlert', 'form.error', 'form.errorAlert']
    fmt = {k: d.get(k, '') for k in form_keys}
    js = ("window.__psbT = (function(){var d=" + json.dumps(fmt, ensure_ascii=False)
          + ";return function(k,v){var s=d[k]||k;if(v){for(var x in v){s=s.split('{'+x+'}').join(v[x]);}}return s;};})();")
    script = soup.new_tag('script')
    script.string = js
    main = soup.find('script', src=re.compile(r'js/main\.js$'))
    if main is not None:
        main.insert_before(script)
    else:
        (soup.body or soup).append(script)


def bake(page, lang):
    src = os.path.join(ROOT, 'templates', page)
    soup = BeautifulSoup(open(src, encoding='utf-8').read(), 'html.parser')
    soup.html['lang'] = lang
    m = merged(page, lang)

    for el in soup.select('[data-i18n], [data-i18n-html]'):
        if el.get('data-i18n-html'):
            key = el['data-i18n-html']
            val = m.get(key)
            if val is not None:
                set_html(el, val)
            continue
        key = el.get('data-i18n')
        if not key:
            continue
        val = m.get(key)
        if val is None:
            continue
        attr = el.get('data-i18n-attr')
        if attr:
            for a in attr.split():
                if a:
                    el[a] = val
            continue
        if el.name == 'meta':
            el['content'] = val
            continue
        set_text_preserving(el, val)

    # rewrite local URLs to relative paths (assets + same-language page links)
    for el in soup.select('[href], [src]'):
        for attr in ('href', 'src'):
            if el.has_attr(attr):
                el[attr] = rewrite_url(el[attr], lang)

    # build the cross-language switcher AFTER the URL rewrite, so its links are not re-processed
    rebuild_lang_switch(soup, page, lang)

    inject_head_links(soup, page, lang)
    inject_form_script(soup, page, lang)

    # strip i18n machinery and attributes
    for s in list(soup.find_all('script', src=True)):
        if s['src'].endswith('js/i18n.js'):
            s.decompose()
    for s in list(soup.find_all('script', type='application/json')):
        if s.get('id') == 'i18n-page-dict':
            s.decompose()
    for el in soup.find_all(True):
        for a in ('data-i18n', 'data-i18n-html', 'data-i18n-attr', 'data-i18n-text'):
            el.attrs.pop(a, None)

    return soup


def write_sitemap():
    urls = []
    for page in PAGES:
        for lang in LANGS:
            loc = abs_url(lang, page)
            links = ['<xhtml:link rel="alternate" hreflang="%s" href="%s"/>' % (l, abs_url(l, page)) for l in LANGS]
            links.append('<xhtml:link rel="alternate" hreflang="x-default" href="%s"/>' % abs_url('uk', page))
            urls.append('  <url>\n    <loc>%s</loc>\n    %s\n  </url>' % (loc, '\n    '.join(links)))
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
           'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
           + '\n'.join(urls) + '\n</urlset>\n')
    with open(os.path.join(ROOT, 'sitemap.xml'), 'w', encoding='utf-8') as f:
        f.write(xml)
    print('Wrote sitemap.xml (%d URLs).' % len(urls))


def main():
    for l in ['ru', 'en', 'pl']:
        d = os.path.join(ROOT, l)
        if os.path.isdir(d):
            shutil.rmtree(d)
        os.makedirs(d)

    count = 0
    for lang in LANGS:
        for page in PAGES:
            soup = bake(page, lang)
            out = os.path.join(ROOT, page) if lang == 'uk' else os.path.join(ROOT, lang, page)
            with open(out, 'w', encoding='utf-8') as f:
                f.write(str(soup))
            count += 1

    print('Built %d static files (4 langs x %d pages).' % (count, len(PAGES)))
    print('Domain:', BASE)
    write_sitemap()


if __name__ == '__main__':
    main()
